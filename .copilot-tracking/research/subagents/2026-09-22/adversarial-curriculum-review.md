---
title: Adversarial Review of the GitHub Copilot App Workshop Curriculum
description: Red-team findings, severity ratings, and concrete mitigations for the 90-minute bilingual Team Task Board workshop.
ms.date: 2026-09-22
---

## Status and Method

Adversarial documentary review completed 2026-09-22. Sources reviewed: .copilot-tracking/research/2026-09-22/github-copilot-app-workshop-research.md and .copilot-tracking/research/subagents/2026-09-22/canvas-curriculum-research.md. No external research, no delegation, no other file modified.

Posture is deliberately hostile. The question answered here is not "is this well researched" but "what breaks in front of twenty paying developers." The research quality is high; the delivery readiness is not. Those are different things, and the plan currently conflates them.

Finding counts: 5 CRITICAL, 9 HIGH, 8 MEDIUM, 4 LOW. Twenty-six findings total.

## What Is Genuinely Sound

State this once and move on. The following do not need fixing.

* The safety and review gates, five layers from context through broader use, are stronger than most commercial workshop material and correctly refuse to treat prompt text as a security control.
* The refusal to teach `/allow-all-tools`, `/yolo`, or blanket tool approval is correct and unusual.
* The recovery prompt that forbids regenerate-as-undo is the right instinct and teaches a real engineering habit.
* The unverified-claims register is honest and unusually complete. It is also, read adversarially, a list of every reason the workshop is not yet deliverable.
* The state arithmetic itself is correct. Four tasks at 2/1/1, add T005 to reach 3/1/1, move T002 to reach 2/2/1, high-priority filter shows T001 and T003 as 2 of 5. The math is not the problem; the assumption that a generated UI will expose the controls needed to exercise it is.
* Excluding Autopilot from hands-on work and confining the core to Plan plus Interactive is a defensible autonomy boundary.

## CRITICAL Findings

### C1. The load-bearing fallback artifact does not exist

Failure: every recovery path in sections 3 and 5 terminates in "use the reviewed reference canvas or screenshots if prepared." The curriculum research states plainly that these artifacts "do not exist as outputs of this task," and the primary document lists preparing them as future work. A recovery mechanism that has not been built is not a recovery mechanism. On the day, a learner whose generation fails has nowhere to go and the facilitator has nothing to hand them.

Compounding: the same paragraph offers a "spectator/pair-review route" as the alternative, then immediately concedes it "does not count as hands-on completion." That is an admission that the documented failure path delivers a different, lesser product than the one attendees paid for.

Answer to the question asked: no, this is not an acceptable plan of record. Two named artifacts that do not exist cannot be the mitigation for the workshop's highest-variance step.

Mitigation:

* Build a reviewed reference canvas before anything else in the implementation sequence, not after. It is a prerequisite for the curriculum, not a nice-to-have appendix.
* Ship it as a copyable directory, not as screenshots. A learner must be able to drop a prepared `.github/extensions` folder into their project and continue sections 4 and 5 hands-on. Screenshots convert a paid hands-on workshop into a demo and should be the third fallback, not the first.
* Stage it on media that survives a network failure: a local file on each device placed during preflight, not an internal repository the corporate proxy may block on the day.
* Rehearse loading the fallback, not just producing it. The gesture that imports a prepared extension into an existing session is itself unverified in both documents.

### C2. The entire 30-minute core rests on an explicitly unmeasured generation step

Failure: the research states that "generation duration is unmeasured and must be rehearsed" and lists as an unverified claim that "the canvas is generated within the 12-minute creation timebox." The 12-minute figure is an estimate with no observation behind it. A single-digit-minute overrun, which is entirely ordinary for agentic code generation, consumes all of section 3 and both dependent sections.

The plan currently has no measured number anywhere. Not generation time, not plan-mode round-trip time, not the time to render a panel, not the time for a targeted repair prompt. Every number in the agenda is an assumption.

Mitigation:

* Run the full end-to-end path, EN and FR, at least twice each, on the same device image and app version attendees will use, at least one week before delivery. Record wall-clock times per step including the slowest observed run, not the median.
* If the slowest observed generation exceeds 10 minutes, the exercise does not fit in 30 minutes and the curriculum must change, not the estimate.
* Publish the measured numbers in the facilitator runbook. If a number in the agenda has never been observed, mark it as an estimate in the runbook so facilitators do not pace against fiction.

