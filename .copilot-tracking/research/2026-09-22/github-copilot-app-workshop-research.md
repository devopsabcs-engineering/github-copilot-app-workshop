<!-- markdownlint-disable-file -->
---
title: GitHub Copilot App Workshop Research
description: Evidence-backed curriculum and implementation handoff for an English/French developer workshop, GitHub Pages, and PowerPoint.
ms.date: 2026-09-22
---

## Status

Documentary research complete, 2026-09-22. Workshop implementation and live rehearsal have not started. Only research artifacts were created. The active Task Researcher mode prohibits creating the requested README agenda, site, canvas implementation, and PowerPoint files outside .copilot-tracking/research/. Continue in an implementation-capable mode to produce those deliverables; this document is the authoritative handoff.

Three adversarial reviews ran on 2026-09-22 against product claims, curriculum survivability, and the build chain. They produced 8 critical and 14 high findings. All are resolved in the risk register below, either by correcting this document or by converting the issue into a blocking preflight gate. Corrections in this revision override any conflicting statement in the supporting records.

## Known Request

* Begin with an agenda similar to ../github-copilot-fundamentals/README.md.
* Create an actual bilingual workshop inspired by ../foundry-hosted-agents-fsi/, including GitHub Pages and PowerPoint. This remains requested implementation work, not an optional follow-up.
* Focus on the GitHub Copilot app, especially canvas apps, with a less technical experience than VS Code workshops.
* Use a generic demo application and official public GitHub/Microsoft documentation, workshops, or blogs as product-content sources.
* Target developers at organizations such as CAE or the Government of Ontario, with beginner-to-intermediate GitHub Copilot skills (user clarification, 2026-09-22).
* Keep developer-relevant planning, review, and acceptance checks, while minimizing IDE setup and manual coding. Do not treat this as a nondeveloper or Power Apps course.

## Scope and Success Criteria

Only research artifacts under .copilot-tracking/research/ may change in this mode. Reuse sibling formatting and authoring patterns, not their IDE/FSI curriculum. Research succeeds when product claims have first-party evidence, the generic scenario has testable learning outcomes, and agenda/site/deck decisions have implementation guidance. Delivery succeeds only after both language paths, generated decks, and canvas exercises are actually validated.

Working assumptions, not additional user requirements: English/French independent delivery paths; a 90-minute core plus optional 30-minute extension; a local project-scoped canvas; synthetic data; no cloud deployment, external integrations, or remote writes in learner exercises. Ninety minutes assumes one spoken delivery language. Pages visibility and organizational permissions are not assumed.

## Research Questions

* What is the verified product identity behind GitHub Copilot app and canvas apps?
* Which public sources establish current capabilities, licensing, preview status, and limitations?
* Which agenda, English/French navigation, Pages build, and deck-generation patterns are reusable?
* What generic scenario and learner prerequisites fit the confirmed product?
* Which validation checks should precede publishing the workshop and decks?

## Outline

1. Verified product and source evidence.
2. Selected scenario and bilingual agenda.
3. Proposed exercises and acceptance checks.
4. Site and deck architecture, alternatives, and examples.
5. Risk register, preflight gates, and owner decisions.
6. Implementation sequence and release gates.

## Audience Design Hypothesis

A fictional Team Task Board canvas can teach beginner-to-intermediate developers to plan, create, interact with, refine, and verify an app extension without requiring a VS Code workflow. A cheap discriminating check is whether every core exercise maps to a documented Copilot app capability and has an observable acceptance check. Optional intermediate exercises must not block beginners. Use synthetic data only; organization-specific compliance or approval is not assumed.

## Verified Scope

Official GitHub Docs confirm a desktop GitHub Copilot app for Windows, macOS, and Linux, with Linux shipping as an x64 AppImage only, and an in-app canvas-extension workflow using `/create-canvas`. The app is documented as available across Copilot plans, subject to the separate app policy for Business/Enterprise users, which is enabled by default. A GitHub account and installed Git are prerequisites; a Copilot plan or configured provider supplies model access.

* <https://docs.github.com/en/copilot/concepts/agents/github-copilot-app>
* <https://docs.github.com/en/copilot/get-started/quickstart-copilot-app>
* <https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions>

Sources retrieved 2026-09-22. These are live documentation pages, not dated launch announcements. Canvas extensions are not Power Apps canvas apps, Copilot Workspace, or Spark. GitHub Pages should host workshop materials, not be presented as an automatic deployment destination for an in-app canvas.

