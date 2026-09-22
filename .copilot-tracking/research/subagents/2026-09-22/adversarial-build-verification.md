<!-- markdownlint-disable-file -->
---
title: Adversarial Build and Publish Chain Verification
description: Read-only adversarial verification of the proposed Just the Docs, GitHub Pages, and PptxGenJS build chain against npm, RubyGems, GitHub, and theme sources.
ms.date: 2026-09-22
---

## Status

Complete for the requested verification scope. Read-only. No package was installed, no deck was generated, no site was built, no remote setting was read or changed, and no other workspace file was edited. Every verdict below is backed by a primary source fetched on 2026-09-22. Where a claim can only be settled by executing the build, the verdict is UNVERIFIABLE and says so rather than guessing.

Documents verified:

* .copilot-tracking/research/subagents/2026-09-22/publishing-deck-research.md
* .copilot-tracking/research/2026-09-22/github-copilot-app-workshop-research.md

## Verdict Summary

| # | Claim under test | Verdict |
|---|------------------|---------|
| 1 | pptxgenjs 4.x exists; v4 API breakage | CORRECT (version) / WRONG (breakage premise) |
| 2 | `lang` on addText; `slide.background = { color }` | CORRECT |
| 3 | just-the-docs v0.10.1 tag; `owner/repo@tag` pin syntax | CORRECT |
| 4 | github-pages 232; Jekyll pin; jekyll-remote-theme in `plugins:` | CORRECT |
| 5 | Home page `permalink: /` as nav parent; three-level `grand_parent` | CORRECT (with silent-failure caveat) |
| 6 | Overriding `_layouts/default.html` under remote_theme; MIT obligation | CORRECT |
| 7 | Action majors, permissions block, baseurl injection | WRONG (versions) / CORRECT (permissions) / CORRECT-but-omitted (baseurl) |
| 8 | `permalink` vs `baseurl`; Liquid validity | CORRECT (syntax) / real contradiction in the build command |

Issue counts from the red-team pass: **CRITICAL 3, HIGH 5, MEDIUM 7, LOW 6** (21 total).

## Item-by-Item Verification

### 1. pptxgenjs 4.x — CORRECT on existence, WRONG premise on breakage

* 4.x exists and **4.0.1 is the current published version** on npm (npm package page shows `4.0.1 • Public • Published a year ago`; 59 versions; weekly downloads ~1.62M). Source: <https://www.npmjs.com/package/pptxgenjs>.
* GitHub releases confirm v4.0.1 published 2025-06-26 and v4.0.0 published 2025-05-04. Source: <https://api.github.com/repos/gitbrent/PptxGenJS/releases>.
* The v4.0.0 changelog contains **no breaking change to `addSlide`, `addText`, `addNotes`, or `writeFile`**. The major bump covers: `exports` field added to package.json for modern module resolution, new Node.js detection logic (fixes Vite and Web Worker issues), jszip bumped to `^3.10.1`, `textDirection` added, `defineSlideMaster` reuse fix, table auto-paging repair fix, react-demo removed. There is no migration note for the four APIs in question.
* The research document never asserted such a breakage, so it is not wrong here. The premise in the verification request is what is WRONG.

**CORRECTED FACT (the research document is incomplete here).** publishing-deck-research.md states only that "The PptxGenJS release declares jszip ^3.10.1 and image-size ^1.2.1". The actual v4.0.1 manifest declares **four runtime dependencies**:

```json
"dependencies": {
  "@types/node": "^22.8.1",
  "https": "^1.0.0",
  "image-size": "^1.2.1",
  "jszip": "^3.10.1"
}
```

Source: <https://raw.githubusercontent.com/gitbrent/PptxGenJS/v4.0.1/package.json>. Two of these are material and were missed: `https@^1.0.0` (a trivial third-party shim carried as a production dependency) and `@types/node` (a types package carried as a runtime rather than dev dependency). The npm README's "zero runtime dependencies" marketing line is contradicted by the same package's own manifest. See H4.

### 2. `lang` on addText and `slide.background` — CORRECT

Verified against the pinned type definitions at <https://raw.githubusercontent.com/gitbrent/PptxGenJS/v4.0.1/types/index.d.ts>:

* `TextBaseProps` declares `lang?: string`, documented as "language - ISO 639-1 standard language code", `@default 'en-US'`, `@example 'fr-CA' // french Canadian`. `TextPropsOptions extends PositionProps, DataOrPathProps, TextBaseProps, ObjectNameProps`, and `addText(text: string | TextProps[], options?: TextPropsOptions): Slide`. So `lang` on `addText` options is **real, not invented**. Minor upstream inconsistency worth knowing: the doc comment says ISO 639-1 (`fr`) while the library's own example uses a BCP-47 tag (`fr-CA`). Using `fr-CA` / `en-CA` follows the library's example.
* `export class Slide { background: BackgroundProps ... }`, and `BackgroundProps extends DataOrPathProps, ShapeFillProps`, where `ShapeFillProps.color?: Color`. So `slide.background = { color: 'FAFBFC' }` is **the correct current API**. The nested `fill` form is marked `@deprecated v3.6.0`, and `src` is marked `@deprecated v3.6.0 - use DataOrPathProps - remove in v4.0.0` (still present in 4.0.1 types).
* `addNotes(notes: string): Slide` and `writeFile(props?: WriteFileProps): Promise<string>` with `WriteFileProps.fileName?: string` — both as the research document describes.
* The research document's `fit: 'shrink'` caveat is also confirmed verbatim in the types: "'shrink' and 'resize' only take effect after editing text/resize shape ... There is no way for this library to trigger that behavior, sorry."

