---
title: "Lab 02: Refine One Requirement"
description: Write your own bounded change request, add a priority filter, and prove that filtering changed what is visible and nothing that is stored.
lang: en
translation_key: lab-02-refine-canvas
lang_ref: /fr/labs/lab-02-refine-canvas/
parent: Labs
nav_order: 3
duration_minutes: 15
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - unrehearsed-proposal-notice
  - delta-and-invariant-oracle
  - human-review-required
  - learner-decision
  - track-acceptance-bars
---

# Lab 02: Refine One Requirement

Fifteen minutes, one bounded change, and a prompt you write yourself.

## Objective

Add a priority filter to the board you already have, and prove that filtering changed what is visible and nothing that is stored.

## Prerequisites

A working board from [Lab 01]({{ '/labs/lab-01-create-canvas/' | relative_url }}), or the reference canvas if you were switched to it. The same session and the same project folder.

You also need your own baseline from Lab 01, including the visible total as it stands now after your interface action and the agent's move.

## Boundaries that apply to this lab

* Synthetic data only. Nothing operational, defence-related, citizen, employee, proprietary, or personal goes into a task title, a prompt, or a file.
* CAE and the Government of Ontario are named as audience examples. No customer logo appears here, and nothing in this lab claims endorsement, approval, certification, or compliance with any organization's requirements.
* No external services, plugins, secrets, commits, pushes, pull requests, or deployment. No new dependency.
* A human reads the diff and accepts it. The agent's explanation of its own change is not a review.

## Ordered actions

1. Write down your acceptance criterion before you ask for anything. State the invariant first: filtering changes what is visible, never what is stored.
2. Write your own prompt. This is the section whose subject is prompting, so pasting a supplied one defeats it. Name the outcome, the context, the constraints, and the check.
3. Send exactly one request. One bounded change, nothing bundled. A batched change makes every later discrepancy ambiguous.
4. Apply the filter and record the visible count against your own total.
5. Clear the filter and confirm the previous visible count returns exactly.
6. Reach every new control from the keyboard and confirm focus stays visible as you move through it.
7. Read the diff yourself before you accept it.

## Prompt

Write your own first. Use the fallback below only if you are still stuck after three minutes.

> [!IMPORTANT]
> Unrehearsed proposal. This is workshop text to send in a session, not a command that has been executed and verified. Generated control names are not guaranteed, so check what your own canvas produced rather than expecting a particular label.

```text
Add only two things to the existing canvas: a way to show just the high-priority tasks, and a way to clear that filter again. Keep every task, identifier, title, priority, and status exactly as it is now. Label both controls, make them reachable from the keyboard, and keep focus visible. Show how many tasks are currently visible out of the total. Filtering must change visibility only: it must not delete, rewrite, or reorder stored data. Explain the diff and list what you did not test. Do not add or install a dependency, and make no remote change.
```

## Expected result

Deltas and invariants only. No exact visible count is correct for everyone, and no check below depends on the words printed on a control.

* With the filter applied: the visible count is at most your total, and it is the count of tasks that actually match.
* Invariant: the total is unchanged while the filter is applied.
* Invariant: stored data is unchanged. No task was deleted, no status was rewritten, no identifier moved.
* After clearing the filter: the previous visible count returns exactly, and the same tasks are back.
* Every new control is reachable from the keyboard, and focus stays visible on it.

A keyboard spot check is a spot check. It is not an accessibility conformance claim, and no WCAG or AODA statement follows from it.

## Your decision

Which discrepancy to fix first.

The change will almost certainly do more than you asked. It may reorder the board, rewrite a status, restyle something you did not mention, or quietly add a dependency. Pick the single discrepancy that most threatens the invariant, fix that one, and re-run the same check. Resist a second request until the first is verified.

## Acceptance bars

Both bars fit the same fifteen minutes. They differ in what you produce.

### Beginner bar: invariant holds

You wrote your own criterion, applied and cleared the filter, and demonstrated that the total and the stored data are unchanged while the previous visible count returns on clearing. Using the fallback prompt after three minutes is within this bar.

### Intermediate bar: own words and the empty case

You reached the result using a prompt you wrote yourself, without the fallback. You also produced a written check for the case where nothing matches the filter, ran it, and recorded what happened. You reviewed your paired beginner's invariant with them and said whether you would accept it.

Track assignment happened at registration from your declared self-rating, not in the room. Where the roster allows, each table pairs one intermediate learner with one beginner, and reviewing the partner's result is part of the intermediate bar.

## Recovery

If filtering changed the data, stop. Do not regenerate the board, because regenerating discards the evidence that would tell you what went wrong.

> [!IMPORTANT]
> Unrehearsed proposal. This is workshop text to send in a session, not a command that has been executed and verified. It is a request to diagnose, not a guarantee that anything can be undone.

```text
Pause changes. Compare the actual canvas state with my last observed checkpoint. Identify the smallest discrepancy and the files or capabilities involved. Do not reset, regenerate, delete, install, publish, or overwrite data. Propose a targeted correction and a check that would prove it worked, then wait for approval. If you cannot inspect the state, say so.
```

* If the agent proposes a new dependency, decline it. Nothing is installed in this workshop.
* If the filter cannot be cleared, record that as a finding and move on. Lab 03 does not require a working filter, only a board and your notes.
* If you fall behind, ask for the reference canvas rather than spending Lab 03's minutes here.

## Official sources

* [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
* [Slash commands reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)

Retrieved 2026-09-22. Retrieval dates are not publication dates.

## Next

[Lab 03: Verify and Decide]({{ '/labs/lab-03-verify-share/' | relative_url }})