### C3. Absolute-value acceptance checks cannot survive generation variance

Failure: the oracle asserts exact rendered outcomes across five checkpoints. Those assertions silently depend on the generator producing, on the first attempt, all of: an add form accepting an explicit ID, a non-drag status control, per-status counts displayed in the UI, visible unique IDs, a priority filter with a separate clear control, and a visible-of-total counter. Any single omission breaks the checkpoint even when the underlying shared-state behavior, which is the actual learning objective, works perfectly.

Twenty learners will produce twenty different canvases. Some will auto-generate IDs. Some will render counts only in chat. Some will implement status change as a dropdown, some as buttons, some as drag-only despite the instruction. The oracle as written will report failure for learners whose canvas is fine.

Worse, the checks are chained. Sections 4 and 5 both require the exact five-task end state of section 3, so one early divergence disqualifies a learner from the remaining 30 minutes.

Mitigation, a delta-and-invariant oracle that survives variance:

Replace absolute assertions with tiered, identifier-agnostic checks.

| Tier | Assertion | Survives variance because |
| ---- | --------- | ------------------------- |
| A, gate | A canvas panel renders and shows four distinct task identifiers, whatever their format. | No dependency on control shape, counts, or labels. |
| A, gate | Some UI path creates a task and some UI path changes a status. | Accepts dropdown, button, menu, or inline edit. |
| B, core | After the learner adds one task through the UI, total increases by exactly one, and the agent, asked to read state, reports back the same identifier the UI shows. | Identifier-agnostic. This is the real bidirectional-state proof. |
| B, core | The learner names an existing task by whatever ID the UI displays and asks the agent to move it; the source status count decreases by one and the destination increases by one, visible in the UI without regenerating. | Delta-based. Works regardless of seed IDs surviving. |
| C, stretch | Filter reduces visible count while total remains unchanged; clearing restores the prior visible set exactly. | Invariant, not a specific pair of tasks. |
| C, stretch | Empty title and duplicate identifier are rejected through both paths with totals unchanged. | Already invariant in the draft. |

On the explicit-ID question asked: requiring a learner to type "T005" is not realistic UX and should be dropped from the core. The research is candid that the reason is testability, "so checks do not depend on nondeterministic generated IDs." That trade forces the generator to produce a form no competent developer would ship, and it teaches learners a pattern that is wrong in the domain being taught. A generator that auto-assigns IDs is behaving correctly and would be marked as a failure. Under tier B above, explicit IDs become unnecessary because the check is a delta plus an echo. Keep explicit-ID entry only as an intermediate-track variant framed honestly as a testability affordance.

### C4. Unreviewed generated code executes before the review section runs

Failure: the canvas executes when it renders in section 3. The human review step is section 5, roughly 25 minutes later. The plan therefore reviews code after it has already run on a managed corporate device. The safety gates say "before acceptance: inspect Changes, generated extension metadata/entrypoint/state files, unexpected paths, dependencies, network calls, shell execution, and credential handling" but acceptance is positioned after execution, which inverts the control.

The primary document also claims "no installation needed" is a target while conceding "no dependency-free guarantee has been demonstrated," and the curriculum notes a generated extension "commonly includes package.json." A package.json implies a dependency resolution step, which implies either a network fetch or a failure. The creation prompt instructs the agent to "stop if installation is needed," meaning the single most correct model response available is one that fails the lab.

Mitigation:

* Do not claim "no installation needed." Claim instead that the workshop stops rather than installing, and accept that this is a real abort path with a defined fallback, which is C1's reference canvas.
* Move a lightweight pre-execution inspection into section 3 itself: before interacting with the rendered canvas, spend 90 seconds in Changes confirming the file list, that no network call or shell execution appears, and that the entrypoint is local. Frame it as the developer habit being taught, which strengthens the pedagogy answer in H12 at the same time.
* Obtain, in writing and before invitations are sent, a scoped exception permitting execution of AI-generated code on the attendee device image, with a named approver per organization. Absent that, run the workshop on facilitator-provided disposable machines or virtual desktops.
* Define an incident path: what a learner does if endpoint protection quarantines the generated extension mid-session, and who they notify. This is currently absent and will happen at least once across twenty managed devices.