### 3. just-the-docs v0.10.1 and the pin syntax — CORRECT

* Tag `v0.10.1` exists; commit SHA `7fc56e2016fe4615331db2ae13f2f65abb03153f`. Source: <https://api.github.com/repos/just-the-docs/just-the-docs/git/ref/tags/v0.10.1>.
* `remote_theme: just-the-docs/just-the-docs@v0.10.1` is **valid syntax**. jekyll-remote-theme documents `OWNER/REPOSITORY` optionally followed by `@` and a branch, tag, or commit; with no ref, `HEAD` is used. Source: <https://github.com/benbalter/jekyll-remote-theme> README. The theme's own migration guide uses exactly this form: `remote_theme: just-the-docs/just-the-docs@v0.12.0`.
* Context the research document does not state: **the current release is v0.12.0** (published 2026-01-23). v0.10.1 is two minor versions behind. v0.11.0 and v0.12.0 both carry documented potentially-breaking changes affecting `_includes/components/sidebar.html`, `_includes/components/footer.html`, and `nav_footer_custom.html`, plus WCAG 2.1 AA contrast fixes to nav link hover/active, callouts, and button/label colours. Pinning to v0.10.1 therefore also pins away accessibility fixes that the plan's own accessibility gate would want. See M7.

### 4. github-pages 232 — CORRECT

RubyGems confirms `github-pages` version **232**, published 2024-08-06, and it is the latest version. Source: <https://rubygems.org/api/v1/gems/github-pages.json>. Relevant exact runtime pins:

| Gem | Pinned version |
|-----|----------------|
| jekyll | = 3.10.0 |
| jekyll-remote-theme | = 0.4.3 |
| jekyll-seo-tag | = 2.8.0 |
| jekyll-include-cache | = 0.2.1 |
| jekyll-sass-converter | = 1.5.2 |
| kramdown | = 2.4.0 |
| liquid | = 4.0.4 |
| webrick | ~> 1.8 |

* The research document's claim that 232 supplies jekyll-seo-tag 2.8.0, jekyll-remote-theme 0.4.3, and jekyll-include-cache 0.2.1 is **confirmed**.
* The proposed `gem "webrick", "1.9.2"` satisfies `~> 1.8`. No conflict.
* `jekyll-remote-theme` **is** in the GitHub Pages supported set, and GitHub Docs states "The `jekyll-remote-theme` Jekyll plugin is also available and lets you load other themes." Source: <https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll>. Listing it under `plugins:` is required by the plugin's own README and is correct for a branch-based build; the same applies to `jekyll-seo-tag` and `jekyll-include-cache`, which are optionally-enabled rather than auto-enabled.
* just-the-docs v0.10.1's gemspec requires `jekyll >= 3.8.5` with **no upper bound**, so Jekyll 3.10.0 is within the supported range. Source: <https://raw.githubusercontent.com/just-the-docs/just-the-docs/v0.10.1/just-the-docs.gemspec>. But the theme's migration guide carries a standing DEPRECATION: "You can still use Jekyll 3 (3.8.5 or later) ... However, future releases of the theme may require the use of Jekyll 4." See M2.

### 5. Home page as a nav parent, and three-level nesting — CORRECT, with a silent-failure caveat

This was flagged as the highest-risk claim. It survives. Evidence is from the pinned theme source, not from the docs site alone.

`_includes/components/site_nav.html` at v0.10.1 computes top-level navigation as:

```liquid
{% assign pages_top_size = site.html_pages
      | where_exp:"item", "item.title != nil"
      | where_exp:"item", "item.parent == nil"
      | where_exp:"item", "item.nav_exclude != true"
      | size %}
```

There is **no special case for the home page, for `permalink: /`, or for `page.url == "/"`**. A page with a `title`, no `parent`, and no `nav_exclude` is a top-level nav node regardless of its permalink. The theme's own `index.md` at v0.10.1 carries `title: Home`, `nav_order: 1`, `permalink: /` and does appear in its navigation, so `permalink: /` plus a title is a supported nav item; it simply has no children in that example.

`_includes/components/nav/children.html` at v0.10.1 attaches children by title, with two gates:

