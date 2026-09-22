#!/usr/bin/env node
// Deck validator for the bilingual GitHub Copilot app workshop.
//
// It opens each generated .pptx as a ZIP, resolves the real slide order from
// ppt/presentation.xml rather than trusting part filenames, and asserts
// per-slide bilingual correctness against content/workshop-content.mjs.
//
// It exists because of adversarial build review finding BLD-H5: the previously
// proposed check asserted sixteen slide parts, sixteen notes parts, non-empty
// text, and the substring "https://" in the notes. Two identical English decks
// named -en.pptx and -fr.pptx pass every one of those assertions, and so does a
// deck pair where slide 01 is translated and the other fifteen are untouched
// English. A check that cannot fail for the defect it exists to catch is not a
// gate, so every assertion below is per slide, keyed on the slide id, and names
// the offending slide when it fails.
//
// It also covers the fail-soft variant of BLD-C1: a missing, zero-byte, or
// short deck is a failure here, never a warning, because the downstream effect
// is a site that deploys green with dead download links.
//
// Checks, all per slide unless stated:
//   1. Both deck files exist, are non-zero, and open as valid packages.
//   2. Both decks contain exactly sixteen slides in the same id ordering.
//   3. The expected slide-id token appears on the expected slide index.
//   4. English and French extracted slide text differ.
//   5. The French deck's accented-character ratio clears a declared threshold,
//      computed across all slide text (deck-wide).
//   6. Every slide carries a non-empty notes part.
//   7. Every notes part contains its own slide's source URLs and none of the
//      source URLs belonging only to other slides.
//   8. Every notes part carries the source retrieval date, and while no tested
//      app version is recorded, no notes part states a version-shaped string.
//   9. No slide in agenda section 2 names Interactive as its mode, and no slide
//      allocates session time to installation, sign-in, or a setup readiness
//      check.
//
// Options:
//   --deck-dir <path>  Directory holding the two decks. Defaults to
//                      docs/assets/decks. Exists so failure fixtures can be
//                      validated in a temporary directory without touching the
//                      real build output.
//   --help
//
// An unknown flag exits non-zero rather than silently falling back to defaults.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import JSZip from 'jszip';

import {
  sections,
  slides,
  SLIDE_GROUPS,
  LANGUAGES,
  SOURCE_RETRIEVAL_DATE,
  TESTED_APP_VERSION
} from '../content/workshop-content.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_DECK_DIR = 'docs/assets/decks';
const FILE_STEM = 'github-copilot-app-workshop';
const EXPECTED_SLIDE_COUNT = 16;

// Declared threshold for check 5. Measured over decoded slide text at
// implementation time: the French deck is 3.14 percent accented letters, the
// English deck is 0.00 percent. The threshold is set at 1.5 percent, which is
// half the observed French value and unreachable by an English deck, so it fails
// loudly on a copied English deck without being brittle about French rewording.
const FRENCH_ACCENT_RATIO_THRESHOLD = 0.015;
const ACCENTED = /[àâäçéèêëîïôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ]/g;
const LETTERS = /[A-Za-zÀ-ÖØ-öø-ÿŒœ]/g;

// A version-shaped string. While TESTED_APP_VERSION is null, no notes part may
// carry one, because stating a version implies a rehearsal that has not happened.
const VERSION_SHAPED = /\bv?\d+\.\d+(?:\.\d+)?\b/;

// Mirrors scripts/validate-content.mjs. Applied to slide text only: speaker
// notes are allowed to say that installation happens before the timed workshop,
// which is the opposite claim and the one the research requires.
const SETUP_TIME_TERMS = [
  /\binstall(?:ation|ing|ed|s)?\b/i,
  /\binstaller\b/i,
  /\bsign[-\s]?in\b/i,
  /\bsign[-\s]?on\b/i,
  /\bconnexion\b/i,
  /\bready check\b/i,
  /\bsetup\b/i,
  /\bvérification initiale\b/i
];

const failures = [];
const notes = [];

function fail(deck, key, message) {
  failures.push({ deck, key, message });
}

function info(message) {
  notes.push(message);
}

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

const USAGE = `Usage: node scripts/validate-decks.mjs [options]

Options:
  --deck-dir <path>   Directory holding the two decks. Default: ${DEFAULT_DECK_DIR}
  --help              Show this message.`;

