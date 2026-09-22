#!/usr/bin/env node
// Content parity validator for the bilingual GitHub Copilot app workshop.
//
// It exists because five content surfaces drift independently: the English
// site, the French site, the English deck, the French deck, and the root README
// agenda table (adversarial build review finding BLD-H3). It is written before
// the content it validates so authoring errors surface immediately.
//
// It must never pass by being fail-soft. Finding BLD-C3 records a validator that
// only checked a document against itself and reported a pass while several
// external claims were wrong. Every check here either asserts a real invariant
// or is absent.
//
// Modes:
//   (no flags)       Full parity across all five surfaces: content model,
//                    front matter, counterpart matching, covers-marker parity,
//                    navigation integrity, slug policy, README alignment, and
//                    the post-build base path and rendered navigation
//                    assertions.
//   --structure-only Front matter well-formedness, covers markers, and content
//                    model alignment, scoped to whatever trees are supplied.
//                    Skips counterpart matching, README parsing, and the base
//                    path assertion, so parallel phases can validate their own
//                    subtree before the other trees exist.
//   --basepath-only  The post-build base path assertion alone, so it can run
//                    after a Jekyll build rather than before one.
//
// Options:
//   --tree <path>      Repeatable. Restrict the walk to this tree. Absent, the
//                      walk covers the repository, minus the built-in prunes.
//   --exclude <path>   Repeatable. Prune a subtree. Load-bearing, because the
//                      English tree root physically contains the French,
//                      facilitator, and asset subtrees that other parallel
//                      phases own, so --tree alone cannot express a write scope.
//   --basepath <value> Expected Pages base path. Defaults to $PAGES_BASE_PATH,
//                      then to /github-copilot-app-workshop. Never hardcode a
//                      base path in a build command (finding BLD-H1).
//   --site <path>      Built site root. Defaults to _site, which is where every
//                      Jekyll invocation in this repository writes.
//   --help
//
// An unknown flag exits non-zero rather than silently falling back to full mode.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { load as loadYaml } from 'js-yaml';

import {
  sections,
  slides,
  SLIDE_GROUPS,
  LAB_SLUGS,
  LANGUAGES,
  AGENDA_TOTAL_MINUTES,
  REQUIRED_CONTENT_MARKERS
} from '../content/workshop-content.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURE_PATH = 'content/task-board-fixture.json';
const README_PATH = 'README.md';
const PAGE_ROOT = 'docs';
const FRENCH_ROOT = 'docs/fr';
const IDENTICAL_SLUG_TREES = ['labs', 'facilitator'];
const SLUG_EXEMPT_FROM_LOCALIZATION = ['index'];
const EXPECTED_EN_DURATIONS = [10, 15, 30, 15, 15, 5];

// Directories a repository walk never descends into. Build output, dependency
// trees, version control internals, and the planning artifacts, none of which
// are publishable pages.
const BUILT_IN_PRUNES = ['node_modules', '.git', '.github', '_site', '.jekyll-cache', '.copilot-tracking'];

// Terms that would indicate a slide allocating session time to installation,
// sign-in, or a setup readiness check. Applied to slide titles and bodies only,
// because that is where time allocation is expressed. Speaker notes are allowed
// to say that installation happens before the timed workshop, which is the
// opposite claim and the one the research requires.
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

function fail(file, key, message) {
  failures.push({ file, key, message });
}

function info(message) {
  notes.push(message);
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function readUtf8(absolutePath) {
  return readFileSync(absolutePath, 'utf8').replace(/^\uFEFF/, '');
}

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

const USAGE = `Usage: node scripts/validate-content.mjs [options]

Modes:
  (no flags)          Full parity across all five content surfaces.
  --structure-only    Front matter, covers markers, and content model alignment.
  --basepath-only     Post-build base path assertion only.

Options:
  --tree <path>       Repeatable. Restrict the walk to this tree.
  --exclude <path>    Repeatable. Prune a subtree from the walk.
  --basepath <value>  Expected Pages base path.
  --site <path>       Built site root. Default: _site
  --help              Print this message.`;

function parseArguments(argv) {
  const options = {
    structureOnly: false,
    basepathOnly: false,
    trees: [],
    excludes: [],
    basepath: process.env.PAGES_BASE_PATH ?? '/github-copilot-app-workshop',
    site: '_site',
    help: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const takeValue = (name) => {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith('--')) {
        throw new Error(`Flag ${name} requires a value.`);
      }
      index += 1;
      return value;
    };

    switch (argument) {
      case '--structure-only':
        options.structureOnly = true;
        break;
      case '--basepath-only':
        options.basepathOnly = true;
        break;
      case '--tree':
        options.trees.push(toPosix(takeValue('--tree')).replace(/\/+$/, ''));
        break;
      case '--exclude':
        options.excludes.push(toPosix(takeValue('--exclude')).replace(/\/+$/, ''));
        break;
      case '--basepath':
        options.basepath = takeValue('--basepath');
        break;
      case '--site':
        options.site = toPosix(takeValue('--site')).replace(/\/+$/, '');
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
      default:
        throw new Error(`Unknown flag: ${argument}\n\n${USAGE}`);
    }
  }

  if (options.structureOnly && options.basepathOnly) {
    throw new Error('--structure-only and --basepath-only are mutually exclusive.');
  }

  return options;
}

// ---------------------------------------------------------------------------
// Content model invariants
// ---------------------------------------------------------------------------

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function textOf(value) {
  if (Array.isArray(value)) return value.join('\n');
  return typeof value === 'string' ? value : '';
}