Independent adversarial verification refetched all cited URLs; every one returned 200 with on-topic content, and no URL was fabricated. That pass also confirmed exact quotes for `/create-canvas`, the Interactive/Plan/Autopilot mode names, the documented kanban example including `get_board`, `add_card`, and `move_card`, both extension storage paths, the Git prerequisite, all nine slash commands, and the public-code warning that applies despite a Block policy.

It also corrected four details. Linux support is an x64 AppImage only, so Linux on arm64 is not covered. The documentation calls the non-project scope "user scope", not "personal scope". Canvas documentation describes only optional JSON artifacts for persisted state and contains no reopening section at all, so no restore guarantee exists. Claims about the absence of preview labels rest on extracted body text and are weaker than the quoted positive claims.

## Research Evidence

### Local Evidence

* README.md:1 contains only the repository name. No local repository instruction file was found during the initial inspection.
* ../github-copilot-fundamentals/README.md:1-12 establishes title/description frontmatter, an H2 workshop title, duration, and numbered timed sections. Its six sections use Topics, Notes, Demonstrations, Misconceptions, and final Learning Objectives. Original timing is 15/15/25/15/15/5.
* ../foundry-hosted-agents-fsi/docs/_config.yml:1-21 uses Just the Docs, project-site url/baseurl, and layout defaults. The paired docs/index.md:1-9 and docs/fr/index.md:1-10 establish English/French routes.
* ../foundry-hosted-agents-fsi/package.json:6-11 and scripts/build-workshop-deck.js:294-347 establish ESM/PptxGenJS, widescreen output, and separate language decks. The sibling generator covers ten labs while its current curriculum has fifteen; do not copy its content or assume parity.
* The sibling deck-output directory was absent, and remote Pages settings were not queried. Local configuration is not a published-site or working-download verification.

### Official Source Register

All sources were retrieved by delegated tools on 2026-09-22. Retrieval dates are not publication dates. No official canvas-specific 90-minute workshop was found in the inspected sources; the curriculum below is an original adaptation.