```liquid
{%- if include.all == true or include.node.has_children != false -%}
  ...
  {%- if nav_child.grand_parent and nav_child.grand_parent != include.node.parent -%}
    {%- assign nav_child_ok = false -%}
  {%- endif -%}
```

Applying this to the proposal:

* `docs/index.md` (`title: English`, no `parent`) becomes a top-level node. `docs/labs/index.md` (`parent: English`) attaches. Lab pages set `parent: Labs, grand_parent: English`; the Labs node's own `parent` is `English`, so `grand_parent != include.node.parent` is false and the child is accepted. The French chain (`Français` → `Ateliers` → labs with `grand_parent: Français`) is structurally identical. **Three-level nesting works.**
* `has_children: true` is redundant. The theme only tests `has_children != false`, and the theme docs state the field became redundant and ignored in v0.10.0. Harmless, not required.
* The theme's title rules are satisfied: top-level titles differ (English, Français), siblings differ, and no page title equals a descendant title.
* `grand_parent` is supported and documented for exactly this shape: "The `grand_parent` title needs to be the same as the `parent` of the `parent`." Source: <https://just-the-docs.com/docs/navigation/main/ancestry/>. The proposal obeys this. It is also technically unnecessary here because all titles are already unique.
* There is **no known conflict** between being the site home page and being a nav parent in this theme version.

The real hazard is the failure mode, not the design: if a `grand_parent` value is ever set to anything other than the parent's parent, `children.html` silently drops the page from navigation and the build still succeeds with exit code 0. Nothing in the proposed validation would catch that. Mitigation: set `nav_error_report: true` (referenced by `site_nav.html`) and assert in the site check that every expected nav link is present in `_site/index.html` and `_site/fr/index.html`.

### 6. Overriding the theme layout, and licensing — CORRECT

* jekyll-remote-theme explicitly supports per-file overrides: "You can override any file from the remote theme by creating a file with the same path in your Jekyll site. This works for: Layouts (`_layouts/`), Includes (`_includes/`), Sass files (`_sass/`), Assets (`assets/`) ... **Only the specific files you override will use your local versions.**" GitHub Docs documents the same copy-the-default-layout pattern. So copying `_layouts/default.html` works.
* The research document's S8 claim is confirmed exactly. v0.10.1 `_layouts/default.html` begins:

```liquid
---
layout: table_wrappers
---

<!DOCTYPE html>

<html lang="{{ site.lang | default: 'en-US' }}">
{% include head.html %}
<body>
  <a class="skip-to-main" href="#main-content">Skip to main content</a>
```

  Two things the research document does not call out: the layout has its own front matter (`layout: table_wrappers`) that must be preserved in the copy, and the skip link is hardcoded English.

* **Licensing obligation.** MIT. `LICENSE.txt` at v0.10.1 reads "Copyright (c) 2016 Patrick Marsceill" and requires: "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software." A copied `_layouts/default.html` is a substantial portion. The implementation must retain the copyright and permission notice — in practice, a Liquid or HTML comment at the top of the copied file plus a `NOTICE`/attribution line, and preserving the theme's own "This site uses Just the Docs" nav footer unless deliberately replaced. The research document says only "preserve theme licensing/attribution requirements"; that is not specific enough to be actionable.

### 7. GitHub Actions versions — WRONG

The Workflow Contract states: "Official examples retrieved today use checkout@v6, configure-pages@v5, upload-pages-artifact@v4, deploy-pages@v4." **That version set matches neither source of truth.**

| Action | Current latest release | Current official Pages starter workflow | Research document claim |
|--------|------------------------|------------------------------------------|-------------------------|
| actions/checkout | v7.0.1 (2026-07-20) | `actions/checkout@v4` | `@v6` — matches neither |
| actions/configure-pages | v6.0.0 (2026-03-25) | `actions/configure-pages@v5` | `@v5` — matches starter only |
| actions/upload-pages-artifact | v5.0.0 (2026-04-10) | `actions/upload-pages-artifact@v3` | `@v4` — matches neither |
| actions/deploy-pages | v5.0.1 (2026-09-01) | `actions/deploy-pages@v5` | `@v4` — matches neither |

Sources: `https://api.github.com/repos/actions/{checkout,configure-pages,upload-pages-artifact,deploy-pages}/releases/latest` and <https://raw.githubusercontent.com/actions/starter-workflows/main/pages/jekyll.yml>.

Three of four values are unattributable to any current official source, yet they are presented as "documentation evidence" retrieved the same day. `upload-pages-artifact@v4` paired with `deploy-pages@v4` is a combination that appears in no official example; upload-pages-artifact v5 moved to `actions/upload-artifact` v7, and artifact-producer/consumer version coupling is exactly the class of mismatch that fails only at deploy time. See C2.

**Permissions block — CORRECT.** The official starter workflow uses `contents: read`, `pages: write`, `id-token: write`, plus `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }`, `needs: build`, and a `concurrency: { group: "pages", cancel-in-progress: false }` block. The research document's deploy fragment reproduces the permissions and environment correctly. It omits `concurrency` (see M4).

