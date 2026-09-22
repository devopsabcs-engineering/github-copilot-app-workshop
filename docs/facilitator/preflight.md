---
title: Preflight Gates
description: Pass or fail gates with a named owner, recorded evidence, a date, and a dated go or no-go decision per language.
lang: en
translation_key: facilitator-preflight
lang_ref: /fr/facilitator/preflight/
parent: Facilitator Kit
nav_order: 1
covers:
  - scope-boundaries
  - no-installation-in-class
  - telemetry-disclosure
  - human-review-required
  - unrehearsed-proposal-notice
  - synthetic-data-only
---

# Preflight Gates

Every gate below is pass or fail. A failure moves the delivery date rather than being absorbed on the day.

A checklist with no named owner, no recorded evidence, and no dated decision is not a gate, so the table carries all four columns and none of them may be left as a role. An owner cell that names a job title rather than a person is an open gate.

> [!WARNING]
> Self-attestation does not close any gate here. Evidence means a returned artifact: a version string, a transcript, a signed approval, a staged directory path, or a recorded wall-clock time. A checkbox someone ticked about their own machine is what puts four learners in the room who discover on the day that policy blocks the app.

## Gate Table

Gates marked blocking cannot be traded for a percentage of verified seats. If one is open, the decision is no-go regardless of how many seats passed.

| Gate | Owner | Evidence | Date | Result |
| --- | --- | --- | --- | --- |
| G01 Reference canvas built, reviewed, rehearsed, and staged on the device image as a copyable directory | Curriculum lead (name required) | Staged path on the image, plus the review record described on the reference canvas page | Not set | Not met, blocking |
| G02 Two timed dry runs completed per language on the attendee device image, with the agenda paced to the slowest run | Delivery lead (name required) | Wall-clock time per beat for each of the four runs, recorded against the section 3 decomposition, slowest run identified | Not set | Not met, blocking |
| G03 Venue network and proxy verified on the device image at full cohort size, including TLS interception and the documented firewall allowlist | Venue network contact (name required) | Transcript from the network attendees will actually use, run at realistic concurrency rather than one machine on a guest connection | Not set | Not met, blocking |
| G04 Per-seat credit budget approved, a usage baseline captured for every seat, and a throttling fallback rehearsed | Sponsor (name required) | Approved per-seat budget, one usage reading per seat, and a rehearsal record for the fallback | Not set | Not met, blocking |
| G05 Plan entitlement and model availability confirmed for every seat, including any Free-plan attendee | Delivery lead (name required) | Per-seat plan and model confirmation. Model choice is demonstrated by the facilitator and never required of a learner | Not set | Not met |
| G06 Per-seat enterprise app policy verified on the signed-in account, separately from plan entitlement | Customer IT contact (name required) | Policy result captured per seat on the account the learner will sign in with. Organization policy can block the app for a restricted account independently of the plan, and it cannot be overridden locally or during class | Not set | Not met, blocking |
| G07 App version, operating system, and architecture confirmed per seat, with Linux supported as x64 AppImage only | Device image owner (name required) | Version, operating system, and architecture returned per seat and compared against the minimum pinned in G08 | Not set | Not met |
| G08 Minimum app version pinned, with older builds refused on the device image | Device image owner (name required) | Minimum version is not yet pinned. Set it from the build used in the first passing dry run under G02, record it in this cell, and refuse any older build. While this cell holds no version number, the gate is a fail | Not set | Not met, blocking |
| G09 Product version and label re-check performed inside the seven days before delivery | Curriculum lead (name required) | Dated re-read of the official app documentation, with any renamed interface label reflected in the material. The app ships on a near-daily cadence, so a check performed a month out has expired | Not set | Not met |
| G10 Runtime prerequisites installed in advance, with no in-class installation anywhere on the critical path | Device image owner (name required) | Prerequisite list installed and verified on the image. A generated extension carries a package.json and an entrypoint and resolves tools from the shell PATH, so a working runtime is a preflight responsibility | Not set | Not met |
| G11 No inherited skill, MCP server, or configured tool changes agent behaviour on the workshop device image | Device image owner (name required) | Inventory of configured skills, MCP servers, and tools on the image, each one either removed or justified in writing. Prompt wording is not a security control, so the text of a lab prompt is not evidence for this gate | Not set | Not met, blocking |
| G12 Telemetry and data-handling disclosure delivered in writing to attendees and to the sponsor | Sponsor contact (name required) | The sent disclosure, its recipients, and the send date. Conversation data may be collected, which is a disclosure question rather than a formality | Not set | Not met, blocking |
| G13 Written approval on file for executing AI-generated code on managed devices, with a named approver per organization and a stated incident path | Customer approver (name required) | Signed approval per attending organization, plus the named contact and the steps a learner follows if endpoint protection quarantines a generated extension mid-session | Not set | Not met, blocking |
| G14 Facilitator ratio and class cap agreed and enforced at registration, with Canvas Dev Mode rehearsed as a recovery lever | Delivery lead (name required) | Agreed cap, confirmed helper count, and a rehearsal record for the recovery lever. The cap and the helper count stay open as OD-03 until a named person settles them | Not set | Not met |

## Evidence Attendees Return

G05 through G11 are per-seat gates, so each attendee produces evidence on the machine they will use, at least 48 hours before the session:

1. Sign in to the app on the workshop device and confirm the account is not blocked by organization policy.
2. Capture a usage reading and return it.
3. Create a throwaway folder outside any real work, run a trivial canvas creation, and confirm that a panel renders.
4. Return the app version, the operating system, and the architecture as text.

Anyone who cannot complete all four is an unverified seat for the purpose of the threshold below.

## Go or No-Go Threshold

A dated signature with no stated rule is not a decision. The rule is published here so that the same numbers apply whoever signs.

* 80 percent or more of seats verified: proceed as designed.
* 60 percent to under 80 percent: proceed with reduced scope. Convert the room to the reference canvas at the first abort trigger rather than the second, and drop the section 5 reopen checkpoint.
* Under 60 percent: reschedule.
* Any blocking gate open: no-go, whatever the seat percentage.

Take the decision at T-2 days and communicate it either way, including when the answer is that the session proceeds. Recording a different rule is allowed; recording no rule is not. If a different threshold is used, write it into this section with the rationale before the decision is taken, never afterwards.

## Sign-Off, One Decision Per Language

English and French are two separately validated products. A successful English rehearsal says nothing about the French path, which has never been observed once and carries the higher risk. An English pass does not authorize French delivery.

| Language | Seats verified | Threshold band applied | Blocking gates open | Decided by | Date | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| English | Not recorded | Not applied | G01, G02, G03, G04, G06, G08, G11, G12, G13 | Name required | Not set | No-go |
| French | Not recorded | Not applied | G01, G02, G03, G04, G06, G08, G11, G12, G13 | Name required | Not set | No-go |

Rehearse French first. If the French path works, the English path almost certainly does, and the reverse does not hold.

## Attendee Communications

The gates above only close if attendees are asked in time.

| When | Message | Purpose |
| --- | --- | --- |
| T-14 days | Prerequisites, device requirements, and the pinned minimum app version | Gives the device image owner time to act on G07, G08, and G10 |
| T-7 days | The evidence request above, with a named contact and a return deadline | Produces the per-seat evidence for G05 through G11 |
| T-2 days | The go or no-go decision, sent whichever way it falls | Closes the sign-off above |
| T-1 day | Logistics, plus the statement that only synthetic data may be used | Carries the data boundary into the room |
