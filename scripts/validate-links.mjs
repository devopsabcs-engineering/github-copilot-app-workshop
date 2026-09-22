#!/usr/bin/env node
// Link validator for the built bilingual GitHub Copilot app workshop site.
//
// It exists because Implementation Phase 8 requires a link check across both
// language trees, including the deck download links, and no off-the-shelf
// checker could be installed in the implementation environment: the configured
// package proxy refuses every tarball fetch with EALLOWREMOTE, so lychee,
// htmltest, linkinator, and pa11y are all unobtainable here. The substitution
// and its rationale are recorded in docs/facilitator/validation-status.md.
//
// It resolves rather than pattern-matches. Every internal reference is mapped
// to a concrete path inside the built site and stat-ed on disk; a reference
// carrying a fragment is resolved a second time against the id and name
// attributes actually present in the target document. A checker that only
// matched link shapes would pass a site whose pages had never been generated,
// which is the BLD-C3 failure mode the content validator was written against.
//
// Directory-style URLs are resolved the way a static host serves them, so
// "/base/labs/" resolves to "_site/labs/index.html".
//
// Modes:
//   (no flags)       Resolve every internal reference against the built site.
//   --external       Additionally issue a network request per distinct external
//                    URL. Off by default, because a network failure is not a
//                    defect in this repository and must not fail a local run.
//
// Options:
//   --site <path>      Built site root. Default: _site
//   --basepath <value> Base path the site was built with. Defaults to
//                      $PAGES_BASE_PATH, then to /github-copilot-app-workshop.
//   --help
//
// An unknown flag exits non-zero rather than silently falling back.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_BASE_PATH = '/github-copilot-app-workshop';

// Schemes that name something outside the built site and therefore cannot be
// resolved against it. They are counted and reported, never failed.
const NON_FETCHABLE_SCHEMES = /^(mailto:|tel:|javascript:|data:|sms:)/i;

const failures = [];
const notes = [];

function fail(file, reference, message) {
  failures.push({ file, reference, message });
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

const USAGE = `Usage: node scripts/validate-links.mjs [options]

Modes:
  (no flags)          Resolve internal references against the built site.
  --external          Also request each distinct external URL over the network.

Options:
  --site <path>       Built site root. Default: _site
  --basepath <value>  Base path the site was built with.
                      Default: $PAGES_BASE_PATH, then ${DEFAULT_BASE_PATH}
  --help
`;

function parseArguments(argv) {
  const options = {
    site: '_site',
    basePath: process.env.PAGES_BASE_PATH || DEFAULT_BASE_PATH,
    external: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    switch (argument) {
      case '--help':
      case '-h':
        process.stdout.write(USAGE);
        process.exit(0);
        break;
      case '--external':
        options.external = true;
        break;
      case '--site':
        index += 1;
        if (!argv[index]) throw new Error('--site requires a path.');
        options.site = argv[index];
        break;
      case '--basepath':
        index += 1;
        if (argv[index] === undefined) throw new Error('--basepath requires a value.');
        options.basePath = argv[index];
        break;
      default:
        throw new Error(`Unknown argument: ${argument}`);
    }
  }

  options.basePath = options.basePath.replace(/\/+$/, '');
  return options;
}

// ---------------------------------------------------------------------------
// Site walk
// ---------------------------------------------------------------------------

function collectHtmlFiles(root) {
  const found = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory).sort()) {
      const absolute = path.join(directory, entry);
      if (statSync(absolute).isDirectory()) {
        walk(absolute);
      } else if (/\.html?$/i.test(entry)) {
        found.push(absolute);
      }
    }
  };
  walk(root);
  return found;
}

// ---------------------------------------------------------------------------
// Reference extraction
// ---------------------------------------------------------------------------

// Attributes that name a resource the browser will actually request.
const REFERENCE_PATTERN = /\s(?:href|src|action|poster)\s*=\s*("([^"]*)"|'([^']*)')/gi;
const SRCSET_PATTERN = /\ssrcset\s*=\s*("([^"]*)"|'([^']*)')/gi;

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractReferences(html) {
  const references = new Set();

  for (const match of html.matchAll(REFERENCE_PATTERN)) {
    const raw = match[2] !== undefined ? match[2] : match[3];
    if (raw && raw.trim()) references.add(decodeEntities(raw.trim()));
  }

  for (const match of html.matchAll(SRCSET_PATTERN)) {
    const raw = match[2] !== undefined ? match[2] : match[3];
    if (!raw) continue;
    for (const candidate of raw.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url) references.add(decodeEntities(url));
    }
  }

  return [...references];
}