**Baseurl injection — the research document is silent where it needed to be explicit.** `actions/configure-pages` does not write a baseurl into Jekyll's configuration. It exposes outputs, and the official workflow passes the value in by hand:

```yaml
- name: Setup Pages
  id: pages
  uses: actions/configure-pages@v5
- name: Build with Jekyll
  run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
  env:
    JEKYLL_ENV: production
```

So yes, **Jekyll needs `--baseurl` passed explicitly**, and the research document's only concrete build command omits it. See H1.

### 8. `permalink` vs `baseurl`, and Liquid validity — CORRECT on syntax

* "permalink never includes baseurl. relative_url adds the project prefix once." Confirmed by the Jekyll configuration reference: `baseurl` is "the path between web-server or domain root and your landing page", separate from `url`, and page permalinks are site-relative. The `{{ '/fr/' | relative_url }}` and deck-download examples are well-formed Liquid; **nothing in the proposed front matter or page bodies would raise a Liquid error**.
* `{{ page.lang | default: site.lang | default: 'en-CA' }}` and the `{% if page.lang == 'fr-CA' %}` skip-link conditional are valid Liquid and valid in a layout context.
* The front-matter defaults are also correct, contrary to a plausible first suspicion: Jekyll resolves overlapping `defaults` by scope specificity — "You can choose to override settings from other scope/values pair by specifying a more specific path for the scope." `path: fr` is more specific than `path: ""`, so `lang: fr-CA` wins for the French tree while `layout: default` is still inherited. Source: <https://jekyllrb.com/docs/configuration/front-matter-defaults/>.
* The genuine contradiction is not in the front matter; it is between the hardcoded `baseurl: /github-copilot-app-workshop` in `_config.yml` and the Pages-provided `base_path` that the official workflow injects. See H1. Secondary: `permalink: pretty` in `_config.yml` is inert, because every page in the proposal sets an explicit `permalink`.

## Red-Team Findings

### CRITICAL

**C1 — The generated deck directory is gitignored and nothing in the plan creates it. The deck build fails on a clean runner.**

The target tree ignores `/docs/assets/decks/` for the recommended Actions path, and the generator contract says it "targets docs/assets/decks". A fresh `actions/checkout` therefore produces a working tree with no `docs/assets/decks` directory. `pptx.writeFile({ fileName: 'docs/assets/decks/...' })` does not create parent directories; Node throws `ENOENT` on the first write. This surfaces only at build time, never during local iteration where the directory already exists from a prior manual run. The downstream effect is worse: if the generator is made to fail soft, Jekyll copies nothing, both `downloads` pages render links to files that do not exist, and the site deploys green with two 404 downloads — the exact artifact the request says must be delivered.
*Mitigation:* `fs.mkdirSync(outputDirectory, { recursive: true })` before the first write; assert both files exist and are non-zero after generation; assert `_site/assets/decks/*.pptx` exists before upload, and fail the job if not. Add an explicit workflow step ordering assertion, because `jekyll build` must run strictly after deck generation.

**C2 — The action version set is unattributable and is presented as same-day official evidence.**

See item 7. Three of four pins match neither the current official Pages starter workflow nor current marketplace majors. The practical risk is the upload/deploy pairing: artifact producer and consumer versions are coupled, and a mismatch fails at the deploy step after a successful build, not before. The evidentiary risk is larger — this is the one externally checkable, version-specific claim in the Workflow Contract, and it did not survive contact with the source.
*Mitigation:* Take the version set from the current starter workflow verbatim (checkout v4, configure-pages v5, upload-pages-artifact v3, deploy-pages v5) or deliberately move to current majors as a set, then resolve each to an immutable commit SHA. Do not mix. Record the retrieval URL next to the pins.

**C3 — The document's own validation is self-referential and provably missed the external errors.**

The primary document's Research Validation reports a PowerShell pass that "confirmed six agenda sections totaling 90 minutes ... all 16 sequential slides mapped once with matching section totals, ten required sections, 12 official source-register links, two primary creation prompts, and 22 referenced curriculum prompt blocks", and notes "Links were checked structurally, not fetched." Every one of those assertions is about whether the document agrees with itself. The arithmetic is genuinely correct (verified independently below), and the check still passed a false statement about GitHub Actions versions, an incomplete statement about pptxgenjs dependencies, and a stale theme version. A validator that can only detect internal inconsistency should not be reported in a section titled "Research Validation" without that limitation stated in the same sentence as the pass result.
*Mitigation:* Split the claim ledger into internally-checkable and externally-checkable. Fetch every externally-checkable version, tag, and gem pin, record the retrieval URL and the retrieved value, and re-fetch before implementation. Treat "structurally checked" links as unverified.

### HIGH

**H1 — Baseurl is hardcoded, `--baseurl` is never passed, and the two can disagree silently.**

