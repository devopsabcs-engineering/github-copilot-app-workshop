---
title: Publishing and Deck Research
description: Evidence and proposed bilingual Pages and PowerPoint authoring patterns for the canvas-first workshop.
ms.date: 2026-09-22
---

## Status

Complete for the requested research scope. No site, deck, dependency installation, remote setting, or workflow was created or changed. Examples below are proposals, not executed builds. Read-only evidence was collected on 2026-09-22.

## Questions and Boundaries

* Match the Fundamentals README agenda formatting without copying its IDE curriculum.
* Inspect the FSI sibling's Pages configuration, navigation, publishing evidence, deck generator, and dependencies.
* Compare Just the Docs/Jekyll with static HTML and separate EN/FR decks with a mixed-language deck.
* Propose a target tree, complete minimal Pages examples, a 16-slide outline, parity/accessibility checks, and reproducible commands.
* Distinguish observed checkout files from unverified remote Pages settings. Do not install, publish, generate decks, or delegate.

## Local Hypothesis and Check

The sibling's Markdown-based Just the Docs structure and paired-language PptxGenJS generator can be reused without adding author tooling to the learner experience. Check the actual configuration, generator imports, lockfiles, and installed tools; compare Pages support with official documentation before recommending a build path.

## Findings

The recommended authoring path is Just the Docs/Jekyll under docs/, published with a custom Actions workflow that generates separate English and French PptxGenJS decks before building the site. Learners need neither Ruby nor Node for reading the workshop. Branch-based /docs publication remains supported, including remote_theme, but cannot run the Node deck generator as part of the managed Jekyll build.

Observed sibling evidence:

