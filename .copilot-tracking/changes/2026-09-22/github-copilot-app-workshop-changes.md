<!-- markdownlint-disable-file -->
# Release Changes: GitHub Copilot App Bilingual Workshop

**Related Plan**: github-copilot-app-workshop-plan.instructions.md
**Implementation Date**: 2026-09-22

## Summary

Builds a bilingual ninety-minute GitHub Copilot app workshop: a root README agenda, an English and French Jekyll site with four hands-on labs and a facilitator kit, two generated PowerPoint decks, and a validation toolchain that enforces content parity across all five surfaces.

## Changes

### Added

* CONTRIBUTING.md - local preview, deck build, and validation commands, plus the three areas that should not be changed casually.
* scripts/serve-site.mjs - cross-platform wrapper around `bundle exec jekyll serve` that points Bundler at `docs/Gemfile` and prints the base-path URL to open.
* package.json - ESM Node workspace, engines floor, and the build, validate, and audit script chain.
* package-lock.json - committed lockfile, 21 packages, registry URLs normalized to the public registry.
* .gitignore - ignores node_modules/, _site/, .jekyll-cache/, and generated decks; Gemfile.lock and package-lock.json deliberately tracked.
* .editorconfig - UTF-8 without BOM, LF, final newline, required for French content integrity.
* SUPPLY-CHAIN.md - resolved dependency pins, before and after `npm audit --omit=dev` output, audit date, and the recorded decisions on the `https`, `js-yaml`, and `image-size` packages.
* content/workshop-content.mjs - six sections and sixteen slides with per-language durations, translation keys, required-content markers, and source provenance.
* content/task-board-fixture.json - synthetic four-task seed fixture with paired EN and FR titles.
* scripts/validate-content.mjs - five-mode parity validator covering the content model, front matter, counterpart matching, `covers:` markers, slug policy, README alignment, and the post-build base path assertion.
* docs/Gemfile - Jekyll ~> 4.3, just-the-docs pinned to the exact version 0.12.0, webrick, jekyll-include-cache, and jekyll-seo-tag.
* docs/Gemfile.lock - committed, resolving Jekyll 4.4.1, with the x86_64-linux platform added so a Linux runner can resolve the lock.
* docs/_config.yml - gem theme, no hardcoded base path, and `defaults` scoping `lang: en` to the docs root and `lang: fr` to `fr/`.
* docs/_layouts/default.html - layout override copied from the installed gem, switching the document language to `page.lang` and localizing the skip link, with the Just the Docs MIT notice retained.
* docs/_includes/components/nav/links.html - navigation override marking every link with its own target language.
* docs/index.md, docs/prerequisites.md, docs/fr/index.md, docs/fr/prerequis.md - placeholder entry pages proving the shell, to be overwritten by Implementation Phases 3 and 4.
* .gitattributes - `* text=auto eol=lf` plus binary handling, preventing a contributor with `core.autocrlf=true` from reintroducing CRLF into French content.
* docs/downloads.md, docs/resources.md - English entry pages carrying the deck links and the dated source register.
* docs/labs/index.md - English labs landing page with the two-column oracle table naming what to assert and what never to assert.
* docs/labs/lab-00-setup.md, docs/labs/lab-01-create-canvas.md, docs/labs/lab-02-refine-canvas.md, docs/labs/lab-03-verify-share.md - the four English labs.
* docs/fr/telechargements.md, docs/fr/ressources.md - French entry pages with localized slugs.
* docs/fr/labs/index.md, docs/fr/labs/lab-00-setup.md, docs/fr/labs/lab-01-create-canvas.md, docs/fr/labs/lab-02-refine-canvas.md, docs/fr/labs/lab-03-verify-share.md - the French labs, authored as primary French, with lab slugs byte-identical to English.
* scripts/build-workshop-deck.mjs - generator emitting one sixteen-slide widescreen deck per language from the frozen content model, creating its gitignored output directory recursively and throwing on any write failure.
* scripts/validate-decks.mjs - ZIP-based per-slide deck validator resolving slide order through the presentation relationships rather than part filenames.
* docs/facilitator/index.md, docs/facilitator/preflight.md, docs/facilitator/running-the-session.md, docs/facilitator/reference-canvas.md - the English facilitator kit.
* docs/fr/facilitator/index.md, docs/fr/facilitator/preflight.md, docs/fr/facilitator/running-the-session.md, docs/fr/facilitator/reference-canvas.md - the French facilitator kit.
* .github/workflows/pages.yml - Pages publishing workflow with all six actions pinned by verified full-length commit SHA, decks built and validated before the Jekyll build, the base path sourced from the Pages configure step, and a non-zero deck assertion before artifact upload.
* PUBLISHING.md - confirmed repository facts, the owner-only actions code cannot perform, and the written-acceptance table for the Actions single point of failure.
* scripts/validate-links.mjs - link checker resolving every internal reference to a real file and every fragment to a real id in the built site, proved against a deliberately broken copy carrying a missing page, a missing fragment, a missing deck, and a base path escape.
* docs/_layouts/table_wrappers.html - table wrapper override making scrolling tables keyboard reachable with a per-page numbered, language-appropriate accessible name.
* docs/facilitator/validation-status.md, docs/fr/facilitator/validation-status.md - the written record separating what was machine-verified from what was human-judged from what was not verified at all, with the open blocking gates.
* docs/_includes/head_custom.html - per-page CSS hiding every navigation item whose link declares the other language, with a JavaScript fallback for browsers without `:has()`, and the styling for the language toggle.

