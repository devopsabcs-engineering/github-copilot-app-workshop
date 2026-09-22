---
title: Workshop Scope Research
description: Evidence for product identity, bilingual workshop structure, Pages publishing, and presentation patterns.
ms.date: 2026-09-22
---

## Status

Complete for the delegated scope. Research only; no changes outside .copilot-tracking/research/. Product identity is verified. Installed-app behavior, published-site settings, and generated-deck rendering remain intentionally untested.

## Request and Questions

* Research an agenda patterned on ../github-copilot-fundamentals/README.md.
* Research an English/French workshop patterned on ../foundry-hosted-agents-fsi/ entrypoints, including GitHub Pages and PowerPoint.
* Verify GitHub Copilot app and canvas terminology using official public GitHub or Microsoft sources. Distinguish Spark, Workspace, Microsoft 365 Copilot, and Power Apps.
* Keep the learner experience less technical than VS Code workshops and use a generic demonstration application.
* Identify availability caveats, authoring rules, and independent next research tasks without implementing the workshop.

## Local Hypothesis and Validation

Hypothesis: the sibling agenda and bilingual publishing structure are reusable, but the requested canvas experience cannot safely be attributed to GitHub Copilot until official product documentation confirms it.

Cheap discriminating checks: inspect the named sibling entrypoints and official product overview pages. A current official GitHub Copilot app page documenting canvas apps would resolve the product ambiguity; documentation only for another product would leave it unresolved.

Research-file validation: confirm both requested files are under the allowed directory, include frontmatter and research questions, and preserve README.md unchanged. No application tests apply to this documentation-only research.

## Local Evidence

* README.md:1 contains only the repository name.
* The target root listing contains .git/ and README.md, with no repository-local instruction files.
* ../github-copilot-fundamentals/README.md:1 establishes frontmatter; :10 declares 90 minutes; :12 starts timed numbered sections. The six blocks allocate 15, 15, 25, 15, 15, and 5 minutes and use topics, explanatory notes, demonstrations, misconceptions, and learning objectives.
* ../foundry-hosted-agents-fsi/README.md:6-65 identifies English/French content, docs/ and docs/fr/ entrypoints, Just the Docs, and a bilingual deck generator under scripts/.

## Official Product Evidence

All sources below were retrieved on 2026-09-22. Retrieval date is not a publication date. The fetched GitHub Docs pages do not expose a publication or revision date in the returned content.

### GitHub Copilot App and Canvases Confirmed

* <https://docs.github.com/en/copilot/concepts/agents/github-copilot-app> explicitly identifies a desktop application built on Copilot CLI, with GitHub integration, parallel sessions, and canvases. It lists Windows, macOS, and Linux and availability for all Copilot plans. Business/Enterprise users need the app policy enabled; it is separate from the CLI policy and enabled by default.
* The same source documents Interactive, Plan, and Autopilot session modes. Do not reuse the Fundamentals sibling's Ask/Edit/Agent mode labels as app navigation labels.
* The app overview labels cloud-based sandboxes public preview. The fetched page does not label the whole app or all canvas extensions public preview; do not extend that caveat to unrelated features or infer a GA date.
* <https://docs.github.com/en/copilot/get-started/quickstart-copilot-app> requires a GitHub account, Git installed, and a Copilot plan or configured model provider. It documents install/sign-in, connecting a repository or local folder, starting an Interactive session, reviewing Changes, and creating a PR. BYOK is documented but need not be a beginner workshop prerequisite.
* <https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions> describes a canvas extension as a shared, bidirectional, interactive surface for an artifact. Examples include kanban boards, plans, dashboards, release checklists, documents, spreadsheets, and slide decks.
* The canvas guide documents `/create-canvas` in an agent session, describing both human controls and agent capabilities, then iterating in the right side panel. Featured canvases are under Customize > Canvas; some require installing a plugin.
* Project-scoped canvases are stored in `.github/extensions` and can be committed for team use. Personal canvases live under `~/.copilot/extensions`. A typical extension includes package.json, an entrypoint such as extension.mjs, and optional persisted JSON artifacts. These are product paths, not files created during this research.
* The guide does not establish that a generated canvas is automatically a public web app or a GitHub Pages deployment. Keep the workshop documentation site and the in-app canvas as separate deliverables.
* The app overview warns that generated code may match public code even when the matching-public-code policy is set to Block. Include output review and synthetic-data guardrails; do not promise license-safe or production-ready generation.

