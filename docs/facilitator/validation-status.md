---
title: Validation Status
description: What was machine-verified, what was human-judged, what was not verified at all, and the blocking gates that keep this workshop off any delivery calendar.
lang: en
translation_key: facilitator-validation-status
lang_ref: /fr/facilitator/validation-status/
parent: Facilitator Kit
nav_order: 4
covers:
  - unrehearsed-proposal-notice
  - scope-boundaries
---

# Validation Status

Recorded 2026-09-22, at the end of authoring, and revised the same day after GitHub Pages was enabled, the first workflow run deployed successfully, and the navigation was scoped to one language at a time. This page exists so that nobody has to infer the state of this workshop from the fact that a build passed.

> [!CAUTION]
> **This workshop is not delivery-ready, and no delivery date should be offered to any customer until the blocking gates below are closed.** Everything that has been verified is a property of this repository. Nothing that has been verified is a property of a room, a network, a tenant, a device image, or the app itself. A green build proves the site and the decks were produced correctly. It proves nothing about whether the session works.

## How to read this page

Three categories, kept strictly apart, because the failure mode this page is written against is a not-verified item being reported inside a verified one.

* **Machine-verified.** A command was run, its exit status observed, and its assertion is one that fails when the property is false. Reproducible by anyone who runs the same command.
* **Human-judged.** A person looked at something and formed an opinion. Real evidence, weaker than a machine check, and not reproducible by re-running anything.
* **Not verified at all.** No check was performed. An item here is not "probably fine". It is unknown.

## Machine-verified

Every item below was executed against this repository on the recorded date and exited zero.

| Check | Command | Result |
| --- | --- | --- |
| Clean dependency install | `npm ci` | 21 packages, reproducible from the lockfile |
| Production dependency audit | `npm run audit:deps` | 0 vulnerabilities, matching the SUPPLY-CHAIN.md baseline |
| Dependency drift | `npm ls --omit=dev --all` compared to SUPPLY-CHAIN.md | Package set identical, no drift |
| Deck generation from a clean tree | `npm run build:decks` with the output directory deleted first | Both decks produced, generator created its own output directory |
| Site build | `bundle exec jekyll build` with `BUNDLE_GEMFILE=docs/Gemfile` | Built, no errors |
| Content parity across five surfaces | `npm run validate:content` | 28 pages, navigation clean, base path asserted against the built site |
| Per-slide deck validation | `npm run validate:decks` | 16 slides per deck, six sections, French accent ratio 3.14 percent against a 1.50 percent floor |
| Internal link resolution | `npm run validate:links` | 28 documents scanned, 871 internal references resolved to files on disk, 303 fragments resolved to ids, both deck downloads resolved |
| Internal link cross-check | `htmltest` 0.17.0 against the built site | 28 documents, no issues, independently agreeing with the row above |
| External links | `npm run validate:links -- --external` | 13 distinct URLs, all HTTP 200 |
| Accessibility, every published page | axe-core 4.13.0, WCAG 2.0/2.1/2.2 A and AA rulesets, all 28 pages at 1280 and at 400 CSS pixels, requested from the live site | Zero violations across all 56 runs, 15,677 passing checks |
| Tab order and document language | Static audit of all 28 built pages | Skip link first on all 28, no positive `tabindex`, 14 pages declare `en` and 14 declare `fr` |
| Reflow | All 28 published pages at 640 and at 320 CSS pixels | No horizontal scrolling in any of the 56 checks |
| Deck geometry across every slide | Text and box geometry read from the generated `.pptx` binaries, 160 text shapes across all 32 slides | Every measured string fits its box, no shape placed off-slide |
| Published site, served from the real base path | 15 live URLs requested from `https://devopsabcs-engineering.github.io/github-copilot-app-workshop/` after the first successful deployment | All 15 returned HTTP 200, including both `.pptx` downloads; no href leaked a `/docs/` prefix, and 37 hrefs carried the base path |
| Language toggle integrity | `npm run validate:content` | All 28 pages declare a `lang_ref`; every one resolves to a real page in the other language, and every pair round-trips |
| Navigation scoped to one language | All 28 built pages inspected, plus a real browser at 1280 CSS pixels | Each page's head hides the other language's sidebar items; an English page shows six English top-level links and no French ones, and a French page the mirror |