### Modified

* docs/index.md, docs/prerequisites.md - Phase 2 placeholders overwritten with real English content.
* docs/fr/index.md, docs/fr/prerequis.md - Phase 2 placeholders overwritten with real French content.
* README.md - replaced the bare repository name with the six-section timed agenda in the exact form the validator parses, and added the publishing pointer.
* docs/downloads.md, docs/resources.md, docs/fr/index.md, docs/fr/prerequis.md, docs/fr/labs/index.md, docs/fr/labs/lab-00-setup.md - reconciled `covers:` parity by adding the missing prose first and the marker second.
* docs/facilitator/index.md, docs/fr/facilitator/index.md - navigation order moved off a colliding value.
* scripts/validate-content.mjs - added a permanent navigation check covering group membership and order collisions.
* .github/workflows/pages.yml - moved the `ruby/setup-ruby` pin forward to v1.325.0, whose bundled Ruby index knows 3.2.11.
* docs/_layouts/default.html - added the English/French toggle landmark rendered from `page.lang_ref`, documented as the third change against the vendored theme layout.
* scripts/validate-content.mjs - made the navigation grouping key language-aware, de-verdicted two summary lines that printed a pass unconditionally, and added `validateLanguageToggle` asserting every `lang_ref` exists, crosses languages, and round-trips.
* All twenty-eight page files - added a `lang_ref` pointing at the counterpart page.
* docs/fr/index.md, docs/fr/prerequis.md, docs/fr/labs/index.md, docs/fr/telechargements.md, docs/fr/ressources.md, docs/fr/facilitator/index.md - removed the `parent: Français` front matter so the French sections sit at top level, and retitled the French home page to `Accueil`.
* The eight French lab and facilitator child pages - removed `grand_parent: Français`, leaving `parent` untouched.
* docs/facilitator/validation-status.md, docs/fr/facilitator/validation-status.md - corrected two statements the deployment had falsified, closed DR-09 and DR-10 in prose, recorded the published-site and language-toggle verifications, and refreshed the accessibility figures re-measured against production.
* scripts/validate-content.mjs - added `validateRenderedNavigation`, a post-build check reading every built HTML document to assert the per-language sidebar scoping that no source-level check can see.
* docs/facilitator/validation-status.md, docs/fr/facilitator/validation-status.md - restated the navigation-scoping row so it credits a permanent validator check rather than a one-off inspection, keeping the browser observation separate.
* package.json - added a `serve` script.
* README.md - replaced the paragraph asserting the site does not resolve with what the Pages API actually reports, and pointed at the new contributor guide.
* PUBLISHING.md - rewrote the observed-facts table, the four owner steps, the resolved site path, and the not-verified list against the live repository; left the single point of failure and the unsigned risk acceptance untouched.
* docs/facilitator/validation-status.md, docs/fr/facilitator/validation-status.md - added machine-verified rows for the cascade check, the local preview, the runner pins, and the deck render; rewrote the deck and degraded-sidebar entries; narrowed DR-08 from "never rendered" to "rendered, largely unreviewed".

