---
title: Supply Chain Record
description: Resolved dependency pins, the recorded production audit, and the supply-chain decisions taken for the bilingual GitHub Copilot app workshop toolchain.
author: DevOps ABCs Engineering
ms.date: 2026-09-22
ms.topic: reference
keywords:
  - supply chain
  - dependency audit
  - npm
---

## Why this record exists

The workshop ships to a defence contractor and a provincial government. Both audiences review what a repository pulls in before they run it. Every production dependency below is pinned to an exact version, audited on a recorded date, and paired with the decision that put it there.

Adversarial build review finding BLD-H4 required that a production dependency audit be run, recorded, and enforced rather than discussed. This file is the record. The enforcement lives in the `audit:deps` script, which `validate:all` runs first.

## Production dependency pins

Exact versions, no ranges. A range would let a later resolve differ from the audited tree.

`pptxgenjs` at `3.12.0` generates the two sixteen-slide decks. It is the latest release of the previous major, per decision ID-01.

`jszip` at `3.10.2` reads generated `.pptx` packages as ZIP archives for the per-slide deck validator in Step 5.2. It is declared directly rather than relied on transitively through `pptxgenjs`, so the validator never depends on a package it did not ask for.

`js-yaml` at `5.4.2` parses page front matter in `scripts/validate-content.mjs`, including accented French scalars and sequences.

One override is declared. `image-size` is pinned to `2.0.4`, because `pptxgenjs` 3.12.0 requests `image-size@^1.0.0` and every release at or below 2.0.2 carries high-severity denial-of-service advisories. The override lifts the transitive pull to the patched release.

There are no development dependencies. The validators and the generator run on Node with these three packages only.

## Resolved production tree

Captured 2026-09-22 with `npm ls --omit=dev --all`.

```text
github-copilot-app-workshop@0.1.0
├─┬ js-yaml@5.4.2
│ └── argparse@2.0.1
├─┬ jszip@3.10.2
│ ├─┬ lie@3.3.0
│ │ └── immediate@3.0.6
│ ├── pako@1.0.11
│ ├─┬ readable-stream@2.3.8
│ │ ├── core-util-is@1.0.3
│ │ ├── inherits@2.0.4
│ │ ├── isarray@1.0.0
│ │ ├── process-nextick-args@2.0.1
│ │ ├── safe-buffer@5.1.2
│ │ ├─┬ string_decoder@1.1.1
│ │ │ └── safe-buffer@5.1.2 deduped
│ │ └── util-deprecate@1.0.2
│ └── setimmediate@1.0.5
└─┬ pptxgenjs@3.12.0
  ├─┬ @types/node@18.19.130
  │ └── undici-types@5.26.5
  ├── https@1.0.0
  ├── image-size@2.0.4 overridden
  └── jszip@3.10.2 deduped
```

Twenty-one packages in total, including the root.

## Recorded audit

Command, exactly as `npm run audit:deps` runs it:

```bash
npm audit --omit=dev --audit-level=high
```

Audit date: 2026-09-22.

Output of `npm audit --omit=dev` on the tree above:

```text
found 0 vulnerabilities
```

The first audit run on this tree did not look like that. It is recorded here because the remediation is the point, not the final number.

```text
# npm audit report

image-size  <=2.0.2
Severity: high
image-size: ICNS parser allows denial of service through an infinite loop
image-size: JXL and HEIF parsers allow denial of service through infinite loops
node_modules/image-size
  pptxgenjs  >=2.3.0
  Depends on vulnerable versions of image-size

js-yaml  4.0.0 - 4.3.1
Severity: high
js-yaml has prototype pollution in merge (<<)
JS-YAML: Quadratic-complexity DoS in merge key handling via repeated aliases
js-yaml: YAML merge-key chains can force quadratic CPU consumption
JS-YAML: Quadratic CPU consumption in !!omap resolution (3.x and 4.x)
js-yaml: maxTotalMergeKeys does not limit CPU use for empty merge sources

3 high severity vulnerabilities
```

Both were remediated before the lockfile was committed: `js-yaml` moved from the `4.x` line to `5.4.2`, and `image-size` was overridden to `2.0.4`.

## Decisions

### Deck library major version, closing OD-01

Decision ID-01 pins `pptxgenjs` to its previous major. The latest release on that line is `3.12.0`, and that is the pin.

The planning log recorded the rationale as avoiding the `https` placeholder package that `pptxgenjs` 4.0.1 carries as a runtime dependency. That rationale does not survive verification, and repeating it would be exactly the self-referential validation that finding BLD-C3 exists to remove. Every `pptxgenjs` 3.x release from `3.0.0` through `3.12.0` declares `https@^1.0.0` as a runtime dependency, checked against the registry on 2026-09-22. Pinning the previous major does not avoid the package.

