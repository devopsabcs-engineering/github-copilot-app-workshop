---
title: GitHub Copilot App Workshop
description: Agenda and learning objectives for a 90-minute bilingual workshop that builds a Team Task Board canvas extension in the GitHub Copilot app.
---

## GitHub Copilot App Workshop

Ninety minutes, one spoken language per cohort, and one fictional Team Task Board carried from the first prompt through to the handoff. Developers describe an outcome, read the plan the agent proposes, approve the dependencies it reports, and then drive the same board from two directions: the controls the canvas renders, and the agent that can read and change the same state. The skill being taught is judgment rather than typing. Learners practice reading a proposal before accepting it, deciding what to reject, and separating what the agent reported from what they can see on screen.

**Duration:** 90 Minutes

> [!IMPORTANT]
> Every minute value in this agenda is provisional. No timed rehearsal has been run, so the pacing rests on an estimate rather than an observation. Two timed dry runs per language and a staged reference canvas are blocking gates. Do not offer a delivery date until both close. The [facilitator kit](https://devopsabcs-engineering.github.io/github-copilot-app-workshop/facilitator/) records the current state of every gate.

Published material:

* English site: <https://devopsabcs-engineering.github.io/github-copilot-app-workshop/>
* French site: <https://devopsabcs-engineering.github.io/github-copilot-app-workshop/fr/>
* Deck downloads: <https://devopsabcs-engineering.github.io/github-copilot-app-workshop/downloads/>

Those URLs resolve. GitHub Pages is enabled with the Actions source, the site is publicly readable, and the base path is asserted against the deployed configuration on every run. The publishing path still depends entirely on GitHub Actions with no fallback. [PUBLISHING.md](PUBLISHING.md) records what an owner enabled, what remains unconfigured, and the single point of failure that has to be accepted in writing before any delivery depends on the published site.

To preview the site on your own machine, see [CONTRIBUTING.md](CONTRIBUTING.md).

Audience organizations named in delivery material are illustrative. Nothing here claims endorsement, approval, or compliance, and no organization-specific policy has been assessed. Work with synthetic data only.

### 1. Meet the App and Set Safe Boundaries (10 min)

#### Topics

* The GitHub Copilot desktop app, a canvas extension running inside it, and this published workshop site are three separate things
* The three documented session modes: Interactive, Plan, and Autopilot
* Who reviews generated output, given that the agent produces a proposal and a person accepts it
* The boundary for the next ninety minutes: synthetic data only, no external services, no commits, no deployment
* Telemetry and data handling, disclosed before anyone opens a session
* Mixed-language output in French cohorts, named in advance as an observation to make rather than a defect to report

#### Notes

Open by naming what this is not, because four other products get confused with this one and the confusion changes what learners expect to happen. Establish the review responsibility early: nothing the agent generates is accepted because it ran, and nothing it reports counts as evidence until someone looks. Deliver the data-handling disclosure here, in writing as well as aloud, since a government or regulated audience needs it before the first session opens rather than in a closing slide. Nothing in this section is hands-on.

#### Demonstrations

* Walk the app window and name each region without sending a prompt
* Open the prepared reference canvas so everyone has seen a working board before they try to create one
* Read the data-handling disclosure aloud and point at the written copy attendees received

#### Misconceptions to Address

* The GitHub Copilot app is GitHub Spark
* The GitHub Copilot app is the retired Copilot Workspace under a new name
* The GitHub Copilot app is the Microsoft Copilot app
* A canvas extension is a Power Apps canvas app
* A canvas extension is a deployed website other people can visit
* Prompt wording restricts what the agent is able to do
* Generated code has been reviewed because the agent said it works

### 2. Start a Session and Agree on the Plan (15 min)

#### Session Topics

* Opening a session against the approved project folder rather than a folder holding real work
* Plan mode, and why a readable proposal precedes generation
* Striking one item from the proposed plan and writing one sentence explaining the choice
* Acceptance criteria written as deltas and invariants instead of fixed totals
* Capturing a per-seat usage reading as a baseline

#### Session Notes

This is the only point in the session where a human decision genuinely gates execution, so learners are required to use it. Each person changes the plan before accepting it, and states why. A plan accepted without reading is the exact failure this section exists to prevent. Installation, sign-in, and runtime prerequisites are finished and verified before the timed workshop begins, so no minute here is spent on setup.

#### Session Demonstrations

* Open a session against a disposable folder and show the folder scope on screen
* Read a proposed plan aloud, remove one item, and explain the removal
* Show a usage reading and explain what exhausting an allowance would look like mid-session

#### Session Misconceptions

* Plan mode writes the code
* Autopilot is the faster version of Plan mode
* A plan nobody read is still an agreement
* Every plan offers a choice of model
* An acceptance check is a fixed expected total

### 3. Create and Use the Team Task Board (30 min)

#### Board Topics

* Sending the reviewed creation prompt and starting the clock the moment it leaves
* Recording your own baseline counts as soon as the board appears
* Reading the dependencies the agent reports and deciding whether to approve them, before anything runs
* Adding one task through the interface the canvas renders
* Moving one task through the agent and watching the counts change without regenerating
* Writing down one thing the agent claimed that you did not personally observe

#### Board Notes

This is the highest-variance block in the session and the one the abort thresholds govern. The clock starts when the creation prompt is sent, not when the room settles. Learners send their prompts in staggered waves so the facilitator gets a triage queue instead of a simultaneous failure event. Twenty generated boards will differ from each other, so acceptance is checked as deltas and invariants and never as a fixed total. When a board does not arrive or does not work, the recovery is a switch to the staged reference canvas, not live debugging: a facilitator repairing one machine has stopped running the workshop.

#### Board Demonstrations

* Send the creation prompt one wave ahead of the room so the first result on screen is a facilitator result
* Spend ninety seconds in the Changes view before touching the board, confirming the file list, the local entrypoint, and the absence of network or shell calls
* Show a case where the agent reports a count that differs from what the screen displays

#### Board Misconceptions

* Generation finishes inside a known number of minutes
* Every generated board exposes the same controls
* A board that differs from the neighbour's board has failed
* Regenerating is an undo
* The agent's success message is evidence that the change happened

### 4. Refine One Requirement at a Time (15 min)

#### Refinement Topics

* Asking for exactly one bounded change: a priority filter over the tasks already on the board
* Stating the invariant before prompting, that filtering changes what is visible and never what is stored
* Writing your own refinement prompt rather than pasting a supplied one
* Clearing the filter and confirming the previous visible count returns
* Choosing which discrepancy to fix first when the change does more than you asked

#### Refinement Notes

The stated topic of this section is prompting, so handing learners the prompt would defeat it. The supplied wording stays available as a fallback after three minutes for anyone who is stuck. Hold the line on one request at a time: a second request before the first is verified destroys the only evidence available about what the first one actually did. Intermediate learners carry a higher acceptance bar here and act as the paired reviewer for a neighbour.

#### Refinement Demonstrations

* Say the invariant out loud, then check the stored task data after the filter is applied
* Show a refinement that changed more than was requested and narrow it to the smallest correction
* Clear the filter and compare the restored visible set against the set recorded beforehand

#### Refinement Misconceptions

* A filter that displays the right rows has passed
* Filtering and deleting differ only in the interface
* Asking for several changes at once saves time
* An exact visible count is the acceptance check
* A correction is verified because the agent described it

### 5. Review, Verify, and Prepare a Handoff (15 min)

#### Handoff Topics

* Reading the Changes view yourself and correlating each file with behaviour you can see
* Dependencies, network calls, file paths, shell execution, and credential handling
* What to do when a public-code match surfaces
* The persistence path the canvas reports, and why any reopen guarantee stays unverified until it is rehearsed
* Deciding separately whether the extension source may be shared and whether the board state may be shared

#### Handoff Notes

The judgment beat here is deciding whether the validation the agent generated is sufficient evidence, which on its own it usually is not. Persistence is requested implementation rather than a platform guarantee, and no reopen gesture has been established, so the reopen checkpoint runs only where a dry run has confirmed one. French cohorts drop that checkpoint and spend the time in section 3 instead. Treat project scope as a code-sharing scope: it does not establish a live board shared between teammates.

#### Handoff Demonstrations

* Walk the Changes view file by file and tie each entry to something observable
* Open the reported persistence path on disk and compare it to what the canvas claimed
* Read the written procedure for a public-code match, which is to stop, not build on it, and raise it

#### Handoff Misconceptions

* Persistence is something every canvas guarantees
* Reopening restores the state you left
* Validation the agent generated is proof the behaviour is correct
* Sharing the extension source also shares the board state
* Project scope means teammates see the same live board

### 6. Wrap-Up and Questions (5 min)

#### Wrap-Up Topics

* One result each person verified and one limit each person hit
* What was never tested today
* An approved next step that stays inside the approvals already in place
* Where the site, the deck, and the prompts live afterwards

#### Wrap-Up Notes

Close on limits rather than on a success claim, and say the untested list out loud so nobody leaves with a guarantee the session never produced. Five minutes services a recap, not a queue of questions from twenty people. Hold open questions for an explicitly unbounded block after the timed session and do not advertise Q&A inside the ninety minutes.

#### Wrap-Up Demonstrations

* Read the untested list from the facilitator kit rather than recalling it
* Point at the resources in the language this cohort ran in

#### Wrap-Up Misconceptions

* A board that worked today means the app is approved for our data
* Today's result establishes how the app behaves on a later build
* The generated extension is the takeaway

### Learning Objectives

By the end of this session, participants will be able to:

* Tell the GitHub Copilot app, a canvas extension, and a published site apart, and name the products they are not
* Open a session in Plan mode against an approved folder and change a proposed plan before anything runs
* Write acceptance criteria as deltas and invariants rather than fixed totals
* Read reported dependencies and decide whether to approve them before generated code executes
* Drive shared state from both the interface and the agent, and compare what was reported against what was observed
* Inspect the Changes view and decide separately whether source and state may be shared
* State which behaviours the session never tested, and which approvals a next step would need
