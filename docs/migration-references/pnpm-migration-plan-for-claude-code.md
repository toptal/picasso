# pnpm Migration Plan for Claude Code (v2)

> **Source:** Confluence page 5890539523 (TECHX) — fetched 2026-04-30
> **Author:** Vedran Ivanac · **Last modified:** Apr 22, 2026
> **Web link:** https://toptal-core.atlassian.net/wiki/spaces/TECHX/pages/5890539523/

**Structured task plan for Claude Code to migrate a Toptal frontend project from Yarn 1 to pnpm 10.**

**Companion document:** [yarn-1-to-pnpm-10-migration-tutorial-v2](https://toptal-core.atlassian.net/wiki/spaces/TECHX/pages/5889392657) — contains detailed explanations, root causes, and code examples for every problem referenced here. Local copy: `./yarn-to-pnpm-migration-tutorial.md`.

> **What changed in v2:** This revision adds the three topics that were missing from the original plan but turned out to be required for a clean cutover:
>
> 1. A new **Phase 0** that makes the Tailwind 4 + Picasso migration an explicit prerequisite and gates the pnpm work on it.
> 2. A new **Task 1.12** that performs the Davinci package upgrade to the exact pnpm-compatible versions (with a copy-pasteable block for AI).
> 3. A new **Task 1.3.1** (folded into Task 1.3) that sets the `minimumReleaseAge` supply-chain safeguard in `pnpm-workspace.yaml`.
>
> Everything else from v1 still applies.

---

## How to Use This Document

This document is designed to be fed to Claude Code as a series of tasks. Each task follows this structure:

* **Goal:** What the task accomplishes
* **Discovery:** What to search/read before making changes
* **Actions:** What to change, with before/after patterns
* **Validation:** How to verify the changes are correct
* **Human checkpoint:** What needs human review before continuing

**Execution model:** Work through tasks sequentially within each phase. Some tasks within a phase can run in parallel (marked). Always run validation after each task -- do not batch.

**Parameterization:** This plan uses `{{PLACEHOLDER}}` values. Before starting, the human operator should fill in:

| Placeholder | Description | Example |
| --- | --- | --- |
| `{{PROJECT_ROOT}}` | Absolute path to the project | `/Users/dev/Projects/client-portal` |
| `{{PROJECT_NAME}}` | Human-readable project name | `Client Portal` |
| `{{PNPM_VERSION}}` | Target pnpm version | `10.32.1` |
| `{{NODE_VERSION}}` | Project's Node.js version (from `.nvmrc`) | `22.20.0` |
| `{{DAVINCI_ACTIONS_VERSION}}` | Target davinci-github-actions version | `v20.0.1` |
| `{{WORKSPACE_ROOT_PACKAGE}}` | PM-agnostic workspace root package | `@toptal/davinci-workspace-root` |
| `{{IS_MONOREPO}}` | `true` or `false` | `true` |
| `{{MIGRATION_BRANCH}}` | Branch name for the migration | `feat/pnpm-migration` |
| `{{MIN_RELEASE_AGE_MINUTES}}` | Minimum publish age for public deps, in minutes | `10080` (7 days) |
| `{{INTERNAL_SCOPES}}` | npm scopes to exclude from release-age gate | `["@toptal/*", "@topkit/*"]` |

---

## Pre-Flight: Project Assessment

> **Estimated time:** 15-30 minutes **Goal:** Understand the project's structure and generate a migration scope report before any changes.

### Task 0.1: Audit the Project

Run all discovery commands and produce a structured report.

**Discovery:**

```
# 1. Project structure
cat {{PROJECT_ROOT}}/package.json | jq '.workspaces'
cat {{PROJECT_ROOT}}/lerna.json 2>/dev/null
cat {{PROJECT_ROOT}}/.nvmrc
ls {{PROJECT_ROOT}}/.yarnrc 2>/dev/null
ls {{PROJECT_ROOT}}/.yarn/ 2>/dev/null

# 2. Count workspace packages
find {{PROJECT_ROOT}} -name "package.json" -not -path "*/node_modules/*" | wc -l

# 3. find-yarn-workspace-root usage (the #1 migration problem)
grep -r "find-yarn-workspace-root" {{PROJECT_ROOT}} --include="*.js" --include="*.mjs" --include="*.ts" --include="*.cjs" -l

# 4. yarn commands in scripts
grep -r '"yarn ' {{PROJECT_ROOT}} --include="package.json" -l

# 5. Resolutions count
cat {{PROJECT_ROOT}}/package.json | jq '.resolutions | length'

# 6. Patches
ls {{PROJECT_ROOT}}/patches/ 2>/dev/null

# 7. CI workflows
ls {{PROJECT_ROOT}}/.github/workflows/

# 8. Dockerfiles
find {{PROJECT_ROOT}} -name "Dockerfile*" -not -path "*/node_modules/*"

# 9. Hardcoded node_modules paths (potential breakage)
grep -rn "node_modules/" {{PROJECT_ROOT}} --include="*.js" --include="*.mjs" --include="*.ts" --include="*.cjs" --include="*.yml" --include="*.yaml" -l | grep -v node_modules | grep -v ".git"

# 10. npx usage
grep -rn "npx " {{PROJECT_ROOT}}/.github/ {{PROJECT_ROOT}}/package.json 2>/dev/null

# 11. --cwd flag usage
grep -rn "\-\-cwd" {{PROJECT_ROOT}} --include="*.json" --include="*.js" --include="*.mjs" -l | grep -v node_modules

# 12. npm_config_argv usage
grep -rn "npm_config_argv" {{PROJECT_ROOT}} --include="*.js" --include="*.mjs" --include="*.ts" -l | grep -v node_modules

# 13. fs.realpathSync usage in config files
grep -rn "realpathSync" {{PROJECT_ROOT}} --include="*.js" --include="*.mjs" --include="*.ts" -l | grep -v node_modules

# 14. Webpack configs
find {{PROJECT_ROOT}} -name "webpack.config.*" -not -path "*/node_modules/*"

# 15. Jest configs
find {{PROJECT_ROOT}} -name "jest*.config.*" -o -name "jest*.specs.*" | grep -v node_modules

# 16. Tailwind configs
find {{PROJECT_ROOT}} -name "tailwind*.config.*" -o -name "tailwind*builder*" | grep -v node_modules

# 17. Storybook config
ls {{PROJECT_ROOT}}/.storybook/main.* 2>/dev/null

# 18. ESLint config
ls {{PROJECT_ROOT}}/.eslintrc.* 2>/dev/null

# 19. Husky hooks
ls {{PROJECT_ROOT}}/.husky/ 2>/dev/null

# 20. lint-staged config
ls {{PROJECT_ROOT}}/.lintstagedrc.* 2>/dev/null

# 21. Current Tailwind version (decides if Phase 0 is needed)
cat {{PROJECT_ROOT}}/package.json | jq '.devDependencies.tailwindcss, .dependencies.tailwindcss'

# 22. Current Davinci versions (baseline for Task 1.12)
cat {{PROJECT_ROOT}}/package.json | jq '.devDependencies | with_entries(select(.key | startswith("@toptal/davinci")))'
```

**Output:** Write a structured summary to `{{PROJECT_ROOT}}/docs/pnpm-migration-audit.md` with:

* Project type: SPA or monorepo
* Package count
* Count of each category above
* List of files needing changes per category
* **Current Tailwind major version** (3 or 4) -- determines whether Phase 0 is required
* **Current Davinci package versions** -- baseline for the Task 1.12 upgrade
* Estimated complexity: S/M/L/XL

**Human checkpoint:** Review the audit report. Confirm the scope looks correct. Flag any project-specific concerns. Decide explicitly whether Phase 0 (Tailwind 4 + Picasso) is required for this project.

---

## Phase 0: Prerequisites (Tailwind 4 + Picasso)

> **Estimated time:** 1-2 weeks of wall-clock time (mostly CI + visual review). **Goal:** Land Tailwind 4, Picasso 4 Tailwind packages, and the minimum Davinci versions that support Tailwind 4 -- on `master` -- before starting any pnpm work. **When to skip:** Only if the audit in Task 0.1 shows `tailwindcss@4.x` already in use **and** the Davinci packages are already at the "Phase 0 floor" column in Task 1.12. In that case mark Phase 0 as done and proceed to Phase 1.

**Why this phase is a hard prerequisite.** Combining Tailwind 4 and the pnpm cutover into one branch was tried on Staff Portal and had to be backed out -- both migrations touch the same build configs (PostCSS, webpack, `.storybook/main.js`, Picasso styling), and mixing them makes every failure ambiguous. Ship Tailwind 4 first, observe it on `master`, then start Phase 1.

### Task 0.2: Create Tailwind 4 Branch

```
cd {{PROJECT_ROOT}}
git checkout master
git pull
git checkout -b feat/upgrade-tailwind-4
```

### Task 0.3: Bump Tailwind and Picasso Packages

**Action:** Update `{{PROJECT_ROOT}}/package.json` to these exact versions. Keep `yarn.lock` in this phase -- do NOT migrate the package manager yet.

```
{
  "dependencies": {
    "@toptal/base-tailwind": "2.0.0",
    "@toptal/picasso-tailwind": "4.0.0",
    "@toptal/picasso-tailwind-merge": "2.0.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.1",
    "tailwindcss": "4.2.1"
  }
}
```

### Task 0.4: Bump Minimum Davinci Versions Required by Tailwind 4

```
{
  "devDependencies": {
    "@toptal/davinci-engine": "13.0.0",
    "@toptal/davinci-storybook": "6.0.0",
    "@toptal/davinci-qa": "19.0.0"
  }
}
```

All other Davinci packages stay on their current Tailwind-3-era versions in this phase. They get bumped again in Phase 1 (Task 1.12) as part of the pnpm cutover.

### Task 0.5: Switch to the Tailwind 4 PostCSS Plugin

Tailwind 4 uses a dedicated `@tailwindcss/postcss` plugin and auto-discovers `tailwind.config.js` (no explicit `config: <path>` option).

**Action A — `.storybook/main.js` (Vite-based Storybook):**

```
// BEFORE
const tailwindcss = require('tailwindcss')
plugins: [
  tailwindcss({ config: path.resolve(__dirname, '../tailwind.config.js') }),
  autoprefixer,
]

// AFTER
const tailwindcss = require('@tailwindcss/postcss')
plugins: [
  tailwindcss,     // bare reference, no config-path argument
  autoprefixer,
]
```

**Action B — `hosts/<app>/webpack.config.js`:**

If the webpack config previously injected a hand-rolled `postcss-loader` block that pointed at `tailwindcss` with an explicit `config: require.resolve('../../tailwind.config.js')`, delete that block entirely. Tailwind 4 is wired through the project's top-level PostCSS config. (A normalized PostCSS block is reintroduced in Phase 2 Task 2.6 for pnpm's plugin-resolution quirks -- do not add that yet.)