`_config.yml` hardcodes `baseurl: /github-copilot-app-workshop`, and the proposed build command is `bundle exec jekyll build --source docs --destination _site --config docs/_config.yml --strict_front_matter` with no `--baseurl`. That works only while the deployed base path is exactly that string. It breaks for a user/organization site, a custom domain, or a renamed repository, and the failure is total: every `relative_url` link, theme CSS, theme JS, screenshot, and deck download resolves under the wrong prefix. Local preview at `127.0.0.1:4000/github-copilot-app-workshop/` would look perfect while the deployed site is broken. The research document itself flags that "Public project-site url/baseurl are provisional until real Pages settings are verified" but then ships a command that depends on the provisional value.
*Mitigation:* Pass `--baseurl "${{ steps.pages.outputs.base_path }}"` in CI as the official workflow does, keep the `_config.yml` value only as a local-preview default, and add a post-build assertion that a known asset href in `_site/index.html` begins with the expected base path.

**H2 — A single mixed-language build cannot satisfy the accessibility gate the plan sets for itself.**

The layout override fixes the document-level `lang` attribute (WCAG 3.1.1, Language of Page). It does not address WCAG 3.1.2, Language of Parts: in the recommended one-build design, the sidebar simultaneously renders an English nav group and a French nav group inside a single `<html lang="...">` document, so one group is always announced in the wrong language. Front matter cannot fix this — the nav labels are emitted by `_includes/components/nav/links.html`, which would also have to be overridden to emit per-item `lang`. The plan's EN/FR Parity and Accessibility Gates section asserts "Confirm language switching, reflow, and keyboard use with actual rendered pages, including inherited theme controls" without recognising that the chosen architecture builds the violation in.
*Mitigation:* Either (a) override `nav/links.html` to emit `lang` per nav item and verify with a screen reader, or (b) adopt the two-build option the research document already describes, which the theme's own migration notes support ("users can blend custom includes and layouts to internationalize their sites"). Decide before authoring, not at the accessibility gate.

**H3 — Five content surfaces, one unenforced convention.**

The drift surface is larger than the four in the question: EN site pages, FR site pages, EN deck records, FR deck records, and the root README agenda — all hand-maintained, with slide bodies and notes living in a JavaScript generator that no Jekyll page reads. `translation_key` is described in the research document itself as "proposed validation metadata, not a built-in translation plugin", and no validator is specified anywhere. Over one revision cycle the predictable outcome is a deck that teaches a step the lab page no longer contains.
*Mitigation:* Single source of truth. Put the paired records (ids, durations, lab ids, EN/FR title/body/notes, source URLs) in `docs/_data/workshop.yml`, have Jekyll render lab and download pages from it and the Node generator read the same file, and derive the README agenda section table from it too. Then add a real parity gate: same id set across languages, non-empty EN and FR strings for every field, duration sum equals the agenda total, and every lab id referenced by a slide exists as a page. Anything less than a build-failing check will drift.

**H4 — The deck toolchain's dependency posture is understated and undated.**

pptxgenjs 4.0.1 carries four runtime dependencies, not two, including `https@^1.0.0` and `@types/node@^22.8.1` (see item 1). The package's last publish is roughly fifteen months before this review (2025-06-26, shown by npm as "a year ago"), so no upstream security patch cadence should be assumed. The research document correctly refuses to claim an audit was performed and correctly labels the prior image-size concern as historical, which is good practice — but it also proposes pinning `"pptxgenjs": "4.0.1"` as an explicit baseline before any audit exists.
*Mitigation:* Run `npm audit --omit=dev` and review the full transitive tree before committing `package-lock.json`. Explicitly decide whether `https@1.0.0` is acceptable in the supply chain for a deliverable distributed to a customer audience; if not, the deck generator needs a different library or a vendored build. Record the audit date and result next to the pin.

**H5 — The deck validation script cannot fail for the defect it exists to catch.**

The proposed PowerShell check asserts 16 slide parts, 16 notes parts, non-empty `<a:t>` text, and that notes contain the substring `https://`. Two English decks named `-en.pptx` and `-fr.pptx` would pass every assertion. So would a French deck whose notes are entirely English with one URL pasted in. So would a deck whose slide 7 content was duplicated into slide 8. The check validates package structure, which the research document honestly states — but it is then positioned as the gate that "must block deployment", and it cannot block the most likely bilingual failure.
*Mitigation:* Assert per-slide: the expected slide id token appears on the expected slide index; the EN and FR text for each slide id differs; the FR deck contains accented characters (`[éèàçîôûù]`) above a threshold; every notes part contains its own lab URL rather than any URL; and the two decks have identical slide counts and identical id ordering. Then keep the structural check as a cheap precondition, not as the gate.

### MEDIUM

**M1 — `exclude:` replaces the Jekyll 3 default exclusion list, re-admitting cache directories.**