function checkPairedField(file, recordId, fieldName, field) {
  if (field === null || typeof field !== 'object') {
    fail(file, `${recordId}.${fieldName}`, 'Field is missing or is not an { en, fr } pair.');
    return;
  }

  for (const language of LANGUAGES) {
    const value = field[language];
    if (Array.isArray(value)) {
      if (value.length === 0 || !value.every(isNonEmptyString)) {
        fail(file, `${recordId}.${fieldName}.${language}`, 'Array is empty or contains a blank entry.');
      }
    } else if (!isNonEmptyString(value)) {
      fail(file, `${recordId}.${fieldName}.${language}`, 'Value is missing or blank.');
    }
  }

  const english = field.en;
  const french = field.fr;

  if (Array.isArray(english) !== Array.isArray(french)) {
    fail(file, `${recordId}.${fieldName}`, 'English and French values have different shapes.');
    return;
  }

  if (Array.isArray(english)) {
    if (english.length !== french.length) {
      fail(
        file,
        `${recordId}.${fieldName}`,
        `English has ${english.length} entries and French has ${french.length}. Paired bodies must align entry for entry.`
      );
      return;
    }
    english.forEach((entry, position) => {
      if (entry.trim() === String(french[position]).trim()) {
        fail(
          file,
          `${recordId}.${fieldName}[${position}]`,
          'French value is a verbatim copy of its English counterpart.'
        );
      }
    });
    return;
  }

  if (isNonEmptyString(english) && String(english).trim() === String(french).trim()) {
    fail(file, `${recordId}.${fieldName}`, 'French value is a verbatim copy of its English counterpart.');
  }
}

function validateSections() {
  const file = 'content/workshop-content.mjs';

  if (!Array.isArray(sections) || sections.length !== 6) {
    fail(file, 'sections', `Expected exactly 6 sections, found ${Array.isArray(sections) ? sections.length : 'none'}.`);
    return;
  }

  const seenIds = new Set();
  sections.forEach((section, index) => {
    if (seenIds.has(section.id)) {
      fail(file, `sections[${index}].id`, `Duplicate section id ${section.id}.`);
    }
    seenIds.add(section.id);

    if (section.order !== index + 1) {
      fail(file, `sections[${index}].order`, `Expected order ${index + 1}, found ${section.order}.`);
    }

    for (const fieldName of ['title', 'outcome', 'body', 'notes']) {
      checkPairedField(file, section.id, fieldName, section[fieldName]);
    }

    if (section.labId !== null && !LAB_SLUGS.includes(section.labId)) {
      fail(file, `${section.id}.labId`, `labId "${section.labId}" is not a known lab slug.`);
    }

    const durations = section.durationMinutes;
    for (const language of LANGUAGES) {
      if (!Number.isInteger(durations?.[language]) || durations[language] <= 0) {
        fail(file, `${section.id}.durationMinutes.${language}`, 'Duration must be a positive integer.');
      }
    }
  });

  const english = sections.map((section) => section.durationMinutes?.en);
  const french = sections.map((section) => section.durationMinutes?.fr);

  if (english.join(',') !== EXPECTED_EN_DURATIONS.join(',')) {
    fail(
      file,
      'sections.durationMinutes.en',
      `English durations must be ${EXPECTED_EN_DURATIONS.join('/')}, found ${english.join('/')}.`
    );
  }

  for (const language of LANGUAGES) {
    const total = sections.reduce((sum, section) => sum + (section.durationMinutes?.[language] ?? 0), 0);
    if (total !== AGENDA_TOTAL_MINUTES) {
      fail(
        file,
        `sections.durationMinutes.${language}`,
        `Total is ${total} minutes; the session envelope is fixed at ${AGENDA_TOTAL_MINUTES} in both languages. A longer budget is a failure, not drift.`
      );
    }
  }

  if (english.join(',') === french.join(',')) {
    fail(
      file,
      'sections.durationMinutes.fr',
      'French durations are identical to English. The French allocation must reallocate minutes or drop a checkpoint, and the choice must be recorded.'
    );
  }
}

function validateSlides() {
  const file = 'content/workshop-content.mjs';

  if (!Array.isArray(slides) || slides.length !== 16) {
    fail(file, 'slides', `Expected exactly 16 slides, found ${Array.isArray(slides) ? slides.length : 'none'}.`);
    return;
  }

  const expectedIds = Array.from({ length: 16 }, (_, index) => String(index + 1).padStart(2, '0'));
  const seenIds = new Set();

  for (const slide of slides) {
    if (!expectedIds.includes(slide.id)) {
      fail(file, `slides.${slide.id}`, 'Slide id is outside the range 01 through 16.');
    }
    if (seenIds.has(slide.id)) {
      fail(file, `slides.${slide.id}`, 'Slide id is used more than once.');
    }
    seenIds.add(slide.id);

    for (const fieldName of ['title', 'body', 'notes']) {
      checkPairedField(file, `slide-${slide.id}`, fieldName, slide[fieldName]);
    }

    if (!Array.isArray(slide.sources) || slide.sources.length === 0) {
      fail(file, `slide-${slide.id}.sources`, 'At least one official source URL is required.');
    } else {
      for (const source of slide.sources) {
        if (!/^https:\/\/\S+$/.test(source)) {
          fail(file, `slide-${slide.id}.sources`, `Source "${source}" is not an https URL.`);
        }
      }
    }

    if (slide.labId !== null && !LAB_SLUGS.includes(slide.labId)) {
      fail(file, `slide-${slide.id}.labId`, `labId "${slide.labId}" is not a known lab slug.`);
    }

    for (const language of LANGUAGES) {
      if (!Number.isInteger(slide.durationMinutes?.[language]) || slide.durationMinutes[language] <= 0) {
        fail(file, `slide-${slide.id}.durationMinutes.${language}`, 'Duration must be a positive integer.');
      }
    }
  }

  for (const id of expectedIds) {
    if (!seenIds.has(id)) {
      fail(file, `slides.${id}`, 'Slide id is never used.');
    }
  }
}

