---
title: "Lab 01: Create the Canvas and Inspect It"
description: Send the reviewed creation prompt, review the reported dependencies before anything runs, then drive the same board state from the interface and from the agent.
lang: en
translation_key: lab-01-create-canvas
parent: Labs
nav_order: 2
duration_minutes: 30
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - no-installation-in-class
  - unrehearsed-proposal-notice
  - review-dependencies-before-run
  - human-review-required
  - public-code-warning
  - delta-and-invariant-oracle
  - abort-threshold
  - learner-decision
  - track-acceptance-bars
---

# Lab 01: Create the Canvas and Inspect It

Thirty minutes, and the highest-variance block in the session. Review comes before execution here, not after it.

## Objective

Create the Team Task Board canvas from the plan you approved, decide whether to approve the dependencies the agent reports, then prove that the interface and the agent act on the same state.

## Prerequisites

[Lab 00]({{ '/labs/lab-00-setup/' | relative_url }}) complete, with a plan you changed and acceptance criteria you wrote. The same session, the same approved project folder, the same fixture.

Nothing is installed during this lab. If the agent reports that something must be installed, the workshop stops and you switch to the prepared reference canvas. Stopping is the designed path.

## Boundaries that apply to this lab

* Synthetic data only. Nothing operational, defence-related, citizen, employee, proprietary, or personal goes into a task title, a prompt, or a file.
* CAE and the Government of Ontario are named as audience examples. No customer logo appears here, and nothing in this lab claims endorsement, approval, certification, or compliance with any organization's requirements.
* No external services, plugins, secrets, commits, pushes, pull requests, or deployment.
* Generated code carries a public-code warning, and that warning applies even where a blocking policy is in force. A policy does not remove your obligation to read what was produced.

## Ordered actions

1. Send the creation prompt below. The clock starts the moment you send it.
2. Wait for the agent to list every dependency and every install or build step. It is instructed to stop there and wait for you.
3. Read that list and decide. Approve it, or decline it and tell your facilitator. This review happens before anything runs, which is the whole reason it is here.
4. When the canvas surface appears beside the conversation, do not touch it yet.
5. Spend about ninety seconds in the Changes view first. Confirm the file list is what the plan said, that no network call and no shell execution appears, and that the entry point is local.
6. Now record your own baseline: the total you can see and the count in each status. Write it down. It is yours, and it will not match your neighbour's.
7. Add one task through the interface, using whatever control your canvas exposes and whatever identifier it assigns.
8. Send the second prompt to have the agent read the board, then name one task and have the agent move it.
9. Compare what the agent reported against what you can see on screen.

## Prompt

> [!IMPORTANT]
> Unrehearsed proposal. This is workshop text to send in a session, not a command that has been executed and verified. Capability names the agent generates are not guaranteed to match any example in the documentation, so inspect what your own canvas actually exposes.

```text
/create-canvas Build our reviewed Team Task Board in project scope under .github/extensions. Give people labeled keyboard-accessible controls to add a task and change its status. Give the agent capabilities to read and update the same state. Show each task's identifier, keep identifiers unique and stable, and reject empty titles through both the interface and agent paths. Render titles as text. Show status counts and visible focus. Use local JSON persistence and report its actual path and save behavior. List every dependency and any install or build step before running it, and wait for my approval instead of installing anything yourself. No external services, plugins, secrets, commits, pushes, PRs, or deployment. Show the canvas, then list what you did not test.
```

### Second prompt: reading and moving state

> [!IMPORTANT]
> Unrehearsed proposal. This is workshop text to send in a session, not a command that has been executed and verified. Generated capability names are not guaranteed, so read the agent's own report of what it can do rather than assuming a name from the documentation.

```text
Read the actual canvas state, including the task I just added through its interface. Report the identifiers and the status counts you can see. Then move exactly one task that I name to a different status using the canvas capability, and read the state again. Do not rebuild the canvas and do not replace its data. If a capability is unavailable, say so instead of reporting success.
```