### C5. Twenty simultaneous generation requests are not modeled at all

Failure: neither document accounts for concurrency. Twenty developers on one corporate egress, sending near-identical large agentic code-generation requests inside the same two-minute window, is a different system than one developer rehearsing alone. The research establishes that `/usage` exists and that "no fixed allowance, model entitlement, price, required minimum OS version, supported CPU architecture, proxy compatibility, or offline operation was established." That is the complete list of things that determine whether twenty people can do this at once, and none of them is known.

Realistic failure rate, reasoning from normal delivery practice for an unrehearsed, network-dependent, policy-gated step on managed corporate laptops:

| Failure class | Expected share of 20 | Notes |
| ------------- | -------------------- | ----- |
| Blocked at policy or sign-in on the day despite checkbox preflight | 2 to 4 learners | Enterprise-level app policy cannot be overridden by the org, per G7. Discovered late, unfixable in class. |
| Proxy, TLS inspection, or egress failure to the model endpoint | 1 to 2 learners | Corporate networks routinely break long-lived streaming connections. |
| Version or platform divergence, unsupported or stale app build | 1 to 2 learners | No minimum version is pinned anywhere in the plan. |
| Canvas generated but missing at least one oracle-required control | 4 to 8 learners | This is the modal outcome, not the exception. |
| Rate limiting, quota exhaustion, or visible slowdown under concurrent load | Unknown, unbounded | Zero evidence in either document. |

Aggregate expectation is that roughly one learner in three needs facilitator intervention at least once inside section 3. With one facilitator and a 30-minute section, that is unservable arithmetic before any other problem occurs.

Mitigation:

* Stagger generation. Split the room into two or three waves 90 seconds apart. This costs nothing, flattens the concurrency spike, and gives the facilitator a triage queue instead of a simultaneous failure event.
* Establish the budget before delivery: which model, what per-seat entitlement, what happens when a seat exhausts it, and who pays. Capture a `/usage` reading from every seat during preflight as the baseline.
* Test from the actual venue network, not from the facilitator's home or a guest SSID, at least one week out. Venue network and corporate device network may differ; test whichever attendees will use.
* Name a hard concurrency abort: if more than four learners are blocked at T+6 in section 3, the facilitator converts the whole room to the reference canvas rather than triaging individually.

## HIGH Findings

### H1. Section 3 has no slack and no published 30-minute decomposition

Failure: the only decomposition that exists anywhere is the curriculum draft's 12 plus 5 plus 5 plus 3, which totals 25 and was written for the superseded 25-minute section. The primary document retimed the section to 30 without re-decomposing it. Five minutes are unallocated by accident, not by design, and no facilitator has been told they exist.

On the question asked: there is no slack in any meaningful sense, because the 12-minute generation estimate has never been observed and could plausibly be 4 minutes or 20. An unmeasured estimate does not produce a slack figure.

Mitigation: publish an explicit 30-minute decomposition after measurement, with the surplus assigned deliberately. A defensible shape once generation is measured at duration D: D for creation, 2 for pre-execution inspection per C4, 4 for the UI action, 4 for the agent action, 3 for comparison, and the remainder held as named triage buffer that the facilitator may consume without apology.

### H2. No abort thresholds exist anywhere in either document

Failure: both documents say "stop at the timebox" and "stop repeated retries" without defining a clock. A facilitator watching twenty screens has no rule telling them when to give up on a learner. In practice they will keep trying, because abandoning someone feels worse than running late, and the section will overrun.

Mitigation, an explicit wall clock measured from the moment the creation prompt is sent, to be published in the runbook and rehearsed:

| Time | Condition | Action |
| ---- | --------- | ------ |
| T+6 | No canvas panel has appeared at all | Switch that learner to the reference canvas immediately. Do not wait for the timebox. |
| T+6 | More than four learners blocked | Convert the entire room to the reference canvas. Announce it once, plainly, and move on. |
| T+10 | Canvas exists but fails tier A | One targeted repair prompt, single attempt, no regeneration. |
| T+13 | Hard stop | Whatever exists becomes that learner's baseline. Anyone below tier A receives the reference canvas. |
| T+20 | Section 3 interactions incomplete | Inject the known five-task state and proceed to section 4 regardless. |
| Section 4 entry | Any learner without a working board | Reference canvas, no exceptions, no further diagnosis during class. |

