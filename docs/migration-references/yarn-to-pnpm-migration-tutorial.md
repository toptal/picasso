# Yarn 1 to pnpm Migration Tutorial (v2)

**Battle-tested playbook from the Staff Portal migration (58 workspace packages, 387 files changed)**

**Author:** Vedran Ivanac | **Date:** April 2026 | **pnpm version:** 10.x

> **What changed in v2:** This revision adds three topics that were missing from the original playbook but turned out to be required for a clean Staff Portal cutover:
>
> 1. An explicit **Tailwind 4 + Picasso prerequisite phase** that must land before the pnpm work starts.
> 2. A dedicated **Davinci package upgrade matrix** with the exact target versions each Davinci package has to reach for pnpm compatibility.
> 3. A `minimumReleaseAge` **supply-chain safeguard** in `pnpm-workspace.yaml` that is strongly recommended alongside the migration.
> 
> Everything else from v1 still applies. The new material lives in sections 0, 3.8, and 12.6.

---

---

## 0. Phase 0: Prerequisites (Tailwind 4 + Picasso)

**Do not start the pnpm migration until this phase is fully merged and shipped to** `master`**.** The Staff Portal team tried to collapse Tailwind 4 and pnpm into a single branch and had to back out -- the two migrations touch the same set of build configs (PostCSS, webpack, Storybook Vite config, Picasso styling) and interleaving them makes every failure ambiguous. Keep them in separate PRs, in this order:

1. **Tailwind 3 -> Tailwind 4** (+ Picasso family bump to the Tailwind-4 line)
2. **Minimum Davinci bump** required for Tailwind 4 support
3. **Merge to** `master` **and observe for at least a few days**
4. **Then start the pnpm migration** (Section 3 onward)

The work in this section was captured on the `upgrade-tailwind-4` branch. The numbers below come from that branch's diff against `master`.

### 0.1 Package Version Matrix for Tailwind 4

| Package | Before (Tailwind 3) | After (Tailwind 4) | Notes |
| --- | --- | --- | --- |
| `tailwindcss` | `3.4.10` | `4.2.1` | Major upgrade -- new config format, new scanner |
| `@tailwindcss/postcss` | _not installed_ | `^4.2.1` | **New devDependency** -- Tailwind 4 PostCSS plugin |
| `@toptal/base-tailwind` | `1.0.0` | `2.0.0` | Picasso's shared Tailwind base, Tailwind-4 line |
| `@toptal/picasso-tailwind` | `3.0.0` | `4.0.0` | Picasso Tailwind utilities, Tailwind-4 line |
| `@toptal/picasso-tailwind-merge` | `2.0.3` | `2.0.4` | Bugfix bump |
| `@toptal/davinci-engine` | `12.2.3` | `13.0.0` | Minimum version that ships Tailwind-4 support |
| `@toptal/davinci-storybook` | `5.2.1` | `6.0.0` | Paired major with `davinci-engine@13` |
| `@toptal/davinci-qa` | `18.4.0` | `19.0.0` | Needed to unblock Cypress runs on Tailwind 4 |

All other Davinci packages (`davinci-ci`, `davinci-syntax`, `davinci-monorepo`, `davinci-storybook-addons`, `davinci-storybook-theme`, `davinci-workspace-root`) stay on their Tailwind-3-era versions in this phase. They get bumped in Phase 1 as part of the pnpm cutover -- see Section 3.8.

### 0.2 Config Changes Required for Tailwind 4

Tailwind 4 replaces the `tailwindcss` PostCSS plugin with a dedicated `@tailwindcss/postcss` plugin, and no longer needs an explicit `config: <path>` option (v4 auto-discovers `tailwind.config.js`). This simplifies two places in Staff Portal:

`hosts/staff-portal/webpack.config.js` **-- remove the explicit PostCSS block**

Tailwind 4 is wired through the project's top-level PostCSS config, so the hand-rolled postcss-loader block that existed for Tailwind 3 can go:

```
- const cssRule = config.module.rules[0].oneOf.find(rule =>
-   rule.test.toString().includes('.css')
- )
-
- cssRule.use.push({
-   loader: 'postcss-loader',
-   options: {
-     postcssOptions: {
-       config: false,
-       plugins: {
-         tailwindcss: {
-           config: require.resolve('../../tailwind.config.js'),
-         },
-         autoprefixer: {},
-       },
-     },
-   },
- })
```

(Phase 3, Problem 19, reintroduces a normalized PostCSS block -- but that's specifically for pnpm's plugin-resolution quirks, not Tailwind itself.)

`.storybook/main.js` **-- switch the Vite PostCSS plugin**

```
- const tailwindcss = require('tailwindcss')
+ const tailwindcss = require('@tailwindcss/postcss')
  const autoprefixer = require('autoprefixer')

  viteConfig.css = {
    ...(viteConfig.css || {}),
    postcss: {
      ...(viteConfig.css?.postcss || {}),
      plugins: [
        ...(viteConfig.css?.postcss?.plugins || []),
-       tailwindcss({
-         config: path.resolve(__dirname, '../tailwind.config.js'),
-       }),
+       tailwindcss,
        autoprefixer,
      ],
    },
  }
```

Note that you call the plugin as a bare reference now -- no config-path argument, no function invocation.

### 0.3 Fallout to Expect

The Staff Portal `upgrade-tailwind-4` branch had to fix these classes of regressions before it was mergeable. Budget for them:

* **Visual regressions in Picasso-heavy screens.** Picasso 4's Tailwind utility output differs subtly. Batch talent, sourcing flow, and billing widgets all needed snapshot updates.
* **Cypress stability.** Several specs became flaky under the new davinci-qa@19 and had to be hardened, skipped, or re-enabled selectively. Expect to spend a meaningful chunk of this phase on Cypress, not CSS.
* **Jest snapshot churn** for any component that renders Picasso.
* **Patch cleanup.** The `@lexical/selection` patch that Tailwind-3 Picasso needed is no longer required; delete it. A small `@toptal/davinci-qa+18.4.0.patch` is temporarily added before davinci-qa bumps to 19; remove it when the bump lands.

### 0.4 Phase 0 Exit Criteria

Before moving to Section 3 (the actual pnpm migration) you should be able to say yes to all of these:

* `master` contains Tailwind 4, Picasso 4 Tailwind packages, and the minimum Davinci bumps above.
* CI has been green on `master` for at least one full day.
* No one is actively running `yarn install` or `yarn build` against a pre-Tailwind-4 checkout.
* Production Staff Portal has been deployed with the Tailwind 4 build and is stable.

**If any of these are no, stop and finish Phase 0 first.**

---

## 1. Why pnpm

| Metric | Yarn 1 | pnpm 10 |
| --- | --- | --- |
| Install speed (cold) | Baseline | 2-3x faster |
| Disk usage | Full copy per project | Content-addressable store (shared) |
| Dependency isolation | Flat hoist (phantom deps) | Strict by default |
| Lockfile manipulation for GAR | Complex (sed on yarn.lock) | Not needed (.npmrc scoped registries) |
| `--frozen-lockfile` in workspaces | Buggy (needs checksum workaround) | Works correctly |
| Native patching | Needs `patch-package` | Built-in `pnpm patch` |
| Deduplication | Needs `yarn-deduplicate` | Built-in `pnpm dedupe` |

**The core tradeoff:** pnpm is faster and more correct, but its strict `node_modules` structure (symlinks + `.pnpm` virtual store) breaks patterns that assumed Yarn 1's flat layout. This tutorial documents every breakage we found and how to fix it.

---

## 2. Pre-Migration Audit Checklist

Before writing any code, audit your project. The scale of these numbers determines your migration effort.