function parseArguments(argv) {
  const options = { deckDir: DEFAULT_DECK_DIR, help: false };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--deck-dir') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error('--deck-dir requires a path.');
      }
      options.deckDir = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument '${arg}'.`);
    }
  }

  return options;
}

// ---------------------------------------------------------------------------
// Package reading
// ---------------------------------------------------------------------------

function decodeXmlText(value) {
  return value
    .replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/** Every <a:t> run in a slide or notes part, joined and whitespace-normalized. */
function extractText(xml) {
  const runs = [...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((match) => decodeXmlText(match[1]));
  return runs.join('\n');
}

function normalize(value) {
  return value.replace(/\s+/g, ' ').trim();
}

/** Resolve an OPC relationship target against the part that declares it. */
function resolveRelative(basePart, target) {
  const baseDir = path.posix.dirname(basePart);
  return path.posix.normalize(path.posix.join(baseDir, target));
}

function parseRelationships(xml) {
  const map = new Map();
  for (const match of xml.matchAll(/<Relationship\b[^>]*>/g)) {
    const tag = match[0];
    const id = /\bId="([^"]+)"/.exec(tag);
    const type = /\bType="([^"]+)"/.exec(tag);
    const target = /\bTarget="([^"]+)"/.exec(tag);
    if (id && type && target) {
      map.set(id[1], { type: type[1], target: target[1] });
    }
  }
  return map;
}

/**
 * Slide order taken from p:sldIdLst, not from part filenames. A deck whose parts
 * are named slide1..slide16 but presented in a different order would otherwise
 * pass an ordering check it should fail.
 */
async function readDeck(deckPath, label) {
  if (!existsSync(deckPath)) {
    fail(label, 'file', `Deck file is missing: ${toRepoPath(deckPath)}`);
    return null;
  }

  const { size } = statSync(deckPath);
  if (size === 0) {
    fail(label, 'file', `Deck file is zero bytes: ${toRepoPath(deckPath)}`);
    return null;
  }

  let zip;
  try {
    zip = await JSZip.loadAsync(readFileSync(deckPath));
  } catch (error) {
    fail(label, 'file', `Deck file is not a readable package: ${error.message}`);
    return null;
  }

  const presentationPart = 'ppt/presentation.xml';
  const relsPart = 'ppt/_rels/presentation.xml.rels';
  for (const part of [presentationPart, relsPart]) {
    if (!zip.file(part)) {
      fail(label, 'package', `Deck is missing required part ${part}.`);
      return null;
    }
  }

  const presentationXml = await zip.file(presentationPart).async('string');
  const presentationRels = parseRelationships(await zip.file(relsPart).async('string'));

  const orderedRelIds = [...presentationXml.matchAll(/<p:sldId\b[^>]*r:id="([^"]+)"/g)].map((m) => m[1]);
  const deckSlides = [];

  for (const [index, relId] of orderedRelIds.entries()) {
    const relationship = presentationRels.get(relId);
    if (!relationship) {
      fail(label, `slide-index-${index + 1}`, `Slide list references relationship '${relId}' that presentation.xml.rels does not declare.`);
      continue;
    }

    const slidePart = resolveRelative(presentationPart, relationship.target);
    const slideEntry = zip.file(slidePart);
    if (!slideEntry) {
      fail(label, `slide-index-${index + 1}`, `Slide part ${slidePart} is referenced but absent from the package.`);
      continue;
    }

    const slideText = extractText(await slideEntry.async('string'));

    let notesText = null;
    const slideRelsPart = resolveRelative(slidePart, `_rels/${path.posix.basename(slidePart)}.rels`);
    const slideRelsEntry = zip.file(slideRelsPart);
    if (slideRelsEntry) {
      const slideRels = parseRelationships(await slideRelsEntry.async('string'));
      const notesRel = [...slideRels.values()].find((rel) => rel.type.endsWith('/notesSlide'));
      if (notesRel) {
        const notesPart = resolveRelative(slidePart, notesRel.target);
        const notesEntry = zip.file(notesPart);
        if (notesEntry) {
          notesText = extractText(await notesEntry.async('string'));
        }
      }
    }

    deckSlides.push({ index, part: slidePart, text: slideText, notesText });
  }

  return { label, path: deckPath, size, slides: deckSlides };
}

function toRepoPath(absolute) {
  const relative = path.relative(REPO_ROOT, absolute);
  return relative.startsWith('..') ? absolute : relative.split(path.sep).join('/');
}

// ---------------------------------------------------------------------------
// Expectations derived from the content model
// ---------------------------------------------------------------------------

function slideToken(slide) {
  return `[${slide.id}/${String(slides.length).padStart(2, '0')}]`;
}

function buildExpectations() {
  const universe = [...new Set(slides.flatMap((slide) => slide.sources))];

  // The foreign-source check uses substring containment, which is only sound
  // while no source URL is a substring of another. Assert that rather than
  // assume it: a future source that is a prefix of an existing one would make
  // the check silently unable to fail.
  for (const candidate of universe) {
    for (const other of universe) {
      if (candidate !== other && other.includes(candidate)) {
        throw new Error(`Source URL '${candidate}' is a substring of '${other}'; the foreign-source check would be unsound.`);
      }
    }
  }

  const sectionTwoSlideIds = new Set(
    SLIDE_GROUPS.filter((group) => group.sectionId === 'section-02').flatMap((group) => group.slideIds)
  );

  return {
    universe,
    sectionTwoSlideIds,
    ordered: slides.map((slide) => ({
      id: slide.id,
      token: slideToken(slide),
      sources: slide.sources,
      foreign: universe.filter((url) => !slide.sources.includes(url))
    }))
  };
}

// ---------------------------------------------------------------------------
// Assertions
// ---------------------------------------------------------------------------

function checkDeckStructure(deck, expectations) {
  if (deck.slides.length !== EXPECTED_SLIDE_COUNT) {
    fail(deck.label, 'slide-count', `Deck contains ${deck.slides.length} slide(s), expected ${EXPECTED_SLIDE_COUNT}.`);
  }

  for (const [index, expected] of expectations.ordered.entries()) {
    const actual = deck.slides[index];
    if (!actual) {
      fail(deck.label, `slide-${expected.id}`, `No slide at index ${index + 1}; expected token ${expected.token}.`);
      continue;
    }

    if (!actual.text.includes(expected.token)) {
      fail(
        deck.label,
        `slide-${expected.id}`,
        `Slide at index ${index + 1} does not carry its expected id token ${expected.token}.`
      );
    }

    if (normalize(actual.text).length === 0) {
      fail(deck.label, `slide-${expected.id}`, `Slide at index ${index + 1} has no text.`);
    }

    if (actual.notesText === null) {
      fail(deck.label, `slide-${expected.id}`, `Slide at index ${index + 1} has no notes part.`);
      continue;
    }

    if (normalize(actual.notesText).length === 0) {
      fail(deck.label, `slide-${expected.id}`, `Slide at index ${index + 1} has an empty notes part.`);
      continue;
    }

    for (const url of expected.sources) {
      if (!actual.notesText.includes(url)) {
        fail(deck.label, `slide-${expected.id}`, `Notes are missing this slide's own source URL ${url}.`);
      }
    }

    for (const url of expected.foreign) {
      if (actual.notesText.includes(url)) {
        fail(deck.label, `slide-${expected.id}`, `Notes carry another slide's source URL ${url}.`);
      }
    }

    if (!actual.notesText.includes(SOURCE_RETRIEVAL_DATE)) {
      fail(deck.label, `slide-${expected.id}`, `Notes do not record the source retrieval date ${SOURCE_RETRIEVAL_DATE}.`);
    }

    if (TESTED_APP_VERSION === null) {
      const claimed = VERSION_SHAPED.exec(actual.notesText);
      if (claimed) {
        fail(
          deck.label,
          `slide-${expected.id}`,
          `Notes state a tested app version ('${claimed[0]}') while no rehearsal has been recorded.`
        );
      }
    }

    if (expectations.sectionTwoSlideIds.has(expected.id) && /\bInteractive\b/i.test(actual.text)) {
      fail(
        deck.label,
        `slide-${expected.id}`,
        'Slide names Interactive as the mode for agenda section 2. Section 2 uses Plan mode.'
      );
    }

    for (const term of SETUP_TIME_TERMS) {
      const match = term.exec(actual.text);
      if (match) {
        fail(
          deck.label,
          `slide-${expected.id}`,
          `Slide allocates session time to setup ('${match[0]}'). Installation and sign-in complete before the timed workshop.`
        );
      }
    }
  }
}