### Task 0.6: Clean Up Patches Obsoleted by Picasso 4

* Delete `patches/@lexical+selection+0.11.2.patch` if present -- the issue it works around is fixed in the Picasso 4 Tailwind packages.
* If you are on `@toptal/davinci-qa@18.4.0` briefly during this phase while waiting for `19.0.0`, a tiny `patches/@toptal+davinci-qa+18.4.0.patch` may be added temporarily. Delete it once Task 0.4 lands `19.0.0`.

### Task 0.7: Stabilize Visual and Cypress Regressions

Budget real time for this -- it is where the bulk of Phase 0 hours go.

* Re-capture Jest snapshots for any component that renders Picasso.
* Re-capture Happo / visual snapshots for Picasso-heavy screens (the Staff Portal migration had to update batch talent, sourcing flow, and billing widgets).
* Harden, skip, or re-enable selectively any Cypress specs that become flaky under `davinci-qa@19`. Record which specs were skipped and why, so they can be unskipped later.

### Task 0.8: Phase 0 Exit Criteria (Human Checkpoint)

Do not start Phase 1 until all of these are true:

* `master` contains Tailwind 4, Picasso 4 Tailwind packages, and the minimum Davinci bumps from Task 0.4.
* CI has been green on `master` for at least one full day.
* Production has been deployed with the Tailwind 4 build and is stable (at least a few hours of uptime with no visual regression reports).
* No one is running `yarn install` or `yarn build` against a pre-Tailwind-4 checkout anymore.

