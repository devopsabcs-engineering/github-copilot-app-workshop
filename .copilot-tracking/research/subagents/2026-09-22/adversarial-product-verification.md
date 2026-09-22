<!-- markdownlint-disable-file -->
---
title: Adversarial Product Verification
description: Independent URL fetches and falsification pass over the GitHub Copilot app workshop research claims.
ms.date: 2026-09-22
---

## Status and Method

Complete for adversarial documentary verification, 2026-09-22. Read-only. No installation, no app authentication, no app execution, no delegation. Only this file was created.

Every URL below was fetched independently in this session. Prior summaries in .copilot-tracking/research/2026-09-22/github-copilot-app-workshop-research.md and .copilot-tracking/research/subagents/2026-09-22/canvas-curriculum-research.md were treated as unverified assertions, not evidence.

Method limitation to state plainly: the fetch tool returns extracted page content, not raw HTML. A rendered banner (for example a "public preview" callout pinned outside the main content flow) could in principle be dropped from the extraction. Where I report the absence of a label, I report absence from the extracted body text, not proof that no banner exists in the DOM. Claims of presence are quoted verbatim and are reliable; claims of absence are weaker and marked as such.

## URL Verification Results

All eight requested URLs resolved with real content. None returned 404. None redirected to a different topic.

| # | URL | Outcome | Evidence of identity |
|---|-----|---------|----------------------|
| 1 | <https://docs.github.com/en/copilot/concepts/agents/github-copilot-app> | 200, live content | H1 "About the GitHub Copilot app"; sections Availability, Supported operating systems, Public code |
| 2 | <https://docs.github.com/en/copilot/get-started/quickstart-copilot-app> | 200, live content | H1 "Getting started with the GitHub Copilot app"; Prerequisites list with Git |
| 3 | <https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions> | 200, live content | H1 "Working with canvas extensions in the GitHub Copilot app"; `/create-canvas` section |
| 4 | <https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions> | 200, live content | H1 "Working with agent sessions in the GitHub Copilot app"; "Choosing a session mode" |
| 5 | <https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app> | 200, live content | H1 "Customizing the GitHub Copilot app"; "Working with canvas extensions" subsection |
| 6 | <https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands> | 200, live content | H1 "Slash commands for the GitHub Copilot app"; full command table |
| 7 | <https://github.com/skills/getting-started-with-github-copilot> | 200, live repo | Public template, README "Getting Started with GitHub Copilot", 745 stars, footer "© 2026 GitHub, Inc." |
| 8 | <https://learn.microsoft.com/en-us/training/modules/introduction-to-github-copilot/> | 200, live module | "Introduction to GitHub Copilot", 7 Units, Beginner; metadata `ms.date: 2024-09-12`, `updated_at: 2026-01-28` |

Additional pages fetched during the gap hunt, all 200 unless noted:

| URL | Outcome |
|-----|---------|
| <https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills> | 200 |
| <https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals> | 200 |
| <https://docs.github.com/en/copilot/concepts/billing/copilot-requests> | 200, but explicitly legacy |
| <https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/usage-limits> | 200 |
| <https://docs.github.com/en/copilot/reference/copilot-allowlist-reference> | 200 |
| <https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors> | 200 |
| <https://docs.github.com/en/copilot/concepts/agents/about-plugins> | 200 |
| <https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies> | 200 |
| <https://github.com/features/ai/github-app> | 200 |
| <https://github.com/github/app> | 200 |
| <https://raw.githubusercontent.com/github/app/main/changelog.md> | 200 |
| <https://docs.github.com/en/copilot/concepts/billing/copilot-credits> | 404, path does not exist |

## Claim Verdicts

### Requested claims

