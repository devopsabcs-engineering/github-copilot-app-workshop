---
applyTo: '.copilot-tracking/changes/2026-09-22/github-copilot-app-workshop-changes.md'
---
<!-- markdownlint-disable-file -->
# Implementation Plan: GitHub Copilot App Bilingual Workshop

## Overview

Build a bilingual, ninety-minute GitHub Copilot app workshop in this repository, delivered as a root README agenda, a published English and French Jekyll site with four hands-on labs and a facilitator kit, and two generated PowerPoint decks, with the research risk register carried forward as enforceable gates.

## Objectives

### User Requirements

* Begin with an agenda similar to the sibling fundamentals README. — Source: user request, conversation 2026-09-22.
* Create an actual bilingual workshop inspired by the sibling FSI workshop, including GitHub Pages and PowerPoint, as implementation work rather than an optional follow-up. — Source: user request, conversation 2026-09-22.
* Focus on the GitHub Copilot app, especially canvas apps, with a less technical experience than the VS Code workshops. — Source: user request, conversation 2026-09-22.
* Use a generic demo application and official public GitHub or Microsoft documentation, workshops, or blogs as product-content sources. — Source: user request, conversation 2026-09-22.
* Target developers at organizations such as CAE or the Government of Ontario with beginner-to-intermediate GitHub Copilot skills. — Source: user clarification, 2026-09-22.
* Leave no critical or high adversarial finding unresolved. — Source: user request, conversation 2026-09-22.

### Derived Objectives

* Maintain one shared bilingual content model with a machine-checked parity validator covering five content surfaces: the English site, the French site, both decks, and the root README agenda table. — Derived from: research finding BLD-H3, where independent content surfaces drift without enforcement.
* Express every lab outcome as deltas and invariants rather than absolute counts or displayed labels. — Derived from: research findings CUR-C3 and CUR-H4, where a count oracle and a label oracle both break under agent nondeterminism and mixed-language output.
* Place dependency review before first execution in every lab, in both languages. — Derived from: research finding CUR-C4, where the original ordering treated correct model behavior as a failure.
* Ship a facilitator kit that states the unmet blocking gates in writing, with an owner, evidence, and a dated go or no-go decision per gate. — Derived from: research findings CUR-C1, CUR-C2, CUR-C5, PRD-H1, PRD-H2, and PRD-H6, none of which authoring can close.
* Make validation capable of failing for the defects it exists to catch, including per-slide bilingual deck checks and an automated base path assertion. — Derived from: research findings BLD-C3, BLD-H1, and BLD-H5, where the original checks were self-referential, fail-soft, or human-judged.
* Resolve the six high findings the research register omitted from its adversarial sources. — Derived from: plan validation reconciliation RC-02 covering BLD-H4, CUR-H1, CUR-H3, CUR-H5, CUR-H6, and CUR-H7.

## Context Summary

### Project Files

* README.md - currently contains only the repository name; becomes the requested agenda.
* .copilot-tracking/research/2026-09-22/github-copilot-app-workshop-research.md - authoritative research baseline with the agenda, lab contract, prompts, deck contract, and risk register.
* .copilot-tracking/research/subagents/2026-09-22/workshop-scope-research.md - product distinctions and sibling repository structure references.
* .copilot-tracking/research/subagents/2026-09-22/canvas-curriculum-research.md - synthetic fixture, paired prompts, and safety gates.
* .copilot-tracking/research/subagents/2026-09-22/publishing-deck-research.md - target file tree, site configuration, and 16-slide outline. The outline predates two corrections and must not be copied literally.
* .copilot-tracking/research/subagents/2026-09-22/adversarial-product-verification.md - claim-by-claim source verification.
* .copilot-tracking/research/subagents/2026-09-22/adversarial-curriculum-review.md - 26 severity-rated curriculum findings, including four highs the register omitted.
* .copilot-tracking/research/subagents/2026-09-22/adversarial-build-verification.md - 21 severity-rated build and publishing findings, including one high the register omitted.

### References

* ../github-copilot-fundamentals/README.md - the requested agenda format.
* ../foundry-hosted-agents-fsi/ - the bilingual site and deck generation pattern being adapted.
* https://docs.github.com/en/copilot - official product documentation source register, enumerated in the research.

### Standards References

* .github/copilot-instructions.md - repository conventions, if present at implementation time.

## Implementation Checklist

### [x] Implementation Phase 1: Foundations and Shared Content Model

<!-- parallelizable: false -->

* [x] Step 1.1: Initialize repository tooling
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 16-51)
* [x] Step 1.2: Author the paired content model
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 52-87)
* [x] Step 1.3: Author the content parity validator
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 88-131)

### [x] Implementation Phase 2: Site Foundation

<!-- parallelizable: false -->

* [x] Step 2.1: Create the Jekyll configuration and Gemfile
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 136-163)
* [x] Step 2.2: Override the theme layout for correct document language
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 164-189)
* [x] Step 2.3: Mark language of parts in navigation
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 190-211)
* [x] Step 2.4: Validate the site foundation
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 212-229)
* [x] Step 2.5: Add .gitattributes to enforce LF for French content
  * Added during implementation; recorded in the changes log.

### [x] Implementation Phase 3: English Workshop Content

<!-- parallelizable: true -->

Writes only under docs/ excluding docs/fr/, docs/facilitator/, and docs/assets/. Its validator walk excludes those same subtrees. Runs no Jekyll build and no cross-language parity check; both are deferred to Step 7.1 because they touch shared state.