**If any of these are false, stop and finish Phase 0 first.**

---

## Phase 1: Foundation Setup

> **Estimated time:** 1-2 hours **Goal:** Set up pnpm configuration files, bump Davinci, convert lockfile, clean up Yarn artifacts. **Prerequisite:** Phase 0 is merged and stable on `master`. Davinci packages published with pnpm support. davinci-github-actions v20 released.

### Task 1.1: Create Migration Branch

```
cd {{PROJECT_ROOT}}
git checkout master
git pull
git checkout -b {{MIGRATION_BRANCH}}
```

### Task 1.2: Create `.npmrc`

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}

node-linker=hoisted
strict-peer-dependencies=false
auto-install-peers=true
link-workspace-packages=true
resolve-peers-from-workspace-root=true
```

> If the project uses GAR (Google Artifact Registry), add the GAR registry lines as in v1 of this plan.

### Task 1.3: Create `pnpm-workspace.yaml` (with `minimumReleaseAge`)

```
packages:
  # Copy each glob from package.json#workspaces here
  - 'packages/*'
  # ... add all workspace globs

# Supply-chain safety: refuse to install any public package published less
# than MIN_RELEASE_AGE minutes ago. Internal scopes are excluded so
# in-house packages can still be consumed immediately.
# 7 days = 60 * 24 * 7 = 10080 minutes
minimumReleaseAge: {{MIN_RELEASE_AGE_MINUTES}}
minimumReleaseAgeExclude:
  - '@toptal/*'
  - '@topkit/*'
