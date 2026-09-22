#!/usr/bin/env node
/**
 * Local preview server for the workshop site.
 *
 * Sibling workshop repositories document `bundle exec jekyll serve` directly in
 * CONTRIBUTING.md, but their Gemfile sits at the repository root. Here it sits in
 * docs/, so the command only works with BUNDLE_GEMFILE pointed at it, and an npm
 * script cannot set an environment variable portably across cmd.exe and sh. This
 * wrapper is the smallest thing that makes one command work everywhere.
 *
 * The served site carries the same base path as production, so the root URL
 * returns 404 by design. The printed URL is the one to open.
 *
 * Extra arguments are passed through to Jekyll, for example:
 *   npm run serve -- --port 4001
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE_PATH = process.env.PAGES_BASE_PATH ?? '/github-copilot-app-workshop';
const HOST = '127.0.0.1';
const PORT = '4000';

const passthrough = process.argv.slice(2);
const args = [
  'exec',
  'jekyll',
  'serve',
  '--source',
  'docs',
  '--destination',
  '_site',
  '--baseurl',
  BASE_PATH,
  '--host',
  HOST,
  '--port',
  PORT,
  ...passthrough
];

const url = `http://${HOST}:${PORT}${BASE_PATH}/`;
console.log(`Building the site, then serving it at ${url}`);
console.log('The first build takes a few seconds and prints Sass deprecation warnings from the theme.');
console.log('Stop the server with Ctrl+C.\n');

const child = spawn('bundle', args, {
  cwd: REPO_ROOT,
  env: { ...process.env, BUNDLE_GEMFILE: path.join(REPO_ROOT, 'docs', 'Gemfile') },
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

child.on('error', (error) => {
  console.error(`Could not start Bundler: ${error.message}`);
  console.error('Install Ruby, then run: bundle install --gemfile docs/Gemfile');
  process.exit(1);
});

child.on('exit', (code, signal) => {
  process.exit(signal ? 1 : (code ?? 0));
});
