#!/usr/bin/env node
// Bilingual deck generator for the ninety-minute GitHub Copilot app workshop.
//
// It reads content/workshop-content.mjs, which is the single source of truth for
// every content surface, and emits one widescreen sixteen-slide deck per
// language into docs/assets/decks/. It authors no curriculum of its own: every
// title, body line, and facilitation note on a slide comes from the content
// model. The only strings authored here are deck furniture, and each one is
// marked where it is defined.
//
// Two adversarial build review findings shape this file and neither may be
// softened:
//
//   BLD-C1 - docs/assets/decks/ is gitignored, so a clean checkout has no such
//     directory and pptxgenjs does not create parents. This generator creates
//     the directory recursively before the first write, then asserts each
//     written file exists and is non-zero. Any failure throws and exits
//     non-zero. There is deliberately no warn-and-continue path: the fail-soft
//     variant of C1 deploys a green site with two 404 downloads, which is worse
//     than a red build.
//
//   BLD-H5 - a deck check that cannot fail for the bilingual defect it exists to
//     catch is not a gate. The matching per-slide assertions live in
//     scripts/validate-decks.mjs; what this file owes that validator is a stable
//     per-slide id token rendered on every slide, and notes that carry only
//     their own slide's source URLs.
//
// Slide grouping and per-group durations are asserted here as well as in
// scripts/validate-content.mjs, because a deck whose footers disagree with the
// agenda is a delivery defect regardless of whether the model is self-consistent.
// English runs 10/15/30/15/15/5 and French runs 10/15/35/15/10/5; both total 90.

import { mkdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import PptxGenJS from 'pptxgenjs';

import {
  sections,
  slides,
  SLIDE_GROUPS,
  LANGUAGES,
  AGENDA_TOTAL_MINUTES,
  SOURCE_RETRIEVAL_DATE,
  TESTED_APP_VERSION
} from '../content/workshop-content.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'docs', 'assets', 'decks');
const FILE_STEM = 'github-copilot-app-workshop';

/** Deck geometry. Widescreen, in inches. */
const LAYOUT = { name: 'WIDE', width: 13.33, height: 7.5 };

const COLOR = {
  background: 'FAFBFC',
  accent: '0078D4',
  titleText: '003D6B',
  bodyText: '1A1A1A',
  mutedText: '5C5C5C',
  rule: 'E1E5E8'
};

const FONT = 'Segoe UI';

/** BCP-47 tags. The pptxgenjs `lang` option takes one per text run. */
const LANG_TAGS = { en: 'en-CA', fr: 'fr-CA' };

// ---------------------------------------------------------------------------
// Deck furniture
// ---------------------------------------------------------------------------
// The only authored strings in this file. They are session-wide statements, not
// per-slide curriculum: the acceptance oracle, the recovery lever, the standing
// data boundary, and the notes section labels. They are repeated verbatim on
// every slide on purpose, because a facilitator reads the notes of whichever
// slide is on screen when something goes wrong, and an oracle that appears on
// only one slide is not available at the moment it is needed.

const FURNITURE = {
  en: {
    sectionOf: (order, total) => `Section ${order} of ${total}`,
    minutes: (value) => `${value} min`,
    standingFooter: 'Synthetic data only. Examples are illustrative and claim no endorsement.',
    notesFacilitation: 'FACILITATION',
    notesChecks: 'CHECKS: DELTAS AND INVARIANTS',
    notesRecovery: 'RECOVERY',
    notesSources: (date) => `SOURCES (retrieved ${date}, not a publication date)`,
    notesVersion: 'TESTED APP VERSION',
    sectionOutcome: (text) => `Section outcome: ${text}`,
    oracle:
      'Accept on a delta or an invariant each learner observed for themselves, never on a fixed total announced for the room. After an interface add the total rises by exactly one and the new task carries a unique identifier. After an agent move the source status falls by one, the destination rises by one, and the total is unchanged. Filtering changes what is visible and never what is stored, and clearing the filter returns the previous visible count exactly.',
    recovery:
      'Switch a blocked learner to the prepared reference board rather than debugging in place; a facilitator debugging one machine is not running the workshop. Recovery preserves the last observed state and asks for one targeted correction. Rebuilding the board is not an undo, because it discards the evidence you were about to read. Abort thresholds are live during section 3. Demonstrate only a recovery path already rehearsed on the delivery version.',
    versionUnrecorded:
      'Not recorded. No rehearsal has taken place, so no tested app version exists; do not state one. Re-check product versions and interface labels within the week before delivery.',
    versionRecorded: (value) => `Rehearsed against app version ${value}. Re-check versions and interface labels within the week before delivery.`
  },
  fr: {
    sectionOf: (order, total) => `Section ${order} sur ${total}`,
    minutes: (value) => `${value} min`,
    standingFooter: "Données fictives seulement. Les exemples sont illustratifs et ne valent aucune approbation.",
    notesFacilitation: 'ANIMATION',
    notesChecks: 'VÉRIFICATIONS : ÉCARTS ET INVARIANTS',
    notesRecovery: 'REPRISE',
    notesSources: (date) => `SOURCES (consultées le ${date}, ce n'est pas une date de publication)`,
    notesVersion: 'VERSION TESTÉE DE L\u2019APPLICATION',
    sectionOutcome: (text) => `Objectif de la section : ${text}`,
    oracle:
      "Acceptez sur la base d'un écart ou d'un invariant que chaque personne a observé elle-même, jamais sur un total fixe annoncé au groupe. Après un ajout par l'interface, le total augmente d'exactement un et la nouvelle tâche porte un identifiant unique. Après un déplacement par l'agent, l'état source perd un, l'état cible gagne un et le total ne change pas. Le filtre modifie ce qui est visible, jamais ce qui est stocké, et son retrait ramène exactement le nombre visible précédent.",
    recovery:
      "Basculez une personne bloquée vers le tableau de référence préparé plutôt que de déboguer sur place; une personne qui dépanne une machine n'anime plus l'atelier. La reprise conserve le dernier état observé et demande une correction ciblée. Reconstruire le tableau ne constitue pas une annulation, car cela détruit la preuve que vous alliez examiner. Les seuils d'abandon sont actifs pendant la section 3. Ne démontrez qu'un chemin de reprise déjà répété sur la version utilisée.",
    versionUnrecorded:
      "Non consignée. Aucune répétition n'a eu lieu, donc aucune version testée n'existe; n'en annoncez aucune. Revérifiez les versions du produit et les libellés de l'interface dans la semaine précédant la séance.",
    versionRecorded: (value) => `Répété sur la version ${value} de l'application. Revérifiez les versions et les libellés dans la semaine précédant la séance.`
  }
};

// ---------------------------------------------------------------------------
// Model guards
// ---------------------------------------------------------------------------
// These run before a single slide is created. A deck emitted from a model that
// fails any of them would have footers disagreeing with the agenda, which is a
// delivery defect the build must not produce.

function sectionById(id) {
  const match = sections.find((section) => section.id === id);
  if (!match) {
    throw new Error(`Content model references unknown section '${id}'.`);
  }
  return match;
}

function slideById(id) {
  const match = slides.find((slide) => slide.id === id);
  if (!match) {
    throw new Error(`Slide group references unknown slide '${id}'.`);
  }
  return match;
}

function assertModel() {
  if (slides.length !== 16) {
    throw new Error(`Expected 16 slides in the content model, found ${slides.length}.`);
  }

  const groupedIds = SLIDE_GROUPS.flatMap((group) => group.slideIds);
  if (groupedIds.length !== slides.length) {
    throw new Error(`Slide groups cover ${groupedIds.length} slide(s) but the model has ${slides.length}.`);
  }

  const modelOrder = slides.map((slide) => slide.id).join(',');
  if (groupedIds.join(',') !== modelOrder) {
    throw new Error(`Slide group ordering '${groupedIds.join(',')}' does not match model ordering '${modelOrder}'.`);
  }

  for (const language of LANGUAGES) {
    let total = 0;

    for (const group of SLIDE_GROUPS) {
      const section = sectionById(group.sectionId);
      const expected = section.durationMinutes[language];
      const actual = group.slideIds.reduce((sum, id) => sum + slideById(id).durationMinutes[language], 0);

      if (actual !== expected) {
        throw new Error(
          `[${language}] Slide group ${group.sectionId} (${group.slideIds.join(', ')}) sums to ${actual} min but its section is ${expected} min.`
        );
      }

      total += expected;
    }

    if (total !== AGENDA_TOTAL_MINUTES) {
      throw new Error(`[${language}] Section durations total ${total} min, expected ${AGENDA_TOTAL_MINUTES}.`);
    }
  }

  for (const slide of slides) {
    if (!Array.isArray(slide.sources) || slide.sources.length === 0) {
      throw new Error(`Slide ${slide.id} declares no source URLs; every slide's notes must carry its own sources.`);
    }
    for (const language of LANGUAGES) {
      if (!slide.title[language] || !slide.notes[language] || !Array.isArray(slide.body[language])) {
        throw new Error(`Slide ${slide.id} is missing ${language} title, body, or notes.`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Slide composition
// ---------------------------------------------------------------------------

/**
 * Stable, language-neutral slide identifier rendered on every slide. Identifiers
 * do not localize. scripts/validate-decks.mjs asserts this exact token appears
 * at this exact index in both decks, which is how slide-order drift between the
 * two languages is caught.
 */
function slideToken(slide) {
  return `[${slide.id}/${String(slides.length).padStart(2, '0')}]`;
}

function buildNotes(slide, language) {
  const words = FURNITURE[language];
  const section = sectionById(slide.sectionId);
  const version = TESTED_APP_VERSION === null
    ? words.versionUnrecorded
    : words.versionRecorded(TESTED_APP_VERSION);

  return [
    `${slideToken(slide)} ${slide.title[language]}`,
    '',
    words.notesFacilitation,
    slide.notes[language],
    '',
    words.notesChecks,
    words.sectionOutcome(section.outcome[language]),
    words.oracle,
    '',
    words.notesRecovery,
    words.recovery,
    '',
    words.notesSources(SOURCE_RETRIEVAL_DATE),
    ...slide.sources,
    '',
    words.notesVersion,
    version
  ].join('\n');
}

function composeSlide(pptx, slide, language) {
  const words = FURNITURE[language];
  const lang = LANG_TAGS[language];
  const section = sectionById(slide.sectionId);
  const target = pptx.addSlide();

  target.background = { color: COLOR.background };

  target.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: LAYOUT.width, h: 0.09, fill: { color: COLOR.accent } });

  // Kicker. Uppercased in both languages; French capitals keep their accents.
  target.addText(`${words.sectionOf(section.order, sections.length)} \u00B7 ${section.title[language]}`.toUpperCase(), {
    x: 0.55, y: 0.3, w: 12.25, h: 0.3,
    fontSize: 11, bold: true, color: COLOR.accent, fontFace: FONT, charSpacing: 1,
    valign: 'top', wrap: false, lang
  });

  // Title. Two lines of headroom at 28pt so the longest French title cannot clip.
  target.addText(slide.title[language], {
    x: 0.55, y: 0.62, w: 12.25, h: 0.95,
    fontSize: 28, bold: true, color: COLOR.titleText, fontFace: FONT,
    valign: 'top', wrap: true, lang
  });

  target.addShape(pptx.ShapeType.rect, { x: 0.55, y: 1.58, w: 12.25, h: 0.014, fill: { color: COLOR.rule } });

  // Body. The box is far taller than the worst observed French wrap, because
  // pptxgenjs cannot trigger PowerPoint's shrink-on-overflow behaviour; the only
  // defence against clipping is headroom.
  target.addText(
    slide.body[language].map((line) => ({
      text: line,
      options: {
        color: COLOR.bodyText, fontSize: 16, fontFace: FONT, lang,
        breakLine: true, bullet: { code: '25CF', indent: 20 }
      }
    })),
    { x: 0.6, y: 1.78, w: 12.15, h: 4.9, valign: 'top', lineSpacingMultiple: 1.3, wrap: true }
  );

  target.addShape(pptx.ShapeType.rect, { x: 0.55, y: 7.02, w: 12.25, h: 0.014, fill: { color: COLOR.rule } });

  // Both footer runs are wrap:false, so their boxes must be wider than the
  // rendered string or the text spills past the rule. The French standing footer
  // is the widest string on any slide at 90 characters, which does not fit a
  // 6.7-inch box at 10pt; 9pt across 8.1 inches leaves roughly a third of the
  // box spare. The two boxes meet at x=4.7 and end exactly on the rule at 12.8.
  target.addText(
    `${slideToken(slide)} \u00B7 ${words.sectionOf(section.order, sections.length)} \u00B7 ${words.minutes(slide.durationMinutes[language])}`,
    {
      x: 0.55, y: 7.1, w: 4.0, h: 0.28,
      fontSize: 9, color: COLOR.mutedText, fontFace: FONT, valign: 'top', wrap: false, lang
    }
  );

  target.addText(words.standingFooter, {
    x: 4.7, y: 7.1, w: 8.1, h: 0.28,
    fontSize: 9, color: COLOR.mutedText, fontFace: FONT, align: 'right', valign: 'top', wrap: false, lang
  });

  target.addNotes(buildNotes(slide, language));

  return target;
}

function buildDeck(language) {
  const pptx = new PptxGenJS();

  pptx.defineLayout(LAYOUT);
  pptx.layout = LAYOUT.name;
  pptx.author = 'GitHub Copilot app workshop';
  pptx.company = 'GitHub Copilot app workshop';
  pptx.title = language === 'fr'
    ? "Atelier sur l'application GitHub Copilot"
    : 'GitHub Copilot app workshop';
  pptx.subject = language === 'fr'
    ? `Séance de ${AGENDA_TOTAL_MINUTES} minutes, ${slides.length} diapositives`
    : `${AGENDA_TOTAL_MINUTES}-minute session, ${slides.length} slides`;

  for (const slide of slides) {
    composeSlide(pptx, slide, language);
  }

  if (pptx.slides.length !== slides.length) {
    throw new Error(`[${language}] Built ${pptx.slides.length} slide(s), expected ${slides.length}.`);
  }

  return pptx;
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

async function writeDeck(pptx, language) {
  const fileName = path.join(OUTPUT_DIR, `${FILE_STEM}-${language}.pptx`);

  // BLD-C1. No try/catch: a rejected write must propagate to the non-zero exit
  // in main(). Swallowing it here is the fail-soft variant that ships a green
  // build with broken downloads.
  await pptx.writeFile({ fileName });

  if (!existsSync(fileName)) {
    throw new Error(`[${language}] writeFile resolved but ${toPosix(fileName)} does not exist.`);
  }

  const { size } = statSync(fileName);
  if (size === 0) {
    throw new Error(`[${language}] ${toPosix(fileName)} was written but is zero bytes.`);
  }

  return { fileName, size };
}

function toPosix(value) {
  return path.relative(REPO_ROOT, value).split(path.sep).join('/');
}

async function main() {
  assertModel();

  // BLD-C1. docs/assets/decks/ is gitignored, so a clean checkout does not have
  // it and pptxgenjs will not create parent directories.
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const written = [];
  for (const language of LANGUAGES) {
    const deck = buildDeck(language);
    written.push({ language, ...(await writeDeck(deck, language)) });
  }

  console.log(`build-workshop-deck: ${slides.length} slides per deck, ${AGENDA_TOTAL_MINUTES}-minute agenda.`);
  for (const group of SLIDE_GROUPS) {
    const section = sectionById(group.sectionId);
    const perLanguage = LANGUAGES.map((language) => `${language} ${section.durationMinutes[language]} min`).join(', ');
    console.log(`  ${group.sectionId} [${group.slideIds.join(' ')}] ${perLanguage}`);
  }
  for (const entry of written) {
    console.log(`  wrote ${toPosix(entry.fileName)} (${entry.size} bytes)`);
  }
  console.log('\nbuild-workshop-deck: PASS');
}

main().catch((error) => {
  console.error(`\nbuild-workshop-deck: FAIL\n  ${error.message}`);
  process.exit(1);
});