| # | Claim | Verdict | Exact supporting sentence |
|---|-------|---------|---------------------------|
| C1 | `/create-canvas` is a real documented command with that exact spelling | SUPPORTED | Slash-commands reference: "`/create-canvas [PROMPT]` — Invokes the canvas-authoring skill. This slash command is a built-in skill." Canvas guide: "You can create a new canvas from within a session using the `/create-canvas` skill." |
| C2 | Canvas extensions stored at `.github/extensions` (project) | SUPPORTED | "Canvas extensions that you create in the app or install directly live in their own directory under either `.github/extensions` (project scope) or `~/.copilot/extensions` (user scope)." |
| C3 | Canvas extensions stored at `~/.copilot/extensions` (personal) | SUPPORTED | Same sentence as C2. Docs call this "user scope", not "personal scope". Creation step wording: "**User scope:** `~/.copilot/extensions` for personal canvases on your machine." |
| C4 | A kanban board is a documented canvas example | SUPPORTED | "**Agentic kanban boards:** Let humans and agents add cards, move work, and kick off tasks." |
| C5 | `get_board` / `add_card` / `move_card` appear as example capability names | SUPPORTED | "For example, you can create an agentic kanban canvas where people use UI controls to create or move cards, and ask the agent to add agent-callable capabilities such as `get_board`, `add_card`, and `move_card`." |
| C6 | Session modes are named exactly Interactive, Plan, Autopilot | SUPPORTED | "**Interactive**: You and the agent work together... **Plan**: The agent creates a plan first... **Autopilot**: The agent works fully autonomously—writing code, running tests, and iterating without waiting for input." |
| C7 | The app runs on Windows, macOS, AND Linux | SUPPORTED, with an architecture caveat | "The GitHub Copilot app supports the following operating systems: macOS, Linux, Windows". Caveat in Newly Discovered Facts N7. |
| C8 | Available on ALL Copilot plans | SUPPORTED | "GitHub Copilot app is available for all Copilot plans." Repo README: "A GitHub Copilot plan — any plan works, including Copilot Free and GitHub Copilot Student." |
| C9 | Business/Enterprise requires a separate app policy, enabled by default | SUPPORTED | "For Copilot Business and Copilot Enterprise users, the GitHub Copilot app policy must remain enabled. This policy is enabled by default and is separate from the Copilot CLI policy." |
| C10 | Git must be installed as a prerequisite | SUPPORTED as documented, complicated in practice | Quickstart Prerequisites: "Git installed on your computer." Repo README Prerequisites also lists Git. Complication in N12. |
| C11 | `/review` exists | SUPPORTED | "`/review` — **Requires an active session.** Reviews the current session's changes." |
| C12 | `/usage` exists | SUPPORTED | "`/usage` — Opens usage and rate-limit details for your plan." |
| C13 | `/restart-session` exists | SUPPORTED | "`/restart-session` — **Requires an active session.** Restarts the current session and keeps its history." |
| C14 | `/clear` exists | SUPPORTED | "`/clear` or `/reset` — **Requires an active session.** Clears the current transcript and starts a fresh session." |
| C15 | `/reset` exists | SUPPORTED | Same sentence as C14. |
| C16 | `/allow-all-tools` exists | SUPPORTED | "`/allow-all-tools` or `/yolo` — **Requires an active session.** Turns tool auto-approval on or shows its current state." |
| C17 | `/yolo` exists | SUPPORTED | Same sentence as C16. |
| C18 | `/reset-allowed-tools` exists | SUPPORTED | "`/reset-allowed-tools` — **Requires an active session.** Clears session-level tool approvals and turns auto-approval off." |
| C19 | `/security-review` exists | SUPPORTED, labelled public preview | "`/security-review` — **Requires an active session with changes.** Runs a security-focused review against current diffs." Agent-sessions page: "The `/security-review` slash command is currently in public preview and subject to change." |
| C20 | Generated code may match public code even when Block is set | SUPPORTED | "GitHub Copilot app may generate code that is a match or near match of publicly available code, even if the \"Suggestions matching public code\" policy is set to \"Block.\"" |
| C21 | Canvas persistence: what the docs actually say about saved state | PARTIAL | The only persistence statements on the canvas page are: "Optional JSON artifacts (for example, files under an `artifacts` directory) for persisted canvas data and state." and the benefit bullet "Keep work continuous across turns, sessions, and handoffs." Nothing describes save timing, write semantics, error handling, or schema. |
| C22 | Any reopen/restore guarantee for canvas state | UNSUPPORTED | No such statement exists. The canvas page has no reopening section at all. Its headings are: About canvas extensions, Why use a canvas, Example use cases, Discovering canvases, Creating a canvas, How canvas extensions are structured, Working in a canvas, Further reading. The nearest session-level statement is `/restart-session` "keeps its history", which is transcript history, not canvas data. |