* ../github-copilot-fundamentals/README.md:1 starts with title/description frontmatter; :10 declares duration; :12 begins six numbered timed H3 sections; the final H3 contains learning objectives.
* ../foundry-hosted-agents-fsi/docs/_config.yml:1 declares the site; :3 uses unpinned remote_theme; :7-8 specify public project-site baseurl/url; :13 sets layout defaults. These are local configuration values, not proof of remote Pages settings.
* ../foundry-hosted-agents-fsi/docs/Gemfile:1-3 declares github-pages and webrick. No Gemfile.lock was present.
* ../foundry-hosted-agents-fsi/package.json:6 selects ESM, :8 defines build-workshop-deck, and :11 declares pptxgenjs ^4.0.1. No package-lock.json was present.
* ../foundry-hosted-agents-fsi/scripts/build-workshop-deck.js:12-19 imports Node built-ins and PptxGenJS and targets docs/assets/decks. Its ten LAB_SLIDES are inconsistent with the fifteen-lab docs/labs/index.md:4. Only the title gets explicit notes at generator :307.
* No pages, jekyll, build-workshop-deck, or pptx text matched any of the eight inspected sibling .github/workflows/*.yml files. Managed branch Pages can exist without a checked-in workflow; remote settings were not queried.

Read-only environment checks on 2026-09-22:

* Node v26.7.0, win32/arm64, and npm 12.0.1 execute successfully.
* Ruby 3.2.11 x64-mingw-ucrt executes using C:/Ruby32-x64/bin/ruby.exe. Direct Ruby invocation of the gem script lists github-pages 232, Jekyll 3.10.0, jekyll-remote-theme 0.4.3, Bundler 2.4.19, and WEBrick 1.9.2. No just-the-docs gem is listed; remote themes do not require that gem.
* The gem launcher failed with a batch-command error. A path found by Get-Command is not evidence the launcher works. Prefer explicit Ruby entrypoints on this workstation.
* Node createRequire resolution from both repositories failed for pptxgenjs, jszip, unzipper, xml2js, and markdownlint-cli2. Do not claim npm ci or deck generation can run now.
* No soffice, marp, or rg executable was discovered on PATH. PowerPoint.Application has a registered CLSID, but PowerPoint was not launched and export capability is not runtime-verified. PowerShell's System.IO.Compression.ZipFile and System.Xml.XmlDocument types are available.

Official-source checks confirm that a remote theme is supported by managed Pages, while arbitrary unsupported plugins require a separately generated static artifact. The inspected Just the Docs v0.10.1 default layout uses site.lang rather than page.lang for the HTML language. A bilingual single build must address that before accessibility sign-off.

### Navigation and Generator Details

* ../foundry-hosted-agents-fsi/docs/index.md:1-9 and docs/fr/index.md:1-10 use default layout, separate permalinks, and language-switch links. The French page has lang: fr. The lab indexes and inspected lab frontmatter have no parent/nav_order hierarchy.
* ../foundry-hosted-agents-fsi/docs/_includes/head_custom.html:1-16 computes the language from page.lang or page.url, then hides the other language's navigation links using CSS :has(). :39-52 provides a JavaScript fallback. :19-36 adjusts sidebar title sizing. This is observed language filtering, not automatic Just the Docs localization. It neither changes the HTML lang attribute nor filters search results. Do not reuse it with nested language groups without testing ancestor visibility.
* Just the Docs navigation is title/parent based, not directory based. Current theme documentation says has_children is redundant since v0.10.0; it is harmless as an explicit compatibility hint. Use unique language-parent titles and stable numeric nav_order. Sources S6-S8.
* ../foundry-hosted-agents-fsi/scripts/build-workshop-deck.js:294 creates a widescreen deck; :307 adds title-only notes; :342 and :345 write separate languages. Ten labs plus title, agenda, and closing imply 13 slides; this is source-derived, not an observed generated-file count.
* PptxGenJS v4.0.1 types define background.color; the deprecated background.fill is a string, not the nested object used at sibling :30 and :300. New authoring should use slide.background = { color: 'FAFBFC' }. The sibling's deprecated bullet.code can become bullet: true. These are API-contract findings, not tested rendering failures.
* The PptxGenJS release declares jszip ^3.10.1 and image-size ^1.2.1; neither is available locally in these repos. Use built-in PowerShell ZIP/XML APIs for validation rather than adding unzipper/xml2js just to inspect decks. Sources S10-S11.
* Memory notes about an image-size advisory are historical warning signals, not a fresh audit result. Require a dependency audit before accepting a lockfile; do not claim this checkout was audited or apply a forced downgrade. Prefer trusted, reviewed PNG assets.

## Decisions by Scenario

### Workshop Site

Recommend Just the Docs/Jekyll for this multi-page EN/FR workshop. It preserves the FSI sibling's Markdown authoring, readable repository sources, permalink structure, sidebar, heading anchors, and downloadable static assets. Keep the learner path entirely in the browser and GitHub Copilot app. Ruby, Bundler, Node, and PowerPoint are author/facilitator tools, not participant prerequisites.

Plain static HTML/CSS is preferable only for a small, self-contained handout or an environment that prohibits the Ruby build chain. Publish ready-made HTML with .nojekyll for branch publishing, or upload the prepared HTML artifact directly with Actions. It removes Jekyll, but requires manual navigation, shared layout, language switches, and more duplicated markup. Uploading raw Markdown with .nojekyll does not produce the proposed workshop site. Do not select a frontend framework merely to display labs.

For this request, retain one Jekyll build with two explicitly named navigation groups, English and Français, and paired links on every page. This is a deliberate simplification of the sibling's hidden-link behavior, not a claim that language is automatically isolated. If fully localized chrome and language-scoped search become mandatory, use two Jekyll builds with per-language site.lang and separate search indexes; do not accumulate CSS hiding rules as a substitute.

### Publishing

Recommend a custom GitHub Actions build that runs the Node generator, validates both decks, builds docs/, validates the resulting site, uploads only _site/, and deploys that same artifact. It prevents decks from lagging behind Markdown and avoids committing generated binaries for every edit. Publish from an approved default-branch push or manual run; PRs should build/validate without deploying. No workflow is implemented here.

Branch + /docs is the minimal fallback if maintainers intentionally generate and commit both decks before publication. GitHub supports root or /docs source folders, including remote_theme through jekyll-remote-theme. It does not run an arbitrary npm script declared in package.json. Do not use a GITHUB_TOKEN commit loop to trigger a second Pages build: GitHub documents that such commits do not trigger branch Pages builds.

Managed Pages uses its supported Jekyll/plugin dependency set. A custom workflow may run an independently installed, locked Jekyll toolchain and upload rendered HTML, permitting plugins unsupported by the managed builder. Merely using actions/jekyll-build-pages@v1 does not establish that arbitrary plugins or a custom Gemfile are used. For lockfile control, run bundle exec jekyll build explicitly. remote_theme alone is not a reason to require Actions. Sources S1-S4.

### Presentations

Recommend two 16-slide decks from one paired-content collection, with identical IDs, timing, lab references, notes structure, and sources. English and French sessions can each use readable full-size text, localized proofing language, and consistent slide numbers. The download page should offer both decks in either language, with clear labels.

A single mixed-language deck is appropriate only when simultaneous bilingual projection is a firm event requirement. Side-by-side translation reduces legibility, increases French wrapping risk, and complicates reading order; alternating EN/FR slides doubles the visible sequence to about 32 slides. It is not the default for separate language delivery. Do not silently put French only in notes and call the result bilingual.

Use a synthetic Team Task Board for both CAE and Ontario-government developer audiences. Do not imply organizational endorsement or include operational, citizen, defence, export-controlled, or personal data. The artifact is an in-app canvas, not a deployed public application. The Pages site and decks are learning materials, not the canvas runtime. Installed app behavior and organizational approval still require preflight.

## Proposed Target Tree

This tree describes implementation work after approval. Only the research document exists from this task. All lab slugs are identical across languages to support deterministic pairing; prose and page titles are localized.

```text
README.md
.gitignore
package.json
package-lock.json
.github/
  workflows/pages.yml
scripts/
  build-workshop-deck.mjs
  validate-workshop.ps1
docs/
  _config.yml
  Gemfile
  Gemfile.lock
  _layouts/default.html
  index.md
  prerequisites.md
  downloads.md
  resources.md
  labs/
    index.md
    lab-00-setup.md
    lab-01-create-canvas.md
    lab-02-refine-canvas.md
    lab-03-verify-share.md
  fr/
    index.md
    prerequisites.md
    downloads.md
    resources.md
    labs/
      index.md
      lab-00-setup.md
      lab-01-create-canvas.md
      lab-02-refine-canvas.md
      lab-03-verify-share.md
  assets/
    images/
      canvas-board-en.png
      canvas-board-fr.png
    decks/
      github-copilot-app-workshop-en.pptx
      github-copilot-app-workshop-fr.pptx
```

The PNGs are future sanitized, trial-verified screenshots, not invented UI screenshots. The decks are generated, not hand-edited. Ignore /node_modules/, /_site/, /docs/_site/, /docs/.jekyll-cache/, /docs/.sass-cache/, /docs/.bundle/, /docs/vendor/, and /docs/assets/decks/ for the recommended Actions path. Track package-lock.json and docs/Gemfile.lock. For the branch fallback, remove the deck-output ignore rule and commit the binaries. Do not ignore all assets directories.

Keep paired slide records in the generator at this scale, following the sibling. Each record needs id, durationMinutes, labId, title.en/fr, body.en/fr, notes.en/fr, sources, and optional screenshot/altText.en/fr. A separate content file is unnecessary until another consumer needs it. The root README remains a repository agenda, outside the docs/ publishing source; do not make the whole repository the Pages artifact.

## Root README Agenda Template

This is the sibling's exact structural pattern: frontmatter; H2 session title; pitch sentence; bold Duration label; six numbered timed H3 sections; the same H4 roles and scoped naming; final Learning Objectives H3 and lead-in. Braced text is an author placeholder, not final curriculum. Timing uses the prior research's proposed 10/15/30/15/15/5 allocation rather than the sibling's IDE allocation. If matching durations is required too, use its 15/15/25/15/15/5 instead and retime the slides.

```markdown
---
title: GitHub Copilot App Workshop
description: Agenda and learning objectives for a 90-minute canvas-first GitHub Copilot app workshop
---

## GitHub Copilot App Workshop

Here is my pitch for the GitHub Copilot App Workshop session:

**Duration:** 90 Minutes

### 1. {Orientation Title} (10 min)

#### Topics

* {Topic}

#### Notes

{Short explanatory paragraph.}

#### Misconceptions to Address

* {Misconception}

### 2. {Getting Started Title} (15 min)

#### Getting Started Topics

* {Topic}

#### Getting Started Notes

{Short explanatory paragraph.}

#### Demonstration Ideas

* {Demonstration or guided exercise}

### 3. {Canvas Use Case Title} (30 min)

#### Canvas Use Case Topics

* {Topic}

#### Canvas Use Case Notes

{Short explanatory paragraph.}

#### Canvas Use Case Demonstrations

* {Demonstration or guided exercise}

### 4. {Prompting Title} (15 min)

#### Prompting Topics

* {Topic}

#### Prompting Notes

{Short explanatory paragraph.}

#### Best Practices

* {Practice}

### 5. {Verification and Sharing Title} (15 min)

#### Verification and Sharing Topics

* {Topic}

#### Verification and Sharing Notes

{Short explanatory paragraph.}

#### Verification and Sharing Demonstrations

* {Demonstration or guided exercise}

### 6. Wrap-Up & Q&A (5 min)

#### Wrap-Up Topics

* {Takeaway or resource}

#### Wrap-Up Notes

{Short explanatory paragraph.}

### Learning Objectives

By the end of this session, participants will be able to:

* {Observable learning outcome}
```

Optional EN/FR workshop and download links can follow the agenda; do not replace it with a table or a landing-page pitch. An additional French root README is not required for an EN/FR docs site, but can be added if the owner explicitly wants repository-level parity too.

## Minimal Pages Example

### Configuration and Dependencies

Proposed docs/_config.yml, for the standard public project URL only. This is complete as a small configuration, not evidence that the repository currently publishes there. The theme pin v0.10.1 is a retrieved release used to make the example concrete; it is not asserted to be the latest or security-approved version. Review the pin and dependencies before implementation.

```yaml
title: GitHub Copilot App Workshop
description: Canvas-first workshop in English and French
url: https://devopsabcs-engineering.github.io
baseurl: /github-copilot-app-workshop
repository: devopsabcs-engineering/github-copilot-app-workshop
remote_theme: just-the-docs/just-the-docs@v0.10.1
lang: en-CA
plugins:
  - jekyll-remote-theme
  - jekyll-seo-tag
  - jekyll-include-cache
permalink: pretty
heading_anchors: true
search_enabled: false
enable_copy_code_button: false
color_scheme: light
defaults:
  - scope:
      path: ""
    values:
      layout: default
      lang: en-CA
  - scope:
      path: fr
    values:
      lang: fr-CA
  - scope:
      path: assets
    values:
      nav_exclude: true
      search_exclude: true
exclude:
  - Gemfile
  - Gemfile.lock
  - vendor
  - .bundle
```

Search and the theme copy button are disabled here to avoid introducing untranslated interaction labels and a mixed-language index into the minimal example. Navigation and normal text selection remain available. Enable those features after choosing and testing a localization policy. No analytics, Mermaid CDN, or external font dependency is needed for these labs.

Proposed docs/Gemfile uses versions observed on this workstation, with the theme-required plugins explicitly enabled above. A committed lockfile must still be resolved and tested, including Linux runner compatibility. Installed gems alone are not a verified bundle.

```ruby
source "https://rubygems.org"
gem "github-pages", "232", group: :jekyll_plugins
gem "webrick", "1.9.2"
```

A branch-managed Pages build chooses GitHub's own supported dependencies rather than promising to honor this exact Gemfile lock. The recommended custom bundle build can enforce the lock. The explicit plugins here are within the GitHub Pages family; a newer remote-theme version advertised upstream is not the installed 0.4.3 version.

### Landing Pages and Navigation

Proposed docs/index.md:

```markdown
---
layout: default
title: English
description: English canvas-first workshop
lang: en-CA
nav_order: 1
has_children: true
permalink: /
translation_key: home
---

## GitHub Copilot App Workshop

[Français]({{ '/fr/' | relative_url }})

[Labs]({{ '/labs/' | relative_url }})

[Downloads]({{ '/downloads/' | relative_url }})
```

Proposed docs/fr/index.md:

```markdown
---
layout: default
title: Français
description: Atelier en français centré sur les canevas
lang: fr-CA
nav_order: 2
has_children: true
permalink: /fr/
translation_key: home
---

## Atelier GitHub Copilot App

[English]({{ '/' | relative_url }})

[Ateliers]({{ '/fr/labs/' | relative_url }})

[Téléchargements]({{ '/fr/downloads/' | relative_url }})
```

Lab index frontmatter, followed by the corresponding localized lab list:

```yaml
---
title: Labs
description: Guided canvas exercises
parent: English
nav_order: 2
has_children: true
permalink: /labs/
translation_key: labs
---
```

```yaml
---
title: Ateliers
description: Exercices guidés sur les canevas
lang: fr-CA
parent: Français
nav_order: 2
has_children: true
permalink: /fr/labs/
translation_key: labs
---
```

A representative pair, docs/labs/lab-01-create-canvas.md and docs/fr/labs/lab-01-create-canvas.md:

```yaml
---
title: "Lab 01 - Create a Canvas"
description: Build a synthetic team task board
parent: Labs
grand_parent: English
nav_order: 1
permalink: /labs/lab-01-create-canvas/
translation_key: lab-01
---
```

```yaml
---
title: "Atelier 01 - Créer un canevas"
description: Créer un tableau de tâches synthétiques
lang: fr-CA
parent: Ateliers
grand_parent: Français
nav_order: 1
permalink: /fr/labs/lab-01-create-canvas/
translation_key: lab-01
---
```

Use paired links to the same lab, not always to the other home page. For example the EN lab links to `{{ '/fr/labs/lab-01-create-canvas/' | relative_url }}` and FR links back without /fr. Prerequisites, downloads, and resources use parent English/Français and nav_order 1/3/4. translation_key is proposed validation metadata, not a built-in translation plugin. Lang defaults apply during Jekyll processing, so emit explicit lang on every page if raw Markdown tooling also needs it.

Deck download links on each language's downloads page:

```markdown
[English PowerPoint (.pptx)]({{ '/assets/decks/github-copilot-app-workshop-en.pptx' | relative_url }})

[PowerPoint en français (.pptx)]({{ '/assets/decks/github-copilot-app-workshop-fr.pptx' | relative_url }})
```

permalink never includes baseurl. relative_url adds the project prefix once. Do not use root-absolute /assets links without the filter. Do not set .nojekyll in the Markdown source: it would bypass conversion under branch publishing. Jekyll copies non-Markdown deck/image assets into the artifact; nav_exclude is not an access-control or file-exclusion mechanism.

### HTML Language Correction

For the pinned v0.10.1 theme, copy its full _layouts/default.html into docs/_layouts/default.html during implementation, preserving its theme structure. Apply these two replacements in that copied file; the external source is S8. This is a necessary addition to the configuration above, not something frontmatter alone achieves.

```liquid
<html lang="{{ page.lang | default: site.lang | default: 'en-CA' }}">
```

```liquid
<a class="skip-to-main" href="#main-content">{% if page.lang == 'fr-CA' %}Aller au contenu principal{% else %}Skip to main content{% endif %}</a>
```

Do not replace the full layout with those two lines. Future implementers must preserve theme licensing/attribution requirements for any copied upstream file. The checked-in layout allows language fixes without an extra plugin. Sidebar toggle, breadcrumb, footer, and any other inherited English labels still need a rendered-language audit. HTML lang correctness alone is not full UI translation or accessibility conformance. The sibling's head_custom.html does not solve this requirement.

### Workflow Contract

The proposed pages.yml must use the actual default branch, not an assumed main. Official examples retrieved today use checkout@v6, configure-pages@v5, upload-pages-artifact@v4, deploy-pages@v4. Resolve approved immutable commit pins when implementing; these names and majors are documentation evidence, not installed dependencies.

1. Check out sources; set up a tested Node runtime and Ruby runtime; install from the committed npm and Bundler locks with frozen/deployment behavior.
2. Run npm run build-workshop-deck so both binaries exist inside docs/assets/decks before Jekyll executes.
3. Build from docs/ into the repository-level _site/ with the actual Pages base path. Verify EN/FR HTML, CSS/JS, screenshots, and both decks before upload. A failed deck check must block deployment.
4. Upload only _site/ using upload-pages-artifact. PR jobs stop before deployment and should not need Pages write or OIDC permission.
5. The deployment job needs the build job, environment github-pages, and pages: write plus id-token: write. Keep contents: read; do not grant repository write access for generated-file commits.

Exact deployment fragment from the documented pattern, with the proposed build job ID:

```yaml
deploy:
  if: github.event_name != 'pull_request'
  needs: build
  runs-on: ubuntu-latest
  permissions:
    contents: read
    pages: write
    id-token: write
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

This fragment assumes a trusted-branch/manual trigger restriction and a build job that already uploaded a Pages artifact. It is not a complete executable workflow. Choosing Actions in Settings > Pages and any environment protections require owner approval. Site configuration files cannot enable Pages or make it private. Sources S1 and S3.

## Deck Plan

### Outline and Timing

Both languages have the same 16 records and 90-minute timeline. Lab pauses are included in the section times, not additional time. The draft titles below illustrate parity without prescribing finished curriculum prose. Screenshots should show the actual tested app/canvas state; keep the rendered board readable rather than using decorative imagery.

| ID | EN / FR title | Minutes | Visual or activity | Speaker-note requirement and source |
|----|---------------|---------|--------------------|-------------------------------------|
| 01 | Canvas-First Workshop / Atelier centré sur les canevas | 2 | Tested task-board screenshot and outcome | Welcome CAE/Ontario-government developers; synthetic data only; no endorsement. S12-S14 |
| 02 | Route and Outcomes / Parcours et objectifs | 3 | Six sections, four lab checkpoints | Explain browser materials versus in-app work; point to matching-language labs. Proposed agenda |
| 03 | App, Canvas, and Boundaries / Application, canevas et limites | 5 | App/canvas/site distinction | Avoid Spark, Workspace, Power Apps, and Microsoft 365 conflation; disclose output review and enterprise policy caveats. S12-S14 |
| 04 | Start a Session / Démarrer une session | 5 | App navigation screenshot | Demonstrate approved folder/repository and Interactive mode; no IDE tour. S13-S14 |
| 05 | Lab 00: Ready Check / Atelier 00 : Vérification initiale | 10 | Pause with setup checkpoint | Verify sign-in, Git, app permission, usage budget, and session; facilitator pairing fallback if blocked. S13-S14 |
| 06 | Describe the Board / Décrire le tableau | 5 | Outcome, controls, agent actions | Explain synthetic tasks and desired shared behavior; generated capability names are examples, not guarantees. S12 |
| 07 | Create a Canvas / Créer un canevas | 5 | Demonstrate /create-canvas | Show prompt and generated right-side surface; narration explains what humans and the agent may change. S12 |
| 08 | Lab 01: Build and Inspect / Atelier 01 : Créer et examiner | 20 | Pause with visible board checkpoint | Learners create a board, add one item by UI, request an agent change, inspect both; use trial-verified recovery steps. S12 |
| 09 | Ask for One Improvement / Demander une amélioration | 3 | Before/after requirement | Prompt for a bounded UI or workflow improvement, then verify one explicit acceptance criterion. S12 |
| 10 | Lab 02: Refine the Canvas / Atelier 02 : Améliorer le canevas | 9 | Pause and focused iteration | Add one useful control and equivalent EN/FR labels; inspect state instead of trusting chat confirmation. S12 |
| 11 | Checkpoint and Recovery / Vérification et reprise | 3 | Expected versus actual result | Compare outcomes; demonstrate only a recovery path tested on the delivery app version. S12 plus future trial evidence |
| 12 | Review Before Sharing / Vérifier avant de partager | 4 | Small acceptance checklist | State, input handling, keyboard use, generated-file review, and synthetic-data boundary; no production guarantee. S12-S14 |
| 13 | Lab 03: Verify and Decide / Atelier 03 : Vérifier et décider | 8 | Pause with paired checks | Add/move items through both UI and agent; keyboard test; record limitations; sharing is optional and permission-bound. S12 |
| 14 | Personal, Project, and Public / Personnel, projet et public | 3 | Three distinct scopes | Explain ~/.copilot/extensions versus .github/extensions; a repository canvas is not a public Pages app. S12 and S1 |
| 15 | Recap and Next Step / Bilan et prochaine étape | 3 | Four verified checkpoints | Ask for one validated result and one limitation; link both downloads and language-specific resources. Proposed objectives |
| 16 | Questions and Sources / Questions et sources | 2 | Readable short source list | Keep full URLs, retrieval date, app version, and workshop revision in notes; invite unanswered questions. S12-S14 |

Section mapping: slides 01-03 = 10 minutes; 04-05 = 15; 06-08 = 30; 09-11 = 15; 12-14 = 15; 15-16 = 5. Lab pauses total 47 minutes. The remaining 43 minutes include demonstrations, debriefs, and questions. These are recommendations pending confirmation that 90 minutes is the intended duration.

### Generator Contract

Use PptxGenJS as an ESM module with built-in Node path/fs helpers, matching the sibling. Set LAYOUT_WIDE, document title/subject/revision, and a common font family available on presentation machines. Use at least 24-point body text where practical and 32-point headings; reduce content before reducing font size. The sibling's 15-point bullets are an implementation example, not a projection-readability target.

Use addNotes on every slide. Notes should carry localized explanation, duration, lab URL, success checkpoint, recovery path, full source URLs, retrieval date, and limitations. Do not put essential instructions only in notes: repeat them on the accessible HTML lab page. Notes ship inside the downloadable deck, so never put facilitator secrets or customer information there.

Minimal API pattern verified against S11, not a complete generator:

```javascript
const slide = pptx.addSlide();
slide.background = { color: 'FAFBFC' };
slide.addText(record.title[language], {
  x: 0.6, y: 0.4, w: 12.1, h: 0.9,
  fontSize: 32, lang: language === 'fr' ? 'fr-CA' : 'en-CA'
});
slide.addNotes(record.notes[language] + '\nSources:\n' + record.sources.join('\n'));
await pptx.writeFile({ fileName: outputPath });
```

Generate and await both writes; fail the process on missing EN/FR fields, wrong slide count, absent screenshot files, or empty notes. Use image altText and text/run lang properties. PptxGenJS is create-only, not an existing-deck editor. Do not depend on an unverified imageSizingContain helper. Its fit: shrink option is not an overflow test; types explicitly note that autofit behavior may take effect only after editing/resizing in PowerPoint.

## Generation and Validation Commands

### Current Readiness Versus Future Commands

The following commands are for the implementation stage, after proposed files exist and installation is authorized. They were not run here. Node/npm versions were verified; the installed PptxGenJS dependency was not, because it is absent. No command can honestly provide a reproducible npm build from the sibling today without first creating and reviewing a lockfile.

Proposed package.json contract, preserving the sibling's command name and selecting its verified release as an explicit baseline:

```json
{
  "name": "github-copilot-app-workshop-deliverables",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build-workshop-deck": "node scripts/build-workshop-deck.mjs"
  },
  "dependencies": {
    "pptxgenjs": "4.0.1"
  }
}
```

One-time authorized dependency preparation on a working branch: npm install to create package-lock.json, and bundle install with docs/Gemfile to create Gemfile.lock. Review transitive dependencies and audit findings before committing locks. Include the runner platform in the Bundler lock when needed. Pin the tested Node/npm/Ruby/Bundler versions in CI; do not claim deterministic builds from version ranges or a floating remote theme. Future rebuilds:

```powershell
Set-Location 'C:\src\GitHub\devopsabcs-engineering\github-copilot-app-workshop'
npm ci
node --check scripts/build-workshop-deck.mjs
npm run build-workshop-deck
$env:BUNDLE_GEMFILE = Join-Path $PWD 'docs/Gemfile'
$env:BUNDLE_FROZEN = 'true'
& 'C:\Ruby32-x64\bin\ruby.exe' 'C:\Ruby32-x64\bin\bundle' check
& 'C:\Ruby32-x64\bin\ruby.exe' 'C:\Ruby32-x64\bin\bundle' exec jekyll build --source docs --destination _site --config docs/_config.yml --strict_front_matter
```

Stop on a nonzero native-command exit; PowerShell does not universally throw on external failures. bundle check is not bundle install: if dependencies are missing, stop and use the authorized installation step. In a clean Linux CI runner, use BUNDLE_GEMFILE="$GITHUB_WORKSPACE/docs/Gemfile", BUNDLE_FROZEN=true, bundle install, then the same Jekyll arguments through bundle exec. No Python, Azure CLI, or npm-based site framework is needed.

Optional author preview after a successful build, not run during this research:

```powershell
& 'C:\Ruby32-x64\bin\ruby.exe' 'C:\Ruby32-x64\bin\bundle' exec jekyll serve --source docs --destination _site --config docs/_config.yml --host 127.0.0.1 --port 4000
```

Open <http://127.0.0.1:4000/github-copilot-app-workshop/> and its /fr/ counterpart. Restart after changing _config.yml. If port 4000 is occupied, choose another port. Native Windows Jekyll is not officially supported according to S4; the Linux Actions build should be the publishing reference, not a claim that Windows preview proves deployment compatibility.

### Dependency-Free Deck Package Check

This is a complete proposed PowerShell check for the two generated binaries. It uses ZIP and XML types verified available in this session. It can form the deck-check portion of scripts/validate-workshop.ps1; the script file has not been created. Run once on docs/assets/decks and again on _site/assets/decks. It validates package structure and notes, not slide appearance, semantic translation, or full OOXML conformance.

```powershell
$ErrorActionPreference = 'Stop'
$deckDirectory = Join-Path $PWD 'docs/assets/decks'
foreach ($language in @('en', 'fr')) {
    $deckPath = Join-Path $deckDirectory "github-copilot-app-workshop-$language.pptx"
    if (!(Test-Path $deckPath) -or (Get-Item $deckPath).Length -eq 0) {
        throw "Missing or empty deck: $deckPath"
    }
    $archive = [System.IO.Compression.ZipFile]::OpenRead($deckPath)
    try {
        $slides = @($archive.Entries | Where-Object FullName -Match '^ppt/slides/slide\d+\.xml$')
        $notes = @($archive.Entries | Where-Object FullName -Match '^ppt/notesSlides/notesSlide\d+\.xml$')
        if ($slides.Count -ne 16 -or $notes.Count -ne 16) {
            throw "Expected 16 slides and 16 notes parts: $deckPath"
        }
        foreach ($entry in @($slides + $notes)) {
            $reader = [System.IO.StreamReader]::new($entry.Open())
            try { [xml]$document = $reader.ReadToEnd() } finally { $reader.Dispose() }
            $namespaces = [System.Xml.XmlNamespaceManager]::new($document.NameTable)
            $namespaces.AddNamespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
            $text = ($document.SelectNodes('//a:t', $namespaces) | ForEach-Object InnerText) -join ' '
            if ([string]::IsNullOrWhiteSpace($text)) { throw "Empty text: $($entry.FullName)" }
            if ($entry.FullName -like 'ppt/notesSlides/*' -and $text -notmatch 'https://') {
                throw "Missing source or lab URL in notes: $($entry.FullName)"
            }
        }
        "$language`: 16 slides, 16 nonempty notes parts with URLs"
    } finally { $archive.Dispose() }
}
```

Also assert paired slide IDs, duration sum 90, all four lab IDs present, and localized titles/body/notes before writing decks, using the generator's own structured records. Preserve a stable workshop revision and expose it in both decks and pages. Reproducibility means equivalent content and pinned inputs; PPTX ZIP timestamps/metadata may prevent byte-for-byte equality.

### Rendering and Site Checks

PowerPoint is registered locally, but export remains untested. After generation, open each deck read-only and export each slide as PNG, then inspect all 32 images. A future isolated COM session can use Presentations.Open(fullPath, true, false, false) followed by Presentation.Export(outputDirectory, 'PNG', 1600, 900). Close only the presentation opened for validation; do not terminate a user's PowerPoint session. GUI/desktop availability and fonts are additional prerequisites. A headless Linux runner does not gain PowerPoint merely by installing PptxGenJS.

Inspect 16:9 dimensions, screenshot aspect ratio, safe margins, clipping, French wrapping, overlapping footer/body text, reading order, and font substitution. Compare PowerPoint text bounds where available, then verify visually. Package parsing alone cannot detect these failures. No PNG export or visual pass is claimed here.

Site checks must inspect the generated artifact, not only Markdown sources:

* Assert _site/index.html, _site/fr/index.html, both lab sets, both downloads pages, and both copied decks exist and are nonempty.
* Confirm every internal href/src resolves under the configured base path, with no raw .md or Liquid fragments. Check anchors and cross-language links, screenshots, CSS, JS, and deck links. Jekyll build success is not a link checker.
* Test root and project-path hosting variants if private/custom-domain publication is being considered. Determine the actual deployed URL first; do not infer it from repository privacy.
* Use a browser at desktop and narrow/mobile widths, 200% zoom, keyboard-only navigation, and a screen reader. Confirm page title, HTML lang, visible headings, skip link, focus order, mobile navigation, and download names in each language.
* Treat HTML as the accessible primary material. Markdown frontmatter title does not guarantee a visible page heading in the theme; examples include a visible H2 to follow repository writing rules. Verify the heading outline instead of assuming frontmatter creates an H1.
* GitHub-flavored alert markers may not render with the same styling in Jekyll. Verify warning readability in both outputs or use the pinned theme's supported callout syntax during implementation.

## EN/FR Parity and Accessibility Gates

* Every EN page has one FR partner with the same translation_key and exercise ID; each partner links back to the corresponding page. Keep prerequisites, elapsed times, prompts, expected outcomes, recovery paths, and resource links equivalent.
* Use en-CA/fr-CA language tags, real French accents, consistent approved terminology, and bilingual human review. Keep literal commands and tested app UI labels unchanged where translation would make a step inaccurate.
* Both decks have 16 slides with matching IDs/order and nonempty localized notes. Neither uses the other language as a silent fallback. French is not shortened by removing safety caveats or checks.
* Every meaningful screenshot has localized alt text and a nearby textual description of the outcome. Never use screenshots as the only source of a prompt or instruction.
* Use descriptive download/link text, table headers, text labels in addition to status colors, visible focus, and usable keyboard interactions. Contrast targets are at least 4.5:1 for ordinary text and 3:1 for large text; these are design acceptance targets, not a compliance certification.
* Run PowerPoint's accessibility checker and inspect reading order, title semantics, image alt text, and proofing language. Generated text boxes and altText fields do not by themselves prove an accessible PowerPoint document.
* Confirm language switching, reflow, and keyboard use with actual rendered pages, including inherited theme controls. Full French chrome remains an explicit gate even though the minimal snippet only corrects HTML language and the skip link.
* Record validated app version, workshop revision, source retrieval dates, exact dependency locks, and verification results. Recheck product availability shortly before delivery.

## References

* Prior research: .copilot-tracking/research/subagents/2026-09-22/workshop-scope-research.md
* S1: [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Branch root/docs, custom Actions, GITHUB_TOKEN trigger limitation, and visibility warning.
* S2: [Adding a Jekyll theme](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll). Built-in themes versus remote_theme and current Actions recommendation.
* S3: [Custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Action versions, build/deploy dependency, artifact, permissions, and environment.
* S4: [Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll). Frontmatter, plugin restrictions, defaults, and Windows support caveat.
* S5: [Pages access control](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site). Enterprise Cloud, organization project sites, unique private subdomains, and Enterprise Managed Users limitations.
* S6: [Just the Docs navigation](https://just-the-docs.com/docs/navigation/main/) and [page levels](https://just-the-docs.com/docs/navigation/main/levels/). Title/parent-based hierarchy and has_children compatibility.
* S7: [Just the Docs configuration](https://just-the-docs.com/docs/configuration/). Search, callouts, heading anchors, and navigation options.
* S8: [Pinned theme default layout](https://raw.githubusercontent.com/just-the-docs/just-the-docs/v0.10.1/_layouts/default.html), [configuration](https://raw.githubusercontent.com/just-the-docs/just-the-docs/v0.10.1/_config.yml), and [gemspec](https://raw.githubusercontent.com/just-the-docs/just-the-docs/v0.10.1/just-the-docs.gemspec). HTML site.lang, layout includes, Jekyll and plugin dependencies.
* S9: [jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme). Enable the plugin and pin a tag, branch, or commit after @; no ref means HEAD.
* S10: [PptxGenJS v4.0.1 package manifest](https://raw.githubusercontent.com/gitbrent/PptxGenJS/v4.0.1/package.json). ESM exports, dependencies, and concrete release version.
* S11: [PptxGenJS v4.0.1 API types](https://raw.githubusercontent.com/gitbrent/PptxGenJS/v4.0.1/types/index.d.ts) and [speaker notes](https://gitbrent.github.io/PptxGenJS/docs/speaker-notes.html). Background, language, alt text, notes, and current writeFile object signature. Prefer versioned types over older documentation examples using a string writeFile argument.
* S12: [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions). Rechecked during this research: /create-canvas, shared state, controls, capabilities, and personal/project scope.
* S13: [Copilot app overview](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app). Product and policy evidence previously verified in workshop-scope-research.md; not re-fetched here.
* S14: [Copilot app quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app). Setup evidence previously verified in workshop-scope-research.md; not re-fetched here.

The attempted PptxGenJS /docs/usage-notes/ URL returned 404; the working speaker-notes.html page and versioned types replaced it. Dates above indicate retrieval, not publication or an availability guarantee.

## Remaining Questions

### Operational Blockers

The target and sibling remote Pages build type, source branch/path, visibility, html_url, environment protections, entitlement, and allowed Actions are unverified. No remote settings API was queried and no setting was changed. A maintainer should inspect Settings > Pages or perform an authorized read-only GET /repos/{owner}/{repo}/pages before implementation. A missing checked-in Pages workflow is not proof that Pages is disabled.

No target site/source generator files exist yet. Both inspected repositories lack npm/Gem lockfiles; PptxGenJS is not resolvable. The Ruby batch wrapper failed, though the direct Ruby/Bundler entrypoint works. Resolving locks, auditing packages, selecting approved runtime/action pins, and validating the Linux build are still required. No working deck download or remote site deployment is claimed.

The pinned theme example requires a language-aware layout override and rendered chrome review. PowerPoint is registered, but launch/export, rendering, fonts, accessibility, and French typography have not been tested. Screen captures and trial-verified recovery steps must come from an authorized app rehearsal.

### Questions for the Owner

* Is 90 minutes fixed, and are EN/FR independent delivery paths or simultaneous bilingual projection? Default recommendation: 90 minutes with independent language decks.
* Is the Pages site public, enterprise-restricted, or subject to another approved hosting requirement? Which audience members can authenticate to it?
* Are inherited English theme controls acceptable for an initial draft, or must all French navigation/search/chrome be localized before publication? Default recommendation: require localized essential controls before delivery.
* Who approves organizational branding, training-data boundaries, accessibility acceptance, and Copilot app installation/policy access? No CAE/Ontario-government policy approval is inferred.

### Next Research Checklist

* [ ] Confirm actual remote Pages eligibility, build source, URL, visibility, and organization Actions policy through authorized read-only inspection.
* [ ] Resolve and audit authoring dependencies under approved installation scope; record Node/Ruby/action/theme pins and Linux-compatible lockfiles.
* [ ] Trial the four canvas checkpoints in both languages on the intended app version, including permitted persistence/sharing and recovery behavior.
* [ ] Generate and render both decks only after implementation approval; inspect all 32 slide images and PowerPoint accessibility results.
* [ ] Build and inspect both language paths, base-path handling, layout language, chrome localization, keyboard navigation, and all downloads before publishing.

These are implementation/preflight gates, not further tangential research. The requested comparison, configuration examples, agenda template, outline, file tree, and dependency evidence are complete.

## Research Validation

The seven fenced YAML/JSON examples parse with Ruby Psych/JSON. The 16 outline rows total 90 minutes. The installed github-pages 232 manifest confirms jekyll-seo-tag 2.8.0, jekyll-remote-theme 0.4.3, and jekyll-include-cache 0.2.1 as direct dependencies. Editor diagnostics reported no errors, but no full Markdown linter is installed. README.md still contains only its original repository-name heading.

The first YAML parser check caught tabs introduced by editor indentation conversion after patch application. Mechanical whitespace normalization was restricted to this research file, and the same parser check then passed. Future authors should parse embedded configuration instead of relying on Markdown diagnostics to catch YAML indentation errors.

No site build, deck generation, binary validation, rendering, app exercise, or remote deployment was executed. The proposed generation commands remain conditional on implementation and approved dependency preparation. All edits made in this task are restricted to .copilot-tracking/research/subagents/2026-09-22/publishing-deck-research.md.