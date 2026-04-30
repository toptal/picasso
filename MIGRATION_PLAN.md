# Yarn → pnpm migration plan

Working plan for migrating picasso from Yarn 1.22 to pnpm 10. Reference: staff-portal PRs #15543 and #15590.

## Decisions

| Topic | Decision |
| --- | --- |
| Scope | Single PR |
| pnpm version | `pnpm@10.32.1` (match staff-portal) |
| Node version | Bump `.nvmrc` and workflows from `20.18` → `22.20.0` |
| Lerna | Bump `^8.1.2` → `^9` |
| Husky | Bump `^8` → `^9` (since deps are already churning) |
| `node-linker` | `hoisted` for now. Flip to `isolated` later, after storybook upgrade. |
| Internal workspace deps | Keep semver ranges in this PR. `workspace:*` migration is a follow-up PR. |
| `pnpm-install` GH action | Local copy at `.github/actions/pnpm-install/`, **stripped** of GAR / self-hosted runner logic. picasso stays on `ubuntu-latest`. |
| Other local actions | Keep local. Just swap the install ref + `yarn` → `pnpm`. |
| Dockerfile | Rewrite per staff-portal pattern (actively used by CI — must not break). |
| `yarn-deduplicate` | Drop the devDep + the `prepublish` script. pnpm dedupes natively. |
| `**/@storybook/core-server/**/ip` resolution | Drop in this PR. pnpm can't express the deep glob; goes away after storybook upgrade. Note in PR description. |
| Other deep-glob resolutions | Translate to pnpm's `parent>child` syntax. |
| Workspaces declaration | Move to `pnpm-workspace.yaml`. |

## PR shape

### Top-level config
- Add `pnpm-workspace.yaml` with `packages/*` and `packages/base/*`.
- Add `.npmrc`:
  ```
  //registry.npmjs.org/:_authToken=${NPM_TOKEN}

  node-linker=hoisted
  strict-peer-dependencies=false
  auto-install-peers=true
  link-workspace-packages=true
  resolve-peers-from-workspace-root=true
  ```
- Delete `.yarnrc` and `.yarn/`.
- Delete `yarn.lock`. Commit `pnpm-lock.yaml`.
- `.nvmrc`: `20` → `22.20.0`.

### `package.json`
- Add `"packageManager": "pnpm@10.32.1"`.
- `engines.node`: `>=20` → `>=22`. Add `"pnpm": ">=10"`.
- Migrate `resolutions` → `pnpm.overrides`. Translate `**/parent/child` chains to pnpm `parent>child` syntax. Drop the storybook `ip` alias.
- Add `pnpm.onlyBuiltDependencies` for packages with required postinstall scripts (cypress, esbuild, core-js, nx, @swc/core, styled-components — finalize during install).
- Drop `prepublish` script and `yarn-deduplicate` devDep.
- Bump `lerna` to `^9`, `husky` to `^9`.
- `prepare`: `"husky install"` → `"husky"` (v9).
- Sweep all `scripts` entries: `yarn ...` → `pnpm ...`. Notes:
  - `yarn cache clean` → `pnpm store prune`
  - `yarn nyc merge` → `pnpm exec nyc merge` (binaries need `pnpm exec`)
  - `yarn:foo` shorthand inside `concurrently` works as `pnpm:foo`
- `lint-staged` block: `yarn refresh:tsconfig-references` → `pnpm refresh:tsconfig-references`.

### Lerna / Nx
- `lerna.json`: `"npmClient": "yarn"` → `"pnpm"`.
- `nx.json`: `"npmClient": "npm"` → `"pnpm"` (consistency).

### Husky
- `.husky/pre-commit`: drop `. "$(dirname "$0")/_/husky.sh"` source line (v9 style); `yarn` → `pnpm`.