Four accessibility defects were found by these checks and fixed rather than recorded. The first two are related: fixing one created the other.

* Every table on the site was a horizontally scrolling container that could not receive keyboard focus, which axe-core reported as `scrollable-region-focusable` on both language trees. This is a WCAG 2.1.1 Keyboard failure. The table wrapper is now focusable and carries a language-appropriate accessible name.
* Naming every wrapper with one identical label then made each table an indistinguishable landmark, which axe-core reported as `landmark-unique` on every page carrying two or more tables, in both language trees. The label in `docs/_layouts/table_wrappers.html` is now numbered per table within its page, so each landmark is distinguishable in a landmark list.
* Ten facilitator pages, five per language, carried no level-one heading at all, because each opened at `##` and the theme layout does not render the front matter title into the page body. axe-core reported this as `page-has-heading-one`. Every one of those pages now opens with an `h1`, and all 28 built pages carry one.
* The theme's site-footer attribution was English prose rendered unconditionally inside every French page, unmarked. That is a WCAG 3.1.2 language-of-parts failure. It is now translated on French pages, and the English variant declares its own language.

## Human-judged

* The five highest-risk slides — French slides 1, 7, 12, and 14, and English slide 3, which carry the longest footer, the longest bodies, the longest kicker, and the longest titles — were examined as text extracted from the binaries and read directly, with each string measured against its box. The strings fit, and the accented characters survived generation intact. **This is a reading of extracted text, not of a picture. No slide has ever been rendered to an image.** See DR-08 below.
* The written content of the labs, the facilitator kit, and both decks was authored and reviewed by hand. No automated check establishes that the prose is correct, current, or pedagogically sound.

## Not verified at all

Nothing in this section was checked. None of it should be described as working.

* **Screen reader announcement.** The navigation was confirmed to mark every link with its own language: 28 links per page, 14 declaring `en` and 14 declaring `fr`, with the rendered sidebar byte-identical across both language trees, exactly as the cached-sidebar constraint requires. Half of them are now hidden per page by CSS, but all 28 remain in the document, and the language toggle link carries `lang` and `hreflang` for its target language on the same reasoning. **That is markup, not announcement.** No screen reader was run. Whether any assistive technology actually switches voice on those attributes is unknown, so WCAG 3.1.2 conformance for the navigation and the toggle is unconfirmed. Emitting a `lang` attribute is not evidence that anything is announced differently.
* **The language toggle under assistive technology.** Its `<nav>` landmark was confirmed to have a unique accessible name, and the visible link text is in the target language. Whether a screen reader user can tell from that alone that the link changes the whole site's language was not tested.
* **Colour contrast in the site title and the sidebar links.** axe-core returned these as *incomplete*, not as passes: it could not compute them because the elements are partially obscured or sit on a gradient. There were 56 such nodes across the 28 pages at 1280 CSS pixels, and none at 400 pixels where the sidebar collapses. Recomputing the ratios by hand from the rendered colours puts all of them above AA, the thinnest being the sidebar link at 5.03:1 against a 4.5:1 requirement. That margin is thin enough that a theme change could cross it silently, and a hand calculation is not the same as a tool pass.
* **The visual appearance of either deck.** No renderer exists in this environment, so no slide has ever been displayed. Geometry was measured from the binaries, which bounds the risk of overflow but says nothing about legibility, contrast, visual balance, or font substitution. This is blocking gate DR-08.
* **Every lab prompt.** No prompt in this repository has ever been executed in a workshop. No capability name that any of them produces is guaranteed. No result from any of them has been observed by anyone.
* **Timing.** No section duration, no beat decomposition, and no abort threshold has been measured. Every minute figure on this site is an estimate.
* **Sidebar behaviour without CSS `:has()` or JavaScript.** The hiding rule and its JavaScript fallback were each confirmed to work in a current browser. No older browser was tested. Where neither mechanism is available both language trees stay visible, which is a cosmetic regression rather than a broken site, but that degraded path has not been observed.

## Blocking gates

Each gate below is open. Each one blocks delivery on its own; they do not trade against one another, and a count of how many are closed is not a readiness measure.