function checkBilingualDifference(enDeck, frDeck, expectations) {
  if (enDeck.slides.length !== frDeck.slides.length) {
    fail('pair', 'slide-count', `English deck has ${enDeck.slides.length} slide(s), French deck has ${frDeck.slides.length}.`);
  }

  const shared = Math.min(enDeck.slides.length, frDeck.slides.length);

  for (let index = 0; index < shared; index += 1) {
    const expected = expectations.ordered[index];
    const id = expected ? expected.id : String(index + 1).padStart(2, '0');
    const english = normalize(enDeck.slides[index].text);
    const french = normalize(frDeck.slides[index].text);

    if (english === french) {
      fail(
        'pair',
        `slide-${id}`,
        `Slide at index ${index + 1} is identical in both decks. The French slide is untranslated.`
      );
      continue;
    }

    // An id-token-only difference is not a translation either. Strip every
    // token before comparing so a deck that differs only in its own numbering
    // cannot pass as localized.
    const strip = (value) => expectations.ordered.reduce(
      (text, entry) => text.split(entry.token).join(''),
      value
    );

    if (normalize(strip(english)) === normalize(strip(french))) {
      fail(
        'pair',
        `slide-${id}`,
        `Slide at index ${index + 1} differs only in its id token; the prose is identical in both decks.`
      );
    }
  }
}

