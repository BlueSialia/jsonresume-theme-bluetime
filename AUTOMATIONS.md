# Automations

This document describes all automations in the project, where they live, and what they enforce.

## Local automations (git hooks)

Git hooks are configured via `core.hooksPath` pointing to `.githooks/`. Run `./setup-hooks.sh` once to enable them.

| Hook file | Trigger | What it does |
|---|---|---|
| `.githooks/commit-msg` | `git commit` | Validates the commit message follows [Conventional Commits](https://www.conventionalcommits.org/). Rejects the commit if the first line doesn't match `type[(scope)][!]: description`. |

## CI (continuous integration)

All CI workflows live in `.github/workflows/`.

### `ci.yml` — Core CI

**Trigger:** every push and pull request to `main`.

| Step | Tool | What it checks |
|---|---|---|
| Type check | `tsc --noEmit` | TypeScript compiles without errors. |
| Test | `npm test` | All tests pass. |
| Coverage | `npm run test:coverage` | Node.js native test coverage runs. |
| Size | `npm run size` | Reports compiled and minified file sizes. |
| Unused deps | `knip` | No unused or missing dependencies. |

### `semantic-pr.yml` — PR title validation

**Trigger:** pull_request_target (opened, edited, reopened).

| Job | Tool | What it checks |
|---|---|---|
| validate | `amannn/action-semantic-pull-request` | PR title follows Conventional Commits. |

### `security.yml` — Security audit

**Trigger:** push to `main` and every Monday at 06:00 UTC.

| Step | Tool | What it checks |
|---|---|---|
| audit | `npm audit --audit-level=high` | Known high/critical vulnerabilities in dependencies. |

### `size-limit.yml` — Bundle size comparison

**Trigger:** pull requests targeting `main`.

| Step | Tool | What it checks |
|---|---|---|
| size | `size-limit` / `andresz1/size-limit-action` | Compares bundle sizes against configured limits and posts a PR comment with the comparison. Configured via `size-limit` in package.json. |

## Releases

### `release.yml` — Release orchestration

**Trigger:** push to `main`.

| Job | Tool | What it does |
|---|---|---|
| release-please | `googleapis/release-please-action` | Analyzes Conventional Commits since the last release, determines the next semver bump, updates `CHANGELOG.md` and version, and creates or updates a release PR. |
| publish | `npm publish` | When a release is created, checks out the code, builds, tests, and publishes to the npm registry. |

The release PR is created with the commit message `chore(main): release {version}`. When merged, it creates a git tag and a GitHub release automatically.

## Configuration files

| File | Purpose |
|---|---|
| `release-please-config.json` | Release-please configuration: release type (`node`) and package name. |
| `.release-please-manifest.json` | Release-please manifest tracking the current version. |
| `.githooks/commit-msg` | Shell script enforcing Conventional Commits locally. |
| `setup-hooks.sh` | One-time script to enable git hooks via `core.hooksPath`. |