Jekyll's configuration reference is explicit: "In Jekyll 3, the `exclude` configuration option **replaces** the default exclusion list. In Jekyll 4, user-provided entries get added to the default exclusion list instead." github-pages 232 pins Jekyll **3.10.0**, so the proposed `exclude: [Gemfile, Gemfile.lock, vendor, .bundle]` discards the defaults, which include `.sass-cache/`, `.jekyll-cache/`, `node_modules/`, and the `vendor/bundle|cache|gems|ruby` entries. A local build then copies `docs/.jekyll-cache/` and `docs/.sass-cache/` into `_site`, and those get uploaded as part of the Pages artifact.
*Mitigation:* Re-add the full default list alongside the custom entries, or drop `exclude` entirely and rely on the defaults plus `.bundle`/`vendor` additions.

**M2 — The recommended stack sits on a path the theme has formally deprecated.**

github-pages 232 pins Jekyll 3.10.0 and jekyll-sass-converter 1.5.2. just-the-docs v0.10.1's gemspec permits `jekyll >= 3.8.5`, so this is supported today, but the theme's migration guide carries a standing deprecation: "You can still use Jekyll 3 (3.8.5 or later) ... However, future releases of the theme may require the use of Jekyll 4," and it directs Jekyll 4 users to GitHub Actions. The plan chooses Actions anyway, so it is paying the cost of a custom workflow while still taking Jekyll 3 via the github-pages gem. Whether v0.10.1's SCSS compiles cleanly under jekyll-sass-converter 1.5.2 is **UNVERIFIABLE without running the build** — the gemspec evidence points toward compatibility, but only a build settles it.
*Mitigation:* Since the plan already commits to a custom Actions build, drop `github-pages` and depend on `jekyll ~> 4`, `just-the-docs`, `jekyll-seo-tag`, and `jekyll-include-cache` directly with a committed lock. That removes the deprecation, removes M1 (Jekyll 4 merges rather than replaces `exclude`), and removes M3. Keep `github-pages` only if the branch fallback is genuinely going to be used.

**M3 — Managed branch builds and local `bundle exec` builds are not the same build.**

A branch-based Pages build auto-enables plugins that a local or Actions `bundle exec jekyll build` will not load from a `plugins:` list — among them `jekyll-relative-links`, `jekyll-optional-front-matter`, `jekyll-readme-index`, and `jekyll-titles-from-headings`. `jekyll-relative-links` rewrites relative `.md` links; `jekyll-titles-from-headings` can synthesise titles, which interacts directly with a title-driven navigation theme. The plan treats the branch path as a drop-in fallback for the Actions path. It is not output-equivalent.
*Mitigation:* Pick one publishing path and validate that one. If the branch fallback must stay live, validate it separately and document the plugin delta.

**M4 — The workflow exists only as prose, and the prose is missing required pieces.**

The Workflow Contract is five numbered sentences plus a deploy-job fragment. Compared with the official starter workflow it omits: the `concurrency: { group: "pages", cancel-in-progress: false }` block (without which two pushes can race and one deployment fails), `JEKYLL_ENV: production` (which changes jekyll-seo-tag output), any named runtime setup action (`actions/setup-node`, `ruby/setup-ruby` — the official workflow pins the latter to a commit SHA), and any cache configuration. It also names no trigger branch, correctly noting the default branch must not be assumed.
*Mitigation:* Write the workflow file and diff it against `actions/starter-workflows/pages/jekyll.yml` before claiming the contract is complete.

**M5 — The deck outline contradicts the agenda the primary document declares authoritative.**

Slide 04's note says "Demonstrate approved folder/repository and **Interactive** mode", while agenda section 2's stated outcome is "Select approved project and **Plan** mode". The primary document already knows this — "Modify draft slide 04-05 content to include Plan mode" — but the deck outline handed to implementation still carries the wrong mode. Separately, slide 05 allocates **10 of the 90 minutes** to "Lab 00: Ready Check" covering "sign-in, Git, app permission, usage budget, and session", which is setup, while the primary document states "Installation/sign-in occur before the timed workshop" and "Do not add a second setup or planning time allocation."
*Mitigation:* Resolve both before authoring. Either preflight genuinely covers sign-in and slide 05 shrinks to a verification checkpoint, or the agenda stops claiming preflight covers it.

**M6 — Committing generated .pptx guarantees churn that cannot be reviewed.**

For the branch fallback, the plan says to commit both binaries. The research document already establishes that "PPTX ZIP timestamps/metadata may prevent byte-for-byte equality", which means every regeneration produces a differing binary even when the content is identical. The result is a repository where two opaque multi-megabyte blobs change on every content edit, no diff is reviewable, history grows monotonically, and a reviewer cannot tell a translation fix from a rebuild.
*Mitigation:* Prefer the Actions path and keep the decks in the artifact only. If binaries must be committed, normalise ZIP timestamps in the generator so identical content yields identical bytes, commit only on release, and record the generator input hash in the commit message.

**M7 — The layout override is pinned to theme internals that the theme says will break.**