function checkFrenchAccents(frDeck) {
  const text = frDeck.slides.map((slide) => slide.text).join('\n');
  const letters = (text.match(LETTERS) || []).length;
  const accented = (text.match(ACCENTED) || []).length;

  if (letters === 0) {
    fail(frDeck.label, 'accents', 'French deck contains no letters to measure.');
    return 0;
  }

  const ratio = accented / letters;
  info(
    `French accented-character ratio: ${(ratio * 100).toFixed(2)}% of ${letters} letters ` +
    `(declared threshold ${(FRENCH_ACCENT_RATIO_THRESHOLD * 100).toFixed(2)}%).`
  );

  if (ratio <= FRENCH_ACCENT_RATIO_THRESHOLD) {
    fail(
      frDeck.label,
      'accents',
      `French accented-character ratio ${(ratio * 100).toFixed(2)}% does not clear the declared threshold ` +
      `${(FRENCH_ACCENT_RATIO_THRESHOLD * 100).toFixed(2)}%. The French deck is probably English text.`
    );
  }

  return ratio;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.error(`validate-decks: ${error.message}`);
    process.exit(2);
  }

  if (options.help) {
    console.log(USAGE);
    process.exit(0);
  }

  const deckDir = path.resolve(REPO_ROOT, options.deckDir);
  info(`Deck directory: ${toRepoPath(deckDir)}`);

  const expectations = buildExpectations();
  info(`Expecting ${EXPECTED_SLIDE_COUNT} slides in order: ${expectations.ordered.map((s) => s.id).join(' ')}`);

  const decks = {};
  for (const language of LANGUAGES) {
    const deckPath = path.join(deckDir, `${FILE_STEM}-${language}.pptx`);
    const deck = await readDeck(deckPath, language);
    if (deck) {
      info(`Read ${toRepoPath(deck.path)}: ${deck.size} bytes, ${deck.slides.length} slide(s).`);
      decks[language] = deck;
      checkDeckStructure(deck, expectations);
    }
  }

  if (decks.fr) {
    checkFrenchAccents(decks.fr);
  }

  if (decks.en && decks.fr) {
    checkBilingualDifference(decks.en, decks.fr, expectations);
  } else {
    fail('pair', 'comparison', 'Cannot compare the two decks because at least one of them failed to load.');
  }

  report();
}

function report() {
  for (const line of notes) {
    console.log(line);
  }

  if (failures.length === 0) {
    console.log(`\nvalidate-decks: PASS (${sections.length} sections, ${EXPECTED_SLIDE_COUNT} slides per deck)`);
    process.exit(0);
  }

  console.error(`\nvalidate-decks: FAIL with ${failures.length} problem(s):\n`);
  for (const failure of failures) {
    console.error(`  [${failure.deck}] ${failure.key}: ${failure.message}`);
  }
  console.error('');
  process.exit(1);
}

main().catch((error) => {
  console.error(`\nvalidate-decks: FAIL\n  ${error.message}`);
  process.exit(1);
});