The local hypothesis is resolved by positive official evidence: the user's requested app and canvas experience exists. Use the official term "canvas extensions" or "canvases" and explain that "canvas apps" is informal here, not Power Apps terminology.

### Product Distinctions

* GitHub Copilot app: the current desktop agent-development environment described above. Its canvas is an in-app collaboration surface, not another name for a published Spark app or Power Apps application.
* GitHub Spark: <https://githubnext.com/projects/github-spark/> identifies an AI-powered tool for building and sharing personalized micro apps, with a natural-language editor and managed runtime. The page says published October 2024 and contains a public-preview banner alongside older technical-preview text. Use it to establish historical identity, not September 2026 entitlement or rollout status. Its models and setup details are not a current workshop baseline.
* Spark availability is not resolved here: <https://github.com/features/spark> returned the general GitHub Copilot marketing content; <https://docs.github.com/en/spark> and <https://docs.github.com/en/copilot/concepts/spark/about-github-spark> returned 404. These are observations, not proof of retirement or a rename. The attempted dated announcement <https://github.blog/changelog/2025-07-23-github-spark-in-public-preview/> did not yield extractable content and is not used as evidence.
* Copilot Workspace: <https://githubnext.com/projects/copilot-workspace> explicitly says the technical preview was sunset on 2025-05-30. The page describes a natural-language, plan-driven development environment. It is historical context, not a current workshop prerequisite or a synonym for the app.
* Microsoft 365 Copilot app: the requested comparison name has evolved. <https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-app-overview> resolves to the canonical <https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-app-overview> and is titled "Microsoft Copilot app". Metadata dates it 2026-08-18. It describes an everyday AI productivity client across web, desktop, and mobile, with personal Microsoft accounts and work/school Entra accounts; work features depend on assigned Microsoft 365 licenses. It is not the GitHub agent-development app. Do not freeze the older branding as the current official title.
* Power Apps canvas apps: <https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/getting-started> describes custom business applications built on a drag-and-drop design surface, connecting to data sources such as Dataverse and SharePoint, shared through Power Apps. Metadata gives ms.date 2026-04-15 and updated_at 2026-04-16. Its canvas-app terminology, licensing, connectors, and Power Fx references do not transfer to GitHub canvas extensions.

### Source-Date and Availability Guardrails

* Treat the app and canvas Docs articles as live references retrieved 2026-09-22, not dated launch announcements. Recheck before delivery and record the installed app version in the future lab validation log.
* All-plans availability does not mean unlimited usage or unrestricted enterprise access. Do not quote fixed request counts, AI-credit allowances, or model names without a separate current billing check.
* No first-party source in this investigation promises a frictionless, production-ready, no-prerequisite canvas experience. The beginner path should hide authoring complexity, not deny it.
* Official Docs pages are sufficient primary inspiration. Do not add community tutorials merely to fill a source list; the older Spark/Workspace pages serve comparison only.

## Pages and Deck Patterns

### Bilingual Site Entrypoints

