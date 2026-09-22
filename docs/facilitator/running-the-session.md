---
title: Running the Session
description: Abort clock, per-beat decomposition of the thirty-minute block, staffing, staggered waves, and the rule that no learner falls more than one section behind.
lang: en
translation_key: facilitator-running-the-session
parent: Facilitator Kit
nav_order: 2
covers:
  - abort-threshold
  - delta-and-invariant-oracle
  - learner-decision
  - track-acceptance-bars
  - public-code-warning
  - persistence-not-guaranteed
  - unrehearsed-proposal-notice
---

# Running the Session

> [!IMPORTANT]
> Every minute value on this page is provisional. None of them has been observed. They are budgets to measure against, not measurements. Replace each one with the slowest value seen across the two timed dry runs required by gate G02, and mark the replacement date next to it. Until that happens, a facilitator pacing against these numbers is pacing against an estimate.

## Staffing and Start Waves

One lead facilitator plus one floating helper for every six to eight hands-on learners. A single facilitator for twenty hands-on learners in a thirty-minute section is a queue that never drains, not a staffing plan. Expect roughly one learner in three to need at least one intervention inside section 3.

The hands-on cap and the confirmed helper count are open as OD-03. They are not invented here. Agree both before registration opens.

Split the room into two or three waves and send the creation prompt 90 seconds apart per wave. This costs no session time, flattens the concurrency spike against one corporate egress, and converts a simultaneous failure event into a triage queue the helpers can work. Run a facilitator machine one wave ahead of everyone, so the first board on screen is a facilitator board.

Helpers carry this page, the abort clock, and standing authority to hand out the reference canvas without asking the lead first.

## The Governing Rule

No learner falls more than one section behind. Diagnosing an individual failure is a post-session activity. A facilitator debugging one machine has stopped running the workshop, so recovery is always a switch to a known-good artifact rather than live troubleshooting.

## Section 3 Per-Beat Decomposition

The clock starts the moment the creation prompt is sent, not when the room settles. Abort thresholds are meaningless without a per-beat budget to measure against, so the block is decomposed here and the ceilings line up with the abort rows in the next section.

Budget is the time the beat should take. Slack is the named buffer a facilitator may consume without apology. Ceiling is the elapsed time at which the beat must be finished.

English cohorts, thirty minutes:

| Beat | Budget | Slack | Ceiling |
| --- | --- | --- | --- |
| Describe the outcome and send the reviewed creation prompt | 2 min | 1 min | T+3 |
| Generation runs while learners record nothing and wait | 8 min | 2 min | T+13 |
| Read the dependencies the agent reports | 2 min | 0 min | T+15 |
| Approve or decline, and inspect Changes before anything runs | 1 min | 0 min | T+16 |
| First interaction through the interface, adding one task | 3 min | 1 min | T+20 |
| Agent-driven move of one task between statuses | 4 min | 1 min | T+25 |
| Compare what each side reported against what is visible | 3 min | 0 min | T+28 |
| Named triage buffer, held for the long tail | 0 min | 2 min | T+30 |

French cohorts, thirty-five minutes:

| Beat | Budget | Slack | Ceiling |
| --- | --- | --- | --- |
| Describe the outcome and send the reviewed creation prompt | 2 min | 1 min | T+3 |
| Generation runs while learners record nothing and wait | 8 min | 2 min | T+13 |
| Read the dependencies the agent reports | 2 min | 0 min | T+15 |
| Approve or decline, and inspect Changes before anything runs | 1 min | 0 min | T+16 |
| First interaction through the interface, adding one task | 3 min | 1 min | T+20 |
| Agent-driven move of one task between statuses | 5 min | 1 min | T+26 |
| Compare what each side reported against what is visible | 4 min | 1 min | T+31 |
| Named triage buffer, held for the long tail | 0 min | 4 min | T+35 |

The five extra French minutes come from the section 5 reopen checkpoint, which French cohorts drop. They are spent on the two beats after the abort clock rather than on generation, so the abort rows below stay on the same wall clock in both languages. That matters: the same clock means a bilingual helper does not have to hold two sets of numbers.

## Abort Thresholds

Six rows, all of them live during section 3. The last two are the resume mechanism. Without them a learner who diverges once is structurally excluded from the remaining thirty minutes, because sections 4 and 5 both depend on section 3 ending in a usable board.