* [x] Step 3.1: Author the English entry pages
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 234-261)
* [x] Step 3.2: Author the four English lab pages
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 262-296)
* [x] Step 3.3: Validate English content
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 297-309)

### [x] Implementation Phase 4: French Workshop Content

<!-- parallelizable: true -->

Writes only under docs/fr/ excluding docs/fr/facilitator/, and its validator walk excludes that subtree. Runs no Jekyll build and no cross-language parity check.

* [x] Step 4.1: Author the French entry pages
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 314-337)
* [x] Step 4.2: Author the four French lab pages
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 338-361)
* [x] Step 4.3: Validate French content
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 362-374)

### [x] Implementation Phase 5: Deck Generation

<!-- parallelizable: true -->

Writes only under scripts/ and the generated docs/assets/decks/ output directory. Its English-to-French comparison is safe in parallel because the decks' only input is the Phase 1 content model, which no parallel phase mutates.

* [x] Step 5.1: Write the deck generator
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 381-404)
* [x] Step 5.2: Write the deck validator
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 405-434)
* [x] Step 5.3: Render and inspect both decks
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 435-446)
  * Generator-side layout remediation is complete and measured. The manual visual render could not be performed in this environment and is carried as blocking delivery gate DR-08, reported in Step 8.3.

### [x] Implementation Phase 6: Root Agenda and Facilitator Kit

<!-- parallelizable: true -->

Writes only README.md and the disjoint docs/facilitator/ and docs/fr/facilitator/ subtrees. Its validation is scoped to those two subtrees; counterpart parity between them runs at Step 7.1.

* [x] Step 6.1: Author the root README agenda
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 451-475)
* [x] Step 6.2: Author the facilitator kit
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 476-525)
* [x] Step 6.3: Validate the facilitator kit
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 526-538)

### [x] Implementation Phase 7: Integration, Publishing Workflow

<!-- parallelizable: false -->

* [x] Step 7.1: Run the serialized content integration gate
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 543-561)
* [x] Step 7.2: Author the Pages workflow
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 562-594)
* [x] Step 7.3: Verify publishing prerequisites
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 595-612)

### [x] Implementation Phase 8: Validation

<!-- parallelizable: false -->

* [x] Step 8.1: Run full project validation
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 617-637)
* [x] Step 8.2: Fix minor validation issues
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 638-644)
* [x] Step 8.3: Report blocking issues
  * Details: .copilot-tracking/details/2026-09-22/github-copilot-app-workshop-details.md (Lines 645-661)

## Planning Log

See .copilot-tracking/plans/logs/2026-09-22/github-copilot-app-workshop-log.md for discrepancy tracking, register reconciliation, implementation paths considered, open owner decisions, and suggested follow-on work.

## Dependencies

* Node LTS with npm for the deck generator and validators.
* Ruby with bundler for the Jekyll site.
* PowerPoint or an equivalent renderer for the manual deck inspection.
* A screen reader for the language-of-parts verification in Step 8.1.
* Repository write access and the ability to enable GitHub Pages.
* Owner decision OD-01 resolved before Step 1.1 installs the deck library.
* Owner decision OD-06 resolved before Implementation Phase 2 pins the theme version.
* Owner decision OD-07 is delivery-operational and does not block implementation; the labs are authored for a structural track split regardless.

## Success Criteria

* The root README presents six timed sections in the sibling format, including a Misconceptions subsection, using the 10/15/30/15/15/5 timing, machine-validated against the content model. — Traces to: user requirement one, research agenda table, and finding BLD-H3.
* Both language trees build with paired pages, matching lab and facilitator slugs, correct per-page document language, and equivalent safety-critical content enforced by required-content markers. — Traces to: user requirement two, and research findings BLD-H2, BLD-H3, and CUR-H4.
* Every lab in both languages expresses expected results as deltas and invariants, places dependency review before execution, carries a visible unrehearsed-proposal notice, names one learner decision, and publishes two per-track acceptance bars with registration-time track assignment. — Traces to: research findings CUR-C3, CUR-C4, CUR-H8, and CUR-H9.
* French carries its own per-section duration allocation within the same ninety-minute envelope, and its own dated go or no-go decision; an English pass does not authorize French delivery. — Traces to: research finding CUR-H4.
* Two non-empty sixteen-slide decks are generated from a clean checkout, validated per slide id for bilingual difference and notes provenance, and visually inspected. — Traces to: research findings BLD-C1 and BLD-H5.
* The workflow pins every action by commit SHA, records retrieval provenance, and fails on a missing deck, an identical or partially translated deck pair, a missing translation counterpart, or a README duration mismatch. — Traces to: research findings BLD-C1, BLD-C2, BLD-C3, and BLD-H5.
* The facilitator kit presents preflight as a Gate, Owner, Evidence, Date, Result table ending in a dated go or no-go decision against a published numeric threshold, pins a minimum app version, includes all six abort rows with the resume mechanism, and publishes a per-beat decomposition of the thirty-minute block. — Traces to: research findings CUR-C1, CUR-C2, CUR-C5, and reconciliation items CUR-H1, CUR-H3, CUR-H5, CUR-H6, CUR-H7.
* A recorded production dependency audit exists and gates the build. — Traces to: reconciliation item BLD-H4.
* Implementation closes with an explicit statement of the unmet blocking gates rather than a delivery-ready claim. — Traces to: user requirement six, and the research status section.