| Gate | What is open | Owner | Evidence that closes it |
| --- | --- | --- | --- |
| CUR-C1 | The reference canvas has never been generated, reviewed, or staged on a device image. Without it the section three abort path does not exist. | Curriculum lead | A staged, copyable directory path on the attendee image, plus the review record |
| CUR-C2 | No timed dry run has been performed, in either language. Two per language are required, on the attendee device image. | Curriculum lead, one named facilitator per language | Four recorded wall-clock run logs, two English and two French, with per-section timings |
| CUR-C5 | Venue concurrency has never been tested. Twenty simultaneous sessions, including staggered waves, is an assumption. | Delivery lead with the venue | A recorded concurrency test at the real cohort size on the real network |
| PRD-H1 | Network and proxy behaviour is unverified, including the unsupported TLS-intercepting proxy case. | Customer network owner | A returned connectivity result from the customer network, naming the proxy configuration |
| PRD-H2 | No per-seat AI credit budget, usage baseline, or throttling fallback exists. | Customer billing or tenant owner | A stated per-seat entitlement and a written fallback for exhaustion mid-session |
| PRD-H6 | Telemetry disclosure has not been delivered, and there is no written approval to execute AI-generated code on managed devices. | Customer governance or security owner | A signed approval, and a record that the disclosure was delivered |
| RC-04 | Per-seat enterprise app policy has not been verified. Organization policy can block the app independently of plan entitlement. | Customer tenant administrator | A per-seat policy check result from the real tenant |
| DR-07 | No screenshot exists anywhere in this repository, because screenshots require a rehearsal that has not happened. | Curriculum lead | Sanitized images captured during the rehearsal, each carrying its app version and capture date |
| DR-08 | Neither deck has ever been rendered or looked at. No PowerPoint or equivalent renderer exists in this environment, so the inspection was reduced to measuring extracted text against box geometry. Legibility, contrast, visual balance, and font substitution remain unexamined. | Curriculum lead | All 32 slides rendered and inspected, plus a design review by the curriculum owner |
| OD-02 to OD-05, OD-07, OD-08 | Open owner decisions: approval to run generated code, the hands-on cap and facilitator count, whether the languages are separate cohorts, whether learners may retain generated code, how learners are assigned to a track, and acceptance of the `https` placeholder package. | Delivery owner and customer sponsor | A recorded decision per item |

Two gates that appeared in an earlier revision of this table, DR-09 and DR-10, are now closed. Pages is enabled with the Actions source; `ruby/setup-ruby` turned out to be permitted already, and the first run failed instead on a pinned action version whose bundled Ruby index predated 3.2.11. The pin was moved forward and the run went green. Neither closure tells you anything about the session itself, which is the point this table exists to make.

DR-08 deserves a plain statement, because an earlier revision of this page claimed it had been closed. It has not. The generator-side layout defect it was raised against was found and fixed, and all 160 text shapes across all 32 slides were measured against their boxes with no overflow found, but **measuring a binary is not looking at a slide.** No renderer was ever available here. The gate stays open.

## Tooling substitutions

Two checks were run with tools other than the ones originally named. Both substitutions are recorded here rather than left implicit.

* **Link checking.** `lychee` and `linkinator` were unavailable: the configured package proxy refuses every tarball fetch with `EALLOWREMOTE`. `scripts/validate-links.mjs` was written instead. It resolves rather than pattern-matches, mapping every reference to a concrete file in the built site and every fragment to an id in the target document. It was proved against a deliberately broken copy of the site carrying a missing page, a missing fragment, a missing deck, and a base-path escape, and it reported all four and exited non-zero. It now runs in `validate:all` and in the publishing workflow. `htmltest` 0.17.0 was subsequently installed through `go install`, which does not use the npm proxy, and run against the built site as an independent cross-check: 28 documents, no issues, agreeing with the local validator. `htmltest` is a cross-check only and is not wired into `validate:all`, because it is not a declared dependency of this repository.
* **Accessibility.** `pa11y` could not be installed for the npm proxy reason above. `axe-core` 4.13.0 — one of the two tools originally named — was loaded directly from a CDN and run in a real browser against all 28 built pages at two viewport widths. This is the named tool, not a substitute; only its delivery route changed.

## What invalidates this page

Re-run the checks and re-date this page when the content model changes, when the theme or any dependency is upgraded, when a rehearsal is performed, or when the publishing workflow changes. A validation record that outlives the thing it describes is worse than none, because it invites exactly the assumption this page exists to prevent.