| What to Audit | Command / Method | Staff Portal Numbers |
| --- | --- | --- |
| Workspace packages | Count entries in `package.json#workspaces` | 58 packages |
| `find-yarn-workspace-root` usage | `grep -r "find-yarn-workspace-root" --include="*.js" --include="*.mjs" --include="*.ts"` | 16+ files |
| `yarn` commands in scripts | `grep -r '"yarn ' package.json */package.json` | 40+ references |
| `resolutions` entries | Count `package.json#resolutions` keys | 25 entries |
| Patches (`patch-package`) | `ls patches/` | 11 patches (1.8 MB total) |
| CI workflows | `ls .github/workflows/` | 19 workflows |
| Dockerfiles | `find . -name "Dockerfile*"` | 5 Dockerfiles |
| Hardcoded `node_modules` paths | `grep -r "node_modules/" --include="*.js" --include="*.mjs" --include="*.ts" --include="*.yml"` | 10+ files |
| `npx` calls | `grep -r "npx " .github/ package.json` | 3 calls |
| `--cwd` flag usage | `grep -r "\-\-cwd" --include="*.json" --include="*.js"` | 1 file |
| `npm_config_argv` usage | `grep -r "npm_config_argv"` | 1 file |

**Blocking dependencies check:** If your app depends on a framework (like Davinci) that uses `find-yarn-workspace-root` internally, that framework must be migrated and republished _before_ your app can migrate. Published npm packages that are pure libraries (Picasso, Topkit) do NOT need migration -- only build tools that execute at runtime inside your workspace.

---

## 3. Phase 1: Foundation Setup

### 3.1 Create `.npmrc`

This is the most critical configuration file. Get this wrong and nothing else works.

```
# .npmrc
//registry.npmjs.org/:_authToken=${NPM_TOKEN}

node-linker=hoisted
strict-peer-dependencies=false
auto-install-peers=true
link-workspace-packages=true
resolve-peers-from-workspace-root=true
```

**What each setting does:**

| Setting | Why |
| --- | --- |
| `node-linker=hoisted` | Maintains flat `node_modules` for compatibility. Without this, pnpm uses its content-addressable store which breaks many tools. **Start with this, remove later when confident.** |
| `strict-peer-dependencies=false` | Yarn 1 silently ignored peer dep mismatches. pnpm fails by default. Set to `false` during migration, tighten later. |
| `auto-install-peers=true` | Automatically installs peer dependencies (Yarn 1 behavior). |
| `link-workspace-packages=true` | Links internal workspace packages instead of fetching from registry. |
| `resolve-peers-from-workspace-root=true` | Resolves peer deps from root, preventing duplicate React/etc. in bundles. |

### 3.2 Create `pnpm-workspace.yaml`

Map your existing `package.json#workspaces` globs, and add the supply-chain safeguard documented in Section 3.9:

```
# pnpm-workspace.yaml
packages:
  - 'hosts/*'
  - 'libs/*'
  - 'monorepo-helpers/*'
  - 'namespaces/*/apps/*'
  - 'namespaces/*/libs/*'

# Optional: declare peer dep metadata
packageExtensions:
  '@topkit/cypress-utils':
    peerDependenciesMeta:
      '@toptal/client-portal-graphql':
        optional: true

# Supply-chain safety: require packages to be at least 7 days old
# before pnpm will install them. Internal scopes are excluded so we
# can still consume freshly-published @toptal/* and @topkit/*.
# 7 days expressed in minutes (60 * 24 * 7)
minimumReleaseAge: 10080
minimumReleaseAgeExclude:
  - '@toptal/*'
  - '@topkit/*'
```

> **SPA projects:** If you're not a monorepo, you still need this file but with an empty packages list or just the root. The `minimumReleaseAge` block belongs here regardless.

### 3.3 Update `lerna.json`

```
{
  "npmClient": "pnpm"
}
```

Lerna 9+ supports pnpm natively. All other config (versioning, conventional commits) stays the same.

### 3.4 Enable Corepack

pnpm is best managed through Node's corepack:

```
corepack enable
corepack prepare pnpm@10.32.1 --activate
```

Optionally add to `package.json`:

```
{
  "packageManager": "pnpm@10.32.1"
}
```

### 3.5 Convert Lockfile

```
pnpm import                    # Reads yarn.lock, generates pnpm-lock.yaml
pnpm install                   # Validates the new lockfile
pnpm install --frozen-lockfile # Confirm it's reproducible
```

> **Important:** Run `pnpm import` _after_ all `package.json` changes (overrides, patches, scripts, Davinci version bumps from Section 3.8) are done. Otherwise the lockfile won't reflect your configuration.

### 3.6 Clean Up Yarn Artifacts

After successful validation:

```
rm -rf .yarnrc .yarn/ yarn.lock
# Remove from package.json devDependencies:
# - yarn-deduplicate
# - patch-package (if migrating to pnpm native patches)
```

### 3.7 Configure Build Script Permissions (pnpm 10)

pnpm 10 sandboxes lifecycle scripts by default. Run:

```
pnpm approve-builds --all
```

Review the output and whitelist only packages that genuinely need postinstall/prepare scripts (e.g., `husky`, `esbuild`, `@swc/core`, `cypress`).

### 3.8 Upgrade Davinci Packages to pnpm-Compatible Versions

**This is a required step, not an optional cleanup.** Davinci below the versions below either uses `find-yarn-workspace-root` internally, ships codemods that assume flat `node_modules`, or carries peer-dependency metadata that pnpm's stricter resolver rejects. Bump every Davinci package listed here at the same time -- they are released as a coordinated set, and mixing a pnpm version of one with a pre-pnpm version of another produces confusing peer-dep errors on install.

| Package | Phase 0 floor (Tailwind 4) | pnpm-compatible target | Why it has to bump |
| --- | --- | --- | --- |
| `@toptal/davinci-engine` | `13.0.0` | `14.0.0` | Removes `find-yarn-workspace-root`, adopts `@toptal/davinci-workspace-root` |
| `@toptal/davinci-ci` | `7.4.7` | `8.0.0` | Updated to invoke `pnpm` instead of `yarn`, new CI matrix contract |
| `@toptal/davinci-monorepo` | `12.1.0` | `13.0.0` | `detect-circularity` and workspace graph rewritten for pnpm layout |
| `@toptal/davinci-qa` | `19.0.0` | `19.0.0` | Already at pnpm floor via Phase 0; verify no older transitive copy |
| `@toptal/davinci-storybook` | `6.0.0` | `7.0.0` | Addon resolution updated for pnpm symlinks (see Problem 11) |
| `@toptal/davinci-storybook-addons` | `4.0.1` | `5.0.0` | Matches `davinci-storybook@7` major |
| `@toptal/davinci-storybook-theme` | `3.0.1` | `4.0.0` | Matches `davinci-storybook@7` major |
| `@toptal/davinci-syntax` | `23.1.5` | `24.0.0` | ESLint config no longer uses hardcoded `./node_modules/` paths |
| `@toptal/davinci-workspace-root` | `1.0.1` | `2.0.0` | The PM-agnostic replacement for `find-yarn-workspace-root` (see Problem 1) |

Paste the block below into the root `package.json`:

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

**GitHub Actions side:** these Davinci versions are the ones that work against `toptal/davinci-github-actions@v20.0.1` (see Section 7.2). Do the `package.json` bump and the action-ref bump in the same PR so CI never runs v19 actions against v20-era packages.

**Associated cleanup** once the Davinci bump is in:

* Remove any `@toptal/davinci-engine@12.x` and `@toptal/davinci-qa@18.4.0` patches -- the issues they worked around are fixed upstream.
* Drop the `alpha-feature-pnpm-migration-tailwind-3-a035b281.*` overrides. The Staff Portal branch used them to point at pre-release builds while the official versions were still in review; once the tagged majors above are published, remove every override that pins an alpha hash.
* Regenerate the lockfile (`pnpm install`) so the v14/v8/v7 metadata flows through to every transitive consumer.

### 3.9 `minimumReleaseAge`: Supply-Chain Safeguard

