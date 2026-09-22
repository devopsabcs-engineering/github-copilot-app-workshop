---
title: Resources
description: The official source register behind every product claim in this workshop, with retrieval dates and what each source does not establish.
lang: en
translation_key: resources
lang_ref: /fr/ressources/
nav_order: 5
covers:
  - synthetic-data-only
  - no-endorsement
  - scope-boundaries
  - public-code-warning
  - persistence-not-guaranteed
---

# Resources

Every product claim in this workshop traces to one of the pages below.

## Retrieval dates are not publication dates

All sources were retrieved on 2026-09-22. That date records when someone read the page, and nothing else.

It does not tell you when the page was written, when it was last revised, or whether it still says the same thing today. GitHub Copilot app releases land at close to a daily cadence, and interface labels have already been renamed at least once since these pages were read. Re-check each source within the week before you deliver.

## Boundaries that apply to this page too

* Synthetic data only. No example on any linked page should be reproduced with real organizational content, and nothing operational, defence-related, citizen, employee, proprietary, or personal belongs in a prompt, a canvas, or a file.
* CAE and the Government of Ontario are named as audience examples. No customer logo appears here, and nothing on this page claims endorsement, approval, certification, or compliance with any organization's requirements.
* Linking to an official page establishes what that page says. It does not establish that your device, account, network, or organization behaves the way the page describes.
* Generated code carries a public-code warning, and that warning applies even where a blocking policy is in force. A policy does not remove your obligation to review what was generated before you accept or share it.

## Product and app behaviour

* G1 [GitHub Copilot app overview](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app): the desktop app, availability across plans, the separate app policy for Business and Enterprise users, canvas context, and the public-code warning.
* G2 [GitHub Copilot app quickstart](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app): the GitHub account and Git prerequisites, starting a session, the Changes view, and the review workflow.
* G3 [Working with canvas extensions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions): canvas creation, state shared between the interface and the agent, the kanban example, and project versus user scope.
* G4 [Agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions): the Interactive, Plan, and Autopilot modes, and the session lifecycle.
* G5 [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app): inherited skills, MCP servers, and managed settings that still apply inside your session.
* G6 [Slash commands reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands): canvas creation, review, and tool-approval commands. Session history retention is documented there; board persistence is not the same thing.

## Teaching references

These informed the shape of the workshop. Neither establishes any canvas capability.

* G7 [Getting started with GitHub Copilot, GitHub Skills](https://github.com/skills/getting-started-with-github-copilot): the single-fictional-scenario pattern and an explain, change, review progression.
* M1 [Introduction to GitHub Copilot, Microsoft Learn](https://learn.microsoft.com/en-us/training/modules/introduction-to-github-copilot/): short practice cycles, troubleshooting, and knowledge checks.
* M2 [Introduction à GitHub Copilot, Microsoft Learn](https://learn.microsoft.com/fr-fr/training/modules/introduction-to-github-copilot/): a French learning reference. It does not establish French coverage of the app interface.

## Publishing this site

* P1 [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site): branch or Actions deployment for GitHub Pages.
* P2 [Changing the visibility of a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site): a private repository on its own does not make the published site private.
* P3 [Adding a theme with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll): theme support on managed Pages builds.

## Persistence and reopening

The canvas documentation describes optional JSON artifacts for saved state. It contains no reopening section, and no universal reopen control has been established by any source listed here.

There is therefore no restoration guarantee. Persistence requested in a prompt is a proposal, not an observed behaviour, and no lab on this site asserts a reopen checkpoint. Confirming that behaviour is follow-on work to be run during a rehearsal, with a snapshot of the preserved state taken before any attempt.

## What no source here establishes

Naming the gaps matters more than listing the links, because these are the claims most likely to be made by accident.

* That a specific attendee can run the app and create a canvas on their managed device. Documentation establishes product availability, not effective account policy, architecture, network path, app version, or device approval.
* That a canvas is generated inside any particular time budget, or that it runs with no installation step. No prompt was executed and no duration was measured.
* That the prompts published in the labs produce working controls, shared state, validation, or a filter in either language. They are unrehearsed proposals.
* That a canvas persists automatically, survives a panel close, a session restart, or an app restart, or that any universal reopen control exists. The canvas documentation describes optional saved artifacts and contains no reopening guidance at all.
* That a teammate can open a shared extension with identical state and no extra setup, or that sharing provides live multi-user editing, automatic synchronization, or a published web application.
* That French interface coverage, French generated output, screen-reader behaviour, or accessibility conformance is guaranteed. A keyboard spot check is not a conformance audit, and no WCAG or AODA claim follows from one.
* That a particular data region, retention period, residency control, offline operation, usage quota, or organizational compliance position applies. Local files do not establish on-device inference.

## Related pages

* [Workshop]({{ '/' | relative_url }}) for the agenda.
* [Prerequisites]({{ '/prerequisites/' | relative_url }}) for what must pass before the session.
* [Labs]({{ '/labs/' | relative_url }}) for the hands-on pages.