### GitHub Actions
- **Delete** `.github/actions/yarn-install/`.
- **Add** `.github/actions/pnpm-install/action.yml` — stripped copy of `toptal/davinci-github-actions/pnpm-install`:
  - Keep: corepack enable + activate, pnpm store path, `actions/cache@v4`, install loop with `--frozen-lockfile`.
  - Drop: `runner-info` detection, `toptal/actions/cache@v3.5.1` self-hosted branch, GAR `.npmrc` rewriting + restoration, `npm-gar-token` input.
- Update **all** workflows + local actions:
  - `.github/workflows/ci.yaml`
  - `.github/workflows/release.yml` (also delete the manual yarn-cache block at lines 40–63)
  - `.github/workflows/publish.yml`
  - `.github/workflows/visual-testing.yml`
  - `.github/workflows/davinci-integration-tests.yml`
  - `.github/workflows/danger.yaml`
  - `.github/actions/build-publish-updated-package/action.yml`
  - `.github/actions/build-publish-alpha-package/action.yml`
  - `.github/actions/integration-tests/action.yml`
  - `.github/actions/danger/action.yml`
  - Changes:
    - `uses: ./.github/actions/yarn-install` → `uses: ./.github/actions/pnpm-install`
    - `run: yarn ...` → `run: pnpm ...`
    - `hashFiles('**/yarn.lock')` → `hashFiles('**/pnpm-lock.yaml')`
    - `node-version: 20.18` → `22.20.0`
- `.github/build-actions.sh`:
  - `command -v yarn` → `command -v pnpm`
  - `yarn ncc build` → `pnpm exec ncc build`
- `publish.yml`: the PR-comment template `yarn add ${version}` → `pnpm add ${version}`.

### Dockerfile (root `Dockerfile`)
Replace the ~95-line per-package COPY with the staff-portal pattern:
```dockerfile
ARG NODE_VERSION=22.20.0
ARG PNPM_VERSION=10.32.1
FROM node:${NODE_VERSION}-alpine

ARG PNPM_VERSION

ENV PATH="${PATH}:/app/node_modules/.bin" \
    CHROME_BIN=/usr/bin/chromium-browser \
    NPM_TOKEN=''

RUN apk add --no-cache harfbuzz nss git curl jq chromium openssh-client bash sed shadow
RUN groupmod -g 469 node && usermod -u 469 -g 469 node
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app
RUN chown -R node /app
USER node

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc lerna.json ./
COPY --chown=node:node packages packages

RUN find packages -mindepth 2 -maxdepth 2 \! -name "package.json" -print | xargs rm -rf
RUN find packages/base -mindepth 2 -maxdepth 2 \! -name "package.json" -print | xargs rm -rf

RUN pnpm install --frozen-lockfile

COPY --chown=node:node . /app

RUN printf '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\nalways-auth=true\n' > .npmrc
```
No `yarn build`/`pnpm build` step — picasso's current Dockerfile doesn't build either.

### Docs / templates / bin scripts
Sweep `yarn` → `pnpm` in user-facing copy:
- `README.md`
- `CONTRIBUTING.md`
- `docs/decisions/06-picasso-provider-as-a-peer-dependency.md`
- `docs/contribution/new-component-creation.md`
- `docs/contribution/creating-examples.md`
- `bin/symlink`, `bin/release-docs`, `bin/generate-components-from-svg`
- `_templates/example/new/index.js`, `_templates/component/new/index.js`
- `.github/actions/get-changeset-info/README.md`, `.github/actions/integration-tests/README.md`, `.github/actions/report-missing-changeset/README.md`

## Follow-up PRs (out of scope here)

