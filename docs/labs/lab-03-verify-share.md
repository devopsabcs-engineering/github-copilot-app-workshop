---
title: "Lab 03: Verify and Decide"
description: Read the Changes view yourself, check what the board actually persists, and decide separately whether source and state may be shared.
lang: en
translation_key: lab-03-verify-share
lang_ref: /fr/labs/lab-03-verify-share/
parent: Labs
nav_order: 4
duration_minutes: 15
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - unrehearsed-proposal-notice
  - human-review-required
  - public-code-warning
  - persistence-not-guaranteed
  - delta-and-invariant-oracle
  - learner-decision
  - track-acceptance-bars
---

# Lab 03: Verify and Decide

Fifteen minutes. You read the evidence yourself, and you decide what it is worth.

## Objective

Correlate what was generated with behaviour you can actually see, find out what the board really persists, and make two separate sharing decisions.

## Prerequisites

Whatever board you have at the end of [Lab 02]({{ '/labs/lab-02-refine-canvas/' | relative_url }}), including the reference canvas if you were switched to it. Your own notes: the baseline from Lab 01, the deltas you observed, and any finding you recorded along the way.

## Boundaries that apply to this lab

* Synthetic data only. Nothing operational, defence-related, citizen, employee, proprietary, or personal is in the board, and nothing is added to it now.
* CAE and the Government of Ontario are named as audience examples. No customer logo appears here, and nothing in this lab claims endorsement, approval, certification, or compliance with any organization's requirements.
* Nothing is committed, pushed, opened as a pull request, uploaded, or published. Sharing is planned in this lab, never performed.
* Generated code carries a public-code warning, and that warning applies even where a blocking policy is in force. A policy does not remove your obligation to review and to consider licensing.

## Ordered actions

1. Open the Changes view and read it yourself, before you ask the agent for anything.
2. Match each file to behaviour you can see on the board. A file you cannot explain is a finding, not a detail.
3. Check the boundaries that prompt wording does not enforce: file paths outside the project, network calls, shell execution, credential handling, and any dependency that appeared without your approval.
4. Confirm task titles render as text. A title is data. If a title can be interpreted as markup or as an instruction, that is a finding.
5. Send the prompt below and read what comes back as a proposal, not as an approval.
6. Find the persistence path the board reports, and open it. Read what it actually saves rather than what the agent says it saves.
7. Run the reopen checkpoint only if your facilitator rehearsed it on the version you are running. If they did not, record it as not tested and move on.
8. Make two separate decisions: whether the extension source may be shared, and whether the board state may be shared.

## Prompt

> [!IMPORTANT]
> Unrehearsed proposal. This is workshop text to send in a session, not a command that has been executed and verified. What comes back is a review proposal produced by the same agent that wrote the code, and generated capability names are not guaranteed.

```text
Review the current canvas changes without editing files. Separate observed test results from assumptions. Check shared state, input validation, file paths, dependencies, external calls, accessible controls, and possible public-code or license concerns. List the extension files and any persisted task data separately, explain what a teammate would need, and identify what should not be shared. Describe how to verify saved state after reopening without regenerating or resetting it. Do not commit, push, create a pull request, upload logs, or publish anything. Leave unknowns explicit.
```

## Expected result

Deltas and invariants only.

* Invariant: every value you observed at the end of Lab 02 is still there. No identifier changed, no task vanished, no status rewrote itself while you were reviewing.
* Invariant: the review changed no file. The Changes view is the same before and after the prompt.
* You can name at least one generated file and say which visible behaviour it produces.
* You can state the actual persistence path the board reports, and say what you found when you opened it.
* If the reopen checkpoint was rehearsed and you ran it: every value observed before closing is present afterwards.
* If it was not rehearsed: the checkpoint is recorded as not tested. That is the correct outcome, not a gap in your work.

## Persistence is a request, not a guarantee

The plan asked for local JSON persistence. Asking for it does not make it a product guarantee.

> [!CAUTION]
> The canvas documentation describes optional saved artifacts and contains no reopening guidance at all. No universal reopen control has been established, and no reopen behaviour has been rehearsed for this material. Do not report persistence as passing because a file exists, because the agent said so, or because the conversation history is still visible. Session history retention is not board persistence.

Record the reopen checkpoint as passed, failed, or not tested. Never as implied.

## Your decision

Whether the validation the agent generated is evidence you would accept.

The same agent wrote the code and then reviewed it. That is not independence. Decide, and be able to say why: which of its statements you verified yourself, which you took on trust, and whether the remainder would satisfy you if this were real work going to a colleague.

## Acceptance bars

Both bars fit the same fifteen minutes. They differ in what you produce.

### Beginner bar: one finding and one boundary

You named one finding from the Changes view that you found yourself, and one thing you would not share, with a reason. You recorded the reopen checkpoint as passed, failed, or not tested.

### Intermediate bar: evidence verdict and a regression check

You did everything in the beginner bar, and you also gave a written verdict on whether the agent's validation is sufficient evidence, naming what you verified against what you accepted. You inspected the persisted data and wrote one regression check that would prove the invariant still holds after a change. You reviewed your paired beginner's finding and said whether it would survive a real code review.

Track assignment happened at registration from your declared self-rating, not in the room. Where the roster allows, each table pairs one intermediate learner with one beginner, and reviewing the partner's result is part of the intermediate bar.

## Two separate sharing decisions

Sharing the extension source and sharing the board state are different questions with different answers.

* A project-scoped extension lives with the repository. A user-scoped one follows the person. Know which one you made.
* Sharing a repository does not create live multi-user editing, automatic synchronization, per-task permissions, or a published web application. Different local copies can diverge, and nothing reconciles them.
* Local files do not establish on-device inference, data residency, or any retention guarantee.
* Exclude session transcripts, debug archives, credentials, and anything local to your own machine from whatever you would hand over.
* Enterprise-managed accounts cannot create gists, so a gist is not a handoff route.

## Recovery

* If the Changes view is empty or does not match the board, record it and say so. An unexplained gap between generated files and visible behaviour is the most valuable finding available in this lab.
* If the agent claims a check passed, ask which part of it it actually executed. A requested check is not a passed test.
* If the board breaks while you are reviewing, stop and keep the files. Do not reset, regenerate, or delete anything: the broken state is the evidence.
* If the persistence path does not exist, that is a result. Record it rather than asking for a rebuild.

## Official sources

* [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
* [GitHub Copilot app quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
* [GitHub Copilot app overview](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
* [Slash commands reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)

Retrieved 2026-09-22. Retrieval dates are not publication dates.

## Close out

Name one result you verified yourself and one limit you actually hit. State what was never tested today, including anything the room did not reach. Then choose one next step that stays inside the approvals you already have.

Back to [Labs]({{ '/labs/' | relative_url }}) or on to [Resources]({{ '/resources/' | relative_url }}).
