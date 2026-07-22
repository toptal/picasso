# PF-2226 + PF-2238 — execution plan (v2, expanded scope)

**Scope (expanded per operator decision, 2026-07-15):**

1. Retire the responsive-styles runtime engine; converge Dropdown `offset` on the static Tailwind class-table pattern (**PF-2226**) and close the SSR responsive-spacing bug (**PF-2238**) in the same PR.
2. **Dedup the spacing class table**: move Container's `SPACING_CLASSES`/`DEPRECATED_CLASSES` + resolver into `@toptal/picasso-utils` as the shared home; Container and Dropdown both consume it.
3. **Retire `PreventPageWidthChangeOnScrollbar`**: ship its CSS in `@toptal/picasso-tailwind/base` (`@layer base`), delete the component + prop. After this the provider injects **zero runtime CSS**.
4. **Box model: `box-sizing: initial` (content-box) is confirmed final for now** — fix every stale border-box reference (docs, comments, the pending changeset).

**Branch:** `migrate-picasso-provider-v2` (base `feature/picasso-modernization-temp`) — the open provider major carries all export/prop removals.

**Ticket relationship:** PF-2226 fixes PF-2238 **by construction** — static Tailwind classes are extracted into the consumer's CSS at build time, so the `@media` rules exist on SSR first paint; the client-only injector (and its adjacent defects: stale `injectedNames` cache, render-phase DOM write, inverted mobile-first cascade) is deleted, not hardened. PF-2238 Option A is **off the table**. Items 2–4 are PR-scope additions without their own tickets (they ride PF-2226's PR; spin PF tickets first if per-ticket traceability is wanted).

All file/line facts below re-verified on this branch 2026-07-15.

---

## Decisions locked