### Removed

## Additional or Deviating Changes

* A scripted local preview was added after the sibling repositories were consulted, recorded as DD-16.
  * Those repositories document `bundle exec jekyll serve` in `CONTRIBUTING.md`, but their Gemfile sits at the repository root. Here it is in `docs/`, so the bare command fails and an npm script cannot set `BUNDLE_GEMFILE` portably. `scripts/serve-site.mjs` is the smallest wrapper that makes one command work on both shells.
  * Verified rather than assumed: both language home pages, a deep facilitator page, and a `.pptx` download returned HTTP 200, and the toggle round-tripped English to French and back in a real browser against the local server.
  * The base path matches production, so the bare host returns 404 by design. The script prints the URL to open, and `CONTRIBUTING.md` says so explicitly.
* The publishing record was rewritten against the live repository, recorded as DD-17.
  * `PUBLISHING.md` and one `README.md` paragraph still said Pages was not enabled, the repository was `internal`, and the published URLs did not resolve. All three had been false since the first deployment.
  * Replacement facts were read from the Pages, repository, and environments APIs. Two owner steps remain genuinely open and are now stated as such: environment protection rules, and written acceptance of the Actions single point of failure.
* A renderer was found and DR-08 was narrowed rather than closed.
  * PowerPoint 16.0 is installed here and reachable through COM. Both decks opened, each reporting 16 slides on a 16:9 stage, and all 32 slides exported to PNG.
  * Three were then looked at. Nothing overflowed, nothing clipped, and the French diacritics rendered as letters. Twenty-nine were rendered without being examined and no curriculum owner has reviewed any of them, so the gate stays open in its narrower form. An earlier pass in this project once closed DR-08 on a render that never happened; that mistake is not being repeated in the other direction by closing it on a render nobody reviewed.
  * The rendered slides surfaced WI-24, a straight-versus-typographic apostrophe difference between the decks and the site prose.
* Three follow-on items were closed by measurement rather than by code: WI-16 from the runner step logs, WI-21 from the two reproducible degraded sidebar paths, and WI-23 from a `getComputedStyle` read on a live page. WI-25 was opened for the unprotected `github-pages` environment.

* ID-01's recorded rationale was void on verification and the planning log was corrected.
  * Every pptxgenjs 3.x release from 3.0.0 through 3.12.0 declares `https@^1.0.0`, so pinning the previous major does not avoid the placeholder package. The pin stands, but on different grounds, and the `https` question is answered on its own terms in SUPPLY-CHAIN.md rather than by repeating a claim that does not hold.
* Two dependency decisions were made during Step 1.1 that the plan did not pre-record.
  * `js-yaml` moved to the 5.x line because one 4.x advisory has no backported fix, and `image-size` was overridden to 2.0.4 because no pptxgenjs release on either major requests a patched range. Both are documented in SUPPLY-CHAIN.md with smoke tests.
