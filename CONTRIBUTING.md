---
title: Contributing
description: How to preview the workshop site locally, regenerate the decks, and run the parity validators before opening a pull request.
author: DevOps ABCs Engineering
ms.date: 2026-09-22
ms.topic: how-to
keywords:
  - local preview
  - jekyll
  - validation
  - contributing
---

## Contributing

This repository holds one frozen content model and five surfaces generated from it: the English site, the French site, the English deck, the French deck, and the agenda in `README.md`. Editing any surface by hand without editing the model is the failure this repository is built to catch, so the validators run locally and in CI, and they are the contract.

## Prerequisites

* Node.js 20.11 or newer, then `npm ci`
* Ruby 3.2, then `bundle install --gemfile docs/Gemfile`

CI pins Node 26.7.0 and Ruby 3.2.11 and installs both on `ubuntu-24.04`, so those are the versions the published site is actually built with.

## Preview the site locally

```bash
npm run serve
```

This builds the site into `_site` and serves it at:

```text
http://127.0.0.1:4000/github-copilot-app-workshop/
```

The base path matches production, which means `http://127.0.0.1:4000/` returns 404 by design. Open the URL above, not the bare host. To use a different port, pass it through:

```bash
npm run serve -- --port 4001
```

The first build takes a few seconds and prints Sass deprecation warnings from Just the Docs 0.12.0. They come from the theme's own stylesheets and are expected.

Jekyll watches the source and rebuilds on save. The sidebar is scoped to one language by a rule in each page's own head, so after editing navigation or language metadata, reload rather than trusting a cached page.

## Build the decks

```bash
npm run build:decks
```

The two `.pptx` files are generated, not committed. An empty `docs/assets/decks` directory in a fresh working copy is expected, and a broken deck link on a locally served site simply means this has not run yet.

## Validate before opening a pull request

```bash
npm run validate:all
```

That runs, in order, a production dependency audit, the content parity checks, the deck checks, and the built-site link resolver. The content and link checks read `_site`, so build the site first:

```bash
npm run build:decks
BUNDLE_GEMFILE=docs/Gemfile bundle exec jekyll build --source docs --destination _site --baseurl "/github-copilot-app-workshop"
npm run validate:all
```

On Windows PowerShell, set the Gemfile separately:

```powershell
$env:BUNDLE_GEMFILE='docs/Gemfile'
bundle exec jekyll build --source docs --destination _site --baseurl "/github-copilot-app-workshop"
```

A validator that fails is reporting a real inconsistency between the surfaces. Fix the content model, not the validator.

## What not to change casually

* `docs/_layouts/default.html` and `docs/_includes/components/nav/links.html` are copied from Just the Docs 0.12.0 internals. The theme version is pinned exactly for that reason, and upgrading it means re-copying both overrides.
* `docs/facilitator/validation-status.md` and its French counterpart are the honesty ledger. Every row records what was actually measured. Do not soften a row without re-running the measurement it describes.
* Actions in `.github/workflows/pages.yml` are pinned by full commit SHA with the tag in a comment. Keep both in step.