The governing rule: a learner is never allowed to fall more than one section behind. Diagnosis of an individual failure is a post-session activity, not a live one.

### H3. Serial dependency across sections has no resume mechanism

Failure: section 4 requires exactly five tasks with specific priorities; section 5 requires the 2/2/1 end state. A learner who diverges in section 3 is structurally excluded from 30 of the 90 minutes. The plan offers no way to inject a known-good state.

Mitigation: make every section independently enterable. Ship the reference canvas in four snapshot states matching the four checkpoints, so a learner can be dropped into section 4 or section 5 with correct state in under a minute. This is cheap once C1 exists and it converts a cascading failure into a local one.

### H4. Running EN and FR cohorts from one untested generator is not realistic

Failure: `locale=fr` is an instruction in a prompt, not a product feature. Nothing in the retrieved evidence establishes French app UI coverage, and the research says so directly. The predictable outcome is mixed output: French display labels where the model complied, English generated identifiers, English validation and error strings, English code comments, and English text supplied by any dependency. The FR path has never been observed once.

Specific breakage the current oracle will suffer: section 4's FR check is label-dependent, asserting a "filtre Priorité haute" control. If the model labels it "Filtre haute priorité," or leaves it English, a correct implementation fails the check. Section 3's FR prompt requests French labels while the fixture supplies T005's title in one language only, so the FR board will contain at least one deliberately monolingual row that learners will read as a defect.

Mitigation:

* Rehearse FR first, not second. FR is the higher-risk path; if it works, EN almost certainly does, and the inverse does not hold. Current plan order implies the reverse.
* Assert only on machine values. Status keys todo, doing, done, priority keys high, normal, and identifiers. Never assert on a display string in any language. This single change removes most bilingual fragility.
* Pre-announce mixed output to FR learners in section 1 and convert it into a stated learning objective: identifying which parts of generated output a locale instruction actually controls is a genuine and transferable developer insight. Discovering it as an unexplained defect at minute 40 is not.
* Budget explicitly more time for FR, or remove one FR checkpoint. French labels run longer, accented text and narrow-panel clipping are real, and the extension block already flags this.
* Treat EN and FR as two separately validated products with separate go/no-go decisions. Do not let a successful EN rehearsal authorize FR delivery.

### H5. Preflight is a checklist with no owner, no evidence, and no go/no-go

Failure: the preflight section is a list of things someone should confirm, with no named owner, no deadline, no verification artifact, and no threshold below which the workshop is postponed. Self-attested checkboxes reliably produce a room where four people discover on the day that their enterprise policy blocks the app, which per G7 cannot be changed by the organization and certainly not during class.

Mitigation:

* Replace attestation with evidence. Each attendee, on the actual device, at least 48 hours ahead: install and sign in, run `/usage`, and run a trivial `/create-canvas` in a throwaway folder confirming a panel renders. They return app version, OS, architecture, and a screenshot. Nothing else counts as verified.
* Name an owner and a go/no-go time 24 hours out, with a published rule. A defensible threshold: proceed at 80 percent verified, reduce scope at 60 to 80 percent, reschedule below 60 percent.
* Pin a minimum app version and refuse older builds, rather than discovering version drift live. No minimum is currently specified anywhere.

### H6. Facilitator-to-learner ratio, helper staffing, and class cap are absent

Failure: neither document mentions how many people run the room. Combined with C5's expected intervention rate, one facilitator for twenty hands-on learners in a 30-minute section is not a staffing plan, it is a queue that never drains.

Mitigation: one lead facilitator plus one floating helper per six to eight hands-on learners. Twenty learners requires a lead plus three helpers, or the hands-on cap drops to sixteen. Helpers need the runbook, the abort clock from H2, and authority to hand out the reference canvas without escalating. Publish the cap and enforce it at registration.

### H7. No pre-class dry run is scheduled as a gate