* The initial production audit returned three high-severity advisories, which were remediated rather than accepted, so the recorded baseline is zero vulnerabilities.
* Lockfile tarball URLs written by this machine's registry proxy were rewritten to the public registry with integrity hashes untouched, and `npm ci` was re-run to prove the result installs.
* The navigation override marks language absolutely rather than relatively, which is a correction to the obvious reading of the Step 2.3 criterion.
  * The theme pulls its sidebar through `include_cached` and its own source declares the component depends on `site` only. Marking a link only when its language differs from the current page made the French sidebar render byte-identical to the English one, because the cached sidebar serves the first-rendered page's answer everywhere. Every link now declares its own target language unconditionally. The rationale is recorded in the override file so it is not simplified back.
* `bundle lock --add-platform x86_64-linux` was run so the committed lockfile resolves on a Linux runner under frozen bundler settings.
* An additional Step 2.5 created .gitattributes, which the plan did not specify.
* Lab pages carry an H1 alongside a front matter `title`, which the repository markdown instruction discourages.
  * The theme layout does not render the front matter title into the page body, so removing the H1 would ship every page without a level-one heading in a project whose layout override exists precisely to fix an accessibility defect. The front matter title is separately required for navigation.
* Two labs carry more than the single copyable prompt the lab contract names.
  * Lab 01 needs a creation prompt, an interaction prompt, and a recovery prompt, because its objective is to act through both the interface and the agent. Lab 02 needs a fallback and a recovery prompt. Every block carries its own unrehearsed-proposal notice, verified one to one.
* Only the Lab 01 creation prompt is reproduced verbatim from the research; the remaining prompts were adapted.
  * The curriculum research blocks predate the recorded corrections and still contain explicit task identifiers, an absolute task count, label-dependent control names, and the superseded stop-if-installation-is-needed clause. The risk register wins where records conflict.
* The deck validator gained three assertion families the plan did not enumerate: a one-slide-untranslated fixture, a mode-naming check, and a setup-time check.
  * The plan's identical-decks fixture proved less than it appeared to. Replacing fifteen French slides with English also collapsed the accent ratio, so the aggregate check fired and the per-slide check was never shown to be load-bearing. A fixture where exactly one slide is untranslated and the accent ratio stays healthy is the only decisive evidence for the per-slide requirement.
* A deck layout defect was found and fixed in the generator before it could reach a render.
  * The right-hand standing footer was set at ten point in a box narrower than the longest French footer would render, with wrapping disabled. Both footer runs moved to nine point and the row was re-split. No binary was hand-edited.
* Step 5.3's manual visual inspection was not performed and is not claimed.
  * This environment cannot open PowerPoint. Actual binary text was extracted and the longest string per role measured against its box instead, and the inspection is carried as blocking delivery gate DR-08.
* The documented authoritative build command was incomplete and has been corrected in the implementation details.
  * The Gemfile lives in `docs/` and bundler resolves upward from the working directory, so the root invocation only worked in the long-lived terminal where `BUNDLE_GEMFILE` was already leaking. A clean shell, and every CI runner, failed outright. The command now carries the `BUNDLE_GEMFILE=docs/Gemfile` prefix everywhere.
* The navigation check became a permanent validator feature rather than a one-time fix.
  * Two pages collided on the same navigation order, in both language trees. A collision produces undefined sidebar order rather than an error, so correcting the two values without a standing check would have left the defect free to recur.
* `covers:` parity was reconciled toward the union by adding prose first.
  * Six page pairs disagreed because the English and French phases ran in parallel and could not read one another. Every added marker was confirmed against rendered text in the built HTML, so no marker rests on front matter alone.
* A fabricated verification claim was caught and reversed during the final reconciliation pass.
  * The validation status page had recorded DR-08 as closed, asserting that both decks were rendered and five slides inspected visually. No renderer exists in this environment, no slide image exists in the repository, and the changes log already stated the opposite. The provable half, that one hundred sixty text shapes across thirty-two slides were measured against their boxes, was retained and reattributed to binary measurement. The render and visual inspection claim was removed and DR-08 reopened. This is the single most important correction in the implementation, because it appeared inside the one document whose purpose is to be honest about what was verified.