function validateSlideGrouping() {
  const file = 'content/workshop-content.mjs';
  const slidesById = new Map(slides.map((slide) => [slide.id, slide]));
  const groupedIds = [];

  for (const group of SLIDE_GROUPS) {
    const section = sections.find((candidate) => candidate.id === group.sectionId);
    if (!section) {
      fail(file, `SLIDE_GROUPS.${group.sectionId}`, 'Group references a section that does not exist.');
      continue;
    }

    for (const language of LANGUAGES) {
      const total = group.slideIds.reduce(
        (sum, id) => sum + (slidesById.get(id)?.durationMinutes?.[language] ?? 0),
        0
      );
      const expected = section.durationMinutes?.[language];
      if (total !== expected) {
        fail(
          file,
          `SLIDE_GROUPS.${group.sectionId}.${language}`,
          `Slides ${group.slideIds.join('-')} total ${total} minutes but section ${section.id} allocates ${expected}.`
        );
      }
    }

    for (const id of group.slideIds) {
      groupedIds.push(id);
      const slide = slidesById.get(id);
      if (!slide) {
        fail(file, `SLIDE_GROUPS.${group.sectionId}`, `Group references unknown slide ${id}.`);
      } else if (slide.sectionId !== group.sectionId) {
        fail(
          file,
          `slide-${id}.sectionId`,
          `Slide claims ${slide.sectionId} but is grouped under ${group.sectionId}.`
        );
      }
    }
  }

  const duplicated = groupedIds.filter((id, index) => groupedIds.indexOf(id) !== index);
  if (duplicated.length > 0) {
    fail(file, 'SLIDE_GROUPS', `Slide ids appear in more than one group: ${[...new Set(duplicated)].join(', ')}.`);
  }
  if (groupedIds.length !== 16) {
    fail(file, 'SLIDE_GROUPS', `Groups cover ${groupedIds.length} slides; all 16 must be grouped exactly once.`);
  }
}

function validateCorrectedOutlineRules() {
  const file = 'content/workshop-content.mjs';
  const slidesById = new Map(slides.map((slide) => [slide.id, slide]));

  // Correction one: agenda section 2 uses Plan mode, never Interactive.
  const slide04 = slidesById.get('04');
  if (slide04) {
    const english = `${textOf(slide04.title.en)}\n${textOf(slide04.body.en)}`;
    const french = `${textOf(slide04.title.fr)}\n${textOf(slide04.body.fr)}`;
    if (!/\bPlan mode\b/i.test(english)) {
      fail(file, 'slide-04.title|body.en', 'Slide 04 must name Plan mode.');
    }
    if (!/\bmode Plan\b/i.test(french)) {
      fail(file, 'slide-04.title|body.fr', 'Slide 04 must name le mode Plan.');
    }
  }

  const sectionTwoGroup = SLIDE_GROUPS.find((group) => group.sectionId === 'section-02');
  for (const id of sectionTwoGroup?.slideIds ?? []) {
    const slide = slidesById.get(id);
    if (!slide) continue;
    for (const language of LANGUAGES) {
      const text = `${textOf(slide.title[language])}\n${textOf(slide.body[language])}`;
      if (/\binteractive\b|\binteractif\b/i.test(text)) {
        fail(
          file,
          `slide-${id}.title|body.${language}`,
          'Interactive is not the mode for agenda section 2. The mode is Plan.'
        );
      }
    }
  }

  // Correction two: no slide allocates session time to installation, sign-in,
  // or a setup readiness check.
  for (const slide of slides) {
    for (const language of LANGUAGES) {
      const text = `${textOf(slide.title[language])}\n${textOf(slide.body[language])}`;
      for (const pattern of SETUP_TIME_TERMS) {
        if (pattern.test(text)) {
          fail(
            file,
            `slide-${slide.id}.title|body.${language}`,
            `Matches ${pattern} and reads as session time allocated to setup. Installation and sign-in happen before the timed workshop.`
          );
        }
      }
    }
  }
}