Name the task yourself, using whatever identifier your own canvas displays.

## Expected result

Deltas and invariants only. There is no shared total, and no check below depends on a label you can read on screen.

* Baseline: whatever total and per-status counts you observed are correct for you. Do not compare them with anyone else's.
* After you add one task through the interface: the total increases by exactly one, and the new task carries an identifier that was not already in use.
* After the agent reads the board: the agent reports the same identifier you can see for the task you just added, and counts that match the screen.
* After the agent moves one task: the source status count decreases by one, the destination status count increases by one, and the total is unchanged. The change is visible in the interface without regenerating anything.
* Invariant throughout: no existing identifier changed, and no task disappeared.

An agent success message is not a result. If you cannot see it on screen, it did not happen.

## Your decision

Whether to approve the dependencies the agent reports.

The agent is instructed to report and wait. Reporting a dependency is correct behaviour, not a failure, and an agent that stops there has done exactly what you asked. You read the list, and you decide whether that list is acceptable on this device. If it is not, you decline and switch to the reference canvas, and that is a successful lab.

## Acceptance bars

Both bars fit the same thirty minutes. They differ in what you produce.

### Beginner bar: observed deltas

You made an explicit decision on the dependency report, and you can point on screen at both deltas: the total rising by one after your interface action, and the source and destination counts moving by one each after the agent's action with the total unchanged.

### Intermediate bar: reported versus observed

You did everything in the beginner bar, and you also wrote down one thing the agent claimed that you did not personally observe. You confirmed that an empty title is rejected through the interface path and through the agent path with your total unchanged. You checked your paired beginner's two deltas against the acceptance criteria you handed them in Lab 00.

Track assignment happened at registration from your declared self-rating, not in the room. Where the roster allows, each table pairs one intermediate learner with one beginner, and reviewing the partner's result is part of the intermediate bar.

## Abort thresholds

Measured from the moment you send the creation prompt. Your facilitator runs this clock.

| Elapsed | Condition                               | Action                                                    |
|---------|-----------------------------------------|-----------------------------------------------------------|
| T+6     | No canvas panel has appeared            | Switch that learner to the prepared reference canvas.     |
| T+6     | More than a quarter of the room blocked | Convert the whole room and continue as a guided exercise. |
| T+10    | Canvas present but not usable           | Allow exactly one targeted repair attempt.                |
| T+13    | Still not usable                        | Hard stop. Switch to the reference canvas and pair up.    |

Being moved to the reference canvas is not a personal failure and is not a downgrade. It keeps you inside the remaining sixty minutes, which is worth far more than a canvas you spent them debugging.

## Recovery

Recovery preserves your last observed state and asks for the smallest possible correction. Rebuilding the board is not an undo: it destroys the evidence you were about to read.

> [!IMPORTANT]
> Unrehearsed proposal. This is workshop text to send in a session, not a command that has been executed and verified. It is a request to diagnose, not a guarantee that anything can be undone.

```text
Pause changes. Compare the actual canvas state with my last observed checkpoint. Identify the smallest discrepancy and the files or capabilities involved. Do not reset, regenerate, delete, install, publish, or overwrite data. Propose a targeted correction and a check that would prove it worked, then wait for approval. If you cannot inspect the state, say so.
```

* If no canvas surface appears at all, do not retry repeatedly. Tell your facilitator and take the reference canvas.
* If the agent reports a capability it cannot actually use, record that as a finding. It is a legitimate observation, not a broken lab.
* If endpoint protection quarantines the generated extension, stop and follow the incident path your organization named before the session.
* Never switch to a personal account, an external provider, or another product to get around a block.

## Official sources

* [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
* [GitHub Copilot app quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
* [Slash commands reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)

Retrieved 2026-09-22. Retrieval dates are not publication dates.

## Next

[Lab 02: Refine One Requirement]({{ '/labs/lab-02-refine-canvas/' | relative_url }})