Copying `_layouts/default.html` from v0.10.1 makes the site depend on that release's internal include names and front matter (`layout: table_wrappers`, `components/sidebar.html`, `components/header.html`, `components/breadcrumbs.html`, `components/children_nav.html`, `components/footer.html`, `components/search_footer.html`, `components/mermaid.html`). The theme's migration guide states directly: "If your repo has a customised copy of `_layouts/default.html` from a previous release, try removing it, or replace it by a fresh copy of the theme file," and both v0.11.0 and v0.12.0 ship migrations touching sidebar and footer components. The pin protects today and blocks the accessibility-motivated contrast fixes shipped in v0.11.0.
*Mitigation:* Keep the override as small as possible and record the exact theme version it was copied from in a comment. Re-derive it deliberately on every theme bump. Consider whether `_includes/head_custom.html` plus a `nav_footer_custom.html` can carry the needed changes without a full layout copy.

### LOW

**L1 — `nav_exclude`/`search_exclude` defaults scoped to `assets` are inert.** The theme's navigation iterates `site.html_pages`; `.pptx` and `.png` are static files and never appear there. `search_enabled: false` already makes `search_exclude` moot. The lines cost nothing but imply a protection that does not exist.

**L2 — `has_children: true` is redundant.** Confirmed both in the theme docs ("now redundant (and ignored, except when significant for backwards compatibility)") and in `children.html`, which only tests `has_children != false`. Harmless as a compatibility hint, as the research document says.

**L3 — Two links, one destination.** The theme sidebar already links the site title to `/`. Adding a top-level nav item titled "English" that also resolves to `/` gives two links with different accessible names pointing at the same page. Minor, but it is the kind of thing an accessibility reviewer will raise given the plan's stated gates.

**L4 — A tag pin is not an immutable pin.** `remote_theme: ...@v0.10.1` is fetched over the network from GitHub at every build and a tag can be moved. The research document is right that a floating remote theme breaks determinism; a tag is only slightly better. The immutable value is `7fc56e2016fe4615331db2ae13f2f65abb03153f`. Note also that any remote-theme build has a hard network dependency on codeload at build time.

**L5 — Two cheap checks that read as coverage.** `node --check scripts/build-workshop-deck.mjs` proves only that the file parses; it says nothing about deck output. `permalink: pretty` in `_config.yml` has no effect because every proposed page sets an explicit `permalink`. Neither is harmful; both should be described accurately.

**L6 — MIT attribution is an obligation, not a courtesy.** Any copied theme file must carry "Copyright (c) 2016 Patrick Marsceill" and the MIT permission notice. State this as a concrete implementation step rather than as "respect upstream licensing".

## Timing Arithmetic — Independently Verified CORRECT

Recomputed from the 16-row outline table, not from the document's own summary line:

| Group | Slides and minutes | Sum | Claimed |
|-------|--------------------|-----|---------|
| 01-03 | 2 + 3 + 5 | 10 | 10 |
| 04-05 | 5 + 10 | 15 | 15 |
| 06-08 | 5 + 5 + 20 | 30 | 30 |
| 09-11 | 3 + 9 + 3 | 15 | 15 |
| 12-14 | 4 + 8 + 3 | 15 | 15 |
| 15-16 | 3 + 2 | 5 | 5 |
| Total | | **90** | 90 |

Also correct: the four lab pauses (05, 08, 10, 13) sum to 10 + 20 + 9 + 8 = **47**, and 90 − 47 = **43**, matching the stated remainder. Slide ids 01-16 each appear exactly once, and the six group ranges partition them without gap or overlap. The agenda's 10/15/30/15/15/5 matches the slide groups one-for-one.

The arithmetic is sound. The substantive problem is M5: correct sums over a section whose content contradicts the agenda it is timed against.

## Corrected Technical Facts

These are the statements an implementer should carry forward instead of the versions in the source documents:

1. pptxgenjs current published version is **4.0.1** (2025-06-26); v4.0.0 introduced **no** breaking change to `addSlide`, `addText`, `addNotes`, or `writeFile`.
2. pptxgenjs 4.0.1 runtime dependencies are **`@types/node` ^22.8.1, `https` ^1.0.0, `image-size` ^1.2.1, `jszip` ^3.10.1** — four, not two.
3. `lang` is a real `TextBaseProps` option reachable from `addText`; `slide.background = { color }` is the current API; `background.fill` is deprecated since v3.6.0.
4. just-the-docs current release is **v0.12.0**; v0.10.1 exists at commit `7fc56e2016fe4615331db2ae13f2f65abb03153f`.
5. just-the-docs v0.10.1 gemspec requires `jekyll >= 3.8.5` with no upper bound; Jekyll 3 is deprecated by the theme, not unsupported.
6. github-pages **232** is current and pins `jekyll = 3.10.0`, `jekyll-remote-theme = 0.4.3`, `jekyll-seo-tag = 2.8.0`, `jekyll-include-cache = 0.2.1`, `jekyll-sass-converter = 1.5.2`.
7. Current action majors: **checkout v7.0.1, configure-pages v6.0.0, upload-pages-artifact v5.0.0, deploy-pages v5.0.1**. Current official Pages starter workflow: **checkout@v4, configure-pages@v5, upload-pages-artifact@v3, deploy-pages@v5**.
8. `actions/configure-pages` does **not** inject a baseurl into Jekyll; Jekyll must be given `--baseurl "${{ steps.pages.outputs.base_path }}"` explicitly.
9. In **Jekyll 3**, `exclude` replaces the default exclusion list; in Jekyll 4 it is additive.
10. Jekyll front-matter defaults resolve by **scope specificity**, so `path: fr` correctly overrides `path: ""`.
11. just-the-docs navigation has **no special case** for the home page or `permalink: /`; top-level nodes are `html_pages` with a title, no parent, and no `nav_exclude`.
12. just-the-docs `children.html` rejects a child only when `grand_parent != node.parent`; a wrong `grand_parent` removes the page from navigation **without a build error**.
13. just-the-docs is MIT, "Copyright (c) 2016 Patrick Marsceill"; copied files must retain the copyright and permission notice.