function validateFixture() {
  const absolute = path.join(REPO_ROOT, FIXTURE_PATH);
  if (!existsSync(absolute)) {
    fail(FIXTURE_PATH, 'file', 'Seed fixture is missing.');
    return;
  }

  let fixture;
  try {
    fixture = JSON.parse(readUtf8(absolute));
  } catch (error) {
    fail(FIXTURE_PATH, 'json', `Fixture is not valid JSON: ${error.message}`);
    return;
  }

  if (!isNonEmptyString(fixture.boardId)) {
    fail(FIXTURE_PATH, 'boardId', 'boardId is missing or blank.');
  }

  for (const key of ['statusLabels', 'priorityLabels']) {
    const group = fixture[key];
    if (group === null || typeof group !== 'object') {
      fail(FIXTURE_PATH, key, 'Label group is missing.');
      continue;
    }
    for (const [labelKey, label] of Object.entries(group)) {
      for (const language of LANGUAGES) {
        if (!isNonEmptyString(label?.[language])) {
          fail(FIXTURE_PATH, `${key}.${labelKey}.${language}`, 'Label is missing or blank.');
        }
      }
    }
  }

  const tasks = fixture.tasks;
  if (!Array.isArray(tasks) || tasks.length !== 4) {
    fail(FIXTURE_PATH, 'tasks', `Expected 4 seed tasks, found ${Array.isArray(tasks) ? tasks.length : 'none'}.`);
    return;
  }

  const ids = tasks.map((task) => task.id);
  if (new Set(ids).size !== ids.length) {
    fail(FIXTURE_PATH, 'tasks[].id', `Task identifiers are not unique: ${ids.join(', ')}.`);
  }

  tasks.forEach((task, index) => {
    if (!isNonEmptyString(task.id)) {
      fail(FIXTURE_PATH, `tasks[${index}].id`, 'Task identifier is missing.');
    }
    for (const language of LANGUAGES) {
      if (!isNonEmptyString(task.title?.[language])) {
        fail(FIXTURE_PATH, `tasks[${index}].title.${language}`, 'Task title is missing or blank.');
      }
    }
    if (!Object.keys(fixture.statusLabels ?? {}).includes(task.status)) {
      fail(FIXTURE_PATH, `tasks[${index}].status`, `Status "${task.status}" has no matching label.`);
    }
    if (!Object.keys(fixture.priorityLabels ?? {}).includes(task.priority)) {
      fail(FIXTURE_PATH, `tasks[${index}].priority`, `Priority "${task.priority}" has no matching label.`);
    }
  });
}

function validateContentModel() {
  validateSections();
  validateSlides();
  validateSlideGrouping();
  validateCorrectedOutlineRules();
  validateFixture();
}

// ---------------------------------------------------------------------------
// Tree walk and page front matter
// ---------------------------------------------------------------------------

function isPruned(relativeDirectory, excludes) {
  const name = path.basename(relativeDirectory);
  if (BUILT_IN_PRUNES.includes(name)) return true;
  return excludes.some(
    (excluded) => relativeDirectory === excluded || relativeDirectory.startsWith(`${excluded}/`)
  );
}

function walkMarkdown(relativeDirectory, excludes, collected) {
  const absolute = path.join(REPO_ROOT, relativeDirectory);
  if (!existsSync(absolute)) return collected;

  for (const entry of readdirSync(absolute)) {
    const relativeEntry = relativeDirectory === '.' ? entry : `${relativeDirectory}/${entry}`;
    const absoluteEntry = path.join(REPO_ROOT, relativeEntry);

    if (statSync(absoluteEntry).isDirectory()) {
      if (isPruned(relativeEntry, excludes)) continue;
      walkMarkdown(relativeEntry, excludes, collected);
    } else if (entry.endsWith('.md')) {
      if (isPruned(relativeDirectory, excludes)) continue;
      collected.push(relativeEntry);
    }
  }

  return collected;
}

function parseFrontMatter(relativePath) {
  const raw = readUtf8(path.join(REPO_ROOT, relativePath));
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    fail(relativePath, 'front_matter', 'File has no YAML front matter block.');
    return null;
  }
  try {
    const parsed = loadYaml(match[1]);
    if (parsed === null || typeof parsed !== 'object') {
      fail(relativePath, 'front_matter', 'Front matter did not parse to a mapping.');
      return null;
    }
    return parsed;
  } catch (error) {
    fail(relativePath, 'front_matter', `Front matter is not valid YAML: ${error.message}`);
    return null;
  }
}

function expectedLanguageFor(relativePath) {
  return relativePath === FRENCH_ROOT || relativePath.startsWith(`${FRENCH_ROOT}/`) ? 'fr' : 'en';
}

function slugOf(relativePath) {
  return path.basename(relativePath, '.md');
}

function collectPages(relativePaths) {
  const pages = [];

  for (const relativePath of relativePaths) {
    if (!(relativePath === `${PAGE_ROOT}` || relativePath.startsWith(`${PAGE_ROOT}/`))) {
      continue; // Only files under docs/ are publishable pages.
    }

    const frontMatter = parseFrontMatter(relativePath);
    if (!frontMatter) continue;

    const language = expectedLanguageFor(relativePath);
    const slug = slugOf(relativePath);

    if (frontMatter.lang !== language) {
      fail(
        relativePath,
        'lang',
        `Declared lang is ${JSON.stringify(frontMatter.lang)} but this page sits in the ${language} tree.`
      );
    }

    if (!isNonEmptyString(frontMatter.translation_key)) {
      fail(relativePath, 'translation_key', 'translation_key is missing or blank. It is the pairing key for parity.');
    }

    const covers = frontMatter.covers;
    if (!Array.isArray(covers) || covers.length === 0) {
      fail(relativePath, 'covers', 'covers must be a non-empty list of required-content markers.');
    } else {
      for (const marker of covers) {
        if (!REQUIRED_CONTENT_MARKERS.includes(marker)) {
          fail(
            relativePath,
            'covers',
            `Marker "${marker}" is not in the controlled vocabulary. An unrecognised marker cannot be matched against a counterpart.`
          );
        }
      }
    }

    if (LAB_SLUGS.includes(slug) && frontMatter.translation_key !== slug) {
      fail(
        relativePath,
        'translation_key',
        `A lab page must key on its own slug. Expected ${slug}, found ${JSON.stringify(frontMatter.translation_key)}.`
      );
    }

    if (frontMatter.duration_minutes !== undefined) {
      const section = sections.find((candidate) => candidate.labId === slug);
      if (!section) {
        fail(relativePath, 'duration_minutes', 'Page declares a duration but is not a lab page tied to a section.');
      } else if (frontMatter.duration_minutes !== section.durationMinutes[language]) {
        fail(
          relativePath,
          'duration_minutes',
          `Declares ${frontMatter.duration_minutes} but the ${language} allocation for ${section.id} is ${section.durationMinutes[language]}.`
        );
      }
    }

    pages.push({
      relativePath,
      language,
      slug,
      translationKey: frontMatter.translation_key,
      covers: Array.isArray(covers) ? covers : [],
      frontMatter
    });
  }

  return pages;
}