pnpm 10 supports `minimumReleaseAge`, which refuses to install any version of a package that was published less than _N_ minutes ago. The Staff Portal migration turned this on (see the snippet already included in Section 3.2) for a simple reason: a few hours' delay between "a package publishes" and "our CI pulls it in" is the cheapest mitigation available against supply-chain attacks where an attacker publishes a compromised version and hopes to hit CI before anyone notices.

The settings used in Staff Portal:

```
# pnpm-workspace.yaml
# 7 days (60 * 24 * 7)
minimumReleaseAge: 10080
minimumReleaseAgeExclude:
  - '@toptal/*'
  - '@topkit/*'
```

**Why 7 days?** Long enough that malicious npm packages are typically caught and yanked before we pull them; short enough that genuine security patches still land inside a normal sprint. Pick a window that matches your team's risk tolerance -- 3 to 14 days is a reasonable range.

**Why exclude** `@toptal/*` **and** `@topkit/*`**?** Internal packages are published by teams you already trust (Davinci, Picasso, Topkit) and their whole release workflow assumes downstream consumers can pick them up immediately. If you keep them in the age window you'll block your own framework upgrades. Excluding them is not a gap -- the attacks this setting defends against are on the public registry, not your private scopes.

**Things that will surprise you the first week:**

* A brand-new public dependency you try to add will fail with `ERR_PNPM_MIN_RELEASE_AGE_NOT_MET` until it ages in. Either wait, pin to an older version, or (if urgent and you've vetted the package) add a targeted exclude.
* `pnpm update` will surface fewer updates than you expect -- that's the feature, not a bug.
* On a fresh clone with a cold store, install is slightly slower because pnpm has to check publish timestamps. The overhead is small (< 5% in Staff Portal benchmarks).

---

## 4. Phase 2: Dependency Resolution

### 4.1 Resolutions to Overrides

Yarn 1 `resolutions` become pnpm `overrides`. The syntax is similar but not identical:

| Yarn 1 `resolutions` | pnpm `overrides` |
| --- | --- |
| `"pkg": "version"` | `"pkg": "version"` (same for global) |
| `"**/scope/**/pkg": "ver"` | `"pkg": "ver"` (pnpm global overrides are simpler) |
| `"parent/**/pkg": "ver"` | `"parent>pkg": "ver"` (use `>` not `/**/`) |
| `"chalk/ansi-regex": "ver"` | `"chalk>ansi-regex": "ver"` |

**Before (Yarn 1):**

```
{
  "resolutions": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "webpack": "5.95.0",
    "chalk/ansi-regex": "^6",
    "**/@graphql-tools/**/ws": "^8.18.0"
  }
}
```

**After (pnpm):**

```
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0",
      "react-dom": "18.2.0",
      "webpack": "5.95.0",
      "chalk>ansi-regex": "^6",
      "@graphql-tools/*>ws": "^8.18.0"
    }
  }
}
```

Remove the `resolutions` field entirely after conversion.

### 4.2 Patch-Package to pnpm Native Patches

pnpm has built-in patching. Convert your existing `patch-package` patches:

**Before:**

```
{
  "scripts": {
    "postinstall": "patch-package"
  },
  "devDependencies": {
    "patch-package": "^6.x"
  }
}
```

**After:**

```
{
  "pnpm": {
    "patchedDependencies": {
      "@datadog/browser-rum-core@5.9.0": "patches/@datadog+browser-rum-core+5.9.0.patch",
      "styled-components@5.3.5": "patches/styled-components+5.3.5.patch"
    }
  }
}
```

**Key differences:**

* No `postinstall` hook needed -- pnpm applies patches during install
* Patch file paths use `+` separator (same as patch-package format -- usually compatible)
* Remove `patch-package` from devDependencies

> **Gotcha:** Some patch files may need path adjustments if they reference internal file paths that changed between versions. Verify each patch applies cleanly with `pnpm install`.

### 4.3 Peer Dependency Strategy

This is one of the most impactful hidden problems. Yarn 1 silently ignored peer dependency mismatches. pnpm enforces them.

**Layered approach (recommended):**

1. **During migration:** Set `strict-peer-dependencies=false` in `.npmrc` (already done in Phase 1)
2. **Catalog warnings:** Run `pnpm install` and capture all peer dep warnings
3. **Add targeted rules** for known-safe mismatches:

    ```
    {
      "pnpm": {
        "peerDependencyRules": {
          "allowedVersions": {
            "@toptal/top-scheduler>react": "18",
            "@toptal/top-scheduler>react-dom": "18",
            "@toptal/top-scheduler>@toptal/picasso": "54"
          },
          "ignoreMissing": ["@toptal/client-portal-graphql"]
        }
      }
    }
    
    ```
4. **File upstream issues** for packages with outdated peer deps
5. **Long-term:** Remove rules as upstream packages publish fixes, then set `strict-peer-dependencies=true`

---

## 5. Phase 3: The Hidden Problems

This is the core of the tutorial. Every problem below was discovered during the actual Staff Portal migration. Each follows a consistent format: symptoms, root cause, solution, and real code.

---

### Problem 1: `find-yarn-workspace-root` Breaks Under pnpm

**Symptoms:** `Cannot find module 'find-yarn-workspace-root'` or workspace root resolves to wrong directory.

**Root cause:** `find-yarn-workspace-root` checks for `yarn.lock` to locate the monorepo root. After removing `yarn.lock`, it fails.

**Solution:** Replace with a PM-agnostic workspace root utility. In Toptal's case, Davinci published `@toptal/davinci-workspace-root` (bumped to `2.0.0` in Section 3.8) which checks for `pnpm-workspace.yaml`, then `package.json#workspaces`.

**Before:**

```
const findWorkspaceRoot = require('find-yarn-workspace-root')
const root = findWorkspaceRoot()
```

**After:**

```
const findWorkspaceRoot = require('@toptal/davinci-workspace-root')
const root = findWorkspaceRoot()
```

**If you don't have a shared utility**, create one:

```
const { findUpSync } = require('find-up')
const path = require('path')
const fs = require('fs')

function findWorkspaceRoot(cwd = process.cwd()) {
  // Check for pnpm workspace
  const pnpmWorkspace = findUpSync('pnpm-workspace.yaml', { cwd })
  if (pnpmWorkspace) return path.dirname(pnpmWorkspace)

  // Fallback: find root package.json with workspaces field
  let dir = cwd
  while (dir !== path.dirname(dir)) {
    const pkgPath = path.join(dir, 'package.json')
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
      if (pkg.workspaces) return dir
    }
    dir = path.dirname(dir)
  }
  return cwd
}
```

**Scale:** Staff Portal had 16+ files using this. Davinci had 8. Search comprehensively.

---

### Problem 2: `fs.realpathSync` Resolves Into `.pnpm` Store

**Symptoms:** Webpack aliases, path resolution, or build tools resolve to unexpected paths like `node_modules/.pnpm/@toptal+davinci-engine@X.X.X/node_modules/@toptal/davinci-engine/...` instead of the expected workspace path.

**Root cause:** pnpm uses symlinks extensively. `fs.realpathSync()` follows symlinks to their real location in the `.pnpm` virtual store. Under Yarn 1's flat layout, `realpathSync` was a no-op.

**Solution:** Replace `fs.realpathSync(process.cwd())` with just `process.cwd()`. pnpm ensures `process.cwd()` is the correct workspace directory.

**Before:**

```
// CRA-derived pattern that assumes no symlinks
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
```

**After:**

```
const appDirectory = process.cwd()
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
```

---

### Problem 3: `require.resolve` Fails for Transitive Dependencies

**Symptoms:** `MODULE_NOT_FOUND` errors for packages that worked under Yarn 1, especially in ESLint plugins, Storybook addons, or CLI tools.

**Root cause:** pnpm's strict hoisting means `require.resolve('some-package')` only works if `some-package` is a **direct** dependency. Yarn 1 hoisted everything flat, so transitive deps were accidentally resolvable.

**Solution:** Three options depending on context:

**Option A -- Add explicit dependency** (cleanest):

```
{
  "dependencies": {
    "the-missing-package": "^x.y.z"
  }
}
```

**Option B -- Use** `paths` **option** to resolve from a known location:

```
// Resolve from the parent package's location
const davinciStorybookAddonsDir = path.dirname(
  require.resolve('@toptal/davinci-storybook-addons')
)

require.resolve('@storybook/addon-essentials/preview', {
  paths: [davinciStorybookAddonsDir],
})
```

**Option C -- Use** `public-hoist-pattern` in `.npmrc` (escape hatch):

```
public-hoist-pattern[]=@storybook/*
public-hoist-pattern[]=@toptal/picasso*
```

**Real example from Staff Portal Storybook config:**

```
// .storybook/main.js -- resolving addons through their parent package
const davinciStorybookAddonsDir = path.dirname(
  require.resolve('@toptal/davinci-storybook-addons')
)

const resolveAddonAlias = addonName => {
  try {
    return [
      {
        find: `${addonName}/preview`,
        replacement: require.resolve(`${addonName}/preview`, {
          paths: [davinciStorybookAddonsDir],
        }),
      },
    ]
  } catch {
    return []
  }
}
```

---

### Problem 4: Jest `transformIgnorePatterns` Miss `.pnpm` Paths

**Symptoms:** Jest throws `SyntaxError: Unexpected token` on ESM packages from `@toptal`, `@topkit`, `d3`, etc. Tests that passed under Yarn 1 now fail.

**Root cause:** Under pnpm, the real path to a package is `node_modules/.pnpm/@toptal+pkg@ver/node_modules/@toptal/pkg/...`. The standard ignore pattern `node_modules/(?!@toptal)` doesn't match because the path goes through `.pnpm` first.

**Solution:** Update the pattern to account for pnpm's `.pnpm` directory structure:

**Before (Yarn 1):**

```
transformIgnorePatterns: ['node_modules/(?!@toptal|@topkit|d3|internmap)']
```

**After (pnpm-compatible):**

```
const transformablePackages =
  '@toptal|@topkit|d3[^/]*|internmap|robust-predicates|...'

const transformIgnorePatterns = [
  `^(?:.*?/)?node_modules/(?!((?:\\.pnpm/[^/]+/node_modules/)?(?:${transformablePackages})(?:/|$)))`,
]
```

**How this works:** The pattern `\\.pnpm/[^/]+/node_modules/` optionally matches pnpm's virtual store prefix, so both flat (Yarn) and nested (pnpm) paths are handled.

---

### Problem 5: Jest Self-Reference Mapping (Package Can't Mock Itself)

**Symptoms:** `jest.mock('@my-org/my-package')` fails when called from within `@my-org/my-package` itself. Error: `Cannot find module '@my-org/my-package'`.

**Root cause:** Under Yarn 1, packages were hoisted to `node_modules`, so a package could `require` itself by name. Under pnpm, a package is NOT in its own `node_modules/`.

**Solution:** Add a self-reference mapping in Jest config:

```
// config/jest.specs.mjs
const getSelfMapping = () => {
  try {
    const pkg = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8')
    )
    return pkg.name ? { [`^${pkg.name}$`]: `${process.cwd()}/src` } : {}
  } catch {
    return {}
  }
}

export default {
  moduleNameMapper: {
    ...existingMappers,
    ...getSelfMapping(), // Maps @my-org/my-package -> ./src
  },
}
```

---

### Problem 6: Tailwind Content Globs Don't Follow Symlinks

**Symptoms:** Missing Tailwind CSS classes in production build. Styles that worked under Yarn 1 are gone. Tailwind's JIT scanner hangs or takes extremely long.

**Root cause:** Tailwind scans source files via glob patterns. Under pnpm, `node_modules/@topkit/...` is a symlink to `.pnpm/...`. Glob libraries either (a) don't follow symlinks by default, missing the files, or (b) follow them and recurse infinitely into the `.pnpm` virtual store.

**Solution:** Disable symlink following and resolve vendor package paths dynamically:

```
// tailwind-config-builder.js

// 1. Disable symlink following explicitly
const matches = globbySync(includePatterns, {
  absolute: true,
  followSymbolicLinks: false, // CRITICAL: prevents .pnpm infinite recursion
  ignore: ignorePatterns,
  onlyFiles: true,
  suppressErrors: true,
})

// 2. Resolve vendor package locations dynamically (not hardcoded paths)
const getPackageDirectory = packageName => {
  try {
    const entryPath = require.resolve(packageName)
    // Walk up to find the package.json
    let dir = path.dirname(entryPath)
    while (dir !== path.dirname(dir)) {
      const pkgPath = path.join(dir, 'package.json')
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
        if (pkg.name === packageName) return dir
      }
      dir = path.dirname(dir)
    }
  } catch {
    return null
  }
}

// 3. Build vendor globs from resolved paths
const picassoDir = getPackageDirectory('@toptal/picasso')
const vendorGlobs = picassoDir
  ? [path.join(path.dirname(picassoDir), 'picasso*/**/*.js')]
  : []
```

**Before (hardcoded, breaks under pnpm):**

```
content: [
  path.join(projectRoot, 'node_modules/@topkit/**/*.js'),
  path.join(projectRoot, 'node_modules/@toptal/picasso/**/*.js'),
]
```

**After (dynamic resolution, works everywhere):**

```
content: [
  ...getVendorContentFiles(), // Dynamically resolved paths
  ...resolveTailwindContentFiles([
    path.join(projectRoot, '{hosts,libs,namespaces}/**/src/**/*.{ts,tsx}'),
  ]),
]
```

---

### Problem 7: Webpack Snapshot RangeError from `.pnpm` Symlinks

**Symptoms:** `RangeError: Maximum call stack size exceeded` in webpack's `FileSystemInfo` during context timestamp resolution. Build crashes during development.

**Root cause:** Webpack tries to enumerate all files in `node_modules` for snapshotting. pnpm's `.pnpm` directory contains thousands of symlinks that create deep recursive structures, overwhelming webpack's file system traversal.

**Solution:** Tell webpack that `node_modules` is managed and `.pnpm` is immutable:

```
// webpack.config.js
const PROJECT_ROOT = path.resolve(__dirname, '../..')

config.snapshot = {
  ...(config.snapshot || {}),
  managedPaths: [path.resolve(PROJECT_ROOT, 'node_modules')],
  immutablePaths: [path.resolve(PROJECT_ROOT, 'node_modules/.pnpm')],
}
```

This tells webpack to skip deep file enumeration for these paths, preventing the stack overflow.

---

### Problem 8: Webpack Watch Options Flooding from `.pnpm`

**Symptoms:** Webpack dev server uses excessive CPU/memory. File watching is slow. Random rebuilds triggered by symlink changes.

**Root cause:** Webpack's file watcher monitors `node_modules` by default. pnpm's `.pnpm` directory has thousands of entries that trigger spurious change events.

**Solution:** Exclude `.pnpm` from watch options:

```
// webpack.config.js
config.watchOptions = {
  ...(config.watchOptions || {}),
  ignored:
    /[\\/](node_modules[\\/]\.pnpm|node_modules[\\/]\.cache|coverage|\.nyc_output)[\\/]/,
}
```

---

### Problem 9: Webpack Chunk Splitting Regex Misses `.pnpm` Paths

**Symptoms:** Custom chunk splitting stops working. Packages that should be in separate chunks are bundled together. Bundle size increases.

**Root cause:** Chunk splitting regex like `/[\\/]node_modules[\\/]@toptal[\\/]billing-frontend[\\/]/` assumes flat `node_modules`. Under pnpm, the real path includes `.pnpm`: `node_modules/.pnpm/@toptal+billing-frontend@version/node_modules/@toptal/billing-frontend/`.

**Solution:** Update regex to optionally match the `.pnpm` prefix:

**Before:**

```
test: /[\\/]node_modules[\\/]@toptal[\\/]billing-frontend[\\/]src[\\/]modules/,
```

**After:**

```
// Matches both flat (Yarn 1) and pnpm nested structure
test: /[\\/]node_modules[\\/](?:\.pnpm[\\/].+[\\/]node_modules[\\/])?@toptal[\\/]billing-frontend[\\/]src[\\/]modules/,
```

The pattern `(?:\.pnpm[\\/].+[\\/]node_modules[\\/])?` optionally matches pnpm's virtual store prefix.

> **Apply this pattern everywhere** you have `node_modules` regex in webpack configs.

---

### Problem 10: ESLint Hardcoded `node_modules` Path

**Symptoms:** ESLint config fails to load with `Cannot find module './node_modules/@toptal/...'`.

**Root cause:** Hardcoded `./node_modules/` paths resolve the symlink differently under pnpm.

**Solution:** Replace hardcoded paths with `require.resolve`:

**Before:**

```
// .eslintrc.js
extends: ['./node_modules/@toptal/davinci-syntax/src/configs/.eslintrc.cjs']
```

**After:**

```
extends: [require.resolve('@toptal/davinci-syntax/src/configs/.eslintrc.cjs')]
```

---

### Problem 11: Storybook Addon Resolution Under pnpm

**Symptoms:** Storybook fails to start with errors about missing addon preview modules. `@storybook/addon-essentials/preview` not found.

**Root cause:** Storybook addons are transitive dependencies of `@toptal/davinci-storybook-addons`. Under pnpm's strict isolation, they're not directly resolvable from your project.

**Solution:** Create explicit aliases that resolve through the parent package:

```
// .storybook/main.js
const davinciStorybookAddonsDir = path.dirname(
  require.resolve('@toptal/davinci-storybook-addons')
)
const davinciStorybookDir = path.dirname(
  require.resolve('@toptal/davinci-storybook')
)

const resolveAddonAlias = addonName => {
  try {
    return [
      {
        find: `${addonName}/preview`,
        replacement: require.resolve(`${addonName}/preview`, {
          paths: [davinciStorybookAddonsDir],
        }),
      },
    ]
  } catch {
    return []
  }
}

const storybookAddonAliases = getDavinciStorybookAddons({})
  .filter(addon => typeof addon === 'string' && addon.startsWith('@storybook/'))
  .flatMap(resolveAddonAlias)

const storybookRuntimeAliases = [
  {
    find: 'happo-plugin-storybook/register',
    replacement: require.resolve('happo-plugin-storybook/register', {
      paths: [davinciStorybookDir],
    }),
  },
]
```

---

### Problem 12: Vite Alias Format (Object to Array)

**Symptoms:** Storybook (Vite-based) crashes with alias-related errors after adding Storybook addon aliases.

**Root cause:** Older Vite configs use object-based aliases (`{ path: 'path-browserify' }`). Adding array-based aliases (from Problem 11) to an object config causes type conflicts. Newer Vite versions prefer array format.

**Solution:** Normalize aliases to array format:

```
// .storybook/main.js -- viteFinal()
viteConfig.resolve = {
  ...(viteConfig.resolve || {}),
  alias: [
    // Convert existing object aliases to array format
    ...(Array.isArray(viteConfig.resolve?.alias)
      ? viteConfig.resolve.alias
      : Object.entries(viteConfig.resolve?.alias || {}).map(
          ([find, replacement]) => ({ find, replacement })
        )),
    // Add new aliases
    ...storybookAddonAliases,
    ...storybookRuntimeAliases,
    { find: 'path', replacement: 'path-browserify' },
  ],
}
```

---

### Problem 13: `npm_config_argv` Is Unavailable

**Symptoms:** Scripts that read `process.env.npm_config_argv` crash with `Cannot read properties of undefined`.

**Root cause:** Yarn 1 set `npm_config_argv` as a JSON string with the original command args. pnpm does not set this variable.

**Solution:** Use `process.argv` directly:

**Before (Yarn 1):**

```
const original = JSON.parse(process.env.npm_config_argv).original
original.shift()
const command = cwd
  ? `yarn --cwd ${cwd} test:unit ./src/${path} ${original.join(' ')}`
  : `yarn lerna run test:unit --stream ${original.join(' ')}`
spawn(command.split(' ').shift(), command.split(' ').slice(1), { shell: true })
```

**After (pnpm):**

```
const original = process.argv.slice(2)
const [command, args] = cwd
  ? ['pnpm', ['--dir', cwd, 'test:unit', `./src/${path}`, ...original]]
  : ['pnpm', ['lerna', 'run', 'test:unit', '--stream', ...original]]
spawn(command, args, { stdio: 'inherit' })
```

---

### Problem 14: `--cwd` Flag Doesn't Exist in pnpm

**Symptoms:** `pnpm --cwd <dir> <command>` fails with unknown option error.

**Root cause:** Yarn 1 uses `--cwd` to change working directory. pnpm uses `--dir` or `-C`.

**Solution:**

| Yarn 1 | pnpm |
| --- | --- |
| `yarn --cwd <dir> <cmd>` | `pnpm --dir <dir> <cmd>` or `pnpm -C <dir> <cmd>` |
| `yarn workspace <name> <cmd>` | `pnpm --filter <name> <cmd>` |

**Before:**

```
"start:root": "yarn --cwd=../.. start"
```

**After:**

```
"start:root": "pnpm -C ../.. start"
```

---

### Problem 15: CI Coverage Globs Traverse `.pnpm` Symlinks

**Symptoms:** CI coverage collection step takes extremely long or OOMs. Coverage merge finds thousands of unexpected files.

**Root cause:** Glob patterns like `./**/coverage/coverage-final.json` traverse into `node_modules/.pnpm/`, which contains symlinks to every package, each potentially having its own `coverage/` directory.

**Solution:** Scope globs to your actual source directories:

**Before:**

```
# .github/workflows/pr_job_jest.yml
- run:
    npx istanbul-merge --out combined.json './**/coverage/coverage-final.json'
```

**After:**

```
- run:
    pnpm dlx istanbul-merge --out combined.json
    './{hosts,libs,namespaces}/**/coverage/coverage-final.json'
```

Apply the same pattern to HTML report collection:

```
# Before: ./**/reports/jest_html_reporters.html
# After:  ./{hosts,libs,namespaces}/**/reports/jest_html_reporters.html
```

---

### Problem 16: `npx` Should Become `pnpm dlx` or `pnpm exec`

**Symptoms:** `npx` commands fail or use wrong package versions.

**Root cause:** `npx` doesn't integrate with pnpm's store. Use pnpm's equivalents.

**Solution:**

| Context | Yarn 1 / npx | pnpm |
| --- | --- | --- |
| Run a locally installed binary | `npx <cmd>` | `pnpm exec <cmd>` |
| Download and run a one-off package | `npx <pkg>` | `pnpm dlx <pkg>` |
| Run a project script | `yarn <script>` | `pnpm <script>` |

**Examples:**

```
# Before
- run: npx istanbul-merge --out combined.json
- run: yarn nyc merge coverage

# After
- run: pnpm dlx istanbul-merge --out combined.json
- run: pnpm exec nyc merge coverage
```

---

### Problem 17: `lodash-es` Module Resolution

**Symptoms:** Jest fails with `Cannot find module 'lodash-es'` or ESM-related errors from lodash-es imports.

**Root cause:** `lodash-es` is an ESM-only package. Under pnpm's stricter module resolution, Jest can't transform it correctly. The fix is to alias it to the CJS `lodash`.

**Solution:**

```
// jest config
moduleNameMapper: {
  '^lodash-es$': 'lodash',
  '^lodash-es/(.*)$': 'lodash/$1',
}
```

---

### Problem 18: `hastscript` ESM Subpath Exports

**Symptoms:** Webpack fails to resolve `hastscript/html` or `hastscript/svg` with `Module not found`.

**Root cause:** These are ESM subpath exports. Under pnpm's symlink structure, webpack's resolver sometimes can't follow the package.json `exports` field through symlinks.

**Solution:** Add explicit aliases in webpack:

```
// webpack.config.js
config.resolve.alias = {
  ...config.resolve.alias,
  'hastscript/html$': require.resolve('hastscript/html.js'),
  'hastscript/svg$': require.resolve('hastscript/svg.js'),
}
```

---

### Problem 19: PostCSS / TailwindCSS Plugin Configuration

**Symptoms:** Tailwind styles not generated. PostCSS errors about missing plugins.

**Root cause:** Under pnpm, PostCSS plugin resolution can fail when plugins are transitive dependencies. The plugin configuration needs to be explicit with the base path for Tailwind to find the correct config.

**Solution:** Normalize PostCSS config with explicit plugin references:

```
// webpack.config.js
const PROJECT_ROOT = path.resolve(__dirname, '../..')

const normalizedPostCssOptions = {
  config: false, // Don't search for postcss.config.js
  plugins: {
    '@tailwindcss/postcss': {
      base: PROJECT_ROOT, // Tell Tailwind where to find tailwind.config.js
    },
    autoprefixer: {},
  },
}

// Find or create the postcss-loader entry
const postCssLoader = cssRule.use.find(
  use =>
    typeof use?.loader === 'string' && use.loader.includes('postcss-loader')
)

if (postCssLoader) {
  postCssLoader.options = {
    ...(postCssLoader.options || {}),
    postcssOptions: normalizedPostCssOptions,
  }
} else {
  cssRule.use.push({
    loader: 'postcss-loader',
    options: { postcssOptions: normalizedPostCssOptions },
  })
}
```

---

## 6. Phase 4: Script & Command Migration

### 6.1 Command Mapping Cheat Sheet

| Yarn 1 | pnpm | Notes |
| --- | --- | --- |
| `yarn install` | `pnpm install` |  |
| `yarn install --frozen-lockfile` | `pnpm install --frozen-lockfile` | Works correctly in pnpm (no checksum hack needed) |
| `yarn add <pkg>` | `pnpm add <pkg>` |  |
| `yarn add --dev <pkg>` | `pnpm add --save-dev <pkg>` | Flag name differs |
| `yarn add -W <pkg>` | `pnpm add -w <pkg>` | Lowercase `-w` for workspace root |
| `yarn remove <pkg>` | `pnpm remove <pkg>` |  |
| `yarn <script>` | `pnpm <script>` |  |
| `yarn run <script>` | `pnpm run <script>` |  |
| `yarn --cwd <dir> <cmd>` | `pnpm --dir <dir> <cmd>` | Or `pnpm -C <dir>` |
| `yarn workspace <name> <cmd>` | `pnpm --filter <name> <cmd>` |  |
| `yarn workspaces info` | `pnpm list -r --depth -1 --json` | Different output format |
| `yarn cache dir` | `pnpm store path` |  |
| `yarn-deduplicate` | `pnpm dedupe` | Built-in |
| `npx <pkg>` | `pnpm dlx <pkg>` | One-off execution |
| `npx <cmd>` (local) | `pnpm exec <cmd>` | Locally installed binary |
| `yarn lerna run <cmd>` | `pnpm lerna run <cmd>` | Lerna works with pnpm |

### 6.2 Update `package.json` Scripts

Search and replace across all `package.json` files. Most are mechanical:

```
{
  "scripts": {
    "build": "pnpm lerna run build",
    "lint": "pnpm lerna run lint",
    "test:changed": "pnpm lerna run test --since",
    "storybook": "pnpm kurama storybook",
    "types:generate": "pnpm lerna run types:generate-combined"
  }
}
```

**Remove these scripts entirely:**

* `prepublish` (yarn-deduplicate) -- pnpm has built-in dedup
* `postinstall` (patch-package) -- pnpm applies patches natively
* `patch-package-silently` -- no longer needed

### 6.3 Update Husky Hooks

```
# .husky/pre-commit
pnpm syncpack list-mismatches
pnpm lint-staged
```

### 6.4 Update lint-staged

Replace all `yarn` commands with `pnpm` in `.lintstagedrc.js`. Also watch out for generated directories that need filtering:

```
// .lintstagedrc.js -- filter out generated storybook artifacts
const createFilteredCommand =
  (command, ...filterPatterns) =>
  files => {
    const filtered = files.filter(f => !filterPatterns.some(p => f.includes(p)))
    return filtered.length
      ? `${command} ${filtered.join(' ')}`
      : 'echo "no files"'
  }
```

---

## 7. Phase 5: CI/CD Pipeline Migration

### 7.1 Version-Pinning Strategy (The Key Insight)

GitHub Actions and reusable workflows are version-pinned. This means you don't need an adaptor that supports both Yarn and pnpm. Instead, **version the cutover**:

| Version | Package Manager | Status |
| --- | --- | --- |
| **v19.x** | Yarn -- all actions use `yarn` | Frozen. Projects on Yarn stay pinned here. |
| **v20.x** | pnpm -- all actions use `pnpm` directly | New major. Projects bump to this after migrating. |

**How it works for each project:**

1. Project migrates its own source code to pnpm
2. Project bumps action refs from `@v19.x` -> `@v20.x`
3. Done -- project is fully on pnpm

**Projects that haven't migrated simply stay pinned to v19.x.** No breakage, no detection logic.

**Why this beats an adaptor layer:**

* No new actions to maintain
* Each action does one thing with one PM
* Each project's migration is atomic
* After all projects migrate, v19.x is archived

### 7.2 Action Reference Updates

```
# Before
- uses: toptal/davinci-github-actions/yarn-install@v19.0.0

# After
- uses: toptal/davinci-github-actions/pnpm-install@v20.0.1
```

### 7.3 Cache Key Updates

```
# Before
key: ${{ runner.os }}-cypress-binary-${{ hashFiles('yarn.lock') }}

# After
key: ${{ runner.os }}-cypress-binary-${{ hashFiles('pnpm-lock.yaml') }}
```

### 7.4 Workflow Command Updates

Every `yarn` command in CI needs updating:

```
# Before
- run: yarn ci:matrix
- run: yarn test:unit:ci --projects=${{ matrix.packages }}
- run: yarn happo-e2e finalize

# After
- run: pnpm ci:matrix
- run: pnpm test:unit:ci --projects=${{ matrix.packages }}
- run: pnpm exec happo-e2e finalize
```

### 7.5 Scope Globs to Avoid `.pnpm` Traversal

Critical for any CI step that uses glob patterns:

```
# Before (traverses into .pnpm, extremely slow or OOM)
- run: find . -name "coverage-final.json" ...

# After (scoped to source directories only)
- run:
    pnpm dlx istanbul-merge --out combined.json
    './{hosts,libs,namespaces}/**/coverage/coverage-final.json'
```

### 7.6 Node.js Setup

Update `actions/setup-node` to work with pnpm:

```
- uses: actions/setup-node@v6
  with:
    node-version-file: '.nvmrc'
```

pnpm-install action handles corepack enablement.

---

## 8. Phase 6: Docker Migration

### 8.1 Base Pattern

```
ARG NODE_VERSION=22.20.0
ARG PNPM_VERSION=10.32.1

FROM node:${NODE_VERSION}

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app
```

### 8.2 Monorepo Layer Caching (Critical for Build Speed)

The key insight: copy workspace directory structures first, prune to just `package.json` manifests, then install. This maximizes Docker layer caching.

```
# Copy lockfile and workspace config (changes rarely)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc lerna.json ./

# Copy workspace directories (for package.json discovery)
COPY hosts hosts
COPY namespaces namespaces
COPY libs libs
COPY monorepo-helpers monorepo-helpers

# Prune to package.json manifests only (maximizes cache hits)
RUN find hosts \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find namespaces \! -name "package.json" -mindepth 4 -maxdepth 4 -print | xargs rm -rf
RUN find libs \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

# Copy patches
COPY patches/ ./patches

# Install (cached as long as manifests don't change)
RUN pnpm install --frozen-lockfile

# Now copy source and build
COPY . .
RUN pnpm build
```

**Why this matters:** Under Yarn 1, you only needed `COPY package.json yarn.lock ./` because Yarn resolved workspaces from the root. pnpm needs all `package.json` files present to resolve the workspace graph during install.

### 8.3 Remove Dynamic `.npmrc` Generation

Under Yarn 1, Dockerfiles often generated `.npmrc` dynamically:

```
# REMOVE THIS (Yarn pattern)
RUN printf '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n' > .npmrc
```

Instead, copy the repo's `.npmrc`:

```
# pnpm pattern -- .npmrc is part of the repo
COPY .npmrc ./
```

The `.npmrc` uses `${NPM_TOKEN}` which is resolved at runtime from environment variables.

### 8.4 SPA Dockerfile (Simpler)

For SPAs without workspace packages:

```
FROM node:22-alpine
ARG PNPM_VERSION=10.32.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./
COPY patches/ ./patches
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
```

---

## 9. Phase 7: Validation & Testing

### 9.1 Validation Checklist

Run each of these and compare against Yarn 1 baseline:

| Check | Command | What to Verify |
| --- | --- | --- |
| Install | `pnpm install --frozen-lockfile` | Succeeds without errors |
| Build | `pnpm build` | Same output, no new warnings |
| Unit tests | `pnpm test:unit:ci` | All pass, same count |
| Integration tests | `pnpm test:integration:ci` | All pass |
| Cypress/E2E | `pnpm test:component:ci` | All pass |
| Storybook | `pnpm build-storybook` | Builds successfully |
| Lint | `pnpm lint` | No new errors |
| Typecheck | `pnpm typecheck` | No new errors |
| Docker build | `docker build .` | Image builds and runs |
| Bundle size | Compare webpack stats | Within 5% of baseline |

### 9.2 Common Validation Failures and Fixes

| Failure | Likely Cause | Fix |
| --- | --- | --- |
| `MODULE_NOT_FOUND` in Jest | Missing `transformIgnorePatterns` update | See Problem 4 |
| Missing CSS classes | Tailwind glob not scanning vendor packages | See Problem 6 |
| Webpack crash in dev | Missing snapshot config | See Problem 7 |
| Storybook won't start | Addon resolution failure | See Problem 11 |
| CI coverage step OOMs | Glob traversing `.pnpm` | See Problem 15 |
| Docker build fails at install | Missing workspace `package.json` files | See Phase 6 |
| `ERR_PNPM_MIN_RELEASE_AGE_NOT_MET` | Dependency is newer than `minimumReleaseAge` | See Section 3.9 -- wait, pin older, or add a targeted exclude |

### 9.3 Bundle Size Comparison

Compare production bundle sizes before and after:

```
# Build with Yarn (on master)
yarn build:production
du -sh dist/

# Build with pnpm (on migration branch)
pnpm build:production
du -sh dist/
```

If bundle size increases >5%, check for:

* Duplicate React/ReactDOM (missing `resolve-peers-from-workspace-root`)
* Missing chunk splitting (regex not matching `.pnpm` paths)
* Missing `lodash-es` -> `lodash` mapping (CJS version is larger)

---

## 10. Architecture-Specific Notes (SPA vs Monorepo)

### What's Simpler for SPAs

| Concern | Monorepo | SPA |
| --- | --- | --- |
| `pnpm-workspace.yaml` | Must list all package globs | Empty or minimal |
| `find-yarn-workspace-root` | 16+ files to update | Usually 0 |
| Docker layer caching | Complex (copy + prune pattern) | Simple (copy package.json + lockfile) |
| Jest self-reference mapping | Needed per package | Usually not needed |
| Webpack snapshot config | Critical (many symlinks) | May not be needed |
| CI glob scoping | Critical (avoid .pnpm traversal) | Usually not an issue |
| Lerna config | Must update `npmClient` | N/A |

### What's the Same for Both

* `.npmrc` configuration (same settings)
* `resolutions` -> `overrides` conversion
* `patch-package` -> pnpm native patches
* Peer dependency strategy
* CI action version bumps
* Tailwind glob/symlink issues (if using Tailwind)
* Jest `transformIgnorePatterns` updates
* `yarn` -> `pnpm` command replacements
* Phase 0 Tailwind 4 + Picasso prerequisite (if on Tailwind)
* Davinci package bump to pnpm-compatible versions
* `minimumReleaseAge` supply-chain safeguard

### SPA Quick Migration Checklist

1. **(Phase 0)** Ship Tailwind 4 + Picasso 4 first (if applicable)
2. **(Phase 0)** Bump Davinci packages per Section 3.8
3. Create `.npmrc` with pnpm settings
4. Create `pnpm-workspace.yaml` with `minimumReleaseAge` block
5. Convert `resolutions` -> `pnpm.overrides`
6. Migrate patches to `pnpm.patchedDependencies`
7. Run `pnpm import`
8. Replace `yarn` -> `pnpm` in scripts
9. Update CI workflows
10. Update Dockerfile
11. Test everything

---

## 11. AI-Accelerated Migration Plan

The Staff Portal migration was estimated at **\~10 weeks with 3-4 FTEs** manually. By structuring tasks as well-defined AI prompts, this compressed to **4-5 weeks with 2 FTEs**.

### 11.1 Task Automation Tiers

| Tier | AI Automation Level | Task Categories | % of Effort |
| --- | --- | --- | --- |
| **High** (70-90%) | AI generates complete changes, human reviews | Find-and-replace: `yarn` -> `pnpm` in scripts/CI/Docker (132+ commands), `resolutions` -> `overrides` (49 entries), Jest pattern rewrites, webpack regex fixes | \~40% |
| **Medium** (50-60%) | AI produces solid first drafts, human validates | Creating `pnpm-install` action, rewriting workspace detection, `peerDependencyRules` config, workspace-root utility | \~30% |
| **Low** (10-20%) | Human-driven, AI assists with research/debugging | Build validation, cross-team coordination, upstream dependency negotiations, go/no-go decisions | \~30% |

### 11.2 Structuring AI Tasks for Maximum Effectiveness

Each AI task should include:

1. **Clear scope** -- specific files to modify, listed by path
2. **Before/after patterns** -- exact transformation rules
3. **Context** -- surrounding code the AI needs to understand
4. **Validation criteria** -- how to verify correctness

**Example well-structured task:**

```
Task: Update find-yarn-workspace-root in Staff Portal

Files to modify:
- .storybook/main.js:10
- config/jest.specs.mjs:6
- config/jest-with-global-mocks.specs.mjs
- libs/cypress-utils/cypress.config.mjs
- libs/graphql/codegen.js
- libs/graphql/operations-codegen.js
- libs/fragments/codegen.js
- monorepo-helpers/kurama/src/constants.js
- monorepo-helpers/utils/index.js
- _scripts/run-package-lint.mjs:3
- (6+ billing namespace codegen files)

Pattern:
  BEFORE: const findWorkspaceRoot = require('find-yarn-workspace-root')
  AFTER:  const findWorkspaceRoot = require('@toptal/davinci-workspace-root')

Additional:
- Remove find-yarn-workspace-root from each package's package.json dependencies
- Add @toptal/davinci-workspace-root instead
- Verify: grep -r "find-yarn-workspace-root" should return 0 results
```

### 11.3 AI-Accelerated Timeline

| Week | Activities | Key AI Tasks |
| --- | --- | --- |
| **0** | Tailwind 4 + Picasso | Phase 0 migration merged and stable on `master` (prerequisite) |
| **1** | CI/CD infrastructure | Generate `pnpm-install` action, update 12 actions (`yarn` -> `pnpm`), update davinci-workflows. Release v20.0.0. |
| **2** | Framework source changes | Bulk-update all `find-yarn-workspace-root` imports, convert resolutions, generate `pnpm-workspace.yaml`, run `pnpm import` |
| **3** | App source changes | Update 16+ workspace-root files, convert 25 resolutions + 11 patches, rewrite 19 CI workflows, bump Davinci per Section 3.8 |
| **4** | Integration testing | Debug test failures, generate fix patches for pnpm-specific issues |
| **5** | Production rollout | Go/no-go gates. Generate migration PRs for remaining projects. |

### 11.4 Where the Bottleneck Shifts

With AI, the bottleneck shifts from **writing code** to **validating builds**. The mechanical changes (find-and-replace, config conversion) are fast. The slow parts are:

1. Waiting for CI pipelines to run
2. Debugging pnpm-specific failures (symlink issues, module resolution)
3. Cross-team coordination (upstream peer dep fixes)

**Key insight:** Start validation early. Don't wait until all code changes are done. Run `pnpm install` and `pnpm build` after each batch of changes to catch issues incrementally.

### 11.5 Migration Phasing for Multi-Project Orgs

```
Phase 0: Tailwind 4 + Picasso 4 + min Davinci   -- Per-project, must go first
        |
        v
Phase 1: Framework/build tools (Davinci)        -- Must go first
Phase 2: CI/CD infrastructure (Actions)         -- Parallel with Phase 1
Phase 3: Pilot project (Staff Portal)           -- After Phase 1+2
Phase 4: Rollout (Client Portal, etc.)          -- After Phase 3 stable 2 weeks
Phase 5: Sunset Yarn 1                          -- After all projects migrated
```

**Critical dependency chain:**

```
Tailwind 4 + Picasso 4 shipped
        |
        v
Framework published with pnpm support
        |
        v
CI Actions v20.0.0 released (all pnpm)
        |
        v
Reusable workflows updated to v20
        |
        v
Each project: source + CI + Docker migration
```

---

## 12. Quick Reference

### 12.1 `.npmrc` Template

```
# Registry authentication
//registry.npmjs.org/:_authToken=${NPM_TOKEN}

# pnpm behavior
node-linker=hoisted
strict-peer-dependencies=false
auto-install-peers=true
link-workspace-packages=true
resolve-peers-from-workspace-root=true
```

### 12.2 `pnpm-workspace.yaml` Template

```
packages:
  - 'packages/*'
  - 'apps/*'
  # Add your workspace globs here

# Optional: fix peer dep issues for specific packages
packageExtensions:
  'some-package':
    peerDependenciesMeta:
      'optional-peer':
        optional: true

# Supply-chain safeguard -- 7 days expressed in minutes (60 * 24 * 7)
minimumReleaseAge: 10080
minimumReleaseAgeExclude:
  - '@toptal/*'
  - '@topkit/*'
```

### 12.3 `package.json` pnpm Section Template

```
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0",
      "webpack": "5.95.0"
    },
    "patchedDependencies": {
      "some-package@1.0.0": "patches/some-package@1.0.0.patch"
    },
    "peerDependencyRules": {
      "allowedVersions": {
        "some-pkg>react": "18"
      }
    }
  }
}
```

### 12.4 Common Error Lookup Table

| Error | Problem # | Quick Fix |
| --- | --- | --- |
| `Cannot find module 'find-yarn-workspace-root'` | [1](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-1-find-yarn-workspace-root-breaks-under-pnpm) | Replace with PM-agnostic utility |
| `RangeError: Maximum call stack size` in webpack | [7](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-7-webpack-snapshot-rangeerror-from-pnpm-symlinks) | Add `config.snapshot.managedPaths` |
| `SyntaxError: Unexpected token` in Jest | [4](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-4-jest-transformignorepatterns-miss-pnpm-paths) | Update `transformIgnorePatterns` for `.pnpm` |
| Missing Tailwind classes | [6](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-6-tailwind-content-globs-dont-follow-symlinks) | Disable symlink following, resolve paths dynamically |
| `Cannot find module '@storybook/...'` | [11](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-11-storybook-addon-resolution-under-pnpm) | Create aliases through parent package |
| `ERR_PNPM_PEER_DEP_INVALID` | Phase 2, [4.3](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#43-peer-dependency-strategy) | Set `strict-peer-dependencies=false` |
| `MODULE_NOT_FOUND` for transitive dep | [3](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-3-requireresolve-fails-for-transitive-dependencies) | Add explicit dependency or use `paths` option |
| Bundle size increased | [9](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-9-webpack-chunk-splitting-regex-misses-pnpm-paths) | Fix chunk splitting regex for `.pnpm` paths |
| CI coverage step OOM/slow | [15](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-15-ci-coverage-globs-traverse-pnpm-symlinks) | Scope globs: `./{hosts,libs}/**/...` |
| Jest can't mock own package | [5](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-5-jest-self-reference-mapping-package-cant-mock-itself) | Add `getSelfMapping()` to `moduleNameMapper` |
| `npm_config_argv` undefined | [13](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-13-npm_config_argv-is-unavailable) | Use `process.argv.slice(2)` |
| Docker install fails | [Phase 6](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#82-monorepo-layer-caching-critical-for-build-speed) | Copy all workspace `package.json` files |
| ESLint extends path not found | [10](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-10-eslint-hardcoded-node_modules-path) | Use `require.resolve()` |
| Webpack dev server slow | [8](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-8-webpack-watch-options-flooding-from-pnpm) | Exclude `.pnpm` from `watchOptions` |
| `hastscript/html` not found | [18](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-18-hastscript-esm-subpath-exports) | Add explicit webpack alias |
| `lodash-es` not found in Jest | [17](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#problem-17-lodash-es-module-resolution) | Add `moduleNameMapper` alias |
| `ERR_PNPM_MIN_RELEASE_AGE_NOT_MET` | [3.9](https://file+.vscode-resource.vscode-cdn.net/Users/vivanac/Projects/staff-portal/docs/yarn-1-to-pnpm-10-migration-tutorial-v2.md#39-minimumreleaseage-supply-chain-safeguard) | Wait, pin older, or exclude the package |

### 12.5 Verification Commands

```
# Verify no yarn references remain
grep -r "yarn" --include="*.json" --include="*.yml" --include="*.yaml" \
  --exclude-dir=node_modules --exclude-dir=.git | grep -v "pnpm-lock"

# Verify lockfile is valid
pnpm install --frozen-lockfile

# Verify no phantom dependencies
pnpm ls --depth 0

# Compare bundle sizes
pnpm build:production && du -sh dist/

# Run full test suite
pnpm test:unit:ci && pnpm test:integration:ci && pnpm build-storybook
```

### 12.6 Davinci Package Version Matrix (Consolidated)

Single table to copy into a PR description. Use the "pnpm-compatible target" column as the `package.json` values and pair with `toptal/davinci-github-actions@v20.0.1`.

| Package | Pre-migration (Tailwind 3) | Phase 0 floor (Tailwind 4) | pnpm-compatible target |
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

---

## Appendix: Staff Portal Migration Stats

| Metric | Value |
| --- | --- |
| Branch | `feature/pnpm-migration` |
| Total files changed | 387 |
| Lines added | +64,856 |
| Lines removed | -181,921 (mostly yarn.lock + vendored yarn binary) |
| Workspace packages | 58 |
| `find-yarn-workspace-root` replacements | 16+ files |
| `resolutions` converted to `overrides` | 25 |
| Patches migrated | 11 |
| CI workflows updated | 19 |
| Dockerfiles updated | 5 |
| New patches added for pnpm | 2 (email-reply-parser, webpack) |
| Patches removed | 1 (davinci-qa -- no longer needed) |
| GitHub Actions version | v19.0.0 -> v20.0.1 |
| `actions/setup-node` version | v4 -> v6 |
| pnpm version | 10.32.1 |
| Node version | 22.20.0 |
| `minimumReleaseAge` | 10080 minutes (7 days), `@toptal/*`/`@topkit/*` excluded |