## Sources Consulted

All retrieved 2026-09-22. Retrieval dates are not publication dates.

* npm package page: <https://www.npmjs.com/package/pptxgenjs>
* PptxGenJS releases: <https://api.github.com/repos/gitbrent/PptxGenJS/releases>
* PptxGenJS v4.0.1 manifest: <https://raw.githubusercontent.com/gitbrent/PptxGenJS/v4.0.1/package.json>
* PptxGenJS v4.0.1 types: <https://raw.githubusercontent.com/gitbrent/PptxGenJS/v4.0.1/types/index.d.ts>
* just-the-docs latest release: <https://api.github.com/repos/just-the-docs/just-the-docs/releases/latest>
* just-the-docs v0.10.1 tag: <https://api.github.com/repos/just-the-docs/just-the-docs/git/ref/tags/v0.10.1>
* just-the-docs v0.10.1 gemspec, README, index.md, LICENSE.txt, `_layouts/default.html`, `_includes/components/site_nav.html`, `_includes/components/nav/children.html`, `_includes/components/nav/sorted.html` (raw.githubusercontent.com at tag v0.10.1)
* Theme navigation docs: <https://just-the-docs.com/docs/navigation/main/>, <https://just-the-docs.com/docs/navigation/main/levels/>, <https://just-the-docs.com/docs/navigation/main/ancestry/>
* Theme migration guide: <https://just-the-docs.com/MIGRATION/>
* jekyll-remote-theme README: <https://raw.githubusercontent.com/benbalter/jekyll-remote-theme/master/README.md>
* github-pages gem metadata: <https://rubygems.org/api/v1/gems/github-pages.json>
* Jekyll configuration options: <https://jekyllrb.com/docs/configuration/options/>
* Jekyll front matter defaults: <https://jekyllrb.com/docs/configuration/front-matter-defaults/>
* GitHub Pages theme docs: <https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll>
* Official Pages starter workflow: <https://raw.githubusercontent.com/actions/starter-workflows/main/pages/jekyll.yml>
* Action latest releases: `https://api.github.com/repos/actions/{checkout,configure-pages,upload-pages-artifact,deploy-pages}/releases/latest`

## What Remains Unverifiable Without Executing the Build

These are stated as open, not as passes:

* Whether just-the-docs v0.10.1 SCSS compiles under jekyll-sass-converter 1.5.2 as pinned by github-pages 232. Gemspec evidence favours compatibility; only a build proves it.
* Whether `upload-pages-artifact@v4` and `deploy-pages@v4` are a working pair. No official example uses that combination.
* Whether the rendered sidebar, breadcrumbs, and children navigation behave as intended with two language groups, including expander state and the mobile menu.
* Whether the generated decks render without clipping or French wrapping failures. Structural ZIP/XML validation cannot answer this, as the research document correctly states.
* Actual Pages eligibility, visibility, deployed URL, base path, and organization Actions policy for the target repository. No remote setting was queried.

## Next Verification Checklist

* [ ] Re-fetch all action, gem, theme, and npm versions immediately before implementation and record retrieved values with URLs.
* [ ] Decide the Jekyll 3 vs Jekyll 4 question (M2), which also settles M1 and M3.
* [ ] Write the workflow file and diff it against the current official starter workflow (M4, C2).
* [ ] Add `fs.mkdirSync(..., { recursive: true })` and post-generation existence assertions to the generator contract (C1).
* [ ] Replace the deck structural check with per-slide, per-language assertions (H5).
* [ ] Choose the single source of truth for paired content and write the parity gate that fails the build (H3).
* [ ] Decide the Language of Parts approach before authoring pages (H2).
* [ ] Run `npm audit --omit=dev` on the resolved tree and record the result and date next to the pin (H4).
* [ ] Resolve the Interactive vs Plan mode contradiction and the slide 05 setup allocation (M5).
