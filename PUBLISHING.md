---
title: Publishing Prerequisites
description: What a repository owner must do before this site can deploy to GitHub Pages, what has been confirmed against the live repository, and the single point of failure that must be accepted in writing.
author: DevOps ABCs Engineering
ms.date: 2026-09-22
ms.topic: reference
keywords:
  - github pages
  - publishing
  - deployment
  - actions policy
---

## Why this record exists

The publishing workflow in `.github/workflows/pages.yml` can build and validate this site. It cannot enable GitHub Pages, it cannot set environment protection rules, and it cannot add itself to an organization's allowed-actions list. Those are owner actions, and every one of them is a prerequisite rather than a follow-up.

This file records what was confirmed against the live repository on 2026-09-22, what remains unconfirmed, and the one risk that has to be accepted in writing before delivery depends on this path.

The owner steps below have since been completed. They are kept rather than deleted, because the record of what had to be done by hand is what makes the remaining single point of failure legible.

## Confirmed repository facts

Read from the GitHub REST API on 2026-09-22 with an authenticated token.

| Fact | Value | Source |
|------|-------|--------|
| Default branch | `main` | `GET /repos/devopsabcs-engineering/github-copilot-app-workshop` |
| Repository visibility | `public` | same |
| Organization plan | `enterprise` | `GET /orgs/devopsabcs-engineering` |
| Pages enabled | **Yes** (`has_pages: true`) | same repository response |
| Pages build type | `workflow`, source branch `main` | `GET /repos/.../pages` |
| Published site URL | `https://devopsabcs-engineering.github.io/github-copilot-app-workshop/` | same |
| Site visibility | Public (`public: true`), HTTPS enforced | same |
| Environments defined | `github-pages` | `GET /repos/.../environments` |
| Actions enabled | Yes | `GET /repos/.../actions/permissions` |
| Allowed actions | `selected`, with an allow-list | same |
| GitHub-owned actions allowed | Yes | `GET /repositories/1380813984/actions/permissions/selected-actions` |
| Verified-creator actions allowed | Yes | same |
| SHA pinning required by policy | No | `GET /repos/.../actions/permissions` |

The default branch matches the branch the deploy job is gated to, so no workflow change is needed for branch alignment.

## What a repository owner had to do

None of the following could be performed by the workflow, by its `GITHUB_TOKEN`, or by any change to this repository's files. Steps 1 and 2 are done. Steps 3 and 4 are not.

### 1. Enable Pages with the Actions source

In **Settings, Pages, Build and deployment**, set **Source** to **GitHub Actions**.

This is blocking and it is not optional. The workflow calls `actions/configure-pages`, which runs with `enablement: false` and therefore only *reads* the Pages configuration. Enabling Pages requires a token other than `GITHUB_TOKEN`, as that action's own `action.yml` states.

**Done.** The Pages API now reports `build_type: workflow` on branch `main`, and the workflow has completed the **Setup Pages** step on four successful runs.

The base path is still read from the Pages configuration on every run rather than hardcoded. That coupling is deliberate: one source for the base path, and no silent fallback to a guessed value. The consequence, recorded as follow-on item WI-14, is that pull request validation stays coupled to Pages remaining enabled.

### 2. Allow the one third-party action

The allow-list permits all GitHub-owned actions, which covers `actions/checkout`, `actions/setup-node`, `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.

It does **not** list `ruby/setup-ruby`, which the workflow needs to install Ruby and restore the bundle. The concern was that the workflow would be blocked at the **Setup Ruby** step.

**Done, by observation rather than by configuration.** The step runs. It installed `ruby 3.2.11` on the `ubuntu-24.04` runner and the allow-list did not reject it, which means `ruby` is reachable as a verified creator. The pin has since moved to a release that knows Ruby 3.2.11:

```text
ruby/setup-ruby@e8944e80fb94b20106697132f8c20c665fab29e9
```

### 3. Configure the deployment environment

The `github-pages` environment now exists, created on first deployment. Its protection rules are still not set for you. An owner should restrict its deployment branches to `main`, and decide whether a required reviewer is wanted before a customer-facing site updates. Neither has been done.

### 4. Confirm the intended visibility before enabling deployment

A private or internal repository does not by itself produce a private site. Publishing can expose the material to a wider audience than the repository does.

The repository is now `public` and the Pages API reports `public: true`, so the published site is readable by anyone on the internet. That is the visibility actually applied, not an assumption about it. No owner has recorded that this matches the intended audience.

## The resolved site path

The project-site base path is `/github-copilot-app-workshop`, which is the value every local build and the content validator's default already use.

This is now confirmed rather than expected: the deployed site answers at that path, and the workflow passes `steps.pages.outputs.base_path` to both Jekyll and the validator, so each run asserts the real deployed path rather than this assumption.

## Actions is a single point of failure, and that must be accepted in writing

Planning decision DD-01 replaced the `github-pages` gem with a direct Jekyll 4 toolchain, and the selected publishing path builds through GitHub Actions. Alternative IP-02, publishing from a branch folder, was rejected because the managed Pages builder cannot run the npm deck generator, which would force the two `.pptx` decks to be committed as binaries where nothing could check them against the content model.

The consequence is stated plainly rather than buried:

> **There is no fallback publishing path.** If the organization's Actions policy blocks this workflow, if Actions is disabled, or if the allow-list rejects `ruby/setup-ruby`, the site does not publish at all. There is no degraded mode, no manual build path that produces an equivalent artifact, and no branch-published version that stays in step with the content model.

This is an accepted risk, not a solved one. A named owner must accept it in writing before any delivery depends on the published site. Record the acceptance here:

| Item | Value |
|------|-------|
| Accepted by | *(unassigned)* |
| Role | *(unassigned)* |
| Date | *(not accepted)* |
| Decision | *(pending)* |

Until that row is filled in, treat the published site as unavailable for delivery and use the repository and the generated decks directly.

## What has not been verified

* The organization-level Actions policy could not be read with the available token, which returned HTTP 403. Only the repository-level policy above was readable, and an organization policy can be stricter.
* The `github-pages` environment has no protection rules. Any push to `main` deploys to a public site with no review.
* No owner has confirmed that a publicly readable site is the intended audience, or accepted the single point of failure below in writing.
* The site has been observed to build, deploy, and serve. Nothing about the workshop **session** follows from that: pacing, the reference canvas, venue concurrency, and the network and licensing gates all remain open, and are listed on the validation status page.

## Related records

* `docs/facilitator/validation-status.md`, published at `/facilitator/validation-status/`, for what was machine-verified, what was human-judged, what was not verified at all, and the full list of open blocking gates. The two publishing gates recorded here, Pages enablement and the `ruby/setup-ruby` allow-list entry, were tracked there as DR-09 and DR-10 and are now closed.
* `SUPPLY-CHAIN.md` for dependency pins and the recorded production audit.
* `.github/workflows/pages.yml` for the pinned action set and its retrieval provenance.