Failure: the implementation handoff lists rehearsal as step 3 of 7, sequenced alongside site and deck construction, rather than as a blocking gate. Rehearsal is the only activity that converts the plan's many assumptions into numbers.

Mitigation: make a full dry run a release gate, not a task. Two complete runs per language, on the attendee device image, on the venue or corporate network, with at least one run performed by someone who did not write the curriculum. Any assumption still unmeasured after the dry run gets removed from the agenda rather than carried into delivery.

### H8. The learner's own judgment is barely exercised

Failure: on the pedagogy question asked, the honest answer is that the core is closer to a guided demo with copyable prompts than to a skills workshop. Every prompt is supplied verbatim. The learner's activity is paste, observe, compare against a supplied expected result. The parts that would develop judgment, deciding what to ask for, noticing what the agent overstated, choosing what to reject, are compressed into one-line intermediate asides.

Mitigation, three insertions that cost little time and change the character of the course:

* Section 2, mandatory: each learner strikes one item from the agent's proposed plan and writes one sentence justifying it. This is the only point where a human decision genuinely gates execution, and the plan currently passes through it without requiring anything.
* Section 3, mandatory: after the agent reports success, each learner writes down one thing the agent claimed that they did not personally observe. Teaching the gap between reported and observed is the single most transferable skill in this entire curriculum and it is currently only implied.
* Section 4, mandatory: learners write their own refinement prompt rather than pasting the supplied one, with the supplied prompt available only as a fallback after three minutes. This is the section whose stated topic is prompting; supplying the prompt defeats it.

### H9. The beginner and intermediate split is cosmetic

Failure: the split is implemented as an extra sentence per section, "Beginner: perform the two actions. Intermediate: test that blank titles and duplicate T005 are rejected." Both tracks do the same work at the same pace with the same prompts. Nothing structurally differentiates them, and no mechanism assigns a learner to a track.

Mitigation: make the split structural or drop it. If kept, define it as differing acceptance bars against the C3 tiers: beginner completes tiers A and B, intermediate must additionally pass tier C and produce one written regression test. Assign at registration based on a declared self-rating, seat learners accordingly, and pair an intermediate with a beginner at each table so the intermediate track produces peer capacity instead of just extra work.

## MEDIUM Findings

### M1. Section 1 was retimed from 15 to 10 minutes with no re-decomposition

The only published breakdown is 5 plus 5 plus 5 from the superseded draft, which no longer fits. Someone must decide which five minutes disappear, and it should not be the safety-and-misconceptions block, which is the one that carries C4's framing. Recommended: 3 product identity, 3 board and shared state, 4 safety, boundaries, and the honest statement about mixed-language output from H4.

### M2. The 5-minute wrap-up cannot service its stated objectives

Three minutes of recap plus two minutes of questions across twenty people allocates roughly six seconds of Q&A per attendee. The stated objectives for section 6 include explaining observed results, remaining limits, and an approved next step, plus a three-question knowledge check. That is a 10-minute block compressed into 5.

Mitigation: either move five minutes from section 3 into section 6 after H1's measurement proves section 3 can spare it, or move Q&A out of the timed workshop into an explicitly unbounded post-session block and keep section 6 as a pure recap. Do not advertise Q&A inside 90 minutes.

### M3. Section 5's persistence checkpoint may legitimately produce no result

The reopen protocol is rehearsal-gated and the plan explicitly permits marking the checkpoint "unverified" if no tested reopen gesture exists. A paid section that can correctly conclude with nothing demonstrated is a content risk even when it is intellectually honest.

Mitigation: determine during the dry run whether a reliable reopen gesture exists. If it does not, replace that segment with a concrete handoff artifact exercise, which is already drafted in the optional extension, rather than running a checkpoint that may yield nothing.

### M4. Attendee communications sequence is undefined

No pre-class comms plan exists. Recommended sequence: T-14 days prerequisites and device requirements, T-7 the evidence-producing preflight from H5 with a named contact, T-2 go/no-go decision communicated either way, T-1 logistics reminder including the explicit statement that only synthetic data may be used.

### M5. Recording, screenshot, and consent policy is absent

The plan calls for "sanitized screenshots from actual rehearsal" in the site tree but says nothing about capturing attendee screens or sessions during delivery. Screen sharing in a room of corporate developers is a consent and disclosure question, not an afterthought.

