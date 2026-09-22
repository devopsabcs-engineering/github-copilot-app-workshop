---
title: Facilitator Kit
description: Gates, run sheet, and recovery artifacts for delivering the 90-minute GitHub Copilot app workshop.
lang: en
translation_key: facilitator-index
lang_ref: /fr/facilitator/
nav_order: 6
has_children: true
covers:
  - scope-boundaries
  - unrehearsed-proposal-notice
  - abort-threshold
  - telemetry-disclosure
  - human-review-required
  - no-endorsement
---

# Facilitator Kit

Four pages carry everything needed to decide whether this workshop can run, how to run it, and what to hand a learner whose board never arrives.

* [Preflight gates]({{ '/facilitator/preflight/' | relative_url }}) records every gate with an owner, the evidence that closes it, the date it closed, and a dated go or no-go decision per language.
* [Running the session]({{ '/facilitator/running-the-session/' | relative_url }}) carries the abort clock, the per-beat decomposition of the thirty-minute block, staffing, and the staggered start waves.
* [Reference canvas]({{ '/facilitator/reference-canvas/' | relative_url }}) covers building, reviewing, and staging the recovery artifact as a copyable directory.
* [Validation status]({{ '/facilitator/validation-status/' | relative_url }}) separates what was machine-verified from what was human-judged and from what was not verified at all, and lists every open blocking gate.

## Current Delivery Status

> [!CAUTION]
> This workshop is not yet deliverable. Two gates are named below because they block every recovery path and every minute value on the site; they are not the only open gates. The complete list, with owners and the evidence that closes each one, is on the [validation status page]({{ '/facilitator/validation-status/' | relative_url }}).
>
> * No reference canvas has been built, reviewed, or staged. Every recovery path in the run sheet terminates in that artifact, so until it exists the session has no recovery path at all.
> * No timed dry run has been performed in either language. Every minute value in the agenda, the run sheet, and the decks is an estimate that has never been observed.
>
> Do not offer a delivery date, and do not send invitations, until both close. Two timed dry runs per language are required, not one, and the agenda is paced against the slowest observed run rather than the average.

Nothing in this kit claims that an untested behaviour works. Where a behaviour has not been observed, the page says so instead of describing it as a feature.

## What This Workshop Is and Is Not

The session runs inside the GitHub Copilot desktop app and produces a canvas extension. It is not GitHub Spark, not the retired Copilot Workspace, not the Microsoft Copilot app, and not a Power Apps canvas app. Learners generate code they then review; they do not deploy anything, commit anything, or reach an external service.

Audience organizations named in delivery material are illustrative. The material claims no endorsement, approval, or compliance, and no organization-specific security, privacy, or accessibility approval has been assessed. Every cohort works with synthetic data only.

## Two Requirements Before Anyone Sends a Prompt

Both of these are gates on the [preflight page]({{ '/facilitator/preflight/' | relative_url }}), and both are stated here because a facilitator who misses them discovers the problem in front of the room.

Conversation data may be collected by the product. Deliver a written telemetry and data-handling disclosure to attendees and to the sponsoring organization before the session, not during it, and keep the sent copy as evidence.

Generated code executes on a managed device when the canvas renders. That needs written approval from a named approver at each attending organization, obtained before invitations go out, together with a stated incident path for the case where endpoint protection quarantines a generated extension mid-session. Absent that approval, run the session on facilitator-provided disposable machines instead.

## Staffing and Class Size

Plan one lead facilitator plus one floating helper for every six to eight hands-on learners. Helpers need the run sheet, the abort clock, and standing authority to hand out the reference canvas without escalating to the lead.

The hands-on cap and the confirmed helper count remain an open owner decision (OD-03). They are not settled here because they depend on staffing that authoring cannot commit. Agree both before registration opens and enforce the cap at registration.

## Open Owner Decisions

Each of these needs a named person and a date. None can be closed by research or by writing more material.

* Who approves executing AI-generated code on managed devices at each organization, and has that request been made (OD-02)?
* Is the hands-on cap negotiable at sixteen, or is twenty fixed, and how many helpers are actually available (OD-03)?
* Are English and French delivered as separate sessions, or must one cohort be bilingual (OD-04)?
* May learners retain the generated code after class, and on which machine (OD-05)?
