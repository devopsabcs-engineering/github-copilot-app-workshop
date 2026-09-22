---
title: Reference Canvas
description: Building, reviewing, and staging the recovery artifact as a copyable extensions directory rather than screenshots.
lang: en
translation_key: facilitator-reference-canvas
parent: Facilitator Kit
nav_order: 3
covers:
  - review-dependencies-before-run
  - human-review-required
  - delta-and-invariant-oracle
  - persistence-not-guaranteed
  - public-code-warning
  - synthetic-data-only
  - unrehearsed-proposal-notice
---

# Reference Canvas

Every recovery path in the run sheet ends here. A learner whose generation fails, times out, or produces a board missing the controls the exercises need is handed this artifact and continues hands-on. A recovery mechanism that has not been built is not a recovery mechanism, which is why this is the first thing to produce and a blocking gate on the [preflight page]({{ '/facilitator/preflight/' | relative_url }}).

> [!CAUTION]
> No reference canvas exists yet. Nothing on this page describes an artifact that has been built, reviewed, staged, or loaded. It describes what has to be produced and the checks that produce it.

## Ship a Directory, Not Screenshots

Stage the artifact as a copyable `.github/extensions` directory that a learner drops into their own project folder and continues from. Screenshots are the third fallback, not the first: a paid hands-on workshop that degrades to looking at pictures has delivered a different product from the one attendees registered for.

The directory is staged as a local file on each device during preflight, on media that survives a network failure. An internal repository the corporate proxy may block on the day is not staging.

## Build It First

Produce the reference canvas before the labs, the decks, or the timed rehearsal, because all three are paced against it.

1. Create it in an approved disposable project, with synthetic data only and no customer, citizen, employee, or proprietary content.
2. Seed it from the four-task fixture the labs use, so a learner switching to it lands on familiar identifiers and vocabulary.
3. Record what you observed while building it: the app version, the operating system and architecture, the account policy, the model, the runtime, the wall-clock duration, the files generated, and the capability names the agent actually exposed. Capability names in published examples are illustrative. Inspect the real ones.
4. Do not install anything or work around an organization control to make it work. If it cannot be produced inside the approved boundary, that is a finding for the sponsor rather than a problem to route around.

## Review Before Staging

This artifact goes on every attendee device, so it gets the review a learner is being taught to perform, done properly and once.

* Read the Changes view file by file and correlate each file with behaviour you can see on screen.
* Confirm the entrypoint is local and that no network call, shell execution, or credential handling appears anywhere in the generated code.
* Read the dependency list. Approve each dependency deliberately or remove the need for it. Nothing is installed because the agent asked.
* Check for a public-code match. A match can surface even where a blocking policy is in force. Stop rather than building further on that output, and record what you found.
* Confirm the board satisfies the delta and invariant checks the labs use: adding through the interface changes the total by one, an agent-driven move shifts one status count down and another up while the total holds, and a filter changes only what is visible.
* Confirm empty titles are rejected through both the interface and the agent paths, that identifiers stay unique and stable, and that titles render as text rather than as markup or as instructions.

Record the review result next to the staged directory. Gate G01 closes on that record, not on the directory existing.

## Four Snapshot States

Section 4 and section 5 both assume section 3 ended in a usable board. Stage four copies of the directory, one per checkpoint, so a learner can be dropped into any later section with correct state in under a minute:

| Snapshot | State | Used when |
| --- | --- | --- |
| A | Board created, seed tasks present, no learner changes | A learner never received a working board |
| B | One task added through the interface | The interface interaction did not complete |
| C | One task moved by the agent after B | The agent-driven move did not complete, including at the T+20 injection |
| D | Filter present and clearable | A learner enters section 5 without a working refinement |

This converts a cascading failure into a local one, and it is cheap once the first directory exists.

## Rehearse Loading It

Producing the artifact is not the same as being able to hand it over under time pressure. The gesture that brings a prepared extension into an existing session has not been verified, so rehearse it explicitly and write down what you did.

Time the handover. If switching a learner to the reference canvas takes longer than the slack in the affected beat, the abort clock on the [run sheet]({{ '/facilitator/running-the-session/' | relative_url }}) does not do its job and the beat budgets need revising.

Rehearse the handover in French as well as English. French is the higher-risk path and has never been observed.

## What the Reference Canvas Does Not Establish

* It does not establish that a learner's own generated board will behave the same way. Generated output varies, which is why acceptance is measured as deltas and invariants.
* It does not establish that state survives closing and reopening. Persistence is requested implementation, not a guarantee, and no reopen gesture has been established. Verify reopening separately, document the exact gesture tested, and treat the checkpoint as unverified until then.
* It does not establish that the board is shared between teammates. Project scope is a code-sharing scope, not live multi-user collaboration.
* It does not establish approval for anything. Executing this code on a managed device still needs the written approval recorded under gate G13.