// ---------------------------------------------------------------------------
// Navigation integrity
// ---------------------------------------------------------------------------

// Jekyll exits zero when a page names a parent that does not exist: the page is
// simply dropped from the sidebar and nothing reports it. Two nav_order values
// that collide inside one group are equally silent, and the resulting order is
// whatever the theme's sort happens to do. Both are shared-state defects that no
// single-subtree check can see, so they are asserted here rather than left to a
// hand review of the rendered site.
//
// The group key includes the page language. The two language trees are
// structurally parallel: each has its own top level and its own Labs and
// Facilitator subtrees, both numbered from 1. They share one cached sidebar, but
// _includes/head_custom.html hides the other language's items per page, so an
// English and a French page at the same nav_order are never rendered in the same
// visible list and cannot be ordered ambiguously against each other. Language is
// therefore part of what identifies a list, not an excuse to ignore a clash: two
// pages in the SAME language that collide still fail.
function validateNavigation(pages) {
  const titles = new Map();
  for (const page of pages) {
    const title = page.frontMatter.title;
    if (isNonEmptyString(title)) titles.set(title, page);
  }

  for (const page of pages) {
    const { parent, grand_parent: grandParent } = page.frontMatter;

    for (const [field, value] of [['parent', parent], ['grand_parent', grandParent]]) {
      if (value === undefined) continue;
      if (!isNonEmptyString(value)) {
        fail(page.relativePath, field, `${field} must be a non-empty title when present.`);
        continue;
      }
      const target = titles.get(value);
      if (!target) {
        fail(
          page.relativePath,
          field,
          `${field} "${value}" matches no page title, so this page renders nowhere in the sidebar.`
        );
      } else if (target.frontMatter.has_children !== true) {
        fail(
          page.relativePath,
          field,
          `${field} "${value}" resolves to ${target.relativePath}, which does not declare has_children: true.`
        );
      }
    }

    if (grandParent !== undefined && parent === undefined) {
      fail(page.relativePath, 'grand_parent', 'grand_parent is set without a parent, which cannot resolve to a nav position.');
    }
  }

  const groups = new Map();
  for (const page of pages) {
    const { parent, grand_parent: grandParent, nav_order: navOrder } = page.frontMatter;
    if (navOrder === undefined) {
      fail(page.relativePath, 'nav_order', 'nav_order is required so sidebar position is declared rather than inferred.');
      continue;
    }
    const groupKey = `${page.language}\u0000${grandParent ?? ''}\u0000${parent ?? ''}`;
    if (!groups.has(groupKey)) groups.set(groupKey, new Map());
    const seen = groups.get(groupKey);
    const label = parent
      ? `${grandParent ? `${grandParent} > ` : ''}${parent} (${page.language})`
      : `top level (${page.language})`;
    if (seen.has(navOrder)) {
      fail(
        page.relativePath,
        'nav_order',
        `nav_order ${navOrder} collides with ${seen.get(navOrder)} inside "${label}"; sidebar order would be undefined.`
      );
    } else {
      seen.set(navOrder, page.relativePath);
    }
  }

  // Counts, not a verdict. The verdict is the exit code from report().
  info(`Navigation: ${pages.length} page(s) checked across ${groups.size} nav group(s).`);
}

// ---------------------------------------------------------------------------
// Counterpart matching, covers parity, and slug policy
// ---------------------------------------------------------------------------

function indexByKey(pages, language) {
  const index = new Map();
  for (const page of pages.filter((candidate) => candidate.language === language)) {
    if (!isNonEmptyString(page.translationKey)) continue;
    if (index.has(page.translationKey)) {
      fail(
        page.relativePath,
        'translation_key',
        `Duplicate translation_key "${page.translationKey}" in the ${language} tree; it also appears in ${index.get(page.translationKey).relativePath}.`
      );
      continue;
    }
    index.set(page.translationKey, page);
  }
  return index;
}

function isIdenticalSlugTree(relativePath) {
  const segments = relativePath.split('/');
  return IDENTICAL_SLUG_TREES.some((segment) => segments.includes(segment));
}

