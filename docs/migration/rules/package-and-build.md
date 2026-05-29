# Package.json & build rules

Applies to every migration that touches `dependencies`, `devDependencies`, or `peerDependencies`. The agent MUST read this fragment in full before editing any `package.json`. The build-before-snapshot precondition at the bottom applies even when no deps change.

## Version pinning rules (CI-enforced)

- **npm package deps use caret prefix.** Picasso's syncpack rule requires caret-prefix for npm deps; an exact pin fails CI's "Static checks" job with `HighestSemverMismatch`. Example: `"@base-ui/react": "^1.4.1"`, NOT `"1.4.1"`.
- **Workspace package deps use exact version, no caret or tilde.** When adding a `@toptal/picasso-*` dependency, use the package's published version verbatim (e.g. `"2.0.4"`, not `"^2.0.4"`). Caret on a workspace dep fails CI with `LocalPackageMismatch`. Look up the version first:
  ```bash
  cat packages/<pkg>/package.json | jq -r .version
  ```
- **Drop the `react: < 19.0.0` upper bound** from `peerDependencies` if present. Replace with `react: ">=16.12.0"` (or the current Picasso floor). Picasso lifts the React 18-era cap as part of every Tier 0/1/2/3 migration.

## pnpm install — plain, no overrides

After editing any `package.json` deps:

```bash
pnpm install
git add pnpm-lock.yaml
```

**Run plain `pnpm install` from the repo root.** Trust Picasso's `pnpm-workspace.yaml` configuration as-is. **DO NOT pass `--config.link-workspace-packages=false`** (or any other workspace-link override) — overriding that flag rewrites every workspace package entry in the lockfile from compact `link:packages/X` references into expanded peer-suffix form, producing ~7,500 extra lines of unrelated lockfile diff and triggering spurious changeset-bot complaints.

## Lockfile diff size — STOP conditions

- **Typical migration**: `pnpm-lock.yaml` diff is **< 300 lines** for a single-component dep change. Common patterns: `+ '@base-ui/react': link:...` and `- '@mui/base': ...` plus a few transitive resolution changes.
- **STOP** if the diff is > 1000 lines OR you see `link:packages/X` lines being REPLACED with expanded peer-suffix form: the workspace-link representation has been broken. Reset and retry:
  ```bash
  git checkout origin/<base-branch> -- pnpm-lock.yaml
  pnpm install   # plain — NO flag
  ```

## Validate before commit

Missing lockfile update is a common reason CI's "Build packages" step fails on dep-bumping migrations.

```bash
git status
# pnpm-lock.yaml MUST appear as modified IFF you touched any
# dependencies / devDependencies / peerDependencies of any package.
```

If deps changed but the lockfile didn't: the resolution didn't move. Verify the new dep is already in the lockfile:

```bash
grep '@base-ui/react' pnpm-lock.yaml
```

## peer-vs-dev split for build-time deps

If a runtime dep is used at compile time (e.g. `withClasses` consuming `@toptal/picasso-tailwind-merge`), the package needs it as a **`devDependency`** for its own `tsc -b` resolution, not just as a `peerDependency` — peerDeps are only seen by *consumers* of the package, not by the package's own build.

## Build-before-snapshot precondition (STOP rule)

**Before running `pnpm davinci-qa unit -u` (or `pnpm jest -u`) to regenerate snapshots, verify the MIGRATING package builds cleanly:**

```bash
pnpm -F @toptal/picasso-<NAME> build:package
```

If this fails, do NOT proceed to snapshot regeneration. A failing `build:package` silently produces empty `<div>` snapshots that CI then diffs as `-1 / +120` against the prior baseline. The orchestrator's bootstrap step logs `continuing anyway (consumers stage may fail)` when its initial `pnpm build:package` fails — that log line is your cue to fix the migrating package's build BEFORE any snapshot work.

Snapshot regeneration is a one-way commit of whatever is on disk. Stale builds poison the snapshot. Always: build → snapshot → commit, in that order.

## tsconfig hygiene

When dropping a workspace dependency from `package.json` (e.g. removing the Backdrop dep from Drawer), remove the matching `references` entry from `tsconfig.json` in the same commit. Otherwise `tsc -b` fails the migration PR's "Build" job even though `pnpm install` succeeds. The two configurations must agree.