```

> For SPAs (`{{IS_MONOREPO}}` = false): Create the file with `packages: []` but keep the `minimumReleaseAge` block.

**What this defends against.** Public npm supply-chain attacks typically follow the pattern "compromise a maintainer account, publish a malicious version, wait for CI to auto-pull." A modest age window (3-14 days) reserves time for the community to catch and yank bad packages before they reach your CI. The internal-scope excludes are intentional -- your own teams publish too frequently for an age gate to be tolerable, and the attack vector (public registry) doesn't apply to them.

**Expected side effect:** The first week after enabling this, any brand-new public dependency you try to add will fail with `ERR_PNPM_MIN_RELEASE_AGE_NOT_MET` until it ages in. Wait, pin to an older version, or add a targeted exclude (e.g. `- 'some-package'`) if you've vetted the package and need it now.

### Task 1.4: Update `lerna.json`

If `lerna.json` exists, change `"npmClient": "yarn"` to `"npmClient": "pnpm"`.

### Task 1.5: Convert `resolutions` to `pnpm.overrides`

| Yarn 1 Pattern | pnpm Pattern |
| --- | --- |
| `"pkg": "version"` | `"pkg": "version"` (same for global) |
| `"**/scope/**/pkg": "ver"` | `"pkg": "ver"` |
| `"parent/**/pkg": "ver"` | `"parent>pkg": "ver"` |
| `"parent/pkg": "ver"` | `"parent>pkg": "ver"` |

Add to `package.json`:

```
{
  "pnpm": {
    "overrides": {
      // converted entries here
    }
  }
}
```

Then **remove** the `"resolutions"` field entirely.

### Task 1.6: Migrate Patches to pnpm Native Format

1. Add `pnpm.patchedDependencies` to `package.json` mapping each patch file:

    ```
    {
      "pnpm": {
        "patchedDependencies": {
          "package-name@version": "patches/package-name+version.patch"
        }
      }
    }
    ```
2. Remove `patch-package` from devDependencies
3. Remove `postinstall` script that runs `patch-package`
4. Remove any `patch-package-silently` script

> **Note:** Patch file naming convention uses `+` separator which is compatible between `patch-package` and pnpm. But verify each patch applies cleanly later during `pnpm install`.

### Task 1.7: Replace `find-yarn-workspace-root`

For each file found:

```
// BEFORE
const findWorkspaceRoot = require('find-yarn-workspace-root')
// AFTER
const findWorkspaceRoot = require('{{WORKSPACE_ROOT_PACKAGE}}')
```

For each package that had `find-yarn-workspace-root` as a dependency, update its `package.json`: remove `find-yarn-workspace-root`, add `{{WORKSPACE_ROOT_PACKAGE}}`.

### Task 1.8: Replace `yarn` Commands in Scripts

In every `package.json`, replace `yarn` with `pnpm` in all scripts:

| Yarn 1 | pnpm |
| --- | --- |
| `yarn <script>` | `pnpm <script>` |
| `yarn run <script>` | `pnpm run <script>` |
| `yarn lerna run <cmd>` | `pnpm lerna run <cmd>` |
| `yarn --cwd <dir> <cmd>` | `pnpm -C <dir> <cmd>` |
| `yarn add --dev -W` | `pnpm add --save-dev -w` |

**Remove these scripts entirely:**

* `prepublish` containing `yarn-deduplicate`
* `postinstall` containing `patch-package`
* Any `patch-package-silently` script

### Task 1.9: Update Husky Hooks & lint-staged

Replace all `yarn` with `pnpm` in `.husky/pre-commit`, `.husky/pre-push`, `.lintstagedrc.js`/`.lintstagedrc.json`.

### Task 1.10: Convert Lockfile & Clean Up Yarn

> **Reminder:** Task 1.12 must have been run first so the Davinci bumps are reflected in the generated `pnpm-lock.yaml`. If you haven't done Task 1.12 yet, jump there now and come back.

```
cd {{PROJECT_ROOT}}

