# TypeScript 4.7 → 5.5 Upgrade Research

> Layered analysis of every minor release between our current `~4.7.0` and the proposed `5.5` target. Each version section has two parts:
> 1. **What changed in TS X.Y** — the release itself.
> 2. **Implications for this repo (layered)** — what we have to do, *assuming all prior versions' fallout has already been handled*.
>
> Read top-to-bottom: the doc is the upgrade plan.

---

## TL;DR

- **Real distance:** 8 minor releases (4.7 → 4.8 → 4.9 → 5.0 → 5.1 → 5.2 → 5.3 → 5.4 → 5.5). Most carry small breaking changes; **5.0 is the only release with a large blast radius** in this codebase.
- **Codebase is favorable:** zero decorators, zero `React.FC`, zero `: Function`, zero `infer`, zero advanced regex (named groups / lookbehinds / `/u`). Pure functional React + hooks + simple types.
- **Real friction points found:**
  - 81 `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck` directives — every release that tightens checks could re-validate a `@ts-expect-error` and turn it into an error of its own. Most are concentrated in `packages/picasso-codemod/` (codemod test fixtures, mostly `@ts-nocheck`) which is low-risk; the ~10 in `packages/topkit-analytics-charts/` and `packages/picasso-charts/` around Recharts internals are the real ones to watch.
  - 11 `enum` declarations — TS 5.0 reworked enum semantics; needs a once-over.
  - 33 `: any` parameter/return signatures (mostly in chart components) — newer lib types may make some of these actually type-checkable.
  - 48 `as const` usages — not breaking, but `satisfies` (4.9) is a cleaner option in places.
- **The real gating dependency is not TypeScript itself, it's `@toptal/davinci-syntax@22.0.2`:**
  - Its `peerDependencies.typescript` is `^4.8.4` (i.e. `>=4.8.4 <5.0.0`) — hard cap before TS 5.x.
  - It bundles `@typescript-eslint@^6.7.3`, which only officially supports TS 4.7.4 → 5.3.x.
  - **For TS 5.5 we need `@typescript-eslint` v8.x** (originally `>=4.8.4 <5.5.0`, expanded to include 5.5/5.6 from v8.10+). That requires a newer `davinci-syntax` major (or vendor override).
- **Recommended path:** land each release as its own atomic commit on this branch. The branch name (`pf-2031-upgrade-typescript-to-5-4`) is fine; just ship 5.5 instead of 5.4. **Don't squash** — bisecting per-version errors is the only sane way to handle ~80 packages × 8 releases of behavior drift.

---

## Current baseline (TS 4.7)

- Root: `typescript: ~4.7.0` (devDependency).
- 11 packages declare `typescript` directly (all pinned `~4.7.0`).
- 90 `tsconfig.json` files, 80+ project references in `tsconfig.pkgsrc.json`, `composite: true` build mode.
- `tsconfig.base.json`: `target: es2015`, `lib: [dom, es2019]`, `module: ES2020`, `moduleResolution: node`, `jsx: react`, `strict: true`. **No deprecated flags present** (no `--charset`, `--keyofStringsOnly`, `--out`, etc.) — the 5.0 deprecation removals don't bite us.
- Toolchain: Babel `@babel/preset-typescript@^7.22.5` (transpilation, no typecheck), `ts-loader@^9.5.1` (Storybook webpack), `ts-node@^10.9.2`, `@toptal/davinci-syntax@^22.0.2` (lint config bundling `@typescript-eslint@6.x`).
- React 18.2 (resolutions force-pin), `@types/react` is implicit (not pinned at root).

---

## TS 4.8 (Aug 2022)

### What changed

- **Type system tightening (breaking):**
  - Unconstrained generics no longer assignable to `{}` / `object` under `strictNullChecks`.
  - `NonNullable<T>` redefined as `T & {}`; `unknown` now narrows like `{} | null | undefined`.
  - Binding patterns (e.g. `[a, b]` destructured types) no longer contribute to inference candidates — code that relied on it has to be re-typed.
  - Comparing object/array literals with `==` / `===` now errors.