Count for the requested list: **1 UNSUPPORTED (C22), 0 CONTRADICTED, 2 PARTIAL (C21, and C7 on architecture).**

### Prior-research claims falsified by wider search

The requested list was not where the real failures are. These are.

| # | Prior-research claim | Verdict | Why |
|---|----------------------|---------|-----|
| P1 | "No fixed allowance, model entitlement, price, required minimum OS version, supported CPU architecture, proxy compatibility, or offline operation was established by these pages." (canvas-curriculum-research.md) | CONTRADICTED | Literally true of G1-G7 and therefore technically defensible, but the primary research then propagated it as if these facts were unknowable. Allowance, price, CPU architecture, and proxy compatibility are all first-party documented elsewhere on the same docs site and on the app's own public repo. See N1, N4, N5, N7. The research stopped at the app doc set and never searched. |
| P2 | "Learners do not need to use VS Code, Ruby, Node, Azure, a cloud sandbox, external MCP tools, or a command line as part of the core teaching path." (primary research, Agenda Ready for Authoring) | UNSUPPORTED | No source establishes that a generated canvas extension runs without Node. Evidence cuts the other way. See N9. The same document later hedges ("no dependency-free guarantee has been demonstrated"), so the agenda bullet and the caveat contradict each other inside one file. The bullet is the one that would be printed on a slide. |
| P3 | Source register ID `G7` | INTERNALLY INCONSISTENT | Primary research: "G7 | GitHub Skills course". Curriculum research: "G7, organization policies" with the Skills course as G8. The same ID denotes two different sources across the two files a handoff reader is told to use together. |
| P4 | Proposed prompt text "`/create-canvas` Build our reviewed Team Task Board in project scope under `.github/extensions`." | PARTIAL, plausible but untested | Docs present scope as a choice made during creation ("You can choose whether the canvas should be shared with your team or kept personal"), not a path expressed in prose inside the prompt. Whether the skill honours a path embedded in prompt text is unverified. The prompt is labelled proposed/unrehearsed, which is honest, but a facilitator could easily read it as validated syntax. |
| P5 | "the actual modes are Interactive, Plan, and Autopilot" | SUPPORTED and correct | Verified. Prior research got this right and was right to reject "Agent mode". |
| P6 | "Cloud sandboxes are public preview. Do not extend that preview label to the whole app." | SUPPORTED and correct | Verified: "Cloud sandboxes for Copilot (public preview) are fully isolated environments hosted by GitHub." Prior research was appropriately careful here. |
| P7 | "No universal reopen command was established." | SUPPORTED and correct | Verified. This was the most important cautious call in the prior research and it holds. |

## Newly Discovered Facts That Break or Complicate the Workshop

Ordered by how much damage each does to the current plan.

### N1. Billing is AI credits, not premium requests, and the prior research modelled neither

The premium-requests page now carries: "This article only applies to Copilot Pro and Copilot Pro+ subscribers on an existing annual plan who remained on legacy premium request-based billing after June 1, 2026."

