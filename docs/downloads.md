---
title: Downloads
description: Slide decks for the English and French deliveries, produced as build outputs rather than tracked files.
lang: en
translation_key: downloads
lang_ref: /fr/telechargements/
nav_order: 4
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - unrehearsed-proposal-notice
---

# Downloads

Two decks, one per delivery language, sixteen widescreen slides each, with facilitation notes on every slide.

## Boundaries that apply to this page too

* Synthetic data only. The decks carry the fictional Team Task Board and nothing drawn from a real system. Nothing operational, defence-related, citizen, employee, proprietary, or personal belongs in a prompt, a canvas, or a slide.
* CAE and the Government of Ontario are named as audience examples. No customer logo appears in either deck, and neither deck claims endorsement, approval, certification, or compliance with any organization's requirements.
* Neither deck is a distribution channel for your own board, your session transcript, or anything else produced during the workshop.
* Speaker notes describe what a facilitator says. They are not a claim that any check in them has been executed.

## Get the decks

* [English deck]({{ '/assets/decks/github-copilot-app-workshop-en.pptx' | relative_url }})
* [French deck]({{ '/assets/decks/github-copilot-app-workshop-fr.pptx' | relative_url }})

## These files are build outputs

Both decks are generated from the shared content model by the deck build, then written into `docs/assets/decks/` and published as part of the site artifact. That directory is ignored by version control and does not exist in a fresh clone.

An empty directory in your working copy is therefore expected, not a defect. So is a broken link on a locally served site where the deck build has not run.

> [!NOTE]
> The links above resolve on the published site. Locally, run the deck build first. A missing or zero-byte deck fails the build rather than warning, so a site that publishes with both links intact is a site whose decks were actually produced.

## What these files do not prove

Each deck describes a proposed delivery. Every prompt either deck carries is an unrehearsed proposal: none has been executed in a workshop, no result from any of them has been observed, and the capability names a generated canvas produces are not guaranteed to match any example shown. Downloading a file validates no behaviour of the app.

## What the decks do and do not contain

Each deck follows the same section timing as the [agenda]({{ '/' | relative_url }}), groups its slides against the same six sections, and carries localized notes in the language of its own file.

No deck contains a screenshot. Sanitized images are captured from an actual rehearsal, no rehearsal has happened, and inventing a screenshot would be worse than shipping none.

No deck names a tested app version, for the same reason. Every product claim in either deck traces to an official page listed in [Resources]({{ '/resources/' | relative_url }}).