corepack enable
corepack prepare pnpm@{{PNPM_VERSION}} --activate

pnpm import
pnpm install --frozen-lockfile
```

If `pnpm install` succeeds:

```
rm -rf .yarnrc .yarn/ yarn.lock
# Remove yarn-deduplicate from devDependencies if present
```

If `pnpm install` fails, common failures:

* Peer dependency conflicts → add to `pnpm.peerDependencyRules.allowedVersions`
* Patch application failure → regenerate patch with `pnpm patch <pkg>` then `pnpm patch-commit`
* Missing workspace packages → check `pnpm-workspace.yaml` globs
* `ERR_PNPM_MIN_RELEASE_AGE_NOT_MET` → a public package you want is younger than `minimumReleaseAge`; wait, pin an older version, or add it to `minimumReleaseAgeExclude`

### Task 1.11: Configure Build Script Permissions

```
cd {{PROJECT_ROOT}}
pnpm approve-builds --all
```

Review the output. Approve only packages that genuinely need lifecycle scripts (husky, esbuild, @swc/core, cypress, etc.).

### Task 1.12: Upgrade Davinci Packages to pnpm-Compatible Versions

**This is a required task, not cleanup.** Davinci below these versions either uses `find-yarn-workspace-root` internally, ships codemods that assume flat `node_modules`, or has peer-dependency metadata that pnpm's stricter resolver rejects. All of these packages are released as a coordinated set -- mixing a pnpm version of one with a pre-pnpm version of another produces confusing peer-dep errors on install.

| Package | Phase 0 floor (Tailwind 4) | pnpm-compatible target |
| --- | --- | --- |
| `@toptal/davinci-engine` | `13.0.0` | `14.0.0` |
| `@toptal/davinci-ci` | `7.4.7` | `8.0.0` |
| `@toptal/davinci-monorepo` | `12.1.0` | `13.0.0` |
| `@toptal/davinci-qa` | `19.0.0` | `19.0.0` |
| `@toptal/davinci-storybook` | `6.0.0` | `7.0.0` |
| `@toptal/davinci-storybook-addons` | `4.0.1` | `5.0.0` |
| `@toptal/davinci-storybook-theme` | `3.0.1` | `4.0.0` |
| `@toptal/davinci-syntax` | `23.1.5` | `24.0.0` |
| `@toptal/davinci-workspace-root` | `1.0.1` | `2.0.0` |

**Copy-pasteable block for the root `package.json#devDependencies`:**

```
{
  "devDependencies": {
    "@toptal/davinci-ci": "8.0.0",
    "@toptal/davinci-engine": "14.0.0",
    "@toptal/davinci-monorepo": "13.0.0",
    "@toptal/davinci-qa": "19.0.0",
    "@toptal/davinci-storybook": "7.0.0",
    "@toptal/davinci-storybook-addons": "5.0.0",
    "@toptal/davinci-storybook-theme": "4.0.0",
    "@toptal/davinci-syntax": "24.0.0",
    "@toptal/davinci-workspace-root": "2.0.0"
  }
}
```

**Cleanup sub-steps:**

1. Delete any `patches/@toptal+davinci-engine+12.*.patch` and `patches/@toptal+davinci-qa+18.*.patch` -- the issues they worked around are fixed upstream.
2. Remove every `pnpm.overrides` entry that pins an `alpha-feature-pnpm-migration-*` prerelease. Those were used during development while the official majors were in review; now that the tagged versions above are published, the alphas are no longer needed.
3. After Task 1.12 completes, run Task 1.10 (`pnpm import` + `pnpm install`) so the new v14/v8/v7 metadata flows through to every transitive consumer.