The current model is token-priced credits: "This total is converted into **AI credits** (1 AI credit = $0.01 USD)." Allowances are Copilot Pro 1,500/month, Pro+ 7,000/month, Max 20,000/month. "Copilot CLI" and "Copilot cloud agent" are named as credit-consuming features, and the app is built on Copilot CLI.

Why this breaks the plan: the research budgets a 30-minute canvas-creation block. Cost scales with tokens, not with prompts. "What affects my usage?" states: "Features like agent mode and Copilot cloud agent can involve multiple model calls within a single task. A complex agentic session working across a large codebase will consume significantly more usage than a quick question in chat." A whole-application generation is exactly that shape. The research's single bullet "approved attendee access/runtime/model and budget" does not describe a quantified, per-attendee, worst-case spend. It needs to.

### N2. Copilot Free gets auto model selection only

"Copilot Free and Copilot Student both have an allowance of AI credits and access to models through auto model selection only."

Why it matters: the proposed section 2 has learners select a model. On Free that control is not theirs. The allowance amount for Free is not stated numerically anywhere I could find. A workshop that says "any plan works" is technically right and operationally wrong if half the room is on Free.

### N3. Rate limits are explicitly anti-group

Usage limits page: "Rate limits ensure no single user or group can monopolize these resources." No numeric limit is published.

A classroom of attendees from one organisation, on one network, all triggering agentic generation inside the same ten-minute window, is the exact pattern that language describes. The app changelog confirms this is not theoretical: "Fixed cloud sessions losing their visible conversation history when a resume attempt hit a GitHub rate limit", "Fixed sessions using your own model (BYOK) getting silently switched to Auto when you hit a Copilot rate limit", and "Fixed a misleading message that claimed you had used 100% of your allowance for any unrecognized rate limit". Prior research contains no staggering strategy and no rate-limit recovery step.

### N4. Corporate proxies are a first-class blocker, and TLS interception is called out by name

From the network troubleshooting page:

- "If your proxy's URL starts `https://`, it is not currently supported by GitHub Copilot."
- "GitHub Copilot supports basic authentication or authentication with Kerberos."
- "These errors are usually caused by a corporate proxy setup that uses custom certificates to intercept and inspect secure connections."
- "If you are an employee of a company with a proxy server, your company must also configure proxy settings for Copilot at the company level."

The named audiences are a large aerospace/simulation enterprise and a provincial government. TLS-inspecting proxies are close to the default in both sectors. Prior research's preflight checklist says only "network access" and lists no proxy, certificate, or allowlist item. This is the most likely single cause of a failed live session and it is currently unmitigated.

### N5. A concrete firewall allowlist exists and is long

The allowlist reference names, among others: `https://github.com/login/*`, `https://github.githubassets.com`, `https://api.github.com/copilot_internal/*`, `https://copilot-proxy.githubusercontent.com`, `https://origin-tracker.githubusercontent.com`, `https://*.githubcopilot.com/*`, `https://default.exp-tas.com`, `https://collector.github.com/*`, `https://copilot-telemetry.githubusercontent.com/telemetry`. It also warns that plan-specific hosts such as `https://*.business.githubcopilot.com` interact with subscription-based network routing, and adds an apex-domain note: "we recommend allowing the apex domain `github.com`. This is not covered by `*.github.com`."

This is a concrete, actionable preflight artifact the workshop should hand to the customer's network team weeks ahead. It does not appear anywhere in the prior research.

### N6. Telemetry and conversation-data collection is stated plainly, and the research never quoted it

From the app's own public repository README, Data & Telemetry section: "If you use the GitHub Copilot App with your GitHub Copilot account, we may collect usage data (such as code acceptance or rejections), associated conversation data, and user feedback submitted via the feedback dialog."

Prior research asserted "Local files do not establish on-device inference, residency, or retention guarantees" but cited nothing. For a government audience this sentence is the one that has to be on a slide and in the preflight approval request. Related: `/collect-debug-logs` is documented as creating "a debug log archive or uploads one as a secret gist", and the repo README warns "Note: These logs may contain sensitive information."

