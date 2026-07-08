# PF-2023 — picasso-provider migration report (the PI canary)

**Ticket:** [PF-2023 — Decommission @toptal/picasso-provider MUI v4 runtime + remove root peer-dep](https://toptal-core.atlassian.net/browse/PF-2023) (epic [PF-1988](https://toptal-core.atlassian.net/browse/PF-1988))
**Branch:** `migrate-picasso-provider` → `feature/picasso-modernization-temp`
**Status (2026-07-08):** code complete & building; pending DoD validation (Happo / Portal smoke / React 19) + snapshot regen + stack reconcile.
**Companion docs:** [migration brief](./PI-4318-PF-2023-provider-migration-brief.md) (what was *planned*) · this report (what was *done*).

> **Audience.** Read this as (a) a PR review appendix, (b) an onboarding explainer of *what* moved and *why*, and (c) input for the next AI/engineer session that writes the **consumer-application migration plan** and the improvement follow-ups. §5 (breaking changes) and §9 (consumer guidance) are the consumer-facing parts; §4 (decisions) and §7 (engineering notes) are the "why" and the reusable lessons.

---

## 1. TL;DR

`@toptal/picasso-provider` no longer runs a MUI v4 theme/JSS runtime, and `@toptal/picasso` no longer declares `@material-ui/core` as a peer dependency. **`@material-ui` is now absent from every `src`, every `package.json`, and the lockfile** — the PI's canary. Both packages now allow React 19 (`react`/`react-dom` peer widened to `>=16.12.0`). The provider is now a *services + context* layer (CSS reset, fonts, favicon, notifications, RootContext, breakpoints) rather than a theme runtime; styling is Tailwind end-to-end.

The change is **behavior-preserving for the rendered UI** (byte-identical or immaterial CSS) but **API-breaking** for the theme-customization surface (`PicassoProvider`, `.override()`, the `theme`/`injectFirst`/`disableClassNamePrefix` props, `getServersideStylesheets`) — all of which were MUI-coupled and mostly inert after the component migrations. Breaking removals were chosen deliberately (see §4) after an org-wide usage audit.

---

## 2. Context & goal

PF-2023 is the **last step of PI-4318** (Picasso modernization off `@material-ui/core` v4 + JSS onto `@base-ui/react` + Tailwind). All 28 base components + the 3 sibling packages were migrated first; the provider ran last because it underpins them and its final commit removes the root MUI peer-dep. Goals:

- Zero `@material-ui` / JSS in `packages/picasso-provider/src/**`.
- Remove `@material-ui/core` from the provider deps and the `@toptal/picasso` peer-deps (**the canary line**).
- Unblock **React 19** (O2) and the **deprecated-deps audit** (O1 = 0).
- Keep the rendered library visually identical (Happo gate) with no consumer *runtime* regressions.

---

## 3. What changed (by area)

Delivered as a sequence of logical, individually-green commits on `migrate-picasso-provider` (Tooltip [#5005] and query-builder [#5006] were merged into the branch so the whole tree was MUI-free for the canary; they reconcile out on rebase — see §6).

| Area | Before (MUI v4 / JSS) | After (Tailwind / plain) |
|---|---|---|
| **CssBaseline** | `makeStyles` `@global` reset injected at runtime | Same 12 reset rules injected via a runtime `<style>` (unlayered, `reset`-prop-gated). No MUI/JSS. |
| **NotificationsProvider** | `makeStyles` classes passed to notistack `classes` | Tailwind class strings on notistack's `classes`; `[&>div]`/`[&>div>div]` variants target its container DOM. notistack integration unchanged. |
| **PicassoRootNode** (+ `Picasso/styles.tsx`) | `makeStyles` `root` (flex, border-box island, `& * { font }`) | Tailwind `className` on the root `<div>`: `flex-1 box-border`, `[&_*]:font-sans`, `[&_*]:[box-sizing:inherit]` (+ `::before`/`::after`). |
| **PreventPageWidthChangeOnScrollbar** | `makeStyles` `@global` at `screens('md','lg','xl')` | Runtime `<style>` built from `screens()` at render (keeps the `disableMobileBreakpoints()` dynamic). |
| **Responsive-styles engine** (`makeResponsiveSpacingProps`) | `makeStyles` media-query classes + inline CSS vars | Media-query CSS built from config + injected once via runtime `<style>`; inline-var machinery unchanged; `{className, style}` contract preserved. **SSR helper `get-serverside-stylesheets.ts` retired.** |
| **PicassoProvider + Picasso/PicassoLight + config** | `createTheme`, `MuiThemeProvider`, `StylesProvider`, module augmentations, `useMediaQuery` | `PicassoProvider` deleted; providers dropped; module augmentations removed; `useBreakpoint` uses `window.matchMedia`. Token config exports (colors/spacings/breakpoints/…) unchanged. |
| **package.json (canary)** | `@material-ui/*` deps + peer-dep; `react < 19` cap | MUI removed; `react`/`react-dom` peer `>=16.12.0`. Swept the last transitive MUI pull (`notistack@1.0.10` peer on Utils) and under-declared `@types/react-transition-group` (Collapse/Fade/Slide). |
| **PicassoBook docs-UI** (`.storybook/components/*`) | `makeStyles`/`createStyles` | Tailwind class strings; `.storybook` added to the Tailwind `content` scan. Dev-only tooling. |

A prerequisite commit (**"Decouple Page from PicassoProvider theme via RootContext responsive flag"**) moved Page's one runtime read of the theme (`layout.contentMinWidth`) onto the RootContext `responsive` flag + a static `min-w-[768px]` class, which is what made `PicassoProvider.theme` deletable.

---

## 4. Key decisions & rationale

Each decision below was made against the migration's overriding rule — **library swap, no consumer-visible *runtime* change, preserve existing violations** — and, where that conflicted with "kill MUI cleanly," resolved with org-wide usage evidence.

### 4.1 Delivery: stacked branch, one PR, logical commits
- Branch `migrate-picasso-provider` off `temp`; **merge Tooltip #5005 + query-builder #5006 in** so the whole tree is MUI-free for the canary + DoD validation, rather than waiting for them to land. One PR, ~8 logical commits. Repo merges are **squash**, so the stacked merges must be **rebased away** before the PR is review-ready (see §6).
- *Implication:* PR diff carries #5005/#5006 until they land on `temp`; keep the PR **draft** until reconciled.

### 4.2 CssBaseline → runtime `<style>` (not `@layer base`)
- **Decision:** keep the reset as a runtime `<style>`, **unlayered**, still gated by the `reset` prop; do **not** move it to a Tailwind `@layer base` preflight yet.
- **Why:** Picasso ships **no CSS bundle** — consumers run Tailwind via the `@toptal/picasso-tailwind` **preset**. A build-time `@layer base` reset would (a) only reach consumers who update their Tailwind entrypoint, (b) demote the reset *below* unlayered consumer CSS (cascade regression), and (c) lose the `reset={false}` opt-out. Unlayered runtime injection is byte-identical and needs zero consumer change.
- **Not Helmet** (the house head-injection tool) because `PicassoLight` and `<Picasso disableHelmet>` have **no `HelmetProvider`** — a Helmet-based reset would break there. The reset must not be Helmet-gated.
- **Not the React-19 hoistable `<style href precedence>`** yet — `@types/react` is v17 in the workspace, so it wouldn't typecheck.
- *Implication / follow-up:* true `@layer base` preflight + hoistable `<style>` end-state tracked in **[PF-2221]**. Recorded as a migration-period exception in `docs/migration/references/design-patterns-addendum.md §2` so a review sweep won't "correct" it.

### 4.3 Responsive-styles engine → faithful port, bug-compatible
- **Decision (Option 1):** port `makeResponsiveSpacingProps` off `makeStyles` to a runtime `<style>` injection with a config-sourced CSS builder; keep the generic `{className, style}` hook contract and the inline-var machinery unchanged.
- **Bug-compatible:** the original emitted breakpoints **largest-first**, which *inverts* mobile-first cascade (on wide viewports the *smallest* specified breakpoint wins). Ported **as-is** and documented — fixing it in a library-swap PR would be an untested behavior change.
- **Evidence:** org-wide search found the responsive-object feature has **zero adoption** — every `Dropdown offset` callsite passes scalars; `makeResponsiveSpacingProps`/`ResponsiveSpacingType`/`isResponsiveSpacing` have zero external hits; the hook isn't in the `@toptal/picasso` aggregate; in-repo it's used **once** (Dropdown). Scalar offsets never touch the class machinery, so real-world usage is byte-identical.
- *Implication / follow-up:* retire the engine + converge Dropdown on Container's static-Tailwind pattern + fix the cascade → **[PF-2226]**.

### 4.4 Core provider → aggressive API removal
- **Decision (Option 3):** delete `PicassoProvider` outright (incl. `.override()`, `.extendTheme()`, `.disableResponsiveStyle()`), drop `StylesProvider`/`MuiThemeProvider`, and remove the `theme`, `injectFirst`, and `disableClassNamePrefix` props — rather than keeping them as deprecated no-ops.
- **Why:** these only ever configured the MUI theme / JSS injection, which are gone. Org-wide audit: `theme=` / `.extendTheme` / `PicassoProvider.theme` reads / `.disableResponsiveStyle` / `responsive={false}` → **0 external**; `.override()` → **1** external callsite (talent-activation-frontend); `injectFirst` → ~8 repos; `disableClassNamePrefix` → ~9 repos. Compile errors are a better discovery mechanism than silent no-ops, and one major beats a deferred second removal.
- **`useMediaQuery` → `window.matchMedia`** in `useBreakpoint` (guarded for jsdom/SSR). Note: `screens()` returns an `@media …`-prefixed string; MUI's `useMediaQuery` stripped that prefix and the replacement must too.
- *Implication:* consumer cleanup (mostly one-line prop deletions, one real `.override` rework) → **[PF-1995]** + a `@toptal/picasso-codemod` transform.

### 4.5 Canary + transitive sweep
- Removed `@material-ui/*` from the provider deps, the `@material-ui/core` peer-dep from `@toptal/picasso`, and lifted the `react < 19` cap on both.
- Removing MUI **exposed two under-declared transitive dependencies** that MUI had been silently supplying: `@toptal/picasso-utils` pinned `notistack@1.0.10` (notistack v1 → MUI v4) as a **vestigial, unused** peer (dropped); and `Collapse`/`Fade`/`Slide` import `react-transition-group` but relied on `@types/react-transition-group` coming in via MUI (now declared directly).
- *Scope boundary:* the repo-wide `react < 19` cap lift on the remaining ~57 **non-MUI** packages is **O2**, not this canary (PF-2023 *unblocks* O2).

### 4.6 Docs-UI (PicassoBook) off MUI
- The `.storybook/components/*` docs-UI (PropsTable, CodeExample, Editor, Markdown, TabsSection) styled itself with `makeStyles`. Converted to Tailwind class strings. Required **adding `.storybook` to the Tailwind `content` globs** (previously only `packages/**` was scanned, so docs-UI Tailwind classes wouldn't generate).
- The code font keeps the original Monaco stack as a **quote-free arbitrary value**; the editor marks it `!important` to beat PicassoRootNode's app-wide `[&_*]:font-sans` (equal specificity — see §7). Dev-only tooling, not Happo-gated.

---

## 5. Breaking changes (consumer action required)

`@toptal/picasso-provider` and `@toptal/picasso` bump **major**.

| Removed / changed | Replacement | Notes |
|---|---|---|
| `PicassoProvider` export + `.override()`, `.extendTheme()`, `.disableResponsiveStyle()` | Style via Tailwind `className` / `data-*`; no runtime theme override | `.override()` had 1 external callsite (talent-activation) |
| `<Picasso>` / `<PicassoLight>` `theme` prop | For page content width: `<Page className="[--content-width:80em]">`. Other MUI theme fields had no runtime effect. | |
| `injectFirst` prop | Delete it (JSS-only; no effect without StylesProvider) | ~8 repos pass it |
| `disableClassNamePrefix` prop | Delete it (JSS class-name seeding is gone) | ~9 repos pass it |
| `getServersideStylesheets` | Drop from SSR setup; Tailwind extracts CSS at build time | JSS server-side collection obsolete |
| `@material-ui/core` peer-dep of `@toptal/picasso` | Remove it from the consumer's deps | The canary |
| `Layout.contentMinWidth` type field | Use the `responsive` prop (unchanged) | Was unread after the Page decouple |
| `react`/`react-dom` peer `< 19` cap | Widened to `>=16.12.0` | Enables React 19 |

**Non-breaking but observable:** `PicassoRootNode` and the notistack container class names change from JSS hashes to Tailwind classes (JSS hashes were random-seeded, never a contract). The `reset` prop now injects an unlayered runtime `<style>` (byte-identical output).

**Consumers running their own MUI v4 under Picasso** (4 repos identified): Picasso's `StylesProvider injectFirst` was *also* configuring *their* JSS injection order. After this, they must add their own `<StylesProvider injectFirst>` from `@material-ui/core/styles`.

---

## 6. Follow-ups

| Ticket / item | What | Why deferred here |
|---|---|---|
| **[PF-2221]** | Promote the CssBaseline reset to a true Tailwind `@layer base` preflight + React-19 hoistable `<style>` | Needs consumer Tailwind-entry coordination + React 19 types; behavior/cascade-sensitive |
| **[PF-2226]** | Retire the responsive-styles engine; converge Dropdown `offset` on Container's static-Tailwind pattern; **fix the inverted mobile-first cascade** | Zero adoption; convergence is a reviewable design change, not a library swap |
| **[PF-1995]** | Consumer migration: strip removed props, rework the 1 `.override` callsite; ship the `@toptal/picasso-codemod` transform | Cross-repo; not part of the library PR |
| **O2** | Repo-wide `react < 19` peer-cap lift on the ~57 remaining non-MUI packages (React 19 org-wide) | Separate effort that PF-2023 *unblocks* |
| **[PF-2210]** | Staff Portal migrate to the new Page + Provider | Was *blocked by* PF-2023 |
| Token single-source-of-truth | Dedup the raw tokens between `@toptal/picasso-tailwind` (preset) and `Picasso/config` (runtime JS exports) | Runtime token exports are still needed (charts, `useBreakpoint`, spacing props); the duplication (drift risk) is the real cleanup |
| Process (this PR) | Repo-wide `pnpm test:unit -- -u` snapshot regen (drift from CssBaseline `<style>` + RootNode restyle); rebase off #5005/#5006 once they land on `temp`; DoD validation (Happo / Portal smoke / React 19) | Snapshots/validation belong in the Node-22/CI env |

---

## 7. Engineering notes & gotchas (reusable lessons)

These bit us during the migration and generalize to future MUI→Tailwind work and to the next AI session:

1. **`build:package` (tsc) green ≠ everything works.** tsc validates types only. Runtime bugs (the `matchMedia` `@media`-prefix regression) and the Storybook **webpack** build (the docs-UI `@material-ui` imports; the missing Tailwind `content` scan) are *separate gates*. Always run Storybook + Happo + a manual eyeball; tsc alone hides these.
2. **Tailwind `content` scope is `packages/**` only.** Tailwind classes authored anywhere else (e.g. `.storybook/**`) are **not generated** and silently do nothing. Add the path to `content` (or `@source`).
3. **`screens()` returns an `@media …`-prefixed string.** `window.matchMedia` needs it *stripped* (`^@media\s?`). MUI's `useMediaQuery` did this for us; a hand-rolled replacement must too. Guard for jsdom/SSR (`typeof window.matchMedia === 'function'`).
4. **Removing MUI exposes under-declared transitive deps.** Packages that imported `react-transition-group` (or its `@types`) or pinned an old `notistack` had been free-riding on MUI's dependency tree. After MUI is gone, declare them directly. Grep the lockfile (not just `package.json`) for the last `@material-ui` references and trace *what pulls them*.
5. **Equal-specificity cascade wars.** PicassoRootNode's app-wide `[&_*]:font-sans` (`.root *`, specificity 0,1,0) fights a child's `[&_*]:font-[…]` (same 0,1,0) — order decides, fragile. A **type-selector** variant (`[&_code]:` = 0,1,1) wins naturally; a **universal** one (`[&_*]:`) needs `!important` or a specificity bump. JSS resolved this by injection order; Tailwind's layer order doesn't preserve component nesting.
6. **The box-sizing "island."** Picasso sets the page to `content-box` (CssBaseline) and a `border-box` island on the Picasso root (descendants + `::before`/`::after` inherit). Tailwind **preflight is not active**, so this reset is the *only* box-sizing source — don't assume border-box. Preserved verbatim (existing-violations carve-out).
7. **"done" in the manifest ≠ MUI-free.** A stale local git ref showed a migrated component still carrying MUI; a fresh fetch cleared it. Verify component state on a **fresh fetch of `temp`**, never a cached ref or the manifest's `done` flag.
8. **Prefer arbitrary *values* over arbitrary *properties*, and avoid quotes in arbitrary values.** `[transition:padding_300ms_ease_0ms]` preserves the exact `ease` timing (the `transition-[padding]` *utility* injects Tailwind's own cubic-bezier). Font stacks work quote-free (`font-[Monaco,Menlo,Ubuntu_Mono,…]`) — quotes+commas through the JIT are fragile.

---

## 8. Verification & DoD status

- ✅ `pnpm build:package` — **90 projects green** with `@material-ui` fully removed (src + every `package.json` + lockfile = 0).
- ✅ ESLint clean on all touched files.
- ✅ No jest snapshot captures the provider-internal changes; cross-package snapshot drift (from CssBaseline `<style>` + RootNode restyle) is a **known, deferred repo-wide `-u`**.
- ✅ **O1 (deprecated-deps audit) = 0** achievable — no MUI anywhere in the tree.
- ⏳ **Pending DoD:** full Storybook renders without console errors (manual/CI); full **Happo** (Storybook + Cypress) with Vitor sign-off on intentional reset diffs; ≥1 **Portal smoke** in staging; **React 19** validation across the library.

---

## 9. For the next application-migration plan (consumer-facing)

When writing the plan to migrate consuming apps onto this provider major:

1. **Mechanical (codemod-able):** delete the `theme`, `injectFirst`, and `disableClassNamePrefix` props from every `<Picasso>` / `<PicassoLight>` / `TestingPicasso`. Ship this as the `@toptal/picasso-codemod` transform (PF-1995).
2. **`PicassoProvider.override()`** callsites: rewrite to `className` on the target component. (1 known: talent-activation-frontend `MuiMenu` override → `<Menu className='…'>`.)
3. **SSR:** remove `getServersideStylesheets` from server render setup — no replacement needed (Tailwind is build-time).
4. **Theme customization via `theme=`:** only page content width had a runtime effect → `<Page className="[--content-width:…]">`. Token-level theming is not supported at runtime (use Tailwind).
5. **Apps running their own `@material-ui` v4 under Picasso** must add their own `<StylesProvider injectFirst>` (Picasso no longer configures their JSS injection).
6. **React 19:** the provider + `@toptal/picasso` now permit React 19; full org-wide readiness is O2 (the remaining packages' cap lift).
7. **Values you still import from `@toptal/picasso-provider`** (`palette`, `colors`, `breakpoints`, `screens`, `useBreakpoint`, `spacings`, …) are **unchanged** — only the MUI theme *object* and the customization API are gone.