* ../foundry-hosted-agents-fsi/docs/index.md:1-9 uses default layout, title/description, nav_order, permalink `/`, and a link to `fr/`.
* ../foundry-hosted-agents-fsi/docs/fr/index.md:1-10 mirrors the page with `lang: fr`, permalink `/fr/`, and a link back to `../`.
* ../foundry-hosted-agents-fsi/docs/labs/index.md:1-46 and ../foundry-hosted-agents-fsi/docs/fr/labs/index.md:1-47 pair curriculum rows, lab numbers, paths, prerequisites, and next-step links. Both describe fifteen labs, 00 through 14.
* ../foundry-hosted-agents-fsi/docs/_config.yml:1-8 declares Just the Docs via remote_theme and the public project-site url/baseurl. :13-21 sets default layouts and excludes assets from navigation. ../foundry-hosted-agents-fsi/docs/Gemfile:1-3 uses github-pages and webrick.
* The inspected ../foundry-hosted-agents-fsi/.github/workflows/ listing has no named Pages workflow. A narrow content search found no pages or jekyll references in those workflow files. This does not prove the configured remote publishing source; repository settings were not queried.
* The current English/French landing pages link to labs but not to decks. Do not claim a working download experience exists in the sibling.

### Pages Publication Decision

* <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site> documents publishing from a branch's root or `/docs`, or a custom Actions workflow. For a plain Jekyll docs site, branch `/docs` publishing is a supported minimal option. A custom workflow can instead build both language sites and decks, upload a Pages artifact, and deploy it. The latter is a recommendation, not a discovered sibling behavior.
* <https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site> says private project-site access requires GitHub Enterprise Cloud and is available to organization-owned private/internal repositories. Private sites use unique subdomains, and the generator base path may need adjustment. A private repository alone does not guarantee a private Pages site.
* Do not copy the sibling README's parenthetical "sign-in required while private" as a general rule. Verify the target site's actual visibility, publishing source, and URL before publishing.
* The workshop site hosts learning materials and downloadable decks. It is separate from the app's in-process canvas runtime. A standalone browser app would be an extra deliverable needing separate requirements and validation.

### PowerPoint Generator Pattern

* ../foundry-hosted-agents-fsi/package.json:6-11 exposes `npm run build-workshop-deck` and depends on PptxGenJS ^4.0.1.
* ../foundry-hosted-agents-fsi/scripts/build-workshop-deck.js:12-19 uses ESM and writes under docs/assets/decks. :68-72 defines one paired English/French lab-content collection. :294-347 builds widescreen 13.33 by 7.5-inch decks, title/agenda/lab/closing slides, localized footers, and slide counts, and writes separate `-en.pptx` and `-fr.pptx` outputs.
* The title slide receives localized notes at :307. Do not claim every slide already has speaker notes; future facilitation decks should add them where teaching requires them.
* The header at :8-11 claims ten labs and no Azure deployment, whereas the current curriculum includes fifteen labs and pilot/Azure work. Treat the generator as a structural example, not an authoritative curriculum source.
* The directory docs/assets/decks does not exist in this sibling checkout (directory lookup returned ENOENT). This research did not generate files or prove that a published deck exists.
* Recommended future checks: build both decks, verify nonempty files and expected slide counts through ZIP/XML inspection, compare English/French content coverage, render slides, inspect French wrapping and clipped text, and verify actual downloadable links from both site languages.

### Memory Applied Cautiously

* Consulted /memories/powerpoint-generation.md and /memories/git-gitignore-and-github-pages.md. They inform future validation, not product claims.
* Recheck installed PptxGenJS image helpers and dependency audit findings instead of assuming historical behavior or package safety. Use trusted assets and render both languages to catch overflow.
* Check that future docs/assets files are not swallowed by an unanchored ignore rule. Verify the actual Pages URL and visibility; official Pages docs above qualify the memory's overly broad private-repository wording.
* `rg` was unavailable in the current terminal. The narrow fallback used PowerShell Select-String. No tools, packages, or environment settings were installed or changed.

## Applicable Writing Rules