Mitigation: state in advance whether the session is recorded, obtain consent at registration, prohibit screenshots of other attendees' screens, and confirm that facilitator demonstration material contains no attendee content.

### M6. What learners take away is undefined

Learners generate an extension in a disposable repository they are told not to commit, not push, and not share. Whether they may retain the generated code, carry it to a work machine, or reuse it is never stated, and it collides directly with C4's approval question.

Mitigation: decide and publish. The defensible default is that generated code stays on the disposable workspace and the durable takeaway is the published site, the deck, the prompts, and a written checklist. If retention is permitted, name the approval that permits it.

### M7. Success is never measured

No completion metric, no target pass rate, no survey, no follow-up. Without this, a workshop where twelve of twenty learners finished section 4 will be reported as successful because the room looked busy.

Mitigation: define before delivery. Percentage reaching tier A, percentage completing section 4, percentage completing section 5, a short post-session survey with one question on perceived usefulness and one on perceived safety, and a two-week follow-up on whether anyone applied it. Record the actual abort count and the reason for each.

### M8. Post-workshop material retention is unspecified

How long the Pages site remains available, whether decks are downloadable afterward, and whether the site is public or internal are open. P2 in the source register warns explicitly that a private repository does not guarantee a private site, which makes this a disclosure question rather than a housekeeping one.

Mitigation: decide visibility before publishing anything, verify it against P2 after publishing, and state the retention period to attendees in the T-1 communication.

## LOW Findings

### L1. Learner-typed free text enters the board as content

T005's title is typed by the learner. Someone will type something unhelpful, offensive, or deliberately adversarial to see what happens. The plan correctly instructs that titles be rendered as text rather than HTML and treated as data rather than instructions, so the technical control is present.

Mitigation: supply the exact title string in the lab page and ask learners to use it. Removes the variable at no cost.

### L2. No learner-facing procedure for a public-code match

G1's warning that public-code matches can still be generated under a Block policy is correctly surfaced, but no one has told a learner what to do if it surfaces mid-class.

Mitigation: one line in the runbook. Stop, do not continue building on it, note it, and raise it with the facilitator. Thirty seconds of section 1 content.

### L3. Section 3 title differs between the two documents

The primary document uses "Create and Use the Team Task Board"; the curriculum uses "Create and Use the Shared Task Board." Trivial, but it will propagate into the site, the deck, and both language paths if not caught.

Mitigation: the primary document is authoritative. Reconcile at authoring time and check bilingual parity against it.

### L4. Room, power, and network logistics are unaddressed

Twenty laptops running an agentic desktop app for 90 minutes is a power and wireless density question. Not a curriculum flaw, but it belongs in the same runbook.

Mitigation: confirm power per seat, wireless client capacity, and a wired or tethered contingency for the facilitator machine.

## Priority Sequence for Remediation

Work in this order. Later items are wasted effort if earlier ones are skipped.

1. Build the reference canvas and its four state snapshots, C1 and H3.
2. Run the measured dry run, FR first, H7 and H4, then publish real numbers into H1 and H2.
3. Rewrite the oracle to the tiered delta-and-invariant form, C3, and strip display-string assertions, H4.
4. Secure the execution approval and name the incident path, C4.
5. Replace attestation preflight with evidence preflight and set the go/no-go rule, H5.
6. Staff the room and cap the class, H6, then publish the abort clock to every helper, H2.
7. Insert the three judgment exercises, H8, and resolve the timing of sections 1 and 6, M1 and M2.
8. Everything else.

## Single Most Likely Cause of Day-of Failure

A cascading failure originating in section 3. The generation step has never been timed or observed, twenty learners hit it simultaneously on one corporate network, and the modal outcome is a partially-working canvas rather than a clean success or a clean failure. One facilitator cannot triage that long tail inside 30 minutes, there is no abort clock telling them when to stop trying, and the fallback they are instructed to reach for does not exist. Because sections 4 and 5 both require section 3's exact end state, each unresolved learner loses the remaining 30 minutes rather than just the current exercise.

Put plainly: the workshop's highest-variance step has no measured duration, no stopping rule, and no recovery artifact, and everything after it is serially dependent on it succeeding.
