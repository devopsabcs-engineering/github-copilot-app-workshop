---
title: Prerequisites
description: Accounts, plan entitlement, platform, runtime, network, and approval checks that must pass before the timed workshop starts.
lang: en
translation_key: prerequisites
nav_order: 2
covers:
  - no-installation-in-class
  - scope-boundaries
  - synthetic-data-only
  - no-endorsement
  - telemetry-disclosure
  - human-review-required
---

# Prerequisites

Everything on this page is finished and verified before the clock starts. No session minute is allocated to installing, signing in, or discovering that a device is blocked.

> [!IMPORTANT]
> These are pass or fail. A failure moves the delivery date. It does not get absorbed on the day, because none of the items below can be fixed inside a ninety-minute session.

## Boundaries that apply to this page too

* Synthetic data only. Nothing operational, defence-related, citizen, employee, proprietary, or personal goes into a prompt, a canvas, a task title, or a file.
* CAE and the Government of Ontario are named as audience examples. No customer logo appears here, and nothing on this page claims endorsement, approval, certification, or compliance with any organization's requirements.
* Nothing leaves the machine during the session: no external services, no secrets, no commits, no pushes, no pull requests, no deployment.
* A human reviews and accepts generated output. Nothing on this page transfers that responsibility to a tool.

## Accounts and entitlement

* A GitHub account, signed in on the device you will actually use.
* Git installed and on the PATH. The app documents Git as a prerequisite.
* A Copilot plan, or a configured provider, that supplies model access for that account.

Plan entitlement and app access are two separate questions, and passing the first tells you nothing about the second.

> [!WARNING]
> Organization policy can block the GitHub Copilot app independently of your plan. The app is governed by its own policy for Business and Enterprise users, and a restriction applied to any signed-in account can block the app on that device. Confirm effective access per attendee, on the attendee's own device, rather than inferring it from a licence list.

Two related limits to settle before invitations go out:

* Copilot Free offers automatic model selection only. Any step that asks a learner to pick a model fails on that plan. In this workshop model selection is demonstrated by the facilitator and never required of a learner.
* Enterprise-managed accounts cannot create gists, so no exercise or fallback may depend on one.

## Platform and app version

* Windows, macOS, or Linux, with the app installed in advance.
* On Linux the app ships as an x64 AppImage only. Linux on arm64 is not covered, and an arm64 Linux device cannot be made to work in the room.
* Record the app version, operating system, and architecture per attendee during preflight. Releases land at close to a daily cadence and interface labels have already been renamed once, so a device verified a month ago is not a device verified.

No minimum app version is published here, because no rehearsal has fixed one. The facilitator pins a minimum against the version actually rehearsed and refuses older builds.

## Runtime

Generated canvas extensions are documented as a `package.json` for metadata and dependencies plus an entry file such as `extension.mjs`, they run as processes, and they resolve tools from the shell PATH. That is a Node-shaped artifact.

It is therefore not accurate to tell learners they need no Node at all. What is accurate: you will not author Node in this workshop, and no lab depends on an in-class installation. Treat a working runtime as something installed on the device image beforehand and verified by someone, not as something the session will discover.

> [!CAUTION]
> Whether a generated canvas runs with no installation step has never been observed on any machine. If the agent reports a dependency that is not present, the workshop stops and switches to the prepared reference canvas. Stopping is the designed path, not a defeat.

## Network and proxy

This is the single likeliest cause of a failed live session for the stated audience, and it cannot be diagnosed in the room.

* A proxy URL that begins with `https://` is not supported by GitHub Copilot. A proxy configured that way fails, and no prompt wording works around it.
* TLS-intercepting corporate proxies, which replace certificates to inspect secure connections, are a documented cause of connection errors. Both named audience types commonly run exactly that configuration.
* A company running a proxy server must also configure proxy settings for Copilot at the company level. An individual device setting is not sufficient.
* The documented firewall allowlist must be reachable from the network attendees will actually use.

Test from the venue network and the corporate device image, at least a week out, at realistic cohort size. A facilitator's home connection or a guest SSID proves nothing about either.

## Cost, quota, and concurrency

* Billing moved to AI credits priced per token, and the premium-request model is described as legacy. A thirty-minute agentic block multiplied by cohort size is a real cost that someone has to own.
* Agree a per-seat budget with the sponsor, capture a usage baseline per seat during preflight, and decide in advance what happens when a seat is exhausted.
* Rate limiting explicitly targets grouped or coordinated usage. A room issuing near-identical generation requests inside the same two minutes matches that description exactly.
* Generation starts in staggered waves for that reason. Your facilitator tells you which wave you are in.

## Disclosure and written approval

* The app repository states that conversation data may be collected. The telemetry and data-handling disclosure goes to attendees and their sponsor in writing before the session, not verbally on the day.
* Written approval to execute AI-generated code on managed devices must be on file, with a named approver per organization, before invitations are sent. Without it, the session runs on facilitator-provided disposable machines or virtual desktops.
* An incident path must be named in advance: what you do, and who you tell, if endpoint protection quarantines a generated extension mid-session.

## Project folder

Open the session against an approved, disposable project folder. Never a folder holding real work, a corporate repository, live logs, tickets, or calendars.

The workshop uses a small set of fictional seed tasks with stable identifiers, three statuses, and two priorities. Your facilitator supplies that fixture. Do not substitute anything drawn from a real system.

## Verification evidence, not attestation

A ticked checkbox is not evidence. At least 48 hours before the session, on the device you will actually use, each attendee:

1. Confirms the app launches and the account is signed in.
2. Confirms model access is available on that account and records which plan it is.
3. Runs a throwaway canvas creation in a scratch folder and confirms a canvas panel renders.
4. Returns the app version, operating system, architecture, and the usage baseline.

The facilitator holds a go, reduce, or reschedule decision against that evidence at a published time before delivery.

## Related pages

* [Workshop]({{ '/' | relative_url }}) for the agenda and the boundaries.
* [Labs]({{ '/labs/' | relative_url }}) for the lab contract and the acceptance bars.
* [Resources]({{ '/resources/' | relative_url }}) for the official sources behind every claim on this page.