* All new Markdown needs YAML frontmatter. Use title and description for README/docs and ISO 8601 dates. With a title field, start body headings at H2; do not also add H1, despite the contradictory example in the instruction file.
* Use ATX headings without skipped levels, blank lines around headings/lists/fences/tables, consistent `*` bullets, language-tagged code fences, valid links, image alt text, and one final newline.
* Prefer ASCII punctuation, no em dashes, short actionable steps addressed to "you", precise product names, parallel lists, and jargon definitions. French content requires actual accented characters, not transliteration.
* Avoid bolded-prefix bullet lists, filler such as "simply" or "seamless", and self-referential introductions. Use GitHub alerts for important prerequisites or warnings.
* In these AI-consumed research records, cite local evidence as plain relative paths with line numbers, not Markdown links; external URLs can be linked.
* Brainstorming skill: clarify audience, purpose, constraints, and success criteria before implementation; present two or three approaches with tradeoffs, then ask one focused question at a time. This delegated research records questions for the parent instead of starting a user interview.
* Presentation skill: prefer Node.js with PptxGenJS, widescreen slides, shared palette/helpers, speaker notes, and images where useful. No deck generation, dependency install, or default skill output-directory writes are authorized in this task.

## Open Questions and Next Research

### Workshop Direction for the Parent

Recommended approach: a canvas-first, guided workshop using a generic Team Task Board. Learners describe an outcome, create a canvas, use its controls, ask the agent to modify the same board, refine it, and verify results. This matches the official guide's agentic kanban example. It does not require borrowing FSI data, Azure resources, MCP servers, or VS Code workflows.

Two alternatives to present before implementation: a release-checklist canvas provides a smaller, checklist-oriented artifact; a browser-app build followed by a canvas adds a second runtime and more setup, so it is less suitable for the stated beginner emphasis. These are design recommendations, not user-approved scope.

An agenda candidate preserving the sibling's six-block structure is: app orientation and safety (10 minutes), setup and first session (15), create the board canvas (30), refine through prompts and controls (15), verify and share at the correct scope (15), and recap/questions (5). Total: 90 minutes. Keep Topics, Notes, Demonstration/Exercise, and Learning Objectives; do not transfer the sibling's IDE-specific content.

Each eventual lab should include an outcome, short prerequisites, copyable EN/FR prompts, visible checkpoints, a recovery path, and source links. Verification can ask learners to add one task through UI controls, move another through an agent request, and confirm the same board state. Persistence after reopening and team sharing must be tested before promised in learner instructions.

### Clarifying Questions

* Is the intended learner outcome an in-app canvas extension, or also a separately hosted web application? Recommend the in-app canvas unless the user explicitly wants both.
* Is 90 minutes the required duration, or only the README agenda pattern? Are both English and French intended as independent delivery paths?
* Who will attend, and do their machines permit app installation, Git, the enabled enterprise app policy, and sufficient usage budget?
* Should the eventual Pages site be public or restricted? No publishing-setting change is authorized by this research task.

### Independent Next Research Checklist

* [ ] App preflight: verify the actual installed Windows/macOS/Linux version, account access, Git setup, app policy, and `/create-canvas` availability in the intended teaching environment. Do not acquire secrets or change policies without permission.
* [ ] Canvas exercise trial: run the official kanban-style prompt in a disposable authorized workspace; record generation time, exact UI labels, bidirectional state behavior, reopen behavior, and recovery steps. Do not assume generated capability names or implementation APIs are stable.
* [ ] Publishing plan: check the target repository's actual Pages eligibility, visibility, allowed Actions, and intended URL; choose branch `/docs` or reproducible Actions publishing. Keep author-side tooling separate from learner prerequisites.
* [ ] Bilingual/deck design: after the scenario and agenda are approved, define shared EN/FR learning outcomes, navigation parity, localized prompt pairs, slide coverage, speaker notes, and rendered-deck validation. Inspect only the next relevant sibling template rather than scanning the full repository.

Spark's current availability needs no further investigation unless the user chooses Spark instead. The current app/canvas workshop can proceed without resolving that unrelated entitlement question.

## Validation and Boundaries

Both requested research documents were created under the allowed path and passed a focused frontmatter/questions check. README.md retained its original single title. The first substantive evidence update returned no editor diagnostics. Final checks confirm the completed record includes all five product identities, source-date caveats, local evidence, and next tasks. No workshop, deck, site, application, dependencies, cloud resource, or repository setting was created or modified.