function validateCounterparts(pages) {
  if (pages.length === 0) {
    fail(PAGE_ROOT, 'pages', 'Full parity mode found no pages under docs/. There is nothing to validate.');
    return;
  }

  const english = indexByKey(pages, 'en');
  const french = indexByKey(pages, 'fr');

  if (english.size === 0) {
    fail(PAGE_ROOT, 'pages', 'No English pages were found.');
  }
  if (french.size === 0) {
    fail(FRENCH_ROOT, 'pages', 'No French pages were found.');
  }

  for (const [key, page] of english) {
    if (!french.has(key)) {
      fail(page.relativePath, 'translation_key', `No French counterpart carries translation_key "${key}".`);
    }
  }

  for (const [key, page] of french) {
    if (!english.has(key)) {
      fail(page.relativePath, 'translation_key', `No English counterpart carries translation_key "${key}".`);
    }
  }

  for (const [key, englishPage] of english) {
    const frenchPage = french.get(key);
    if (!frenchPage) continue;

    const englishMarkers = new Set(englishPage.covers);
    const frenchMarkers = new Set(frenchPage.covers);

    const missingInFrench = [...englishMarkers].filter((marker) => !frenchMarkers.has(marker));
    const missingInEnglish = [...frenchMarkers].filter((marker) => !englishMarkers.has(marker));

    if (missingInFrench.length > 0) {
      fail(
        frenchPage.relativePath,
        'covers',
        `Missing required-content markers present on its counterpart ${englishPage.relativePath}: ${missingInFrench.join(', ')}.`
      );
    }
    if (missingInEnglish.length > 0) {
      fail(
        englishPage.relativePath,
        'covers',
        `Missing required-content markers present on its counterpart ${frenchPage.relativePath}: ${missingInEnglish.join(', ')}.`
      );
    }

    const slugsMustMatch = isIdenticalSlugTree(englishPage.relativePath);
    if (slugsMustMatch) {
      if (englishPage.slug !== frenchPage.slug) {
        fail(
          frenchPage.relativePath,
          'slug',
          `Lab and facilitator slugs never localize. Expected "${englishPage.slug}", found "${frenchPage.slug}".`
        );
      }
    } else if (
      !SLUG_EXEMPT_FROM_LOCALIZATION.includes(englishPage.slug) &&
      englishPage.slug === frenchPage.slug
    ) {
      fail(
        frenchPage.relativePath,
        'slug',
        `French entry pages use localized slugs. "${frenchPage.slug}" is identical to its English counterpart.`
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Language toggle integrity
// ---------------------------------------------------------------------------

// The permalink each page will be published at. The site sets `permalink: pretty`
// and no page overrides it, so the URL is derived from the path alone: drop the
// docs/ root and the .md suffix, drop a trailing `index`, and wrap in slashes.
function pageUrlOf(relativePath) {
  const withoutRoot = relativePath.slice(`${PAGE_ROOT}/`.length).replace(/\.md$/, '');
  const segments = withoutRoot.split('/');
  if (segments[segments.length - 1] === 'index') segments.pop();
  return segments.length === 0 ? '/' : `/${segments.join('/')}/`;
}

// Every page carries a visible toggle to its counterpart, driven by `lang_ref`.
// Jekyll will happily render a link to a URL that does not exist, and a pair that
// points in only one direction is worse than a missing link: the reader can cross
// to the other language and then cannot get back. Existence, direction, and
// symmetry are all asserted, because only symmetry makes the toggle round-trip.
function validateLanguageToggle(pages) {
  const byUrl = new Map();
  for (const page of pages) {
    byUrl.set(pageUrlOf(page.relativePath), page);
  }

  const refs = new Map();

  for (const page of pages) {
    const url = pageUrlOf(page.relativePath);
    const ref = page.frontMatter.lang_ref;

    if (!isNonEmptyString(ref)) {
      fail(
        page.relativePath,
        'lang_ref',
        'lang_ref is missing or blank, so this page renders no language toggle and strands the reader in one language.'
      );
      continue;
    }

    const target = byUrl.get(ref);
    if (!target) {
      fail(
        page.relativePath,
        'lang_ref',
        `lang_ref "${ref}" matches no page URL, so the toggle would link to a 404.`
      );
      continue;
    }

    if (target.language === page.language) {
      fail(
        page.relativePath,
        'lang_ref',
        `lang_ref "${ref}" resolves to ${target.relativePath}, which is also ${page.language}. The toggle must cross languages.`
      );
      continue;
    }

    refs.set(url, ref);
  }

  let symmetric = 0;
  for (const [url, ref] of refs) {
    const back = refs.get(ref);
    // An undefined back-reference means the target already failed a check above;
    // reporting it a second time here would only duplicate that failure.
    if (back === undefined) continue;
    if (back !== url) {
      fail(
        byUrl.get(url).relativePath,
        'lang_ref',
        `Points at "${ref}", but ${byUrl.get(ref).relativePath} points back at "${back}" rather than "${url}". The toggle must round-trip.`
      );
    } else {
      symmetric += 1;
    }
  }

  // Counts, not a verdict. The verdict is the exit code from report().
  info(
    `Language toggle: ${refs.size} of ${pages.length} page(s) carry a lang_ref resolving to the other language; ${symmetric} of those round-trip.`
  );
}

// ---------------------------------------------------------------------------
// README agenda alignment, the fifth content surface
// ---------------------------------------------------------------------------

function validateReadme() {
  const absolute = path.join(REPO_ROOT, README_PATH);
  if (!existsSync(absolute)) {
    fail(README_PATH, 'file', 'README.md is missing.');
    return;
  }

  const raw = readUtf8(absolute);
  const headingPattern = /^###\s+(\d+)\.\s+(.+?)\s+\((\d+)\s*min\)\s*$/gim;
  const found = [...raw.matchAll(headingPattern)].map((match) => ({
    number: Number(match[1]),
    title: match[2].trim(),
    duration: Number(match[3])
  }));

  if (found.length !== sections.length) {
    fail(
      README_PATH,
      'agenda',
      `Expected ${sections.length} timed sections in the form "### N. Title (M min)", found ${found.length}. The README is the fifth content surface and drifts silently without this check.`
    );
    return;
  }

  sections.forEach((section, index) => {
    const heading = found[index];
    if (heading.number !== index + 1) {
      fail(README_PATH, `agenda[${index}]`, `Expected section number ${index + 1}, found ${heading.number}.`);
    }
    if (heading.title !== section.title.en) {
      fail(
        README_PATH,
        `agenda[${index}].title`,
        `Reads "${heading.title}" but ${section.id} is titled "${section.title.en}".`
      );
    }
    if (heading.duration !== section.durationMinutes.en) {
      fail(
        README_PATH,
        `agenda[${index}].duration`,
        `Reads ${heading.duration} min but ${section.id} allocates ${section.durationMinutes.en} min in English.`
      );
    }
  });

  const total = found.reduce((sum, heading) => sum + heading.duration, 0);
  if (total !== AGENDA_TOTAL_MINUTES) {
    fail(README_PATH, 'agenda.total', `Section durations total ${total} min, not ${AGENDA_TOTAL_MINUTES}.`);
  }
}

// ---------------------------------------------------------------------------
// Post-build base path assertion
// ---------------------------------------------------------------------------

function validateBasePath(options) {
  const siteRoot = path.join(REPO_ROOT, options.site);
  const indexPath = path.join(siteRoot, 'index.html');
  const displayPath = `${options.site}/index.html`;

  if (!existsSync(siteRoot)) {
    fail(
      options.site,
      'site',
      `Built site is absent. Run "bundle exec jekyll build --source docs --destination ${options.site} --baseurl \\"${options.basepath}\\"" first. A missing site is a failure, never a skip.`
    );
    return;
  }

  if (!existsSync(indexPath)) {
    fail(displayPath, 'site', 'Built site exists but has no index.html.');
    return;
  }

  const html = readUtf8(indexPath);
  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/gi)].map((match) => match[1]);
  const localAssets = references.filter(
    (reference) => reference.startsWith('/') && reference.includes('/assets/')
  );

  if (localAssets.length === 0) {
    fail(
      displayPath,
      'base_path',
      'No root-relative asset reference was found, so the base path cannot be asserted. Treat this as a failure rather than a pass.'
    );
    return;
  }

  const normalizedBase = options.basepath === '/' ? '' : options.basepath.replace(/\/+$/, '');
  const wrong = localAssets.filter((reference) => !reference.startsWith(`${normalizedBase}/`));

  if (wrong.length > 0) {
    fail(
      displayPath,
      'base_path',
      `Asset references do not begin with the expected base path "${normalizedBase}": ${[...new Set(wrong)].slice(0, 5).join(', ')}. Pass --baseurl from the Pages configure step rather than hardcoding it.`
    );
  } else {
    info(`Base path OK: ${localAssets.length} asset references under "${normalizedBase}".`);
  }
}

// ---------------------------------------------------------------------------
// Post-build rendered navigation assertion
// ---------------------------------------------------------------------------

// Collect every built HTML document, skipping the theme's asset tree.
function collectBuiltHtml(root) {
  const found = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory).sort()) {
      if (entry === 'assets') continue;
      const absolute = path.join(directory, entry);
      if (statSync(absolute).isDirectory()) walk(absolute);
      else if (entry.endsWith('.html')) found.push(absolute);
    }
  };
  walk(root);
  return found;
}