- **Library:** `Error.cause` retyped from `Error` → `unknown`.
- **Compiler API (breaking for tooling authors):** decorators move from a separate `decorators` array onto `modifiers`; `node.decorators` is deprecated — only matters for consumers of the TS compiler API (codemods, custom transforms).
- **New:** template literal types can `infer T extends number` and parse to literal `100`-style types.
- **Performance:** 10–25% on `--build`/`--watch`/`--incremental`.

### Implications (layered)

- **Direct fallout: small.** No `: Function`, no obvious unconstrained-generics-into-`{}`, no triple-equals against object literals (would have shown up in lint already).
- **`packages/picasso-codemod`** uses the TypeScript compiler API directly. The decorator-property migration on AST nodes affects code that reads `node.decorators`. Worth grepping the codemod package for `.decorators` access — if any are touched, swap to `getDecorators(node)` / `canHaveDecorators(node)`.
- **`@toptal/davinci-syntax@22.0.2` peer-dep `typescript: ^4.8.4` is satisfied** at this step — no lint config change needed yet.
- **Bump:** `typescript: ~4.8.0` everywhere it appears (root + 11 packages). Run `yarn tsc:all` and triage; expect 0–5 errors of the shape "Argument of type 'T' is not assignable to parameter of type '{}'" in deeply generic helper code (most likely in `packages/shared`).

---

## TS 4.9 (Nov 2022)

### What changed

- **New (additive):**
  - `satisfies` operator — type-checks an expression against a constraint without widening.
  - `accessor` keyword (auto-accessor desugar) — pairs with decorators.
  - Unlisted-property narrowing improvements with `in` operator.
- **Type system tightening (breaking):**
  - `Promise.resolve(x)` now uses `Awaited<T>` to unwrap — code that relied on `any`/`unknown` returns can break.
  - Direct `=== NaN` / `!== NaN` is an error; must use `Number.isNaN`.
- **Module resolution:** under `moduleResolution: node16`, `package.json` `exports` field now wins over `typesVersions`.
- **JS emit:** unused imports in `.js` files are no longer dropped (rare to matter).

### Implications (layered)