**GitHub Actions coupling:** These Davinci versions are the ones that work against `toptal/davinci-github-actions@v20.0.1` (`{{DAVINCI_ACTIONS_VERSION}}`). Do the `package.json` bump in Task 1.12 and the action-ref bump in Task 3.1 in the **same PR** so CI never runs v19 actions against v20-era packages.

---

## Phase 2: Fix pnpm-Specific Build/Test Issues

> **Estimated time:** 2-6 hours (depends on project complexity) **Goal:** Fix all patterns that break under pnpm's symlinked node_modules. **Reference:** Tutorial Problems 2-19 for detailed explanations.

### Task 2.1: Fix Webpack Configuration

**A. Add snapshot configuration** (prevents RangeError from .pnpm symlinks):

```
const PROJECT_ROOT = path.resolve(__dirname, '../..')

config.snapshot = {
  ...(config.snapshot || {}),
  managedPaths: [path.resolve(PROJECT_ROOT, 'node_modules')],
  immutablePaths: [path.resolve(PROJECT_ROOT, 'node_modules/.pnpm')],
}
```

**B. Add watch options** (prevents dev server flooding):

```
config.watchOptions = {
  ...(config.watchOptions || {}),
  ignored: /[\\/](node_modules[\\/]\.pnpm|node_modules[\\/]\.cache|coverage|\.nyc_output)[\\/]/,
}
```

**C. Fix chunk splitting regex:**

```
// BEFORE
test: /[\\/]node_modules[\\/]@scope[\\/]pkg[\\/]/

// AFTER -- matches both flat and pnpm nested structure
test: /[\\/]node_modules[\\/](?:\.pnpm[\\/].+[\\/]node_modules[\\/])?@scope[\\/]pkg[\\/]/
```

**D. Fix `require.resolve` for ESM subpath exports** (like hastscript):

```
config.resolve.alias = {
  ...config.resolve.alias,
  // 'hastscript/html$': require.resolve('hastscript/html.js'),
}
```

### Task 2.2: Fix Jest Configuration

**A. Update `transformIgnorePatterns` to handle .pnpm paths:**

```
const transformablePackages = '@toptal|@topkit|d3[^/]*|...'
const transformIgnorePatterns = [
  `^(?:.*?/)?node_modules/(?!((?:\\.pnpm/[^/]+/node_modules/)?(?:${transformablePackages})(?:/|$)))`,
]
```

**B. Add self-reference mapping** (for monorepos where packages mock themselves):

```
const getSelfMapping = () => {
  try {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
    return pkg.name ? { [`^${pkg.name}$`]: `${process.cwd()}/src` } : {}
  } catch {
    return {}
  }
}

moduleNameMapper: {
  ...existingMappers,
  '^lodash-es$': 'lodash',
  '^lodash-es/(.*)$': 'lodash/$1',
  ...getSelfMapping(),
}
```

### Task 2.3: Fix Tailwind Configuration

**A. Disable symlink following** in glob patterns:

```
const matches = globbySync(includePatterns, {
  followSymbolicLinks: false,  // CRITICAL
})
```

**B. Resolve vendor package paths dynamically** instead of hardcoding (see full helper in source).

### Task 2.4: Fix ESLint Configuration

```
// BEFORE
extends: ['./node_modules/@toptal/davinci-syntax/src/configs/.eslintrc.cjs']

// AFTER
extends: [require.resolve('@toptal/davinci-syntax/src/configs/.eslintrc.cjs')]
```

### Task 2.5: Fix Storybook Configuration

**A. Create explicit addon resolution** through parent packages.
**B. Normalize Vite aliases to array format** (if using @storybook/builder-vite).

### Task 2.6: Fix PostCSS / TailwindCSS Plugin Configuration

```
const PROJECT_ROOT = path.resolve(__dirname, '../..')

const normalizedPostCssOptions = {
  config: false,
  plugins: {
    '@tailwindcss/postcss': {
      base: PROJECT_ROOT,
    },
    autoprefixer: {},
  },
}
```

### Task 2.7: Fix Script-Specific Patterns

* `npm_config_argv` → Use `process.argv.slice(2)` instead
* `--cwd` flag → Replace with `--dir` or `-C`
* `fs.realpathSync(process.cwd())` → Replace with `process.cwd()`