The decision to pin `3.12.0` still stands, on the rationale that actually holds. The research verified that `addSlide`, `addText`, `addNotes`, `writeFile`, and the `lang` text option behave identically across the two majors, so the functional cost is nil, and a release line that has been stable for longer is the safer choice for a deliverable that ships to a customer. The `https` question is answered below on its own terms rather than by version selection.

### The `https` transitive package

`https@1.0.0` is accepted, with the following stated basis.

It is a placeholder package. It contains no implementation of its own and exists so that `require('https')` resolves in bundler environments that do not shim Node built-ins. In this repository the deck generator runs on Node directly, where the real `node:https` built-in always wins resolution, so the placeholder is installed but never exercised on the code path this repository uses.

It cannot be removed by choosing a different `pptxgenjs` version, because every 3.x and 4.x release declares it. Removing it would require replacing the deck library outright or vendoring a build, which is a larger change than the risk warrants for a package that is inert at runtime here.

What is not claimed: that the package is maintained, that it will stay inert if a future release of the generator is bundled for a browser, or that a customer reviewer will find it acceptable. If a customer rejects it, the remediation is a different deck library, and that reopens decision ID-01 rather than being absorbed here.

### The `image-size` override

`pptxgenjs` reaches `image-size` to read the dimensions of images embedded in slides. Every release at or below 2.0.2 carries high-severity denial-of-service advisories, and no `pptxgenjs` release on either major requests a patched range, so the advisory is not resolvable by version selection either.

The override to `2.0.4` was smoke-tested on 2026-09-22 by generating a slide with a background colour, accented French text carrying `lang: fr-CA`, and speaker notes, then writing the package to a buffer. That path succeeded.

One caveat is recorded rather than glossed: `image-size` version 2 changed its module shape, and the smoke test did not embed an image, because no rehearsal screenshots exist yet. Follow-on work item WI-02 adds screenshots. Whoever does that must re-test image embedding under this override before relying on it, and must treat a failure there as a supply-chain decision to revisit rather than a generator bug to patch around.

### The `js-yaml` major version

`js-yaml` is pinned to `5.4.2`, the current release. The `4.x` line carries five high-severity advisories, and one of them records that the `!!omap` fix was not backported to `3.x` or `4.x`, so the patched line is the only clean option. The `load` API this repository uses was smoke-tested on 2026-09-22 against front matter containing accented French scalars and a sequence, and parsed without corruption.

### Lockfile portability

`package-lock.json` is committed and its `resolved` URLs point at `https://registry.npmjs.org/`.

The authoring machine resolves packages through an internal registry proxy that returns tarball URLs on a different host, and npm 12 refuses those by default with `EALLOWREMOTE`. The install that produced this lockfile ran with `--allow-remote=all` on that machine only. That flag is not committed to any `.npmrc`, because weakening remote-fetch policy repository-wide is the opposite of what this audience needs, and CI resolving against the public registry does not need it.

The twenty internal tarball URLs the proxy wrote into the lockfile were rewritten to their public registry equivalents before commit, for two reasons: a customer-facing repository should not carry internal infrastructure hostnames, and a lockfile pointing at a private feed is not installable outside the network that hosts it. The `integrity` hashes are content addressed and were left untouched, so the rewrite cannot change what gets installed. `npm ci` was then run against the rewritten lockfile and completed with the same twenty-one package tree and a clean audit.

Anyone regenerating this lockfile behind the same proxy must repeat the rewrite. On a runner using the public registry no rewrite is needed.

## Enforcement

`npm run audit:deps` runs `npm audit --omit=dev --audit-level=high` and exits non-zero on any high or critical advisory in the production tree.

`npm run validate:all` runs `audit:deps` first, then the content validator, then the deck validator. A failing audit stops the chain before anything is validated or published.

The gate is deliberately blunt: it fails on any high or critical advisory, including one that a reviewer might later decide is acceptable. Accepting an advisory therefore requires a change recorded in this file and a remediation applied in `package.json`, such as the `image-size` override above. There is no allowlist that lets an advisory pass silently.

## Re-audit triggers

Re-run `npm run audit:deps`, refresh the tree and the audit output above, and re-date this file when any of the following happens:

* A dependency pin or override changes.
* The lockfile is regenerated for any reason.
* Screenshots are added under follow-on work item WI-02, which exercises the `image-size` override for the first time.
* More than ninety days pass before a delivery, since the recorded result is a point-in-time statement and nothing here promises an upstream patch cadence.