// The sidebar is pulled in with `include_cached`, so Jekyll renders it once and
// reuses that markup byte-identically on every page. Both languages are therefore
// always present in the DOM, and the scoping to one language happens in CSS that
// head_custom.html emits into each page's own head. Nothing upstream of the
// browser can see whether that actually worked, which is why this check reads the
// built output rather than front matter.
//
// Three failures are possible and none of them are visible to the source-level
// checks. The head rule can go missing, and the reader sees both languages. A nav
// link can lose its `lang` attribute, and that one entry leaks into both languages
// because the rule keys on `lang`. The rule can name the page's own language, and
// the sidebar empties itself.
function validateRenderedNavigation(options) {
  const siteRoot = path.join(REPO_ROOT, options.site);

  // validateBasePath already failed on an absent or empty site; adding a second
  // report of the same fact would only inflate the failure count.
  if (!existsSync(siteRoot) || !existsSync(path.join(siteRoot, 'index.html'))) return;

  const documents = collectBuiltHtml(siteRoot);
  const visibleCounts = new Map();
  let checked = 0;
  let toggles = 0;

  for (const absolute of documents) {
    const displayPath = toPosix(path.relative(REPO_ROOT, absolute));
    const html = readUtf8(absolute);

    const langMatch = html.match(/<html[^>]*\slang="([^"]+)"/i);
    if (!langMatch) {
      fail(displayPath, 'rendered_lang', 'Built document declares no lang on <html>.');
      continue;
    }
    const pageLang = langMatch[1];
    const otherLang = pageLang === 'fr' ? 'en' : 'fr';
    checked += 1;

    const hideRule = (lang) =>
      `#site-nav .nav-list-item:has(> a.nav-list-link[lang="${lang}"]) { display: none; }`;

    if (!html.includes(hideRule(otherLang))) {
      fail(
        displayPath,
        'rendered_nav',
        `Head carries no rule hiding "${otherLang}" nav entries, so this ${pageLang} page shows both languages in the sidebar.`
      );
    }
    if (html.includes(hideRule(pageLang))) {
      fail(
        displayPath,
        'rendered_nav',
        `Head hides "${pageLang}" nav entries on a ${pageLang} page, which empties the sidebar.`
      );
    }

    const nav = (html.match(/<nav[^>]*id="site-nav"[\s\S]*?<\/nav>/i) || [''])[0];
    if (!nav) {
      fail(displayPath, 'rendered_nav', 'Built document has no #site-nav sidebar.');
      continue;
    }

    const links = [...nav.matchAll(/<a\b[^>]*class="[^"]*\bnav-list-link\b[^"]*"[^>]*>/gi)].map(
      (match) => match[0]
    );
    if (links.length === 0) {
      fail(displayPath, 'rendered_nav', 'Sidebar contains no nav-list-link anchors.');
      continue;
    }

    const unmarked = links.filter((link) => !/\slang="/.test(link));
    if (unmarked.length > 0) {
      fail(
        displayPath,
        'rendered_nav',
        `${unmarked.length} sidebar link(s) carry no lang attribute, so the hiding rule cannot match them and they leak into both languages.`
      );
    }

    const langs = links
      .map((link) => (link.match(/\slang="([^"]+)"/) || [])[1])
      .filter((value) => value !== undefined);
    const unexpected = [...new Set(langs)].filter((value) => !LANGUAGES.includes(value));
    if (unexpected.length > 0) {
      fail(
        displayPath,
        'rendered_nav',
        `Sidebar links declare unexpected language(s): ${unexpected.join(', ')}. Only ${LANGUAGES.join(' and ')} are scoped.`
      );
    }

    const visible = langs.filter((value) => value === pageLang).length;
    if (!visibleCounts.has(pageLang)) visibleCounts.set(pageLang, new Set());
    visibleCounts.get(pageLang).add(visible);

    const toggle = (html.match(/<nav class="lang-toggle"[\s\S]*?<\/nav>/i) || [''])[0];
    if (!toggle) {
      fail(displayPath, 'rendered_toggle', 'Built document renders no language toggle.');
      continue;
    }
    const toggleLang = (toggle.match(/<a\b[^>]*\slang="([^"]+)"/) || [])[1];
    const toggleHreflang = (toggle.match(/<a\b[^>]*\shreflang="([^"]+)"/) || [])[1];
    if (toggleLang !== otherLang || toggleHreflang !== otherLang) {
      fail(
        displayPath,
        'rendered_toggle',
        `Toggle link declares lang="${toggleLang}" hreflang="${toggleHreflang}" on a ${pageLang} page; both must be "${otherLang}".`
      );
      continue;
    }
    toggles += 1;
  }

  // Counts, not a verdict. The verdict is the exit code from report().
  const perLanguage = [...visibleCounts.entries()]
    .sort()
    .map(([lang, seen]) => `${lang} ${[...seen].sort((a, b) => a - b).join('/')}`)
    .join(', ');
  info(
    `Rendered navigation: ${checked} built document(s) scoped to one language; visible sidebar links per page: ${perLanguage}.`
  );
  info(`Rendered toggle: ${toggles} of ${checked} built document(s) link the other language.`);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.error(`validate-content: ${error.message}`);
    process.exit(2);
  }

  if (options.help) {
    console.log(USAGE);
    process.exit(0);
  }

  const mode = options.basepathOnly ? 'basepath-only' : options.structureOnly ? 'structure-only' : 'full';
  info(`Mode: ${mode}`);

  if (options.basepathOnly) {
    validateBasePath(options);
    report(mode);
    return;
  }

  validateContentModel();

  const trees = options.trees.length > 0 ? options.trees : ['.'];
  info(`Trees: ${trees.join(', ')}`);
  info(`Excluded: ${options.excludes.length > 0 ? options.excludes.join(', ') : '(none beyond built-in prunes)'}`);

  const walked = [];
  for (const tree of trees) {
    if (options.trees.length > 0 && !existsSync(path.join(REPO_ROOT, tree))) {
      fail(tree, 'tree', 'Named tree does not exist.');
      continue;
    }
    walkMarkdown(tree, options.excludes, walked);
  }

  const unique = [...new Set(walked)].sort();
  info(`Walked ${unique.length} markdown file(s):`);
  for (const file of unique) {
    info(`  ${file}`);
  }

  const pages = collectPages(unique);
  info(`Recognised ${pages.length} page(s) under ${PAGE_ROOT}/.`);

  if (options.structureOnly) {
    // A partial or empty tree is tolerated here and only here, because parallel
    // phases validate their own subtree before the others exist. Any page that
    // does exist is still held to every structural rule above.
    if (pages.length === 0) {
      info('No pages found. Structure-only mode tolerates an empty tree; full mode does not.');
    }
    report(mode);
    return;
  }

  validateNavigation(pages);
  validateCounterparts(pages);
  validateLanguageToggle(pages);
  validateReadme();
  validateBasePath(options);
  validateRenderedNavigation(options);
  report(mode);
}

function report(mode) {
  for (const line of notes) {
    console.log(line);
  }

  if (failures.length === 0) {
    console.log(`\nvalidate-content: PASS (${mode})`);
    process.exit(0);
  }

  console.error(`\nvalidate-content: FAIL (${mode}) with ${failures.length} problem(s):\n`);
  for (const failure of failures) {
    console.error(`  ${failure.file} [${failure.key}]: ${failure.message}`);
  }
  console.error('');
  process.exit(1);
}

main();
