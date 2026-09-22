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

## Confirmed repository facts

Read from the GitHub REST API on 2026-09-22 with an authenticated token.

| Fact | Value | Source |
|------|-------|--------|
| Default branch | `main` | `GET /repos/devopsabcs-engineering/github-copilot-app-workshop` |
| Repository visibility | `internal` | same |
| Organization plan | `enterprise` | `GET /orgs/devopsabcs-engineering` |
| Pages enabled | **No** (`has_pages: false`) | same repository response |
| Pages configuration | **Absent** (`GET /repos/.../pages` returns 404) | Pages API |
| Environments defined | **None** | `GET /repos/.../environments` |
| Actions enabled | Yes | `GET /repos/.../actions/permissions` |
| Allowed actions | `selected`, with an allow-list | same |
| GitHub-owned actions allowed | Yes | `GET /repositories/1380813984/actions/permissions/selected-actions` |
| Verified-creator actions allowed | Yes | same |
| SHA pinning required by policy | No | `GET /repos/.../actions/permissions` |

The default branch matches the branch the deploy job is gated to, so no workflow change is needed for branch alignment.

## What a repository owner must do

None of the following can be performed by the workflow, by its `GITHUB_TOKEN`, or by any change to this repository's files.

### 1. Enable Pages with the Actions source

In **Settings, Pages, Build and deployment**, set **Source** to **GitHub Actions**.

This is blocking and it is not optional. The workflow calls `actions/configure-pages`, which runs with `enablement: false` and therefore only *reads* the Pages configuration. Enabling Pages requires a token other than `GITHUB_TOKEN`, as that action's own `action.yml` states. Pages is currently not enabled, so the first run of this workflow will fail at the **Setup Pages** step until an owner completes this step.

That failure reaches pull request runs too, because the base path is read from the Pages configuration on every run rather than hardcoded. That coupling is deliberate: one source for the base path, and no silent fallback to a guessed value. The consequence is that content validation on pull requests is unavailable until Pages is enabled.

### 2. Allow the one third-party action

The allow-list permits all GitHub-owned actions, which covers `actions/checkout`, `actions/setup-node`, `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.

It does **not** list `ruby/setup-ruby`, which the workflow needs to install Ruby and restore the bundle. Unless `ruby` is an allowed verified creator, the workflow will be blocked at the **Setup Ruby** step. Confirm this before the first run, and if it is blocked, add the exact pinned reference to the allow-list rather than a mutable tag:

```text
ruby/setup-ruby@4a9ddd6f338a97768b8006bf671dfbad383215f4
```

This action and its pin come from the official GitHub Pages Jekyll starter workflow, which pins the same commit.

### 3. Configure the deployment environment

The `github-pages` environment does not exist yet. It is created on first deployment, but its protection rules are not set for you. An owner should restrict its deployment branches to `main`, and decide whether a required reviewer is wanted before a customer-facing site updates.

### 4. Confirm the intended visibility before enabling deployment

A private or internal repository does not by itself produce a private site. Publishing can expose the material to a wider audience than the repository does.

This repository is `internal` and the organization is on an `enterprise` plan, so access control on the published site is available in principle. It has not been verified in practice, because Pages is not enabled and no site exists to inspect. Until an owner confirms both the intended audience and the visibility actually applied, deployment stays disabled.

## The resolved site path

The expected project-site base path is `/github-copilot-app-workshop`, which is the value every local build and the content validator's default already use.

This is expected, not confirmed, because no Pages site exists yet. It does not need to be corrected by hand if it turns out to differ: the workflow passes `steps.pages.outputs.base_path` to both Jekyll and the validator, so the assertion checks the real deployed path rather than this assumption.

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

* No run of the publishing workflow has been observed. Its YAML parses, its action pins resolve to real commits, and its step order was asserted, but nothing has executed.
* Pages eligibility, the real site URL, and the applied site visibility are all unconfirmed, because Pages is not enabled.
* The organization-level Actions policy could not be read with the available token, which returned HTTP 403. Only the repository-level policy above was readable, and an organization policy can be stricter.
* Whether `ruby` is an allowed verified creator was not confirmed.
* Every validation recorded on the validation status page was run against a **local** build. A local build exercises the same generator, the same validators, and the same Jekyll invocation, but it does not exercise the runner, the action pins, the Pages configure step, or the artifact upload. None of those has ever executed.

## Related records

* `docs/facilitator/validation-status.md`, published at `/facilitator/validation-status/`, for what was machine-verified, what was human-judged, what was not verified at all, and the full list of open blocking gates. The two publishing gates recorded here, Pages enablement and the `ruby/setup-ruby` allow-list entry, appear in that list as DR-09 and DR-10.
* `SUPPLY-CHAIN.md` for dependency pins and the recorded production audit.
* `.github/workflows/pages.yml` for the pinned action set and its retrieval provenance.