---

## Phase 3: CI/CD Pipeline Migration

### Task 3.1: Update GitHub Actions Workflow Files

**A. Replace action references:**

```
# BEFORE
- uses: toptal/davinci-github-actions/yarn-install@v19.0.0
# AFTER
- uses: toptal/davinci-github-actions/pnpm-install@{{DAVINCI_ACTIONS_VERSION}}
```

**B. Replace all `yarn` commands** with `pnpm`.

**C. Replace `npx` with `pnpm dlx` or `pnpm exec`.**

**D. Update cache keys:** `hashFiles('yarn.lock')` → `hashFiles('pnpm-lock.yaml')`.

**E. Scope glob patterns** to avoid .pnpm traversal:

```
# BEFORE
- run: npx istanbul-merge --out combined.json './**/coverage/coverage-final.json'
# AFTER
- run: pnpm dlx istanbul-merge --out combined.json './{hosts,libs,namespaces,packages}/**/coverage/coverage-final.json'
```

**F. Remove Cypress manual install step** (the pnpm-install action handles it).

**G. Update `actions/setup-node` to v6** if needed.

**Reminder:** Bump action refs to `{{DAVINCI_ACTIONS_VERSION}}` (`v20.0.1`) in the same PR as Task 1.12 so CI never pairs v19 actions with v20-era packages.

### Task 3.2: Update davinci-workflows References

The exact pnpm version tag for davinci-workflows must be confirmed with the CI/Infra team.

---

## Phase 4: Docker Migration

### Task 4.1: Update Dockerfiles

**A. Add pnpm setup via corepack:**

```
ARG PNPM_VERSION={{PNPM_VERSION}}
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
```

**B. Update file copies:**

```
# BEFORE
COPY package.json yarn.lock ./

# AFTER (monorepo)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc lerna.json ./
```

**C. For monorepos, copy workspace directories and prune to manifests:**

```
COPY hosts hosts
COPY namespaces namespaces
COPY libs libs
COPY monorepo-helpers monorepo-helpers

RUN find hosts \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find namespaces \! -name "package.json" -mindepth 4 -maxdepth 4 -print | xargs rm -rf
RUN find libs \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
```

**D. Update install and build commands:**

```
# BEFORE
RUN yarn install --frozen-lockfile --network-timeout 120000
RUN yarn build

# AFTER
RUN pnpm install --frozen-lockfile
RUN pnpm build
```

**E. Remove dynamic `.npmrc` generation** (the `.npmrc` from the repo handles authentication via `${NPM_TOKEN}` env var).

**F. Update `.dockerignore`** if needed (e.g., add `storybook-static-pnpm/`).

---

## Phase 5: Validation & Final Checks

### Task 5.1: Run Full Validation Suite

```
cd {{PROJECT_ROOT}}

rm -rf node_modules
pnpm install --frozen-lockfile
pnpm build
pnpm lint
pnpm typecheck
pnpm test:unit:ci
pnpm test:integration:ci
pnpm build-storybook
docker build .
```

### Task 5.2: Check for Remaining Yarn References

```
grep -rn "yarn" {{PROJECT_ROOT}} \
  --include="*.js" --include="*.mjs" --include="*.ts" --include="*.cjs" \
  --include="*.json" --include="*.yml" --include="*.yaml" \
  --include="*.sh" --include="Dockerfile*" \
  | grep -v node_modules | grep -v ".git/" | grep -v "pnpm-lock.yaml" \
  | grep -v "CHANGELOG" | grep -v "migration-tutorial" \
  | grep -v "migration-audit" | grep -v "migration-claude-code"
```

### Task 5.3: Update Project Documentation

Update any documentation (AGENTS.md, README, CONTRIBUTING, etc.) that references yarn.

### Task 5.4: Generate Migration Summary

Write a summary to `{{PROJECT_ROOT}}/docs/pnpm-migration-summary.md` (template provided in source).

---

## Phase 6: PR Creation

### Task 6.1: Commit and Create PR

