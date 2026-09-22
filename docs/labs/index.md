---
title: Labs
description: The shared lab contract, the delta-and-invariant oracle, the abort thresholds, and the two acceptance bars used across all four labs.
lang: en
translation_key: labs-index
lang_ref: /fr/labs/
nav_order: 3
has_children: true
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - unrehearsed-proposal-notice
  - review-dependencies-before-run
  - delta-and-invariant-oracle
  - abort-threshold
  - track-acceptance-bars
  - learner-decision
  - human-review-required
---

# Labs

Four short labs, one board carried from the first to the last, and one decision in each that belongs to you rather than to the agent.

* [Lab 00: Agree on the Plan]({{ '/labs/lab-00-setup/' | relative_url }})
* [Lab 01: Create the Canvas and Inspect It]({{ '/labs/lab-01-create-canvas/' | relative_url }})
* [Lab 02: Refine One Requirement]({{ '/labs/lab-02-refine-canvas/' | relative_url }})
* [Lab 03: Verify and Decide]({{ '/labs/lab-03-verify-share/' | relative_url }})

## Boundaries that apply to every lab

* Synthetic data only. Nothing operational, defence-related, citizen, employee, proprietary, or personal goes into a prompt, a canvas, a task title, or a file.
* CAE and the Government of Ontario are named as audience examples. No customer logo appears here, and nothing in these labs claims endorsement, approval, certification, or compliance with any organization's requirements.
* Nothing leaves the machine: no external services, no plugins, no secrets, no commits, no pushes, no pull requests, no deployment.
* A human reads and accepts generated output. Prompt wording is not a security control, and inherited skills, MCP servers, and tool approvals still apply inside your session.

## The lab contract

Every lab page carries the same seven parts, in the same order:

1. Objective, stated as something you can observe.
2. Prerequisites, which are already satisfied if you completed the previous lab.
3. Ordered actions.
4. One copyable prompt.
5. Expected result, always as a delta or an invariant.
6. Recovery, which preserves your last observed state.
7. Official sources.

### Every prompt is an unrehearsed proposal

> [!IMPORTANT]
> Every fenced prompt in these labs is workshop text written to be sent in a session. None has been executed, and no result from any of them has been observed. Capability names an agent generates are not guaranteed to match any example in the documentation, so inspect what your own canvas actually exposes rather than assuming a name.

### Review dependencies before anything runs

The creation prompt in Lab 01 requires the agent to list every dependency and every install or build step, and to wait for your approval instead of installing anything itself.

An agent that reports a dependency and stops is behaving correctly. Treating that as a lab failure would teach the opposite of the habit this workshop exists to build. You approve it, or you decline it and switch to the reference canvas.

## The oracle: deltas and invariants only

Your generated canvas differs from everyone else's. A shared expected total would mark correct work as failed, and a check written against displayed text fails the moment a label is renamed or translated. So every check below asserts a change or a thing that must not change.

| Checkpoint                | Assert this                                                       | Never assert this                                  |
|---------------------------|-------------------------------------------------------------------|----------------------------------------------------|
| Baseline                  | Your own observed total and per-status counts.                    | That the baseline equals any particular number.    |
| Add through the interface | Total rises by exactly one; the new task has a unique identifier. | A specific identifier, label text, or form layout. |
| Agent reads state         | The agent reports the identifier and counts you can see.          | A specific phrasing or capability name.            |
| Agent moves a task        | Source status down one, destination up one, total unchanged.      | Which task moved, or the ending distribution.      |
| Filter applied            | Visible count at most the total; stored data unchanged.           | An exact visible count.                            |
| Filter cleared            | The prior visible count returns exactly.                          | A specific set of tasks returning.                 |
| Reopen, only if rehearsed | Every value you observed before closing is present afterwards.    | That reopening works at all before it is tested.   |

You are never asked to type a particular identifier. A canvas that assigns its own identifiers is behaving correctly, and the checks above still work because they compare a delta against your own baseline.

## Abort thresholds

The clock starts the moment the creation prompt is sent in Lab 01. These are the facilitator's rules, published here so you know what will happen rather than wondering whether you are holding up the room.

| Elapsed | Condition                               | Action                                                    |
|---------|-----------------------------------------|-----------------------------------------------------------|
| T+6     | No canvas panel has appeared            | Switch that learner to the prepared reference canvas.     |
| T+6     | More than a quarter of the room blocked | Convert the whole room and continue as a guided exercise. |
| T+10    | Canvas present but not usable           | Allow exactly one targeted repair attempt.                |
| T+13    | Still not usable                        | Hard stop. Switch to the reference canvas and pair up.    |

No learner falls more than one section behind. Recovery is a switch to a known-good artifact, not live troubleshooting, because a facilitator debugging one machine is not running the workshop. Working from the reference canvas is a legitimate outcome and is reported as one.

## Two tracks, two acceptance bars

Each lab publishes a beginner bar and an intermediate bar. They differ in what you produce. They do not differ in how much you read, and both fit inside the same minutes.

Track assignment happens at registration from your declared self-rating. It is not chosen in the room. Where the roster allows, seating pairs one intermediate learner with one beginner at each table, and reviewing the partner's result is part of the intermediate bar rather than an optional extra.

## One decision per lab

Each lab names a single decision that is yours to make and that no prompt makes for you:

* Lab 00: what to strike from the plan the agent proposes.
* Lab 01: whether to approve the dependencies the agent reports.
* Lab 02: which discrepancy to fix first when the change does more than you asked.
* Lab 03: whether the validation the agent generated is evidence you would accept.

## Official sources

* [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
* [Agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
* [GitHub Copilot app quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)

Retrieved 2026-09-22. Retrieval dates are not publication dates. See [Resources]({{ '/resources/' | relative_url }}).