* Accessibility defects were found by tooling and fixed rather than recorded as known issues.
  * Scrolling tables could not receive keyboard focus, every table on a page shared one identical landmark name, the theme footer rendered unmarked English inside French pages, and ten facilitator pages opened at the second heading level and so had no level-one heading at all. All four were fixed in source or in the layout, never in built output, and re-verified to zero violations.
* Link checking used a purpose-written resolver after the configured package proxy refused every candidate tool.
  * The tool substitution and its rationale are recorded on the validation status page rather than left implicit, and the checker was proved capable of failing before it was trusted.
* The sidebar was scoped to one language and an English/French toggle added, after the site was already live.
  * Added `docs/_includes/head_custom.html`, which emits per-page CSS hiding every navigation item whose link declares the other language, plus a JavaScript fallback for browsers without `:has()`. This had to be CSS rather than Liquid for the same reason the language override did: the theme renders the sidebar once through `include_cached` and reuses it byte-identically everywhere, so no Liquid condition inside the component can vary per page. The rule keys on the `lang` attribute the navigation component already emits rather than on href prefixes, because keying on hrefs would duplicate a fact the markup already states and would break the language-of-parts marking if the two ever drifted apart.
  * `docs/_layouts/default.html` gained a third documented change, a `<nav class="lang-toggle">` landmark rendered from `page.lang_ref`. The toggle sets no colour of its own so it inherits the theme's already-verified contrast rather than introducing a new pairing, and its link carries both `lang` and `hreflang`.
* The French navigation tree was flattened to top level, which the plan did not anticipate.
  * Every French page previously hung off a `Français` parent, so the French tree sat one level deeper than the English one and the toggle would have moved a reader between structurally dissimilar sidebars. The six French section entries are now siblings at top level, matching English exactly. The French home page is titled `Accueil` rather than `Atelier`, because `Atelier` and `Ateliers` differ by one character and would have sat adjacent in the sidebar; the mild asymmetry against `Workshop` is the lesser problem.
* The navigation validator's grouping key became language-aware, and two of its summary lines were de-verdicted.
  * Flattening French put both language trees at the same nesting depth, so the original key grouped English and French entries together and reported six false collisions. Adding page language to the key is a correction rather than a relaxation: two pages colliding within one language still fail. Separately, `validateNavigation` printed `Navigation OK: ... no parent or nav_order conflicts` unconditionally, including on the very run that reported a collision. Both that line and the counterpart summary now report measured counts and leave the verdict to the exit code.
* A new `validateLanguageToggle` check was added that the plan did not specify.
  * It asserts that every page declares `lang_ref`, that the target resolves to a real page, that the target is in the other language, and that the mapping is symmetric. Without it, a broken toggle would be invisible until a reader clicked it. It runs in full mode only, matching `validateCounterparts`, because a subtree validated in isolation cannot see its counterpart.
* Accessibility and reflow figures on both validation status pages were re-measured against the published site and revised downward.
  * The axe-core passing-check count fell from 16,101 to 15,677 and the incomplete-contrast node count from 75 to 56, because half the navigation links are now hidden by CSS and axe does not evaluate hidden nodes. The verdicts did not change: zero violations across 56 runs, and no horizontal scrolling across 56 reflow checks. Those pages also carried two statements that the deployment had falsified, including a bullet asserting the site was not published; both were corrected the same day.