```
git add -A
git commit -m "[TICKET-ID] Migrate from Yarn 1 to pnpm 10

- Replace yarn with pnpm across all scripts, CI, and Docker
- Convert resolutions to pnpm.overrides
- Migrate patches to pnpm native format
- Upgrade Davinci packages to pnpm-compatible majors
- Add minimumReleaseAge supply-chain safeguard
- Fix webpack/jest/tailwind/storybook for pnpm symlinks
- Update CI workflows to davinci-github-actions v20
- Update Dockerfiles with corepack + pnpm

Co-Authored-By: Claude Code <noreply@anthropic.com>"

git push -u origin {{MIGRATION_BRANCH}}
```

---

## Troubleshooting Quick Reference

| Failure | Phase | What to Check |
| --- | --- | --- |
| `pnpm import` fails | 1.10 | Check `resolutions` are fully converted to `overrides` |
| `pnpm install` peer dep error | 1.10 | Add to `pnpm.peerDependencyRules.allowedVersions` |
| Patch doesn't apply | 1.10 | Regenerate with `pnpm patch <pkg>` + `pnpm patch-commit` |
| `ERR_PNPM_MIN_RELEASE_AGE_NOT_MET` | 1.10 | Dep is younger than `minimumReleaseAge`; wait, pin older, or add to exclude list (1.3) |
| Davinci peer-dep confusion on install | 1.10 | Revisit Task 1.12 -- all Davinci packages must be on the target column |
| Build fails only inside Storybook | 2.5 | Addon resolution -- create explicit aliases via parent package |
| Webpack RangeError | 2.1 | Add `config.snapshot.managedPaths` |
| Jest SyntaxError on ESM pkg | 2.2 | Update `transformIgnorePatterns` for `.pnpm` |
| Jest can't mock own package | 2.2 | Add `getSelfMapping()` |
| Missing Tailwind classes | 2.3 | Disable `followSymbolicLinks`, resolve vendor paths dynamically |
| Tailwind classes missing only in Storybook | 0.5/2.5 | Confirm `require('@tailwindcss/postcss')` (not `require('tailwindcss')`) in Storybook |
| ESLint can't find config | 2.4 | Use `require.resolve()` instead of hardcoded path |
| Storybook addon not found | 2.5 | Create explicit aliases via parent package |
| CI glob OOM/slow | 3.1 | Scope globs: `./{hosts,libs}/**/...` |
| Docker install fails | 4.1 | Copy all workspace `package.json` files + `.npmrc` |
| `MODULE_NOT_FOUND` for transitive dep | Any | Add explicit dependency, or use `require.resolve` with `paths` |
| Bundle size increased >5% | 5.1 | Check chunk splitting regex, `resolve-peers-from-workspace-root`, lodash-es mapping |

---

## Appendix B: Consolidated Version Matrix

| Package | Pre-migration (Tailwind 3) | Phase 0 floor (Tailwind 4) | pnpm-compatible target (Phase 1) |
| --- | --- | --- | --- |
| `@toptal/davinci-engine` | `12.2.3` | `13.0.0` | `14.0.0` |
| `@toptal/davinci-ci` | `7.4.7` | `7.4.7` | `8.0.0` |
| `@toptal/davinci-monorepo` | `12.1.0` | `12.1.0` | `13.0.0` |
| `@toptal/davinci-qa` | `18.4.0` | `19.0.0` | `19.0.0` |
| `@toptal/davinci-storybook` | `5.2.1` | `6.0.0` | `7.0.0` |
| `@toptal/davinci-storybook-addons` | `4.0.1` | `4.0.1` | `5.0.0` |
| `@toptal/davinci-storybook-theme` | `3.0.1` | `3.0.1` | `4.0.0` |
| `@toptal/davinci-syntax` | `23.1.5` | `23.1.5` | `24.0.0` |
| `@toptal/davinci-workspace-root` | `1.0.1` | `1.0.1` | `2.0.0` |
| `tailwindcss` | `3.4.10` | `4.2.1` | `4.2.1` |
| `@tailwindcss/postcss` | _not installed_ | `^4.2.1` | `^4.2.1` |
| `@toptal/base-tailwind` | `1.0.0` | `2.0.0` | `2.0.0` |
| `@toptal/picasso-tailwind` | `3.0.0` | `4.0.0` | `4.0.0` |
| `@toptal/picasso-tailwind-merge` | `2.0.3` | `2.0.4` | `2.0.4` |
| `toptal/davinci-github-actions` | `@v19.x` | `@v19.x` | `@v20.0.1` |
| `minimumReleaseAge` (minutes) | _n/a_ | _n/a_ | `10080` (7 days) |