| ID | Source | Evidence and use |
|----|--------|------------------|
| G1 | [App overview](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) | Desktop app, plans, separate enterprise app policy, canvas context, public-code warning. |
| G2 | [App quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app) | Account/Git prerequisites, sessions, Changes, review workflow. |
| G3 | [Canvas guide](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions) | `/create-canvas`, bidirectional state, kanban example, project/personal scopes. |
| G4 | [Agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions) | Interactive, Plan, Autopilot; session lifecycle. |
| G5 | [Customization](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app) | Inherited skills, MCP servers, managed settings. |
| G6 | [Commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands) | Canvas creation, review, usage, tool approvals; history retention is not board persistence. |
| G7 | [GitHub Skills course](https://github.com/skills/getting-started-with-github-copilot) | Transfer one fictional scenario and explain/change/review progression, not its IDE prerequisites. |
| M1 | [Microsoft Learn introduction](https://learn.microsoft.com/en-us/training/modules/introduction-to-github-copilot/) | Transfer prerequisites, short practice cycles, troubleshooting, and knowledge checks. Not canvas capability evidence. |
| M2 | [French Microsoft Learn module](https://learn.microsoft.com/fr-fr/training/modules/introduction-to-github-copilot/) | French learning reference; does not establish French app UI coverage. |
| P1 | [Pages publishing](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) | Branch root/docs or Actions deployment. |
| P2 | [Pages visibility](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site) | A private repository alone does not guarantee a private site. |
| P3 | [Pages themes](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll) | Managed Pages supports remote themes; remote_theme is not itself a reason to require Actions. |

### Detailed Research Records

* .copilot-tracking/research/subagents/2026-09-22/workshop-scope-research.md:27-145 supplies product distinctions, exact sibling references, writing rules, and initial source evidence.
* .copilot-tracking/research/subagents/2026-09-22/canvas-curriculum-research.md:27-111 supplies product behavior and pedagogy evidence; :129-364 supplies the full synthetic JSON, paired prompts, checks, and recovery; :365-412 supplies safety and unverified claims.
* .copilot-tracking/research/subagents/2026-09-22/publishing-deck-research.md supplies complete proposed configuration/frontmatter, target tree, 16-slide outline, generator APIs, and validation commands.
* .copilot-tracking/research/subagents/2026-09-22/adversarial-product-verification.md supplies URL status, claim-by-claim verdicts, and 17 previously missed operational facts.
* .copilot-tracking/research/subagents/2026-09-22/adversarial-curriculum-review.md supplies 26 severity-rated delivery findings, the replacement oracle, and abort thresholds.
* .copilot-tracking/research/subagents/2026-09-22/adversarial-build-verification.md supplies corrected package/action versions and 21 severity-rated build findings.

This primary document supersedes draft timing conflicts: use 10/15/30/15/15/5 and app-specific section names. Curriculum prompts remain useful but must be retimed and placed under the names below. Follow the site/deck research's 16-slide timing. Do not retain an app section named "Introduction to Agent Mode": the actual modes are Interactive, Plan, and Autopilot.

It also supersedes the earlier absolute-count oracle, the claim that learners need no Node or command line, the "stop if installation is needed" prompt clause, and the draft Actions version list. Where a supporting record conflicts with the risk register below, the risk register wins.

### Operational Facts Missed by the First Pass

These change preflight, not the product choice. Each is sourced in the adversarial product record; verify current values before delivery rather than quoting these numbers to attendees.

* Billing moved to AI credits priced per token, and the premium-request model is described as legacy. A 30-minute agentic block multiplied by cohort size is a real, unpriced cost. Establish a per-seat budget and capture a `/usage` baseline during preflight.
* Copilot Free uses automatic model selection only, so any step that asks learners to choose a model fails on that plan.
* Proxies using `https://` are not supported, and TLS-intercepting corporate proxies are named as a failure cause. This is the single likeliest live-session killer for the stated audience and requires venue-network testing on the actual device image.
* Rate limiting explicitly targets grouped or coordinated usage. A classroom issuing simultaneous requests matches the described pattern.
* Extensions ship as `package.json` plus `extension.mjs`, run as processes, and resolve tools from the shell PATH. Node is therefore a plausible runtime dependency for a generated canvas.
* The app repository states that conversation data may be collected. Disclose this to attendees before any government or defense-adjacent session.
* Release cadence is roughly daily and UI labels have already been renamed, so screenshots and label-dependent instructions decay quickly.
* Canvas Dev Mode exists and is a recovery lever worth rehearsing. Canvas extensions also run an install-time check that can fail. Enterprise-managed accounts cannot create gists, and organization policy can block the app when any signed-in account is restricted.

## Selected Curriculum

### Audience and Scenario

Choose a fictional Team Task Board. Developers practice requirements, shared-state transitions, bounded changes, acceptance tests, and code review while the agent generates the extension. This is lower-manual-code, not code-free or a production app deployment course. Beginner learners follow supplied prompts; intermediate learners add edge-case tests, localization, and persistence checks.

CAE and Government of Ontario are audience examples only. Do not include their logos, claim endorsement or compliance, or use operational, defense, citizen, employee, proprietary, or personal data. No organization-specific policies have been assessed.

### Agenda Ready for Authoring

Use the sibling README structure: frontmatter, H2 title, short pitch, Duration, six timed H3 sections, topic/note/demonstration subsections, and final Learning Objectives. The table here is the authoritative content map, not a replacement for that requested README format.

| Section | English title | French title | Time | Observable outcome |
|---------|---------------|--------------|------|--------------------|
| 1 | Meet the App and Set Safe Boundaries | Découvrir l'application et fixer les limites | 10 min | Distinguish app, canvas, and published website; name review responsibilities. |
| 2 | Start a Session and Agree on the Plan | Démarrer une session et valider le plan | 15 min | Select approved project and Plan mode; agree on acceptance criteria. |
| 3 | Create and Use the Team Task Board | Créer et utiliser le tableau de tâches | 30 min | Create canvas, add through UI, move through agent, compare actual state. |
| 4 | Refine One Requirement at a Time | Améliorer une exigence à la fois | 15 min | Add a priority filter without changing underlying task data. |
| 5 | Review, Verify, and Prepare a Handoff | Examiner, vérifier et préparer la transmission | 15 min | Inspect Changes, test rehearsed persistence behavior, separate source/state sharing. |
| 6 | Wrap-Up and Questions | Bilan et questions | 5 min | Explain observed results, remaining limits, and an approved next step. |

Installation, sign-in, and any runtime prerequisite are completed and verified before the timed workshop. The optional extension adds 10 minutes each for EN/FR canvas labels, restart persistence, and a local handoff checklist.

The core teaching path requires no VS Code, Azure, cloud sandbox, or external MCP tools, and no learner authoring in Ruby or Node. It is not accurate to claim learners need no Node at all: generated extensions include a `package.json` and an `extension.mjs` entrypoint and resolve tools from the shell PATH. Treat a working runtime as a preflight responsibility, install it on the device image in advance, and never let a lab depend on an in-class installation.

### Lab Contract and State Oracle

Use four short lab pages: 00 session/plan, 01 create/interact, 02 refine, 03 verify/handoff. Every language version includes objective, prerequisites, ordered actions, a copyable prompt, expected result, recovery, and official sources. Keep IDs, machine values, outcomes, and lab slugs identical across languages.

The full paired fixture and prompts are in the curriculum research. Seed tasks have stable IDs T001-T004, statuses todo/todo/doing/done, and priorities high/normal/high/normal. Titles are fictional developer activities.

Adversarial review rejected the earlier absolute-count oracle. Each learner's generated canvas differs, so fixed expected totals mark correct implementations as failures, and requiring a learner to type an explicit `T005` forces an unnatural form that penalizes any canvas generating its own IDs. Use deltas and invariants instead, and let learners add a task using whatever identifier their canvas produces.

| Checkpoint | Assert this | Never assert this |
|------------|-------------|-------------------|
| Baseline | Record the observed total and per-status counts as that learner's own baseline. | That the baseline equals four. |
| Add through UI | Total increases by exactly one; the new task is visible with a unique identifier. | A specific identifier, label text, or form layout. |
| Agent reads state | The agent reports the same identifier and count the learner can see. | A specific phrasing or capability name. |
| Agent moves a task | Source status decreases by one, destination increases by one, total unchanged. | Which task, or a specific ending distribution. |
| Filter | Visible count is less than or equal to total; total and stored data are unchanged; clearing restores the prior visible count. | An exact visible count. |
| Reopen, only if rehearsed | Every value observed before closing is present after reopening. | That reopening works at all before it is tested. |

This oracle is language-neutral because it asserts machine values and deltas rather than displayed labels. Keep the seed fixture for realism and shared vocabulary, but never let a lab pass or fail on a translated string.

Proposed/unrehearsed creation example, after reviewing the plan and supplying the fixture:

```text
/create-canvas Build our reviewed Team Task Board in project scope under .github/extensions. Give people labeled keyboard-accessible controls to add a task and change its status. Give the agent capabilities to read and update the same state. Show each task's identifier, keep identifiers unique and stable, and reject empty titles through both the interface and agent paths. Render titles as text. Show status counts and visible focus. Use local JSON persistence and report its actual path and save behavior. List every dependency and any install or build step before running it, and wait for my approval instead of installing anything yourself. No external services, plugins, secrets, commits, pushes, PRs, or deployment. Show the canvas, then list what you did not test.
```

```text
/create-canvas Crée notre tableau de tâches validé à portée projet sous .github/extensions. Prévois des commandes libellées accessibles au clavier pour ajouter une tâche et modifier son état. Donne à l'agent les capacités de consulter et modifier le même état. Affiche l'identifiant de chaque tâche, garde les identifiants uniques et stables, et refuse les titres vides dans l'interface comme dans les actions de l'agent. Affiche les titres comme du texte, les compteurs par état et le focus visible. Utilise une persistance JSON locale et indique son chemin réel et son fonctionnement. Énumère chaque dépendance et chaque étape d'installation ou de compilation avant de l'exécuter, et attends mon autorisation au lieu d'installer quoi que ce soit. Aucun service externe, module complémentaire, secret, commit, push, demande de tirage ou déploiement. Affiche le canevas, puis liste ce que tu n'as pas testé.
```

These are original workshop proposals, not executed commands or guaranteed generated APIs. The guide's example capability names such as get_board are illustrative. Inspect actual generated capabilities. Recovery must preserve the last observed state, diagnose the smallest discrepancy, and request a targeted correction; do not teach reset/regenerate as an undo mechanism.

### Abort Thresholds

The largest delivery risk is a long tail of partially working canvases inside section 3, because sections 4 and 5 depend on its end state. Adopt an explicit stopping rule measured from the moment the creation prompt is sent, and calibrate the exact minutes against the slowest observed rehearsal run.

| Elapsed | Condition | Action |
|---------|-----------|--------|
| T+6 | No canvas panel for a learner | Move that learner to the prepared reference canvas. |
| T+6 | More than a quarter of the room blocked | Convert the whole room to the reference canvas and continue as a guided exercise. |
| T+10 | Canvas present but not usable | Allow exactly one targeted repair attempt. |
| T+13 | Still not usable | Hard stop; switch that learner to the reference canvas and pair them with a neighbor. |

The governing rule is that no learner falls more than one section behind. A facilitator who is debugging one machine is not running the workshop, so recovery must be a switch to a known-good artifact rather than live troubleshooting.

## Technical Scenarios and Alternatives

| Scenario | Selected approach and rationale | Alternatives not selected |
|----------|---------------------------------|---------------------------|
| Learning application | Team Task Board: directly supported by the documented kanban example, countable state changes, minimal domain knowledge. | Event planner adds dates/identities/integrations; full-stack app adds frameworks, backend, deployment, and setup inconsistent with the request. |
| Workshop site | Just the Docs/Jekyll, docs/ and docs/fr/, explicit language navigation groups and paired links. Matches sibling authoring. | Handcrafted static HTML duplicates navigation and layout; a frontend framework is unnecessary for lab content. |
| Publishing | Custom Actions builds both decks and Jekyll into one validated Pages artifact. | Branch /docs is supported but requires intentionally prebuilding and committing decks; it cannot run the npm generator during its managed Jekyll build. |
| Presentations | Two 16-slide PptxGenJS decks from paired content, same IDs/timing, localized notes on every slide. | One mixed-language deck crowds projected text or doubles slides; use only if simultaneous bilingual projection is explicitly required. |

### Proposed Implementation Shape

```text
README.md
package.json + package-lock.json
.github/workflows/pages.yml
scripts/build-workshop-deck.mjs
scripts/validate-workshop.ps1
docs/_config.yml + Gemfile + Gemfile.lock
docs/_layouts/default.html
docs/{index,prerequisites,downloads,resources}.md
docs/labs/{index,lab-00-setup,lab-01-create-canvas,lab-02-refine-canvas,lab-03-verify-share}.md
docs/fr/ (matching localized pages and lab slugs)
docs/assets/images/ (sanitized screenshots from actual rehearsal)
docs/assets/decks/github-copilot-app-workshop-{en,fr}.pptx
```

These paths describe future work, not existing artifacts. Use the publishing research's complete config/frontmatter examples. Public project-site url/baseurl are provisional until real Pages settings are verified. Use relative_url for links; permalink excludes baseurl. Never publish the research folder or the whole repository as the site artifact.

One Jekyll build should expose English and Français groups without fragile CSS language hiding. The inspected theme uses site.lang, so preserve its full layout and apply page.lang with a fallback for correct document language; localize skip links and audit other chrome. Respect upstream licensing if copying layout files. Two builds are a future option only if isolated language search/chrome becomes a firm requirement.

Author tooling observations: Node and Ruby execute, but PptxGenJS and lockfiles were absent in the inspected repositories. PowerPoint is registered, not proven to render. Do not claim builds can run until dependencies are resolved, audited, locked, and tested. Learners consume the built materials without author tooling.

Corrected build facts from adversarial verification, replacing earlier draft values:

* PptxGenJS 4.0.1 is the current published version, and v4 did not break `addSlide`, `addText`, `addNotes`, or `writeFile`. It pulls four runtime dependencies, including an `https` package that warrants a supply-chain decision before shipping a customer-facing deliverable.
* `lang` is a real text option and `slide.background = { color }` is current API, so the illustrative snippet stands.
* The just-the-docs `v0.10.1` tag and the `owner/repo@tag` pin syntax are valid, but v0.12.0 is current and carries sidebar, footer, and contrast fixes the older pin excludes. Choose the pin deliberately.
* The `github-pages` gem 232 is real and pins Jekyll 3.10.0, where `exclude` replaces the defaults rather than adding to them. Decide explicitly between Jekyll 3 through that gem and Jekyll 4 through direct dependencies; that one decision resolves several downstream conflicts.
* Theme navigation accepts the proposed parent and grand_parent chain, with no special case that breaks a home page acting as a nav parent. A wrong `grand_parent` silently drops a page from navigation while the build still exits zero, so navigation needs an explicit assertion.
* Copying the theme layout is supported, and the MIT license requires retaining its copyright notice.
* The draft Actions version list matched neither current majors nor the official starter workflow. Resolve versions at implementation time and pin deliberately. `configure-pages` does not inject the base path into Jekyll; pass `--baseurl` explicitly from its output instead of hardcoding it.

### Deck Implementation Contract

Use 16 widescreen slides, section times 10/15/30/15/15/5, with lab pauses inside the 90 minutes. Group slides 01-03 orientation; 04-05 session and plan; 06-08 create/interact; 09-11 refinement; 12-14 review and scope; 15-16 recap/sources. Independent recomputation confirmed the arithmetic: every group matches its section, all 16 IDs are used once, and lab pauses total 47 of the 90 minutes. Modify draft slide 04-05 content to include Plan mode and reviewed requirements, with installation moved to preflight. Do not add a second setup or planning time allocation, and do not reintroduce a draft slide that schedules in-session setup.

Keep paired slide records in one generator, following the sibling: id, duration, lab ID, EN/FR title/body/notes, source URLs, and optional verified screenshot/alt text. Notes contain facilitation, success/recovery checks, sources, retrieval date, and actual tested app version. Do not invent screenshots or claim an unexecuted check passed. Generate both actual .pptx binaries and make them downloadable from both language sites; a generator or outline alone does not fulfill the request.

Verified API pattern from the publishing investigation, illustrative rather than a complete runnable generator:

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

## Risk Register

Adversarial review produced 8 critical and 14 high findings. Each is listed below with its resolution. "Design corrected" means this document now carries the fix. "Blocking gate" means delivery cannot proceed until the named work is done, and the gate is restated in the preflight checklist. "Owner decision" means a named human must choose; those are collected at the end of this section and none of them can be closed by further research.

### Critical

| ID | Finding | Resolution |
|----|---------|------------|
| CUR-C1 | Every recovery path depends on a reviewed reference canvas and a paired review route that do not exist. | Blocking gate. Build and rehearse the reference canvas first, and stage it on each device as a copyable `.github/extensions` directory rather than screenshots. No delivery date may be offered before it exists. |
| CUR-C2 | The 12-minute generation timebox was never measured, so every agenda number rests on an assumption. | Blocking gate. Two full dry runs per language on the attendee device image, pacing the agenda against the slowest observed run, not the average. |
| CUR-C3 | An absolute-count oracle cannot survive generation variance, and typing an explicit `T005` forces an unnatural form. | Design corrected. Replaced by the delta-and-invariant oracle above; explicit ID entry removed from the core path. |
| CUR-C4 | Generated code executes in section 3 while human review sits in section 5, inverting the control, and the prompt's "stop if installation is needed" turns the most correct model response into a lab failure. | Design corrected. Prompts now require the agent to report dependencies and wait for approval, and a short review-before-run beat moves ahead of first execution while the deeper review stays in section 5. |
| CUR-C5 | Twenty simultaneous agentic requests are unmodeled; roughly one learner in three should be expected to need intervention. | Blocking gate. Staggered start waves, per-seat `/usage` baseline, and concurrency testing on the venue network at realistic cohort size. |
| BLD-C1 | The deck output directory is gitignored and nothing creates it, so `writeFile` fails on a clean runner, and a fail-soft variant deploys green with broken downloads. | Design corrected. The generator must create its output directory, and a missing or zero-byte deck must fail the build rather than warn. |
| BLD-C2 | The draft Actions version list matched neither current majors nor the official starter workflow. | Design corrected. Versions are resolved at implementation time against the official starter workflow and pinned deliberately; no version list is carried forward from draft research. |
| BLD-C3 | The previous validation section was self-referential and passed while several external claims were wrong. | Design corrected. Validation is now split into structural self-checks and externally verified facts, and only the latter may be cited as evidence. |

### High

| ID | Finding | Resolution |
|----|---------|------------|
| PRD-H1 | TLS-intercepting and `https://` proxies are a documented failure cause and are the likeliest live-session killer for this audience. | Blocking gate. Network and proxy verification on the actual device image and venue network before the date is confirmed. |
| PRD-H2 | Billing is AI credits priced per token; a long agentic block times cohort size is an unpriced cost. | Blocking gate. Per-seat budget agreed with the sponsor and `/usage` baselines captured in preflight. |
| PRD-H3 | Copilot Free offers automatic model selection only, breaking any "choose a model" step. | Design corrected. Model choice is demonstrated by the facilitator and framed as plan-dependent, never required of learners. |
| PRD-H4 | Rate limiting explicitly targets grouped usage patterns, which is exactly a classroom. | Covered by CUR-C5 staggering plus a facilitator-visible fallback when throttling appears. |
| PRD-H5 | The claim that learners need no Node or command line is unsupported; extensions run as processes with a `package.json`. | Design corrected. The scope statement now scopes the claim to authoring, and runtime becomes a preflight responsibility. |
| PRD-H6 | Conversation data may be collected, which matters for a government audience. | Blocking gate. Written telemetry and data-handling disclosure to attendees and their sponsor before the session. |
| PRD-H7 | Near-daily releases and already-renamed UI labels decay screenshots and label-dependent steps. | Design corrected. Instructions are written against outcomes rather than labels, and a version re-check occurs within the week before delivery. |
| CUR-H2 | No abort threshold existed anywhere in the plan. | Design corrected. See the abort thresholds table. |
| CUR-H4 | Running English and French from one untested generator is unrealistic, and a label-dependent French check fails correct implementations. | Design corrected. Rehearse French first, assert only machine values, and pre-announce mixed-language output as a learning objective rather than a defect. |
| CUR-H8 | The design reads as a guided demo with copyable prompts rather than a skills workshop. | Design corrected. Each lab now carries an explicit learner-judgment beat: accept or reject a dependency, choose which discrepancy to fix first, and decide whether the generated validation is sufficient. |
| CUR-H9 | The beginner and intermediate split is cosmetic, with no assignment mechanism. | Design corrected. Intermediate learners take the stretch variant of each judgment beat and act as the paired reviewer; beginners follow the core path. Assignment happens at registration. |
| BLD-H1 | `--baseurl` was never passed, so a hardcoded value can silently disagree with the real Pages base path. | Design corrected. Pass `--baseurl` explicitly from the configure step's output and stop hardcoding it. |
| BLD-H2 | A single mixed-language build violates WCAG 3.1.2 for language of parts in shared navigation. | Owner decision. Either override the theme navigation partial to mark language of parts, or split into two builds. Do not claim conformance until one is implemented and tested. |
| BLD-H3 | Four to five parallel content surfaces with no validator for the pairing key. | Design corrected. Parity is asserted in CI: every page and slide must have its counterpart, and a missing counterpart fails the build. |
| BLD-H5 | The deck check could not fail for the bilingual defect it existed to catch. | Design corrected. Deck validation must assert localized text differs between the two decks and that both contain 16 slides with notes; a check that cannot fail is removed. |

### Preflight Checklist

These gates are pass or fail. Any failure moves the delivery date rather than being absorbed on the day.

* Reference canvas built, reviewed, rehearsed, and staged locally on the device image.
* Two timed dry runs completed per language on that image; agenda paced to the slowest run.
* Venue network and proxy verified, including TLS interception and the documented firewall allowlist.
* Per-seat credit budget approved; `/usage` baseline captured; throttling fallback rehearsed.
* Plan entitlement and model availability confirmed for every seat, including any Free-plan attendee.
* App version, operating system, and architecture confirmed, noting that Linux is x64 AppImage only.
* Runtime prerequisites installed in advance; no in-class installation on the critical path.
* Telemetry and data-handling disclosure delivered to attendees and sponsor.
* Written approval on file for executing AI-generated code on managed devices.
* Facilitator ratio and class cap agreed; Canvas Dev Mode rehearsed as a recovery lever.

### Owner Decisions

Research cannot close these. Each needs a named person and a date.

* Who approves executing AI-generated code on managed devices at each customer, and has that request been made?
* Is the hands-on cap negotiable at sixteen with current staffing, or is twenty fixed, and how many helpers are actually available?
* Are English and French delivered as separate sessions, or must one cohort be bilingual?
* May learners retain the generated code after class, and on which machine?
* Jekyll 3 through the `github-pages` gem, or Jekyll 4 through direct dependencies?
* Language of parts by navigation override, or by two separate builds?
* Is the `https` transitive package acceptable in a customer-facing supply chain?

## Implementation and Validation Handoff

1. Switch to an implementation-capable mode and use this document as the baseline. Preserve the clarified developer audience and distinguish assumptions from user requirements.
2. Create the root agenda in the sibling format, then complete paired EN/FR prerequisites, four labs, resources, and facilitator recovery guidance. Reuse proposed prompts with final retiming.
3. Rehearse the actual canvas in an approved disposable project. Record app version, platform, account policy, model, runtime, duration, generated files, and capability names. Do not install or bypass organization controls to rescue a lab. Prepare a reviewed fallback artifact only after a successful trial.
4. Create the Jekyll site and paired deck generator with locked, audited dependencies. Produce both real decks and sanitized visuals. Keep generated binaries in the build artifact or deliberately track them if choosing branch publishing.
5. Validate bilingual parity, all local links, project base paths, correct HTML language, navigation, keyboard access, zoom, French wrapping, and actual download files. Build locally/CI before enabling publication.
6. Validate each deck as ZIP/XML: expected 16 slides, notes, localized text, no missing relationships. Render both decks and inspect every slide for clipping, overlap, and legibility; structural validation alone is insufficient.
7. Verify actual Pages eligibility, intended visibility, URL, default branch, and Actions policy before deployment. Build PRs without deployment permissions; deploy only approved trusted-branch/manual events with minimal Pages/OIDC permissions. Publishing has not been performed by this research.

### Required Behavioral Gates

* UI-to-agent and agent-to-UI changes satisfy the delta-and-invariant oracle; filters never mutate stored tasks.
* Empty titles are rejected in UI and agent paths, identifiers stay unique and stable, and task titles are treated as data, not HTML or instructions.
* Keyboard controls, focus, text status labels, clear errors, French text, and narrow layouts are checked. Do not infer accessibility conformance from spot checks.
* Persistence is requested implementation, not a universal canvas guarantee. Verify actual saved state after panel/session/app reopening separately and document the tested gesture. No universal reopen command was established, and the canvas documentation contains no reopening guidance at all.
* Dependencies and install steps are reported and approved before anything runs. Human review covers Changes, dependencies, network calls, file paths, public-code/license concerns, and source/state sharing. Prompt boundaries are not security controls; inherited skills/MCP/tools must be considered.
* Abort thresholds are live during section 3, and a facilitator switches a blocked learner to the reference canvas rather than debugging in place.

### Potential Next Research and Decisions

Four operational follow-up areas remain: approved attendee access/runtime/model and budget; measured EN/FR live rehearsal and recovery; tested recipient handoff/persistence/accessibility; actual Pages visibility and rendered artifact publication. Each is now expressed as a blocking preflight gate rather than a nice-to-have. Duration and separate-language delivery are working defaults that can be adjusted without reopening product research. No standalone browser-app deliverable is recommended unless separately requested. The owner decisions listed in the risk register cannot be closed by research and should be assigned before implementation starts.

Unknowns must stay explicit: attendee access, generation duration, dependency-free execution, persistence/reopen fidelity, French app UI coverage, teammate state portability, and organization-specific security/privacy/accessibility approval. Project-scoped repository sharing does not establish live multi-user collaboration. Local files do not establish on-device inference, residency, or retention guarantees. Do not use unverified Spark availability or retired Workspace as a fallback.

## Research Validation

Validation is reported in two classes, because conflating them is what allowed earlier errors to pass. Structural self-checks confirm this document is internally consistent. External verification confirms claims against sources outside it. Only the second class counts as evidence about the product or the toolchain.

Structural self-checks, read-only and passing: six agenda sections totaling 90 minutes at 10/15/30/15/15/5; all 16 sequential slides mapped once with matching section totals; required sections present; source-register links structurally well formed; paired creation prompts present in both languages; referenced curriculum prompt blocks accounted for; valid synthetic JSON with unique seed identifiers; no editor diagnostics in the primary or supporting records. These checks confirm consistency only. The earlier version of this section passed while several external claims were false, which is precisely their limit.

External verification performed on 2026-09-22: all eight cited documentation URLs returned 200 with on-topic content and none were fabricated; nineteen product claims were confirmed by direct quotation, two were partial, and one was unsupported; package and theme versions were checked against their registries and repositories, including the theme's navigation source and license; and the slide timing arithmetic was independently recomputed and confirmed. Corrections arising from that pass are recorded in the risk register and in the corrected build facts.

Still untested by any means: live canvas generation, Jekyll build, deck generation, deck rendering, and deployed Pages behavior. Every statement about how the workshop behaves on the day remains a prediction until the preflight gates are executed.

Six critical discoveries organize the findings: verified app/canvas identity; developer-focused synthetic-data boundaries; authoritative timing and mode-heading reconciliation; observable shared-state acceptance checks that tolerate generation variance; bilingual site/deck build and publication constraints; and the distinction between documentary evidence and untested implementation. Four selected approaches remain supported: Team Task Board, Just the Docs, Actions publishing, and separate language decks. The operational follow-up areas and owner decisions above remain open. The README agenda, bilingual site, canvas implementation, and actual PowerPoint files are still required but unimplemented because this mode permits research artifacts only.