// Fragment targets a browser will honour: any id, plus the legacy named anchor.
function extractAnchorIds(html) {
  const ids = new Set();
  for (const match of html.matchAll(/\sid\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    const value = match[2] !== undefined ? match[2] : match[3];
    if (value) ids.add(decodeEntities(value.trim()));
  }
  for (const match of html.matchAll(/<a\b[^>]*\sname\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    const value = match[2] !== undefined ? match[2] : match[3];
    if (value) ids.add(decodeEntities(value.trim()));
  }
  return ids;
}

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

// Map a site-absolute URL path to a file on disk, the way a static host serves
// it: an explicit file wins, a directory falls back to its index document.
function resolveToFile(siteRoot, urlPath) {
  const relative = urlPath.replace(/^\/+/, '');
  const candidate = path.join(siteRoot, relative);

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    for (const indexName of ['index.html', 'index.htm']) {
      const indexPath = path.join(candidate, indexName);
      if (existsSync(indexPath)) return indexPath;
    }
    return null;
  }
  if (!/\.[a-z0-9]+$/i.test(relative)) {
    const implied = `${candidate}.html`;
    if (existsSync(implied)) return implied;
  }
  return null;
}

const anchorCache = new Map();

function anchorsFor(absolutePath) {
  if (!anchorCache.has(absolutePath)) {
    anchorCache.set(absolutePath, extractAnchorIds(readUtf8(absolutePath)));
  }
  return anchorCache.get(absolutePath);
}

async function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${error.message}\n\n${USAGE}`);
    process.exitCode = 1;
    return;
  }

  const siteRoot = path.resolve(REPO_ROOT, options.site);
  if (!existsSync(siteRoot)) {
    process.stderr.write(
      `validate-links: built site not found at ${toPosix(path.relative(REPO_ROOT, siteRoot))}.\n` +
        'Build the site before running this validator.\n'
    );
    process.exitCode = 1;
    return;
  }

  const htmlFiles = collectHtmlFiles(siteRoot);
  info(`Site root: ${toPosix(path.relative(REPO_ROOT, siteRoot))}`);
  info(`Base path: ${options.basePath || '(none)'}`);
  info(`Scanned ${htmlFiles.length} HTML document(s).`);

  const externalUrls = new Set();
  const nonFetchable = new Set();
  let internalChecked = 0;
  let fragmentChecked = 0;
  const deckReferences = new Set();

  for (const file of htmlFiles) {
    const displayPath = toPosix(path.relative(REPO_ROOT, file));
    const html = readUtf8(file);

    for (const reference of extractReferences(html)) {
      if (NON_FETCHABLE_SCHEMES.test(reference)) {
        nonFetchable.add(reference.split(':')[0].toLowerCase());
        continue;
      }
      if (/^[a-z][a-z0-9+.-]*:\/\//i.test(reference) || reference.startsWith('//')) {
        externalUrls.add(reference.startsWith('//') ? `https:${reference}` : reference);
        continue;
      }

      const [rawPath, rawFragment] = reference.split('#');
      const fragment = rawFragment ? decodeURIComponent(rawFragment) : null;

      // A bare fragment resolves against the document that contains it.
      if (rawPath === '') {
        if (fragment && !anchorsFor(file).has(fragment)) {
          fail(displayPath, reference, `fragment "#${fragment}" has no matching id in this document`);
        }
        if (fragment) fragmentChecked += 1;
        continue;
      }

      const withoutQuery = rawPath.split('?')[0];
      let urlPath;

      if (withoutQuery.startsWith('/')) {
        // Site-absolute. Must sit under the base path the site was built with.
        if (options.basePath && !`${withoutQuery}/`.startsWith(`${options.basePath}/`)) {
          fail(
            displayPath,
            reference,
            `site-absolute reference escapes the base path "${options.basePath}"`
          );
          continue;
        }
        urlPath = options.basePath ? withoutQuery.slice(options.basePath.length) : withoutQuery;
        if (urlPath === '') urlPath = '/';
      } else {
        // Document-relative. Resolve against the containing directory.
        const containingDir = path.dirname(file);
        const resolvedAbsolute = path.resolve(containingDir, decodeURIComponent(withoutQuery));
        urlPath = `/${toPosix(path.relative(siteRoot, resolvedAbsolute))}`;
        if (urlPath.startsWith('/..')) {
          fail(displayPath, reference, 'relative reference escapes the built site root');
          continue;
        }
      }

      const target = resolveToFile(siteRoot, decodeURIComponent(urlPath));
      internalChecked += 1;

      if (!target) {
        fail(displayPath, reference, `unresolved: no file in the built site for "${urlPath}"`);
        continue;
      }
      if (/\.pptx$/i.test(target)) {
        deckReferences.add(toPosix(path.relative(siteRoot, target)));
        if (statSync(target).size === 0) {
          fail(displayPath, reference, 'deck resolves to a zero-byte file');
        }
      }
      if (fragment) {
        fragmentChecked += 1;
        if (/\.html?$/i.test(target) && !anchorsFor(target).has(fragment)) {
          fail(displayPath, reference, `fragment "#${fragment}" has no matching id in the target document`);
        }
      }
    }
  }

  info(`Resolved ${internalChecked} internal reference(s) against files on disk.`);
  info(`Checked ${fragmentChecked} fragment target(s) against document ids.`);
  info(
    deckReferences.size
      ? `Deck downloads referenced and resolved: ${[...deckReferences].sort().join(', ')}`
      : 'No deck download references found.'
  );
  if (nonFetchable.size) {
    info(`Non-fetchable schemes skipped: ${[...nonFetchable].sort().join(', ')}`);
  }

  if (options.external) {
    info(`Requesting ${externalUrls.size} distinct external URL(s).`);
    for (const url of [...externalUrls].sort()) {
      try {
        const response = await fetch(url, { method: 'GET', redirect: 'follow' });
        if (!response.ok) {
          fail('(external)', url, `HTTP ${response.status}`);
        } else {
          info(`  external OK ${response.status} ${url}`);
        }
      } catch (error) {
        fail('(external)', url, `request failed: ${error.message}`);
      }
    }
  } else {
    info(
      `Skipped ${externalUrls.size} distinct external URL(s); pass --external to request them.`
    );
    for (const url of [...externalUrls].sort()) {
      info(`  external (unchecked) ${url}`);
    }
  }

  for (const note of notes) process.stdout.write(`${note}\n`);

  if (failures.length) {
    process.stdout.write(`\n${failures.length} link failure(s):\n`);
    for (const failure of failures) {
      process.stdout.write(`  ${failure.file}\n    ${failure.reference}\n      ${failure.message}\n`);
    }
    process.stdout.write('\nvalidate-links: FAIL\n');
    process.exitCode = 1;
    return;
  }

  process.stdout.write('\nvalidate-links: PASS\n');
}

await main();