- **`Promise.resolve(...)` retyping** is the only realistic source of new errors. We use Promises throughout async tests/handlers, but virtually always `Promise.resolve(value)` where `value` is already-typed. Spot-check after the bump; expect ≤ 5 errors.
- **`=== NaN`:** unlikely to exist (would have been a lint flag); not worth pre-grepping.
- **`exports`-vs-`typesVersions`:** N/A (we're on `moduleResolution: node`, not `node16`).
- **`satisfies` is an opportunity, not work** — 48 `as const` usages could be cleaner as `satisfies` later, but defer.
- **Bump:** `typescript: ~4.9.0`. davinci-syntax peer dep still satisfied (`^4.8.4` covers 4.9).

---

## TS 5.0 (Mar 2023) — the big one

### What changed

- **Removed/deprecated compiler flags** (warnings on 5.0–5.4, hard errors in 5.5):
  - `--target: ES3`, `--out`, `--noImplicitUseStrict`, `--keyofStringsOnly`, `--suppressExcessPropertyErrors`, `--suppressImplicitAnyIndexErrors`, `--noStrictGenericChecks`, `--charset`, `--importsNotUsedAsValues`, `--preserveValueImports`, project-reference `prepend`.
  - Mitigation knob: `"ignoreDeprecations": "5.0"` in tsconfig (only valid 5.0 → 5.4; removed in 5.5).
- **Default-behavior changes:**
  - `--newLine` defaults to `LF` (was OS-dependent).
  - `--forceConsistentCasingInFileNames` defaults to `true`.
  - Minimum runtime: Node 12.20, target lib defaults to ES2018.
- **Decorators:** standard ECMAScript decorators (no `--experimentalDecorators` needed). Different semantics than legacy decorators.
- **Enums (breaking):** all enums now treated as union enums; out-of-domain literal assignments error; mixed numeric/string-enum cross-references error; computed members get unique types.
- **Type system:**
  - `const` type parameters (`<const T>`) — additive.
  - Multi-extends in tsconfig (`"extends": ["a", "b"]`) — additive.
  - Relational operators (`<`, `>`, `<=`, `>=`) forbid implicit string→number coercion.
- **Modules:**
  - `--verbatimModuleSyntax` replaces `--importsNotUsedAsValues` + `--preserveValueImports`.
  - `--moduleResolution bundler` introduced.
  - New flags: `--allowImportingTsExtensions`, `--resolvePackageJsonExports/Imports`, `--allowArbitraryExtensions`, `--customConditions`.
- **DOM lib:** several properties retyped from `number` → numeric literal types; cut/copy/paste handlers moved between interfaces.
- **Compiler internal:** namespaces → modules migration broke any code consuming TS compiler internals.

### Implications (layered)

- **No deprecated flags in our tsconfigs** (verified) — the deprecation list is a non-event for our build.
- **Enums (11 declarations) need review.** Look at each enum and check:
  - Any cross-enum assignments? (rare, but breaks under union-enum semantics).
  - Any `as MyEnum` casts of non-member values? (now an error).
  - We don't use `const enum` (not found), so isolatedModules / bundler safety isn't a concern.
- **Decorators (zero usages):** non-event.
- **`forceConsistentCasingInFileNames` default flip:** we don't set it; need to either explicitly pin it false or fix any case-mismatched imports surfaced. On macOS-developed code intended for Linux CI this often surfaces 1–3 import-case bugs. Worth a `git grep -E "from ['\"][^'\"]*[A-Z]"` pass after the bump.
- **DOM lib retypings:** the three observer-using hooks (`packages/base/Utils/.../use-on-screen.ts`, `packages/base/Modal/.../use-scrollable-shades.ts`, `packages/base/Slider/.../Slider.tsx`) are stable. Real risk is in `packages/base/Calendar`, `packages/base/DatePicker`, `packages/base/RichTextEditor`, anywhere event targets are cast (`event.target as HTMLInputElement`); may need to widen/narrow casts.
- **`@ts-expect-error` directives** that previously suppressed an error may now find the error has been *fixed* by 5.0's stricter typing — when that happens, TS errors with `Unused @ts-expect-error directive`. The Recharts wrappers in `packages/topkit-analytics-charts/` and `packages/picasso-charts/` (~6 directives) are the most likely flippers.
- **CRITICAL — gating dep break:** `@toptal/davinci-syntax@22.0.2` peer dep is `typescript: ^4.8.4` (caps `<5.0.0`). Yarn/npm will warn loudly. Two options:
  1. **Preferred:** bump `@toptal/davinci-syntax` to a major that supports TS 5.x and bundles `@typescript-eslint@v8`. Requires checking the davinci-syntax changelog / asking the davinci team for the supported version.
  2. **Bridge:** add `"resolutions": { "@toptal/davinci-syntax/typescript": "5.0.x" }` in root package.json + accept the peer-dep warning. Unblocks the bump but doesn't update the bundled `@typescript-eslint@6` rules. Some new rules (e.g. covering 5.0 decorator metadata) won't apply, but lint still runs.
- **Effort estimate (cumulative, this is the largest single step):** half a day to a day of error triage + the davinci-syntax decision. **This is the bump that should land in its own commit and get its own CI run.**

---

## TS 5.1 (May 2023)

### What changed

- **Runtime requirements (breaking):** Node 14.17+ minimum to run `tsc`; emitted JS now includes ES2020 syntax features.
- **Module resolution (breaking):** when `typeRoots` is set, TS no longer walks up parent directories looking for `node_modules/@types`. Code with `typeRoots: ["./@types"]` may suddenly fail to find ambient types.
- **Additive:**
  - Functions returning `undefined` no longer require explicit `return`.
  - Getter/setter pairs may have unrelated types.
  - JSX: components can return `Promise<JSX.Element>` (RSC-flavored); new `JSX.ElementType` lets libraries widen the allowed return type.
  - Linked editing for JSX tags in editors.
  - JSDoc `@param` snippet completions.

### Implications (layered)

- **`tsconfig.base.json` already declares `typeRoots: ["./node_modules/@types", "./@types"]`** — both roots are explicit, so the upward-walk change is **not** a problem. Verified safe.
- **Node 14.17+ requirement** — we already require Node 22 (`engines: { node: ">=22" }`), trivially satisfied.
- **JSX changes are additive** in the sense that nothing currently rendering breaks. We rely on default JSX intrinsic types from `@types/react@18` — no custom `JSX.ElementType` or namespace augmentation in our packages.
- **Bump:** `typescript: ~5.1.0`. Effectively a no-op upgrade given our setup.

---

## TS 5.2 (Aug 2023)

### What changed

- **Additive:**
  - `using` / `await using` declarations (Symbol.dispose / asyncDispose).
  - Decorator metadata (`Symbol.metadata`).
  - Mixed labeled / unlabeled tuple elements allowed.
  - Array methods `toSorted`, `toReversed`, `toSpliced`, `with` typed in lib.
  - Symbols as `WeakMap`/`WeakSet` keys.
  - Type-only imports may carry `.ts/.mts/.cts/.tsx` extensions.
  - `--moduleResolution bundler` becomes a stable, recommended option for non-Node bundler setups.
- **Breaking:**
  - `module`/`moduleResolution` must align under `node16`/`nodenext` (we don't use those — non-event).
  - Merged declarations must agree on export status across all merges.
  - `module` keyword always emits as `namespace` in `.d.ts` (only matters if you used the legacy `module` keyword — we don't).
  - `lib.d.ts` updates may shift DOM types.

### Implications (layered)

- **Zero `using` / `await using`** in our codebase — the headline 5.2 feature is just available for new code, not a migration burden.
- **No `node16`/`nodenext` resolution in our configs** — those breaking changes don't apply.
- **`as const` arrays may newly access `toSorted`/etc.** — lib widening, additive.
- **DOM lib drift:** smaller surface than 5.0. Re-run typecheck and triage anything new in event-handling components.
- **Bump:** `typescript: ~5.2.0`. Expect ≤ 5 trivial fixes.

---

## TS 5.3 (Nov 2023)

### What changed

- **Import attributes (additive, replaces 4.5's import assertions):**
  - New: `import x from "./y.json" with { type: "json" }`.
  - Old `assert { type: "json" }` syntax is **deprecated** but still parses (becomes a hard error several majors later).
- **Narrowing improvements (additive, may surface latent errors):**
  - `switch (true) { case isFoo(x): ... }` narrowing.
  - Boolean literal narrowing in conditions.
  - Custom `Symbol.hasInstance` predicates respected.
  - Super-property access against class fields now errors.
- **`resolution-mode` attribute on import types** stabilized.
- **`tsserverlibrary.js` consolidated** with `typescript.js` (binary smaller; only matters for tooling authors).

### Implications (layered)

- **No `import ... assert`** in our codebase (zero hits) — we're not exposed to the deprecation.
- **`switch (true)` narrowing** is a positive change; it can newly *reveal* cases where a case body assumed a narrower type than was provable. Low risk.
- **Super-field access in classes** — we have very few classes (function components throughout). The handful in `packages/picasso-codemod` are unrelated to instance fields. Non-issue.
- **Bump:** `typescript: ~5.3.0`. Very low fallout.

---

## TS 5.4 (Mar 2024)

### What changed

- **Additive:**
  - `NoInfer<T>` utility type — caller-supplied generic constraints.
  - Closures preserve narrowed types when the variable has a discoverable last assignment (real win for `useEffect` / event-handler code).
  - `Object.groupBy` / `Map.groupBy` typed in lib.
  - `import ... = require(...)` allowed under `--module preserve` + `--moduleResolution bundler`.
  - Import attributes validated against a global `ImportAttributes` type.
- **Breaking:**
  - **5.0 deprecations remain warnings here, become errors in 5.5.** This is the last release where `ignoreDeprecations: "5.0"` is honored.
  - Type-only imports that collide with same-named local values now error under `isolatedModules`.
  - Stricter enum compatibility: enums with same name must have identical member values; string enums only compatible with structurally-identical string enums.
  - Enum members named `Infinity`, `-Infinity`, `NaN` rejected.
  - More accurate conditional-type constraints — over-eager inference rejected.
  - Aggressive intersection reduction between type variables and primitives.

### Implications (layered)

- **Closure narrowing** is the most likely silent fix → silent regression source. `useState`/`useRef`/`useCallback` patterns can newly *not need* a `?.` check or assertion. Conversely, narrowed values returned from a closure may be typed more strictly than callers expect. Real but small.
- **Enum compatibility tightening** — re-check the 11 enums (some of which already passed 5.0's union-enum scrutiny). Specifically watch for enum-to-enum or enum-to-string-literal cross-typing.
- **`isolatedModules` collision check:** we don't enable `isolatedModules` in `tsconfig.base.json`, but Babel transpilation effectively requires the same discipline. Any `import { Foo }` shadowed by a local `const Foo = ...` should already lint-fail; non-issue.
- **`Object.groupBy` typing** — we don't use it; non-event.
- **Bump:** `typescript: ~5.4.0`. Mostly drift cleanup; budget a couple of hours.

---

## TS 5.5 (Jun 2024) — the target

### What changed

- **Additive (often surfaces latent errors):**
  - **Inferred type predicates** — `array.filter(x => x != null)` now narrows the result type without an explicit `is T` annotation. Most callers benefit silently; a few existing explicit predicates may now mismatch, requiring removal/adjustment.
  - **Control-flow narrowing for constant indexed access** — `obj[k]` narrows correctly when `k` is a `const` literal-typed key.
  - **Regex literal syntax checking** — `new` validation of regex syntax. Backreferences, named groups, escape sequences inside character classes that were previously silently accepted now error. **Most common single source of new errors in this upgrade.**
  - **ECMAScript Set methods** typed in lib (`union`, `intersection`, etc.).
  - **`${configDir}` template variable** in tsconfigs.
  - **JSDoc `@import` tag**.
- **Breaking / removals:**
  - **The 5.0 deprecation list becomes hard errors:** `--charset`, `--target ES3`, `--importsNotUsedAsValues`, `--noImplicitUseStrict`, `--keyofStringsOnly`, `--suppressExcessPropertyErrors`, `--suppressImplicitAnyIndexErrors`, `--noStrictGenericChecks`, `--out`, `--preserveValueImports`, `prepend`. **`ignoreDeprecations: "5.0"` no longer accepted.**
  - **`undefined` as a type alias name** prohibited.
  - **Stricter decorator parsing** — some decorator forms now require parens.
  - **Reference directive emit** simplified — synthesized `/// <reference />` no longer auto-added; explicit ones are dropped from `.d.ts` output unless marked `preserve="true"`.

### Implications (layered)

- **Regex audit (the headline risk):**
  - Broad grep showed ~100 candidate hits, but most are URLs / non-regex slashes. A targeted pass for known-fragile patterns (named groups `(?<`, lookbehinds `(?<=` / `(?<!`, `\d` inside character classes, backreferences `\1`–`\9`) finds **zero advanced patterns** in source. Risk surface is mostly in form-validation regexes (likely `packages/base/Input`, `NumberInput`, `PasswordInput`, `DateSelect`) and possibly in `picasso-rich-text-editor`.
  - Action: after bumping, run `yarn tsc:all` and triage. Expect ≤ 10 hits, each a one-line fix (escape a `]` or `}`, drop a redundant `\`).
- **Inferred type predicates:** mostly invisible upgrade. May expose ~5 places where a hand-rolled `function isFoo(x): x is Foo` is now redundant; safe to delete or leave.
- **Reference-directive emission change** — affects `.d.ts` output. We publish declaration files (`declaration: true` in `tsconfig.base.json`), so consumers of our packages may notice slight `.d.ts` differences. Nothing functionally broken; worth a smoke check by diffing one published `.d.ts` before/after.
- **`undefined` type alias** — we don't have one (would be a lint flag); non-event.
- **Hard-error transition for 5.0 deprecations** — none of those flags exist in our tsconfigs (verified). Non-event for *us*. The reason this matters in many other repos: stale `ignoreDeprecations` knobs that were copy-pasted. We have none.
- **CRITICAL — toolchain alignment:**
  - `@typescript-eslint` must be `>= v8.10` (full 5.5/5.6 support; original v8 capped at `<5.5.0`).
  - That requires a `@toptal/davinci-syntax` major that ships with `@typescript-eslint@v8.10+`. **This is the single most likely blocker for the whole upgrade and should be confirmed with the davinci team before scoping start.**
  - If davinci-syntax has not shipped a TS-5.5-compatible major: bridge with a `resolutions` entry pointing `@typescript-eslint/*` at `^8.10.0` and `typescript` at `5.5.x` inside the davinci-syntax subtree. Lint may emit warnings about parser/plugin version mismatch, but builds work.
- **Bump:** `typescript: ~5.5.0`. Add changeset entries for any package that exposes types in its public API (i.e., everything published).

---

## Practical execution checklist

Per the user's preference for layered work, ship as **8 atomic commits on this branch**, one per minor release:

1. `[PF-2031] Upgrade TypeScript to 4.8` — bump versions, fix decorator-API drift in `picasso-codemod` if any, fix any `Promise.resolve` retypings.
2. `[PF-2031] Upgrade TypeScript to 4.9` — minimal; `Promise.resolve` + `=== NaN` cleanups.
3. `[PF-2031] Upgrade TypeScript to 5.0` — **largest commit.** Includes davinci-syntax decision (bump or `resolutions` bridge), enum review, casing-consistency cleanup, DOM lib drift fixes, ts-expect-error audit.
4. `[PF-2031] Upgrade TypeScript to 5.1` — typically a version bump only.
5. `[PF-2031] Upgrade TypeScript to 5.2` — version bump + small lib drift.
6. `[PF-2031] Upgrade TypeScript to 5.3` — version bump.
7. `[PF-2031] Upgrade TypeScript to 5.4` — closure-narrowing fallout, enum compat re-check.
8. `[PF-2031] Upgrade TypeScript to 5.5` — regex audit, final davinci-syntax / typescript-eslint v8.10+ alignment, `.d.ts` output diff smoke test, root + 11 package bumps, changeset.

**Verification per step:** `yarn tsc:all` (project-references typecheck — the canonical gate), `yarn test:unit:ci`, `yarn build:package`. Cypress integration only on the final commit unless something obviously DOM-touching changed.

**Total realistic budget:** 4–6 dev days, dominated by step 3 (TS 5.0) and step 8 (TS 5.5 regex + tooling alignment). The other six steps should each take 1–3 hours including verification.

## Bumping all davinci-* packages together: blast-radius analysis

`toptal/davinci#2677` publishes alphas for **every** davinci-* package picasso depends on (syntax v24, engine v14, ci v8, code v3, qa v19). Strictly, only `davinci-syntax` is required to unblock TS 5.5 — but if we choose to keep everything aligned and bump them all, here's what we're signing up for, organized by how heavily picasso *actually* uses each package.

### Picasso's real usage of each davinci package

| Package | Where picasso touches it | Surface |
|---|---|---|
| `davinci-syntax` v22→v24 | `.eslintrc.js` `extends`, `.prettierrc.js` `require`, `lint`/`lint:fix` scripts, lint-staged hook | **High** — runs on every commit + CI |
| `davinci-qa` v18→v19 | `jest.spec.mjs` imports its swc jest config, `cypress.config.mjs` imports its cypress config, `cypress/support/component.ts` imports its support, `test:unit` CLI | **High** — every test run |
| `davinci-engine` v12→v14 | Only `npx davinci-engine publish-package` in `.github/actions/build-publish-alpha-package/action.yml` | **Low** — alpha-release CI only |
| `davinci-ci` v7→v8 | `yarn davinci-ci danger` in `.husky/pre-push` and `.github/actions/danger/action.yml` | **Low** — Danger checks only |
| `davinci-code` v2→v3 | `generate:component` and `generate:example` scripts | **Very low** — developer codegen, no CI/build path |

Note: **neither `davinci-engine` nor `davinci-ci` is imported from any source file in picasso.** They are pure CLI consumers. That's important — it bounds their breakage surface to CI/release scripts, not the typecheck/build.

### Per-package break risk

#### `davinci-syntax` v22 → v24 — **highest risk, mostly lint regressions**

What the PR diff shows changing in the shared ESLint config:
- **`@typescript-eslint/ban-types` removed** — split into `no-empty-object-type`, `no-unsafe-function-type`, `no-wrapper-object-types`. The previous allowances for `{}` / `Function` / `object` are preserved by turning the new rules **off** in the config snapshot. Net effect on picasso: zero new errors from these.
- **`@typescript-eslint/no-var-requires` renamed `no-require-imports`** — picasso's `.eslintrc.js` doesn't override either name, so neutral.
- **Formatting rules removed** (`space-before-function-paren`, `comma-dangle`, `func-call-spacing`, `member-delimiter-style`) — picasso doesn't override these; Prettier already handles. Neutral.
- **`@typescript-eslint` v6 → v8** brings new defaults across many other rules. Most likely real impacts on picasso:
  - **`no-explicit-any` is in the davinci config** (we already override it to `off` in test files). The **33 production-code `: any` hits** (mostly in `picasso-charts` Recharts wrappers and `picasso/CategoriesChart`) will newly lint-error unless we either (a) extend the test override to those files, (b) replace the `any` with a real type, or (c) annotate `eslint-disable-next-line`. **This is the single most likely lint regression.**
  - Stricter inference in `no-floating-promises`, `no-misused-promises`, `no-unsafe-*` rules — typescript-eslint v8 ships with smarter type-aware checks. May surface 5–30 new warnings in async code paths (`AvatarUpload`, `Dropzone`, `RichTextEditor`).
- **ESLint floor moves `^8.34.0` → `^8.57.0`** — picasso doesn't pin ESLint directly; resolves transitively. Should auto-resolve clean.
- **`eslint-plugin-unused-imports` v3 → v4** and **`eslint-plugin-jest` v27 → v28** — picasso doesn't reference either plugin in `.eslintrc.js`, so direct breakage is unlikely. Watch for new defaults on jest-rule recommendations.

**Mitigation:** run `yarn lint` after the bump, expect a batch of `no-explicit-any` + smart-promise errors, fix or `eslint-disable` per file. Budget: 1–3 hours.

#### `davinci-qa` v18 → v19 — **low risk, peer widening only**

PR changeset marks this a **minor** bump. The only documented change: peer range for `@toptal/davinci-engine` widened from `3 - 14` to `3 - 15`. Picasso's actual imports are `@toptal/davinci-qa/src/configs/jest.swc.config.js` and `.../cypress.config.js` plus support — these config-export shapes have not changed in the PR diff. **No expected breakage.** Transitive `@types/jest` bumps `^28 → ^29.5` in the davinci monorepo, but picasso doesn't declare `@types/jest` directly, so the type signatures we get from jest globals may shift slightly — expect 0–5 test-file type errors at most.

#### `davinci-engine` v12 → v14 — **medium risk, isolated to one CI workflow**

The PR's changeset documents only TS peer + `@babel/preset-typescript` peer (`^7.17.12` → `^7.26.0`). What v13 brought (since it was released before this PR) is unknown without pulling its changelog. Picasso's exposure is one line: `npx davinci-engine publish-package` in the alpha-release GitHub action. **Risk:** the `publish-package` CLI signature/output may have changed between v12 and v14; if so, that workflow fails on next alpha release. Easy to validate by reading `davinci-engine/bin/davinci-engine.js` after bumping.

Note: even though picasso has `@babel/preset-typescript: ^7.22.5` declared directly, davinci-engine v14's peer wants `^7.26.0`. Bumping engine therefore requires bumping picasso's `@babel/preset-typescript` to `^7.26.0` too. That's a minor Babel 7 jump and very unlikely to break — Babel 7.x is famously stable.

#### `davinci-ci` v7 → v8 — **medium risk, isolated to Danger checks**

Not in this PR's changeset, so the major comes from an earlier change on master. Picasso's exposure is one line in `.husky/pre-push` (`yarn davinci-ci danger --local`) and one line in `.github/actions/danger/action.yml`. **Risk:** if the `danger` subcommand changed args/config-file format, the pre-push hook and the CI danger job break. Validate by skimming `davinci-ci/CHANGELOG.md` for v8 entries.

#### `davinci-code` v2 → v3 — **very low risk, dev-only**

Not in this PR's changeset either. Picasso uses it only via `generate:component` and `generate:example` Hygen-style codegen scripts. **Risk:** template format or CLI flags changed → developers can't generate new components until templates are updated. Not a CI/build blocker.

### Recommended sequencing if we go "bump everything"

1. **Step A — syntax + qa together.** Both are heavy-usage; align them as one commit. The qa peer-widening alone (engine `3-15`) means qa v19 still accepts engine v12, so we don't yet need to touch engine.
2. **Step B — engine + the @babel/preset-typescript bump.** Single commit. Validate the alpha-release workflow doesn't break by triggering a test alpha.
3. **Step C — ci + code.** Single commit. Validate Danger runs and `generate:component` still produces valid output.

Reason to split rather than ship one mega-commit: each davinci-* major has independent failure modes (lint, release CI, danger, codegen). A bisectable history makes triage trivial; a single "bump all davinci to alphas" commit makes it a guessing game.

### Bottom line

- Bumping all five is **safe to plan for**, but only `davinci-syntax` is technically required by the TS 5.5 work.
- `davinci-qa` v19 is essentially free (minor bump).
- `davinci-engine`/`-ci`/`-code` carry medium-to-low CI-script risk, not source-code risk — they're worth bumping for hygiene, but should not be coupled into the same commit as the TS upgrade.
- Real bookkeeping cost beyond TS itself: **one batch of `no-explicit-any` lint fixes** (~33 hits in production code) and **bumping `@babel/preset-typescript` to `^7.26.0`** in picasso's own devDeps.

## Open questions for the team

1. **What's the latest `@toptal/davinci-syntax` major and what TypeScript version range does it support?** Answered: v24 (alpha now, stable when `toptal/davinci#2677` merges). Peer `typescript: ^5.5.0`.
2. **Are downstream consumers of Picasso pinned to a TypeScript major?** A consumer on TS 4.x cannot consume `.d.ts` files generated by TS 5.x without a few caveats (declaration shape stability is generally OK, but `const` type parameters and `satisfies` would be unusable from 4.x consumers). Worth a check before publishing.
3. **Should we adopt `--moduleResolution bundler`?** Not required, but our Storybook + webpack setup arguably benefits. Out of scope for this upgrade; flag as a follow-up.
4. **What changed in davinci-engine v13 and davinci-ci v8 / davinci-code v3?** These majors land in picasso transitively if we choose to bump everything; their changelogs are not in PR #2677. Need to pull them from the davinci repo before committing.