### N7. Architecture and OS constraints are real and partly undocumented

The three-OS claim is true but under-specified. The app repo publishes distinct builds: Windows x64, Windows ARM64, Mac Apple Silicon, Mac Intel, and **Linux x64 AppImage**. I found no Linux ARM64 build in that list. The marketing page's download button rendered as "Download for Windows (ARM)", i.e. per-machine detection, not a single universal installer.

No minimum OS version is documented anywhere I looked. The changelog contains "Fixed the app failing to start on some older macOS versions", which proves a floor exists without publishing it. Linux specifics also appear repeatedly as fragile: "Fixed the AppImage failing to launch on some Wayland desktops", "Fixed EGL_BAD_PARAMETER crashes on Wayland systems (Arch, Fedora 42) when launching the Linux AppImage", "Fixed git clone and fetch failures on Fedora, RHEL, and other non-Debian Linux distributions", "Fixed Linux updates so deb and rpm installs show release-page guidance instead of failing to self-update".

Practical consequence: "supports Linux" should not be printed without qualification on a slide. An AppImage is also often blocked outright by managed-device policy.

### N8. Release cadence is roughly daily, and UI labels have already moved

The app repo shows 82 releases, currently v1.1.23, with the changelog commit dated "yesterday". The changelog records UI renames that would silently invalidate workshop screenshots and step text, including: "Renamed the 'Extensions' submenu in the right sidebar's add-tab menu to 'Canvas'", "Renamed 'Quick Chat' / 'Quick Chats' to 'Chat' / 'Chats' throughout the app", "Removed the 'Default model' section from Sessions settings", and "Renamed the 'Start from scratch' option to 'Chat' in session creation menus".

Prior research's mitigation is a single checklist line: "Recheck G1-G7 shortly before delivery". At this cadence that is not sufficient. Screenshots need a capture-to-delivery window measured in days, and the deck needs a policy for what happens when a label moves between rehearsal and delivery.

### N9. Nothing establishes that a generated canvas runs without Node, and the evidence leans the other way

Documented structure of a canvas extension: "A `package.json` file for extension metadata and dependencies." and "An extension entry file, such as `extension.mjs`, that defines the canvas behavior and capabilities." A `package.json` with a dependencies field and an `.mjs` ES-module entry point is a Node-shaped artifact.