- **D1 — Shared resolver home: `@toptal/picasso-utils`** (`packages/base/Utils`). Container already depends on it (`package.json` dependencies), Dropdown already depends on it (imports `ClickAwayListener`, `noop`), and utils already has `@toptal/picasso-provider` as peer+dev dep — so `SpacingType`/`isPicassoSpacing`/`isResponsiveSpacing` imports work and **no dependency cycle exists** (provider does not depend on utils). Trade-off accepted knowingly: `getSpacingClasses`/`getSpacingStyles`/`SPACING_CLASSES` become public exports of `@toptal/picasso-utils` (barrel is `export * from './utils'`) — utils is the established home for cross-component helpers (ClickAwayListener precedent), and this beats the provider (whose API we're shrinking) and beats duplication.
- **D2 — Scrollbar fix folds into `base.css`** (not a separate CSS entry). The fix is default-ON today (`preventPageWidthChangeOnScrollbar = true`), so parity for the default-path consumer must be zero-action: they already import `@toptal/picasso-tailwind/base` per the PF-2023 migration instructions. A separate entry would force every default-path consumer to add an import. Opt-out consumers get a documented cascade-based escape (unlayered app CSS beats `@layer base` by definition).
- **D3 — Box model stays `box-sizing: initial`** (content-box, faithful to the legacy CssBaseline). The border-box flip (PF-2221 attempt) was reverted in #5046 and is not coming back for now. All docs/changeset text saying otherwise is stale and gets fixed in Commit 1.
- **D4 — Grid's `useResponsiveSpacing` stays** — analyzed below (§Grid); it is not engine-coupled and a static convergence requires a Grid/Grid.Item redesign, not a mechanical swap. Follow-up ticket, not this PR.

---

## Commit plan (6 commits, each individually green)

### Commit 1 — `Fix stale border-box references; content-box is the shipped box model`

Docs/comments only; zero runtime change. The #5046 revert restored `box-sizing: initial` but left border-box text everywhere:

- [base.css:16–23](../../packages/picasso-tailwind/src/base.css) — rewrite the comment above `box-sizing: initial`: content-box carve-out is deliberate (faithful to legacy CssBaseline); the border-box flip was attempted under PF-2221 and reverted (#5046); the PicassoRootNode border-box island remains the guard.
- [.changeset/decommission-mui-provider.md:22](../../.changeset/decommission-mui-provider.md) — **delete the border-box breaking-change bullet** (it announces a flip that no longer ships; publishing it would be false consumer guidance).
- [AGENTS.md:134](../../AGENTS.md) — "border-box page box model" → content-box wording (reset = body/root layout + font smoothing; box model stays content-box with the component island on border-box).
- [docs/contribution/styling.md:71](../contribution/styling.md) — same correction.
- [Report](PI-4318-PF-2023-provider-migration-report.md) lines ~64, ~104, ~135 — rewrite the three border-box passages to record: flip attempted, reverted in #5046, content-box confirmed final for now. (Line ~39, the PicassoRootNode island row, is still true — keep.)

### Commit 2 — `Move spacing class table and resolver to picasso-utils`

Pure move, zero functional change. **Container Happo zero-diff is the gate.**

- Move from `packages/base/Container/src/Container/utils/` → `packages/base/Utils/src/utils/spacing-classes/`:
  - `constants.ts` (`SPACING_CLASSES`, `DEPRECATED_CLASSES` — keep the `/* eslint-disable max-lines */`),
  - `get-spacing-classes.ts` (`getMappedClass`, `getResponsiveClasses`, `getSpacingClasses`, `getSpacingStyles`),
  - `get-spacing-classes.test.ts`.
    Re-export via a local `index.ts` + the package's `utils/index.ts` barrel. Match the utils package's existing folder conventions.
- Re-point [Container.tsx:11](../../packages/base/Container/src/Container/Container.tsx): `import { getSpacingClasses, getSpacingStyles } from '@toptal/picasso-utils'` (usages at lines 129, 154 unchanged). Trim Container's `utils/index.ts`; **`filter-out-strings-and-picasso-spacings.ts` (+ test) stays in Container** — it's Container-specific.
- No package.json changes needed (deps verified both directions). Run `pnpm refresh:tsconfig-references` and verify the Utils tsconfig picks up the provider type imports.
- **Do not touch** [SidebarItemHeader.tsx:34](../../packages/base/Page/src/SidebarItem/SidebarItemHeader.tsx) — its local `getSpacingStyles` is an unrelated namesake (different signature, Page-internal).

### Commit 3 — `Converge Dropdown offset on the shared spacing resolver`

No new class table anywhere — Dropdown consumes the moved resolver directly (its 4 margin types are a subset of the table's 6).

- [Dropdown.tsx](../../packages/base/Dropdown/src/Dropdown/Dropdown.tsx):
  - Delete the `makeResponsiveSpacingProps` import (line 9), the module-level `useResponsiveProps` setup (lines 103–106), and the hook call (lines 233–239). **Keep** the `SpacingType`/`DeprecatedSpacingType` type imports (lines 5–8) — the `Props` overloads still use them.
  - Add `getSpacingClasses, getSpacingStyles` to the existing `@toptal/picasso-utils` import (line 12).
  - Build once: `const offsetSpacing = { top: offset?.top, bottom: offset?.bottom, left: offset?.left, right: offset?.right }`. Popper (lines 277–281): `className={twJoin('shadow-2', externalClasses?.popper, getSpacingClasses(offsetSpacing))}` (`twJoin` flattens arrays). Style (line 294): `style={getSpacingStyles(offsetSpacing)}`.
  - Public overloads (`PropsWithBaseSpacing` / `PropsWithDeprecatedSpacing`) unchanged; the resolver accepts the full runtime `SpacingType` union, so no boundary narrowing.
- **Tests** (explicit assertions, **no new snapshots** — snapshot regen is deferred to Node 22): component-level in `Dropdown/test.tsx` (existing tests already open the dropdown), parity-pinned against today's engine output for all four input kinds:
  - token `{top: SPACING_8}` → popper classList contains `mt-8` (computed 2rem — identical to today's inline `marginTop:'2rem'`);
  - responsive `{top: {sm: SPACING_2, lg: SPACING_8}}` → contains `sm:mt-2` and `lg:mt-8` (asserts the **fixed** mobile-first semantics — cascade decided by Tailwind's stylesheet order, not emission order);
  - number `{top: 11.75}` → inline `marginTop: '11.75rem'`, no margin classes;
  - deprecated `{top: 'small'}` → `mt-4` (computed 1rem, matching today's `spacingToRem('small')`).
    If the moved resolver test lacks margin-type coverage for any of these kinds, extend it there too.
- **Story:** `story/ResponsiveOffset.example.tsx` + chapter wiring in `story/index.jsx` — responsive-object offset (e.g. `{sm: SPACING_2, lg: SPACING_8}`). First Happo coverage of the (now working) responsive path; new snapshot = addition, not a diff.

### Commit 4 — `Retire responsive-styles engine from picasso-provider`

- Delete `packages/picasso-provider/src/Picasso/utils/responsive-styles/` — all 17 files (10 source + 7 tests).
- [Picasso/utils/index.ts](../../packages/picasso-provider/src/Picasso/utils/index.ts): drop line 3 (`export * from './responsive-styles'`).
- **Untouched:** `config/spacings.ts` (`PicassoSpacing`, `SpacingType`, `ResponsiveSpacingType`, guards, `SPACING_*`) and `Picasso/utils/spacings.ts` (`spacingToRem`) — Container, the resolver, and the public type surface depend on them.

### Commit 5 — `Ship scrollbar-jump fix in the base entry; drop PreventPageWidthChangeOnScrollbar`

The component ([PreventPageWidthChangeOnScrollbar.tsx](../../packages/picasso-provider/src/PreventPageWidthChangeOnScrollbar/PreventPageWidthChangeOnScrollbar.tsx)) renders an undeduped, per-render-recomputed `<style>` with (at md/lg/xl, runtime-resolved): `html { width: 100%; overflow-x: hidden }` + `body { width: 100vw }`.

- **Add to [base.css](../../packages/picasso-tailwind/src/base.css)** inside `@layer base`:

  ```css
  @media (min-width: 768px) {
    html {
      width: 100%;
      overflow-x: hidden;
    }
    body {
      width: 100vw;
    }
  }
  ```

  (Today's md∪lg∪xl ranges are contiguous ≥768px, so one `min-width` query is equivalent for the default `responsive` case.)

- **Delete** `packages/picasso-provider/src/PreventPageWidthChangeOnScrollbar/` (component, styles, index) and its render in [Picasso.tsx:70–72](../../packages/picasso-provider/src/Picasso/Picasso.tsx); remove the public export from provider `src/index.ts`.
- **Remove the prop end-to-end** (provider major covers it): `PicassoProps` ([Picasso.tsx:29,46,65](../../packages/picasso-provider/src/Picasso/Picasso.tsx)), `PicassoGlobalStylesProvider` (lines 19, 40, 86), `RootContext` field + `usePreventPageWidthChangeOnScrollbar` hook ([RootContext.ts:19,102–109](../../packages/picasso-provider/src/Picasso/RootContext.ts) — the hook is a public provider export; removal is a major bullet).
- **PageTopBar coordination** — the one real flag consumer: [PageTopBar.tsx:74,147](../../packages/base/Page/src/PageTopBar/PageTopBar.tsx) conditionally applies `md:w-screen`. Make it **unconditional** (drop the hook read). For default-path consumers (base entry imported) this is behavior-identical; the top bar's `w-screen` and the body's `100vw` stay coordinated by construction.
- **Clean up in-repo prop usages** (TS errors once the prop is gone): [TestingPicasso.tsx:15](../../packages/base/Test-Utils/src/test-utils/TestingPicasso.tsx), [Favicon/test.tsx:13](../../packages/picasso-provider/src/Favicon/test.tsx), [Page/test.tsx:36](../../packages/base/Page/src/Page/test.tsx), provider stories `Default.example.tsx:11` + `DisableResponsiveUI.example.tsx:89`. (Tests passed `false`, so no snapshot content ever included the style — deletion is snapshot-neutral.)
- **Org-wide audit results (done 2026-07-15, separate session — no re-run needed):** 2 production opt-outs + ~8 infra usages; `usePreventPageWidthChangeOnScrollbar` has **zero** external consumers.
  - **signal** — opted out because `overflow-x: hidden` on `<html>` clips wide tables at intermediate widths (kills horizontal scroll). Remedy: two-line unlayered CSS override (`html { overflow-x: visible } body { width: 100% }`) — beats `@layer base` by cascade, no `!important` needed.
  - **sourcing-extension** (TACO) — a browser extension injecting into LinkedIn Recruiter pages; the fix would leak `body { width: 100vw }` into the host page. Remedy: don't import the base entry into host-page context at all — an extension shouldn't take any of Picasso's page-level globals.
  - **top-assessment** — not an opt-out, but has overridden the default with plain CSS + `!important` for years: living proof the CSS escape works. Once the fix is layered they can drop the `!important`.
  - ~8 infra files (topkit / talent-activation / talent-resume Storybook decorators + test wrappers) — one-line prop deletion at upgrade; they control their own CSS imports, and jsdom doesn't meaningfully apply media-queried global CSS.
- **Hard removal is deliberate — no deprecated no-op.** A no-op prop would let sourcing-extension upgrade cleanly and silently re-break LinkedIn pages. Removing the prop from the interface produces a TS error on the JSX at exactly the moment a human is upgrading — **the compile break is the safety mechanism.** Same logic covers the infra files (trivial, but consumer-visible on purpose).
- **Documented behavior deltas** (all changeset-documented):
  1. Opt-out consumers lose the prop — per-consumer remedies above, plus a `className` override on `Page.TopBar` for anyone needing `md:w-screen` off.
  2. `responsive={false}` consumers: `disableMobileBreakpoints()` empties the md query, so today their fix starts at **1024px**; static CSS applies from **768px** always.
  3. `PicassoLight` consumers newly gain the fix via the base entry (PicassoLight never rendered the component).

### Commit 6 — `Update changesets and docs for engine retirement and scrollbar base migration`

**Changesets:**

- Extend [decommission-mui-provider.md](../../.changeset/decommission-mui-provider.md) with two bullets:
  1. `makeResponsiveSpacingProps` removed (zero external usage). Must do PF-2238's documentation duty: per-breakpoint spacing now compiles to static Tailwind classes present in build-time CSS → **correct on SSR first paint**; the previous port was client-only (SSR HTML carried classes/variables but no `@media` bridge until hydration). This corrects the line-18 claim ("Tailwind extracts CSS at build time … no replacement needed") that was true for everything _except_ this stylesheet.
  2. `PreventPageWidthChangeOnScrollbar` component, prop, and `usePreventPageWidthChangeOnScrollbar` hook removed (hook: zero external consumers). The fix ships in `@toptal/picasso-tailwind/base`. **Name the known opt-outs with their specific remedies in the body** — signal (unlayered two-line override restores wide-table horizontal scroll), sourcing-extension (keep the base entry out of host-page context entirely), existing `!important` overrides like top-assessment's (can drop the `!important` now that the fix is layered), infra wrappers (delete the prop) — plus deltas 2–3 above. **The provider now injects zero runtime CSS.**
- New `.changeset/dropdown-offset-static.md` — `'@toptal/picasso-dropdown': patch`: `offset` renders via the shared static class table (tokens/deprecated strings → classes; raw numbers stay inline styles); **fixes the inverted responsive cascade** (largest-breakpoint-first emission made the smallest breakpoint win on wide viewports; present since the feature shipped; zero measured adoption); responsive offsets now correct on SSR first paint (relevant with `keepMounted`+`disablePortal`); margins move inline-style→class for token/deprecated values (consumer CSS can now override; identical computed values); responsive `offset` no longer reacts to `disableMobileBreakpoints()` (fixed screens — same as Container).
- New `.changeset/utils-spacing-classes.md` — `'@toptal/picasso-utils': minor`: add `getSpacingClasses`/`getSpacingStyles`/`SPACING_CLASSES`/`DEPRECATED_CLASSES` (moved from Container internals; now shared by Container + Dropdown).
- New Container changeset — `patch`: internal import re-point, no consumer-visible change.
- New Page changeset — **`major`** (real opt-outs exist, so for them this is a flipped default — name the break per changeset guidelines): `PageTopBar` always applies `md:w-screen`, matching the page-width fix now shipped in the base entry; consumers that opted out and need it off override via `className` on `Page.TopBar`.
- Extend `.changeset/picasso-tailwind-base-entry.md`: the base entry now includes the scrollbar page-width-jump fix (≥768px).

**Docs:**

- [practices.md:164](../migration/references/practices.md) — rewrite the "Responsive spacing utilities" bullet: responsive spacing = the shared static class table + pure resolver in `@toptal/picasso-utils` (Container/Dropdown precedent); `makeResponsiveSpacingProps` is deleted; never reintroduce runtime class generation/injection.
- [Report](PI-4318-PF-2023-provider-migration-report.md): §3 row (~69–70) → engine deleted, PF-2226 executed in-PR, cascade + SSR gap fixed; §6 PF-2226 row (~117) → executed; scrollbar row → moved to base entry, provider injects zero runtime CSS, duplicate-`<style>` defect gone.
- [ADR 19](../decisions/19-responsive-component-spacing-properties.md): status note — API kept as designed; runtime CSS-var/media-query mechanism replaced by the shared static class table; mobile-first cascade now actually correct; SSR compatibility (explicit in this ADR's Problem statement) restored after the PF-2023 port silently lost it; `disableMobileBreakpoints()` no longer affects responsive spacing.

**Jira (via MCP; PF-2238 currently unassigned, no links on either ticket):**

1. At execution start: link PF-2238 "is fixed by" PF-2226.
2. On PR ready: comment on PF-2238 with the closure mapping below + explicit "Option A must not be built".
3. On merge: update PF-2226 description to executed state (PF-2221 pattern); transition both.
4. **Team heads-ups before merge** (operator sends or approves drafts): **TACO** (sourcing-extension — must keep the base entry out of host-page context or LinkedIn pages re-break) and **signal's team** (re-apply their wide-table override as unlayered CSS at upgrade). Without these they rediscover their old bugs from scratch.
5. Optional: spin PF tickets for the scrollbar retirement + table dedup if per-ticket traceability is wanted; otherwise they're PR-scope items recorded in the PR description.

---

## PF-2238 closure mapping

| PF-2238 acceptance criterion                                               | How satisfied                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bridge CSS present in SSR HTML **or** docs state the limitation            | **Both, structurally.** No bridge stylesheet exists; `@media` rules ship in the consumer's build-time Tailwind CSS. Dropdown component test asserts breakpoint-prefixed classes in rendered markup; the changesets document the old client-only gap and its removal. |
| No imperative `document.head.appendChild` in `inject-responsive-styles.ts` | Directory deleted. After Commit 5 the provider ships **zero runtime CSS of any kind** (`rg` gate below), which is strictly stronger than the AC.                                                                                                                     |
| `disableMobileBreakpoints()` behavior covered by a test                    | Moot — the rebuild-after-mutation machinery no longer exists. The new static behavior (fixed screens) is documented in changeset + ADR note.                                                                                                                         |

Option A's adjacent defects (stale `injectedNames` cache; render-phase DOM write) and the un-ticketed duplicate-`<style>` defect (scrollbar component recomputed per render) all die by deletion.

---

## Grid's `useResponsiveSpacing` — what it is and what would need to happen (D4)

**What it is** ([Grid.tsx:43–51,95–96,104,107](../../packages/base/Grid/src/Grid/Grid.tsx)): a _default-value picker_, not a styling engine. When the consumer doesn't pass `spacing`, it reads `useCurrentBreakpointRange()` (RootContext) and picks a default gap in px — `{xs:16, sm:16, md:24, lg:32, xl:32}`, falling back to `md` (24px) when the range is unknown. The resolved **number** then (a) maps to a static gap class via `getGridSpacingClassName`, and (b) feeds `GridContext.Provider value={{ gridSpacing }}` so `Grid.Item` can derive its own geometry from the same number.

**Why it is not part of PF-2226/PF-2238:** it shares nothing with the deleted engine — no generated class names, no CSS variables, no `<style>` injection, no `makeResponsiveSpacingProps`. Its classes are static literals; SSR ships them fine.

**Its own (pre-existing, smaller) gaps:** server-side `currentBreakpointRange` is `undefined`, so default-spaced Grids SSR-render at the md default (24px) and can re-render to 16/32px after hydration — a runtime-JS breakpoint dependency and a minor first-paint shift _for the default value only_ (consumer-set `spacing` is static and unaffected). It also re-renders every Grid on breakpoint change.

**What convergence would require (follow-up ticket, not this PR):** replacing the JS default with static responsive classes (`gap-4 md:gap-6 lg:gap-8`) is trivial for the Grid element itself — but `GridContext` consumers (`Grid.Item`) need the _resolved number_, so the whole Grid/Grid.Item contract would have to become breakpoint-aware classes on both sides instead of a shared number. That's a component redesign with its own Happo surface (plus the same `disableMobileBreakpoints()` semantics question as Commits 3/5), not a mechanical swap. **Action here: none.** File a follow-up ticket ("Converge Grid default spacing on static responsive classes; make Grid.Item breakpoint-aware") when this PR lands.

---

## Verification

Per commit: `pnpm build:package` + `pnpm eslint --ext=.ts,.tsx --no-ignore <touched files>` + `pnpm prettier --check <touched files>`.

Whole-PR:

1. `rg -n --hidden "makeResponsiveSpacingProps|responsive-styles|PicassoDropdown-Responsive|PreventPageWidthChangeOnScrollbar|preventPageWidthChangeOnScrollbar" packages .storybook cypress docs` → zero code hits; doc hits only where this PR rewrote them. Use Read, not shell output, to confirm exact identifiers (known rg output-masking artifact).
2. `rg -n "dangerouslySetInnerHTML" packages/picasso-provider/src/` → **zero** — the "provider injects zero runtime CSS" claim, mechanically checked.
3. `rg -n "border-box" AGENTS.md docs/ .changeset/ packages/picasso-tailwind/src/` → remaining hits only where border-box is factually correct (PicassoRootNode island descriptions).
4. `pnpm test:unit` — moved resolver tests + new Dropdown tests green; engine tests gone with the directory; **no `-u`** (operator regenerates snapshots on Node 22; none expected — Dropdown snapshots contain no offset output, scrollbar style never rendered under `TestingPicasso`).
5. `pnpm circularity` — clean (utils→provider is peer-typed only; no new cycles).
6. Optional local: `pnpm build:storybook`; grep bundle — `PicassoDropdown-Responsive` absent, `sm:mt-2`/`lg:mt-8` literals present. Verify `.storybook`'s Tailwind entry imports the base entry (it should since PF-2221) so the scrollbar rules exist in Storybook.
7. **Happo (CI authoritative; local fonts are Arial-fallback, don't eyeball):**
   - Commit 2 gate: **all Container stories zero-diff** (pure move).
   - Commit 3 gate: Dropdown `PositionsAndOffsets` + `CustomTrigger` **zero-diff** (scalar parity: inline `2rem` → class `mt-8`, identical computed margin); `ResponsiveOffset` = new snapshot. Any diff on the two scalar stories = computed margins changed → stop, investigate, don't sign off.
   - Commit 5 gate: expect **zero diff** everywhere (fixed-viewport screenshots don't exercise scrollbar appearance; `DisableResponsiveUI` story already opted out). Any diff → the base-entry rules are interacting with story chrome → investigate.
8. Opt-out audit: **done** (results recorded in Commit 5; Page changeset tiers `major`). No re-run needed at execution — optionally re-confirm alongside the existing pre-merge org-wide removed-symbols audit (canary merge gate).

Operational constraints (carried over): git is manual — provide commands, don't execute; SSH fix if fetch/push fails: `ssh-add --apple-use-keychain ~/.ssh/id_ed25519`; branch is stacked with Tooltip #5005 + query-builder #5006 — keep the PR draft and rebase them away before review-ready.

---

## Remaining out of scope

- **Grid convergence** — follow-up ticket per §Grid above (D4).
- **Design-owned:** deprecating responsive `offset` / Container responsive props from the end-state API (PF-2226's "optional" note) — a deprecation-cycle conversation.
- **Re-flipping the box model to border-box** — explicitly parked (D3: content-box "for now"); any future flip is its own change with its own Happo sign-off.