1. **Internal deps → `workspace:*`** in all `packages/*/package.json` and `packages/base/*/package.json`. Mechanical change across ~80+ files. Lerna rewrites `workspace:*` to a real version on publish, so it's transparent to consumers.
2. **Storybook upgrade.** Picasso uses storybook 6.5 with many decorations — needs separate investigation. Once done:
   - Flip `node-linker=hoisted` → `isolated` in `.npmrc`.
   - Remove the `**/@storybook/core-server/**/ip` workaround for good (the `npm:@toptal/davinci-ip` alias was a workaround we couldn't translate; revisit if still needed).

## Decisions revised during execution

| Topic | Original plan | Final decision |
| --- | --- | --- |
| Lerna | Bump to ^9 | **Stay on ^8.1.2.** Lerna 9 pulls `libnpmpublish > npm-package-arg > hosted-git-info@7` which expects `lru-cache@^10`. With `node-linker=hoisted`, pnpm hoists `lru-cache@7` (other consumers) and the nested `hosted-git-info@7` blows up at runtime: `TypeError: LRUCache is not a constructor`. pnpm's 3-deep override (`libnpmpublish>hosted-git-info>lru-cache`) isn't supported. Lerna 8 doesn't take this code path. |
| Davinci package set | Bump only `davinci-syntax` | **Bumped to the official "pnpm-compatible target" matrix from the Toptal pnpm migration playbook (Section 3.8 / Task 1.12).** `davinci-ci ^7.4.7 → ^8.0.0`, `davinci-engine ^12.2.0 → ^14.0.0`, `davinci-qa ^18.3.0 → ^19.0.0`, `davinci-syntax ^22.0.2 → ^24.0.0`. The doc's rationale: Davinci packages are released as a coordinated set, and mixing pre-pnpm and pnpm versions produces confusing peer-dep errors. `davinci-code` and `davinci-workspace-root` not bumped — picasso doesn't use them in a way that's affected. |
| Lockfile generation | Run `pnpm install` from scratch | **Use `pnpm import` against `yarn.lock`.** Fresh resolution caused pnpm to pick newer transitive deps than yarn (e.g. `@types/react@19` vs yarn's `17.0.39`), surfacing TS errors that didn't exist under yarn. `pnpm import` reuses yarn's exact version pins, mirroring the working state. |
| Workspace dep declarations | Out of scope | **In scope (option b).** Picasso has ~50 packages whose `src/*.ts` imports cross-workspace packages (`@toptal/picasso-shared`, `@toptal/picasso-input`, etc.) without declaring them in their own `package.json`. Yarn 1's flat hoisting silently allowed this; pnpm doesn't. Added explicit declarations via `bin/add-missing-workspace-deps.mjs` (one-shot script). |
| Supply-chain safeguard | Not in original plan | **Added `minimumReleaseAge: 10080` (7 days) to `pnpm-workspace.yaml`** with `@toptal/*` and `@topkit/*` excluded. Refuses to install public packages that were published less than 7 days ago — defends against npm supply-chain attacks where compromised versions get yanked before they age in. From the Toptal playbook Section 3.9. |
| Jest `transformIgnorePatterns` | Not touched | **Updated `jest.spec.mjs`.** Original pattern `node_modules/(?!@toptal\|d3\|...)` worked under hoisted layout but breaks if/when `node-linker` flips to `isolated`. New pattern `^(?:.*?/)?node_modules/(?!((?:\.pnpm/[^/]+/node_modules/)?(?:<list>)(?:/\|$)))` accepts both layouts. Required expanding `d3` → `d3[^/]*` (and similar) because the new pattern segment-anchors with `(?:/\|$)`, so prefix matches need explicit globbing. |
| Storybook PostCSS `base` | Not touched | **Added `base: path.resolve(__dirname, '..')` to `@tailwindcss/postcss` plugin options in `.storybook/main.js`.** From the playbook Problem 19 — pnpm's plugin resolution sometimes can't find `tailwind.config.js` through symlinks without `base`. |

## Required `pnpm.overrides` (translated from yarn `resolutions`)

Same set as yarn's `resolutions`, with these adjustments:
- `"meow>trim-newlines": "^3"` — was 3-deep `**/default-browser-id/meow/trim-newlines`, flattened (pnpm doesn't support 3-deep selectors)
- `"@types/node-fetch>form-data"`, `"@cypress/request>form-data"`, `"find-babel-config>json5"`, `"marksy>marked"` — translated `**/parent/child` → `parent>child` syntax
- `"js-yaml": "^3.13.1"` — was a per-package `resolutions` block in `packages/picasso/package.json`; pnpm only honors root-level overrides, so moved to root
- **Dropped** `"**/@storybook/core-server/**/ip": "npm:@toptal/davinci-ip@2.0.3"` — deep-glob alias not expressible in pnpm overrides. Goes away after the storybook upgrade. Documented as follow-up.

No new `@types/*` overrides were needed because `pnpm import` reused yarn.lock's exact versions (e.g., `@types/react@17.0.39` matches yarn).

## Workspace dep declarations (option b)

Added `bin/add-missing-workspace-deps.mjs` — one-shot script that:
1. Walks every workspace package
2. Scans `src/**` for `from '@toptal/picasso-*'` / `'@topkit/*'` / `'@toptal/base-*'` imports
3. Adds missing imports to `dependencies` (production source) or `devDependencies` (test/story/example/__testfixtures__/__mocks__ files)
4. Pins to the actual workspace package's `version` field

Result: 142 declarations added across ~50 package.json files. Examples:
- `@toptal/picasso-image` gained `@toptal/picasso-shared` in `dependencies` (used by `Image.tsx`)
- `@toptal/picasso-tagselector` gained `@toptal/picasso-input` in `dependencies` (used by `TagSelectorInput.tsx`)
- Almost every base/* package gained `@toptal/picasso` in `devDependencies` (used in `test.tsx` for end-to-end render checks)

The script is left in `bin/` for re-running if more cross-workspace imports get added during the migration's review cycle. **Delete after the migration lands** (or move it to `_scripts/` if useful for future audits).

One manual fix beyond the script: removed `@toptal/picasso` from `picasso-codemod/dependencies` — false positive from a JSDoc `* import { Page as PicassoPage } from '@toptal/picasso'` inside a comment.

## Verification of `pnpm <script>` (run locally with `node-linker=hoisted`)

| Script | Status | Notes |
| --- | --- | --- |
| `pnpm install` | ✅ | Via `pnpm import` against `yarn.lock` for the initial lockfile |
| `pnpm syncpack:list` | ✅ | |
| `pnpm circularity` | ✅ | |
| `pnpm check:icon-sizes` | ✅ | |
| `pnpm refresh:tsconfig-references` | ✅ | Required keeping the `workspaces` field in `package.json` (the bin script reads `rootPkgJson.workspaces`). pnpm reads `pnpm-workspace.yaml`; both coexist (staff-portal does the same). |
| `pnpm lint` | ✅ | Required `davinci-syntax` bump to ^24 |
| `pnpm typecheck` (`tsc --noEmit`) | ✅ | |
| `pnpm tsc:all` (`tsc --build tsconfig.pkgsrc.json`) | ✅ | |
| `pnpm build:package` (lerna runs `tsc --build tsconfig.json` per package) | ✅ | All 90 packages |
| `pnpm test:unit:ci` (jest) | ✅ | |

Not verified locally (interactive / external services / dev servers):
- `pnpm start`, `pnpm start:storybook`, `pnpm build:package:watch`, `pnpm test:unit:watch`, `pnpm test:integration:open`, `pnpm test:unit:debug` — interactive
- `pnpm happo`, `pnpm happo:storybook` — needs `HAPPO_API_KEY` / `HAPPO_API_SECRET`
- `pnpm test:integration`, `pnpm test:integration:ci` — long-running cypress; commands themselves resolve correctly under pnpm
- `pnpm release` — publishes to npm
- `pnpm clean` — destructive
- `pnpm symlink`, `pnpm symlink:off` — needs an external consumer project
- `pnpm build:storybook` — long; should work since it depends on `build:package` which passes
- `pnpm generate:component`, `pnpm generate:example`, `pnpm generate:icons`, `pnpm generate:pictograms` — interactive / file-mutating
- `pnpm syncpack:fix` — file-mutating
- `pnpm generate:llm-docs` — runs `node bin/generate-docs.mjs`; should work (no yarn-specific behavior)

## Audit against the Toptal pnpm migration playbook

Cross-checked against `docs/migration-references/yarn-to-pnpm-migration-tutorial.md` (Confluence page 5889392657). Items below either confirmed N/A in picasso source or already addressed.

| Tutorial Problem | Status |
| --- | --- |
| Problem 1: `find-yarn-workspace-root` | ✅ N/A — 0 hits in picasso source |
| Problem 2: `fs.realpathSync` in config files | ✅ N/A — 0 hits |
| Problem 3: `require.resolve` for transitive deps | ✅ Handled — workspace deps explicitly declared via `bin/add-missing-workspace-deps.mjs` |
| Problem 4: Jest `transformIgnorePatterns` miss `.pnpm` | ✅ Fixed in `jest.spec.mjs` |
| Problem 5: Jest self-reference mapping | ✅ Not needed — no self-mocks in picasso |
| Problem 6: Tailwind content globs follow symlinks | ⚠️ Not audited — picasso's `tailwind.config.js` doesn't use vendor-package globs that scan `node_modules`, so likely N/A. Verify on first `build:storybook`. |
| Problem 7: Webpack snapshot RangeError | ⚠️ Not applied preemptively — only relevant if `pnpm build:storybook` blows up with `RangeError: Maximum call stack`. Add `config.snapshot.managedPaths` to `.storybook/main.js` if it does. |
| Problem 8: Webpack watch options flooding | ⚠️ Same caveat — only relevant if `pnpm start` is sluggish |
| Problem 9: Webpack chunk splitting regex | ⚠️ Picasso doesn't have custom `splitChunks.cacheGroups` regex; standard storybook config has its own splits. Re-audit if bundle size grows after migration. |
| Problem 10: ESLint hardcoded `node_modules` path | ✅ N/A — picasso uses `extends` with package names already |
| Problem 11: Storybook addon resolution | ✅ Likely N/A — picasso's storybook addons (`@storybook/addon-viewport/register`, `@storybook/addon-a11y`) are direct devDeps of root, not transitive through `davinci-storybook-addons` |
| Problem 12: Vite alias array format | ✅ N/A — picasso uses webpack5 builder, not Vite |
| Problem 13: `npm_config_argv` | ✅ N/A — 0 hits |
| Problem 14: `--cwd` flag | ✅ N/A — 0 hits |
| Problem 15: CI coverage globs traversing `.pnpm` | ⚠️ Picasso's CI does `istanbul-merge` only in `test:combine` which is locally scoped to `coverage/`. `.github/workflows/*` don't have broad `**/coverage/...` globs. OK as-is. |
| Problem 16: `npx` → `pnpm dlx`/`exec` | ✅ Done in workflows + scripts |
| Problem 17: `lodash-es` resolution | ✅ N/A — 0 hits |
| Problem 18: `hastscript` ESM subpath | ✅ N/A — 0 hits |
| Problem 19: PostCSS / Tailwind plugin `base` | ✅ Added `base` option to `.storybook/main.js` |

## Validation checklist before merging

- [x] `pnpm install` succeeds locally
- [x] `pnpm lint` passes
- [x] `pnpm typecheck` passes
- [x] `pnpm tsc:all` passes
- [x] `pnpm build:package` — all 90 packages
- [x] `pnpm test:unit:ci` passes
- [x] `pnpm syncpack:list`, `pnpm circularity`, `pnpm check:icon-sizes`, `pnpm refresh:tsconfig-references` pass
- [ ] `pnpm build:storybook` runs green (watch for Problem 7/8 symptoms — preemptive fixes deferred)
- [ ] CI workflow runs green on draft PR
- [ ] Docker image build runs green
- [ ] Husky pre-commit fires `pnpm lint-staged`, `pnpm syncpack:list`, `pnpm check:icon-sizes`
- [ ] Verify happo workflow on a feature branch (needs HAPPO secrets)