Corroborating changelog entries: "The Azure DevOps popular MCP server preset now uses the hosted remote endpoint instead of a local npx command, so adding it no longer requires a local Node.js install" (so a local Node install is a real requirement for some local paths, and is treated as a burden to be avoided); "Uninstalling or disabling a plugin now stops its extension process instead of leaving it running in the background" (extensions are processes); "Fixed a memory leak on macOS where repeatedly opening and closing canvases left background processes running"; "Fixed tools installed via the login shell profile (e.g. custom PATH entries) not being found by extensions on Linux" (extensions resolve tools from the user's shell PATH).

No documentation states that a Node runtime ships with the app. The workshop bullet "Learners do not need to use ... Node" is therefore an unsupported assertion about the runtime, not a scoping decision about the curriculum. This must be resolved by rehearsal on a clean, Node-free managed machine before it is printed.

### N10. Canvas extensions have an install-time check that can fail

Changelog: "Retrying a failed canvas extension check no longer shifts the layout of the Installed extensions list." There is a validation step for canvas extensions, it can fail, and it is not described in the documentation. Prior research's recovery guidance has no branch for this.

### N11. Canvas Dev Mode exists and is a better recovery lever than anything in the plan

Changelog: "You can now enable Canvas Dev Mode from the command palette on extension canvases to switch to a read-only developer view and refresh the canvas."

This is exactly the "blank panel" recovery affordance the curriculum's section 3 recovery step is missing. It is in the product but not in the docs, and not in the research.

### N12. Git is now partly bundled, so the prerequisite is ambiguous

Docs list Git as a prerequisite. The changelog says "Git is bundled with the app under a staff-only experiment, paving the way for users to no longer need git installed on their system" and later "Fixed git clone and fetch failures on Fedora, RHEL, and other non-Debian Linux distributions by falling back to the system git when the bundled git can't load its libraries", plus "Fixed Git operations failing on Windows when Git is installed via Scoop" and "Fixed Overview reporting the wrong Git version on macOS when a different Git install is used".

Treat the documented prerequisite as authoritative for preflight. Do not teach that Git is optional. But expect Git-related failure modes that depend on how Git was installed, which the docs do not cover.

### N13. Organization policy can block the app outright, and "enabled by default" is not reassurance

Changelog evidence that this is a live failure mode: "Business, Enterprise, and GHES users whose organization had 'Editor preview features' disabled are no longer blocked from accessing the app during sign-in"; "Added an onboarding step for Business, Enterprise, and GHES users that detects when required Copilot preview features are not enabled"; and critically "Fixed an issue where switching to or adding an account whose organization disabled the Copilot app could bypass the access restriction; the app now correctly blocks access whenever any signed-in account is restricted."

That last one matters for a mixed-account classroom: a learner signed into both a personal account and a restricted corporate account is blocked entirely, not downgraded. The docs page "Supported surfaces for GitHub Copilot policies" does list GitHub Copilot app as its own policy column, confirming the app is separately governable. I could not read the per-policy checkmarks reliably from the extracted table, so which specific policies apply to the app column remains unverified by me.

### N14. Enterprise Managed User accounts cannot create gists

Changelog: "The Share as secret gist action is now shown as inactive with an explanation for Enterprise Managed User accounts, which cannot create gists" and "gists being disabled for Enterprise Managed User accounts".

Prior research already recommended keeping gist exports out of the workshop, which is the right call, but for the wrong reason. It framed this as a data-boundary choice. For EMU learners it is simply unavailable, so any troubleshooting path that routes through `/export-gist` or `/collect-debug-logs` gist upload is dead.

### N15. Cost-control commands exist that the workshop should teach and currently does not

`/context` ("Shows the current session's context usage details"), `/compact` ("Summarizes earlier parts of the conversation to reduce token pressure in the session"), `/usage`, and `/chronicle cost-tips` ("Shows suggestions to reduce token usage and cost"). The app overview additionally recommends: "Use **Chats** to clarify requirements and reduce rework before creating a dedicated session" and "Start a new session when you switch tasks."

Given N1, a developer-audience workshop that teaches agentic generation without teaching credit awareness is incomplete. This is a content gap, not an error.

### N16. Minor documentation inconsistency in a command the workshop might print

The app overview page writes the command as `/chronicle cost tips` (spaces). The slash-commands reference writes `/chronicle cost-tips` (hyphen). If a facilitator copies from the overview page it may not resolve. Prefer the reference page spelling.

### N17. Preview labelling, stated carefully

In the extracted body text of the six GitHub Docs pages, only two things carry a public-preview label: cloud sandboxes ("Cloud sandboxes for Copilot (public preview)") and `/security-review` ("currently in public preview and subject to change"). Canvas extensions carry no preview label in the extracted text. The app itself carries no preview label in the extracted text.

Historical context that should temper any "this is GA" statement: the app changelog's earliest entry is "## v0.2.0 — ### Added — Technical Preview for the GitHub app", and there was a waitlist as recently as the v0.2.x line ("Copilot Pro, Pro+, and Max subscribers are now taken directly to the repository selection step after sign-in, bypassing the waitlist"). The product has clearly moved past that, but with 2,900 open issues on the app repo and a daily release cadence, describing canvas extensions as a settled surface would be an overstatement in either direction. Do not claim GA. Do not claim preview. Describe the observed version.

Absence-of-label finding, per the method limitation above, is the weaker class of evidence here.

## What Prior Research Got Right

Stated for balance, because the falsification pass should not only report failures.

- Product identity is correct. Canvas extensions are not Power Apps canvas apps, not Spark, not Copilot Workspace.
- Mode names are correct and the rejection of "Agent mode" as a heading is correct.
- The `get_board` / `add_card` / `move_card` hedge is correct and important: the docs present them as capabilities you ask the agent to add, not as a built-in API.
- The persistence and reopen caution is correct and is the single best call in the document. Nothing in the docs guarantees canvas state survives a restart.
- The public-code-despite-Block warning is correctly captured and correctly quoted.
- The separation of the cloud-sandbox preview label from the app is correct.
- Labelling every prompt "proposed/unrehearsed" is honest and should be preserved verbatim into implementation.

## Blunt Assessment

The prior research is careful about the things it looked at and incurious about the things it did not. Every factual claim it makes about the six GitHub Docs pages survives verification. Its hedging discipline is genuinely good.

The failure is scope. It drew a boundary around G1-G7, then converted "these pages do not say" into "this is unknown", and carried that into the handoff as if the unknowns were irreducible. Allowances, pricing, CPU architecture, proxy behaviour, firewall requirements, and telemetry are all first-party documented. They were one search away. For an audience of a defence-adjacent enterprise and a provincial government, the proxy, allowlist, and telemetry gaps are the difference between a workshop that runs and a workshop that does not.

The second failure is the Node bullet. A slide that tells developers they need no Node, sourced from nothing, in a product whose extension format is `package.json` plus `extension.mjs`, is the kind of confident-sounding claim that fails live in front of a customer.

The third is cost. A 30-minute agentic generation block with no per-attendee credit ceiling is an unpriced liability, and the research treats budget as a checklist item rather than a design constraint.

## Recommended Next Verification

- [ ] Rehearse `/create-canvas` on a clean managed machine with no Node runtime installed, and record whether generation and execution succeed. This settles P2/N9 and nothing else will.
- [ ] Measure actual AI credits consumed by one full canvas creation plus the refine and review steps, then multiply by expected attendance and publish a per-attendee ceiling before any approval request.
- [ ] Hand the allowlist from N5 to the customer network team and confirm no TLS interception on the Copilot hosts, or confirm the certificate is in the OS trust store.
- [ ] Confirm whether scope selection during `/create-canvas` is an interactive picker or honours prompt-embedded path text, then rewrite P4's prompt to match observed behaviour.
- [ ] Read the per-policy checkmarks in the "Supported surfaces for GitHub Copilot policies" table directly in a browser and record exactly which policies apply to the GitHub Copilot app column.
- [ ] Confirm the effective app policy on each attendee's actual organization, and confirm no attendee will be signed into a second restricted account (N13).
- [ ] Record the exact app version at rehearsal and again on delivery day, and re-verify every UI label named in the deck against the changelog diff between those two versions.
- [ ] Determine minimum supported macOS, Windows, and Linux versions by asking GitHub Support or testing, since they are not published.
- [ ] Decide whether Linux is in scope at all, given AppImage-only distribution and the Wayland and RHEL-family defect history.
- [ ] Reconcile the G7 identifier collision across the two prior research files before either is used as a handoff baseline.

## Clarifying Questions for the User

1. What is the maximum acceptable AI-credit spend per attendee for this workshop, and who approves it? Without a number, section 3 cannot be timeboxed responsibly.
2. Are attendees on Copilot Free, or on Business/Enterprise seats? The answer changes whether model selection is teachable at all (N2).
3. Is Linux in scope for attendee machines? If yes, which distributions and desktop environments, given AppImage-only distribution?
4. Do the target organizations run TLS-inspecting proxies? If yes, N4 must be resolved before any date is committed.
5. Will any attendee use an Enterprise Managed User account? That removes gist-based diagnostics entirely (N14).
