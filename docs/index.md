---
title: Workshop
description: A ninety-minute canvas-first GitHub Copilot app workshop for developers, delivered in English or in French.
lang: en
translation_key: home
lang_ref: /fr/
nav_order: 1
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - no-installation-in-class
  - human-review-required
  - delta-and-invariant-oracle
  - track-acceptance-bars
  - telemetry-disclosure
---

# GitHub Copilot App Workshop

Ninety minutes, one spoken language, and hands on a fictional Team Task Board inside the GitHub Copilot desktop app.

You agree on a plan, have the agent generate a canvas extension from it, drive the same board state from both the interface and the agent, refine it with one bounded request, then read what was produced and decide whether any of it may leave your machine.

## Who this is for

Developers with beginner to intermediate GitHub Copilot experience. You read code, you judge whether generated work is acceptable, and you say no when it is not.

The core path needs no Visual Studio Code, no Azure, no cloud sandbox, and no external MCP tool, and you will not author Ruby or Node yourself. A working local runtime is still a preflight responsibility rather than a promise: generated canvas extensions ship a `package.json` and an `extension.mjs` entry point, run as processes, and resolve tools from the shell PATH. See [Prerequisites]({{ '/prerequisites/' | relative_url }}).

## Boundaries for these ninety minutes

* Synthetic data only. Nothing operational, defence-related, citizen, employee, proprietary, or personal goes into a prompt, a canvas, a task title, or a file.
* CAE and the Government of Ontario are named as audience examples. No customer logo appears anywhere in this material, and nothing here claims endorsement, approval, certification, or compliance with any organization's requirements.
* Nothing leaves the machine. No external services, no secrets, no commits, no pushes, no pull requests, no deployment.
* A human accepts or rejects everything the agent proposes. Generated output is a proposal, and your approval is the only thing that turns it into a decision.
* Conversation data may be collected by the app. Your facilitator delivers the telemetry and data-handling disclosure in writing before the first session opens.

## Agenda

| # | Section                               | Time   | Observable outcome                                                       |
|---|---------------------------------------|--------|--------------------------------------------------------------------------|
| 1 | Meet the App and Set Safe Boundaries  | 10 min | Distinguish app, canvas, and published site; name review duties.         |
| 2 | Start a Session and Agree on the Plan | 15 min | Select the approved project and Plan mode; agree on acceptance criteria. |
| 3 | Create and Use the Team Task Board    | 30 min | Create the canvas, act through both paths, compare actual state.         |
| 4 | Refine One Requirement at a Time      | 15 min | Add a priority filter without changing underlying task data.             |
| 5 | Review, Verify, and Prepare a Handoff | 15 min | Inspect Changes, check persistence, separate source and state.           |
| 6 | Wrap-Up and Questions                 | 5 min  | Explain observed results, remaining limits, and a next step.             |

Installation, sign-in, and runtime prerequisites are finished and verified before the clock starts. No session minute is allocated to them.

## Three things people conflate

The desktop app runs sessions. A canvas extension is a surface that runs inside the app. This website is neither: it carries the workshop material and never holds your board.

The app documents three session modes, Interactive, Plan, and Autopilot. Section 2 uses Plan mode deliberately, so the agent proposes an approach you can read and change before anything is generated.

## How results are checked

Every acceptance check in this workshop is a delta or an invariant. None is an absolute count, and none depends on a label you can see on screen.

That is not a stylistic preference. Each generated canvas differs, so a shared expected total would mark correct work as failed, and a check written against displayed text fails the moment a label is renamed or translated. You record your own baseline, then assert how it changes.

## Two tracks, two acceptance bars

Each lab publishes two named acceptance bars. They differ in what you produce, not in how much you read, and both fit the same time budget.

Track assignment happens at registration from your declared self-rating. It is not chosen in the room and it is not announced on the day. Where the roster allows, seating pairs one intermediate learner with one beginner at each table, and the intermediate learner reviews their partner's result as part of their own bar.

## What has been tested, and what has not

No rehearsal has taken place. Every product claim on this site traces to official documentation retrieved on 2026-09-22, and no statement here reports an observed run.

Verified: each documented capability named on these pages was checked against its official source page. See [Resources]({{ '/resources/' | relative_url }}).

Not verified by anyone: canvas generation on any device, how long generation takes, whether a generated canvas runs without an installation step, whether a closed canvas reopens with its state intact, how the app behaves when a whole room issues requests at once, and how much of a French-language instruction the generated output actually honours.

No tested app version is recorded, because none has been rehearsed. Product releases land at close to a daily cadence and interface labels have already been renamed once, so treat any instruction that names a button as expired until someone re-checks it.

## Where to go next

* [Prerequisites]({{ '/prerequisites/' | relative_url }}) before the session, not during it.
* [Labs]({{ '/labs/' | relative_url }}) for the four hands-on pages and the shared lab contract.
* [Downloads]({{ '/downloads/' | relative_url }}) for the slide decks.
* [Resources]({{ '/resources/' | relative_url }}) for the official sources behind every claim.