* The rendered-sidebar census was promoted into the validator, closing follow-on items WI-15 and WI-22.
  * The counts that proved the language scoping worked came from scripts written to measure it once and deleted afterwards, so a regression that reintroduced cross-language links would have passed `validate:all` unnoticed. `validateRenderedNavigation` now reads every built HTML document in full mode and asserts, per page, that the head hides the other language and not its own, that every sidebar link declares a language so the hiding rule can match it, that no unexpected language appears, and that the toggle link names the other language in both `lang` and `hreflang`. It reports measured counts and leaves the verdict to the exit code, on the same reasoning as the de-verdicting above.
  * It was proved capable of failing before it was trusted. Four separate injections into one built page — removing the hiding rule, pointing the rule at the page's own language, stripping `lang` from a single sidebar link, and pointing the toggle at its own language — were each detected with exit 1, and each was reverted.
  * What it cannot do is check that the rule wins the cascade, because it reads markup and not computed style. That residue is recorded as WI-23 rather than left as an implied guarantee.

## Release Summary

All eight implementation phases are complete. Forty-nine files were created and one, the root README, was rewritten, excluding tracking artifacts and generated output.

### What was built

The workshop is one content model with five surfaces hanging off it. `content/workshop-content.mjs` holds the six sections, the sixteen slides, the controlled marker vocabulary, and the per-language duration allocation, and every other surface is checked against it rather than maintained alongside it.

* Tooling and supply chain: package manifest and lockfile, editor and attribute configuration, and SUPPLY-CHAIN.md recording resolved pins against a zero-vulnerability production baseline.
* Site: a Jekyll 4 build on a pinned Just the Docs gem, with two theme overrides correcting document language and language of parts, and a table wrapper override making scrolling tables keyboard reachable.
* Content: twenty-eight pages across an English tree and a French tree, four labs per language plus a bilingual facilitator kit, with lab and facilitator slugs identical across languages and entry slugs localized.
* Decks: a generator producing one sixteen-slide deck per language from the content model, and a per-slide validator that opens each file as a ZIP.
* Validation: four scripts covering content parity, deck contents, link resolution, and the composed chain, every one of them demonstrated failing against deliberately broken fixtures before being trusted.
* Publishing: a Pages workflow with all six actions pinned by verified commit SHA, decks built and validated before the site build, and PUBLISHING.md recording what a repository owner must do that code cannot.

### English and French are not a translation pair

Both languages are authored as primary and validated separately. The French session reallocates its ninety minutes differently, giving five extra minutes to the high-variance creation block and dropping the one checkpoint that no official documentation supports. The facilitator preflight carries one dated go or no-go decision per language, so an English pass does not authorize French delivery.

### Deployment notes

The site is published at `https://devopsabcs-engineering.github.io/github-copilot-app-workshop/`. Pages was enabled with the Actions source, closing DR-09. DR-10 turned out to be a misdiagnosis: `ruby/setup-ruby` was already permitted, and the first run failed instead because the pinned action version shipped a Ruby index that predated 3.2.11. Moving the pin to v1.325.0 made the run green. Fifteen live URLs were then requested and all returned HTTP 200, including both deck downloads, with no href leaking a `/docs/` prefix.

A later change scoped the sidebar to one language at a time and added an English/French toggle to every page. The French tree was flattened to top level so the two languages are structurally parallel, and the navigation validator was made language-aware and taught to assert that every `lang_ref` resolves across languages and round-trips. Accessibility and reflow were re-measured against the published site afterwards: 56 axe-core runs with zero violations, and 56 reflow checks with no horizontal scrolling.

### This workshop is not delivery-ready

Every gate that would make it ready is open, and each one blocks on its own. No reference canvas has been generated or staged, so the section three recovery path does not exist. No timed dry run has been performed in either language. Venue concurrency, customer proxy behaviour, the per-seat AI credit budget, per-seat enterprise app policy, telemetry disclosure, and written approval to execute generated code are all unverified. No prompt in this repository has ever been run in a workshop, no screenshot exists, and no deck has been looked at. The full statement, separating what was machine-verified from what was human-judged from what was not verified at all, is published at docs/facilitator/validation-status.md and its French counterpart.

DR-09 and DR-10 closing changes none of that. The site being live proves the site builds and serves. It proves nothing about the session.

No delivery date should be offered until those gates close.