| Elapsed | Condition | Action |
| --- | --- | --- |
| T+6 | No canvas panel has appeared for a learner | Switch that learner to the reference canvas immediately. Do not wait for the beat ceiling. |
| T+6 | More than a quarter of the room is blocked | Convert the whole room to the reference canvas and continue as a guided exercise. Announce it once, plainly, and move on. |
| T+10 | A canvas is present but not usable | Allow exactly one targeted repair attempt. No regeneration. |
| T+13 | Still not usable after the repair attempt | Hard stop. Whatever exists becomes that learner's baseline. Anyone without a usable board takes the reference canvas and pairs with a neighbour. |
| T+20 | Section 3 interactions are incomplete | Inject the known four-task state from the seed fixture and proceed to section 4 regardless. Do not finish the interactions first. |
| Section 4 entry | Any learner without a working board | Reference canvas, no exceptions, no further diagnosis during class. |

The injected state is the four seed tasks, not a five-task state. The acceptance checks are deltas and invariants measured from whatever baseline a learner records, so no section depends on a specific total.

Regeneration is never the recovery. It destroys the last observed state, which is the only evidence available about what went wrong. Preserve the state, name the smallest discrepancy, and request one targeted correction.

## Acceptance Is Deltas and Invariants

Twenty learners produce twenty different boards. Some generate their own identifiers, some render counts only in chat, some implement a status change as a dropdown and some as buttons. Checking against a fixed expected total marks correct implementations as failures, so it is not done here.

| Checkpoint | Assert this | Never assert this |
| --- | --- | --- |
| Baseline | The learner records their own observed total and per-status counts | That the baseline equals four |
| Add through the interface | Total increases by exactly one and the new task is visible with a unique identifier | A specific identifier, label text, or form layout |
| Agent reads state | The agent reports the same identifier and count the learner can see | A specific phrasing or capability name |
| Agent moves a task | Source status decreases by one, destination increases by one, total unchanged | Which task, or a specific ending distribution |
| Filter | Visible count is at most the total, stored data is unchanged, and clearing restores the prior visible count | An exact visible count |
| Reopen, only where rehearsed | Every value observed before closing is present afterwards | That reopening works at all, before it has been tested |

Assert machine values only. Status keys, priority keys, and identifiers survive translation; displayed labels do not. A French cohort checking for a specific French control label will fail correct implementations, which is why no check on this page names a display string in any language.

Persistence is requested implementation rather than a platform guarantee, and no reopen gesture has been established. Run the reopen checkpoint only where a dry run confirmed one, and say plainly that it is unverified otherwise.

## Learner Judgment Beats

Three of these are mandatory, not optional extensions. They are what separates this from a guided demo with copyable prompts.

* Section 2: each learner strikes one item from the plan the agent proposed and writes one sentence justifying the removal. This is the only point where a human decision genuinely gates execution.
* Section 3: after the agent reports success, each learner writes down one thing the agent claimed that they did not personally observe.
* Section 4: each learner writes their own refinement prompt. The supplied wording is a fallback offered only after three minutes.

## Track Acceptance Bars

The two tracks run at the same pace inside the same time budget, and differ by what counts as done. Assign at registration from a self-declared experience question, and seat an intermediate learner beside a beginner where the roster allows.

| Track | Acceptance bar | Second bar |
| --- | --- | --- |
| Beginner | Add through the interface and move through the agent, satisfying the add and move rows above | Name one agent claim they did not observe |
| Intermediate | Additionally satisfy the filter invariant and the rejection of empty titles through both paths | Write one regression check in their own words and act as the paired reviewer at their table |

An extra sentence per section is not a track. If either bar is dropped, drop the split as well rather than presenting it as differentiation.

## Incidents During Delivery

A public-code match can surface even under a blocking policy, and a learner needs thirty seconds of instruction on it, delivered in section 1 rather than improvised in section 3. The procedure is to stop, not build further on that output, note it, and raise it with the facilitator.

If endpoint protection quarantines a generated extension, the learner stops, tells the facilitator, and moves to the reference canvas. The facilitator notifies the named contact recorded under gate G13. Across twenty managed devices this will happen at least once, so name the contact before the session rather than looking for one during it.

Record the abort count and the reason for each one. A session where eight learners silently took the reference canvas and a session where none did are different outcomes, and only the recorded count tells them apart.
