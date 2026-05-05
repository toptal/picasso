# P1-MOD-01 — Picasso Modernization Plan (Detailed)

**Parent ticket:** [PF-1992](https://toptal-core.atlassian.net/browse/PF-1992) — Create migration plan for AI-assisted Picasso migration
**Status:** v4 — design decisions consolidated (May 5, 2026). Tier inventory + per-component target mapping unchanged from v3. Decisions locked: pipelined orchestrator state machine, long-lived `picasso-modernization` integration branch (already created), Floating-UI for Popper, custom `<div>` for Backdrop, `classes` prop compatibility shim preserved, Slack webhook notifications, stricter Happo gate (zero-diff or designer-accepted). **Out-of-scope for PF-1992**: TypeScript 5.5/5.6 upgrade — moved to a separate ticket (Phase-1 prerequisite, runs in parallel with PF-1992). Companion doc: [PI-4318-PF-1992-design-decisions.md](./PI-4318-PF-1992-design-decisions.md).
**Audience:** Engineers executing PF-1992 (this plan ships as `docs/migration/`) and PF-1994/2024/2025/2020/2021/2022/2023 (consumers of the per-component playbook).

---

## TL;DR

Picasso has **three source stacks**, all needing migration to one **target stack**:

| Source stack | Where (May 2026 audit) | Migration path | Effort/component |
|---|---|---|---|
| **MUI v4** (`@material-ui/core` 4.12.4) | 14 base/* components (most type-only or 1-2 imports) + provider runtime + 4 sibling packages | **Heavy** (full rewrite) when JSS present; **Type-only fix** otherwise | 0.1-2d (tier-dependent) |
| **JSS** (`makeStyles`/`createStyles`/`withStyles`) | 7 base/* components + provider + 3 sibling packages | Bundled into Heavy path | (subset of above) |
| **`@mui/base`** | 9 base/* components actively use it; 2 mixed-state | **Light** (package swap + API alignment) | 0.25-0.5d |

**Target stack:**
- **`@base-ui/react`** ([base-ui.com](https://base-ui.com/react/overview/quick-start)) — successor of `@mui/base` (mui/base-ui on GitHub). **Stable v1.0.0 shipped Dec 2025; current v1.4.1 (Apr 2026)**. `@mui/base` is its predecessor and is also being migrated *from*, not *to*.
- **Tailwind 4** (`@toptal/picasso-tailwind` + `@toptal/base-tailwind` presets, `@toptal/picasso-tailwind-merge` for class composition). Already at `tailwindcss: ^4.2.1` in repo.

**Key finding from re-audit:** the previous v13 retiering treated FormLabel + Utils + Container + Grid + Notification as "heavy migrations" but they only have **type-only or trivial re-export imports** of MUI v4. They're cleanup-fixes, not rewrites. Plan reorganized accordingly into 6 tiers (§3).

**Three things determine success:**
1. **Per-component loop** that's cheap to run repeatedly (branch → AI prompt → gates → diff → iterate → merge)
2. **Strong automated gates** — Happo + Jest + Cypress + React 19 smoke + peer-dep audit — so AI output is accept/reject without per-file eyeballing
3. **Dependency-aware sequencing** — leaves first (FormLabel, Utils helpers, Backdrop), then composites (Page, Dropdown, Accordion). Specific orderings in §3.7.

PR #4906 is the **calibration baseline** for the light path (per `@base-ui/react` migration of Button + Switch, currently in flight). The heavy path is the riskier work; sandboxed validation on Note (smallest already-clean component, package.json cleanup only) is the orchestrator's first run.

---

## 1. Current state (May 2026 audit, full re-run)

### 1.1 Repo shape

- Yarn 1.22.22 (classic) workspaces + Lerna 8.1.2 + Nx 21.5.1. `packages/*` + `packages/base/*` (78 directories under base, ~65-70 deduped components).
- Node ≥20 (`.nvmrc`), TypeScript `~4.7.0` (old — see §8 R1, §9.1 prereq).
- React peer-dep pinned to `>=16.12.0 < 19.0.0` across **88 declarations** in 75+ package.json files (R2).
- `@toptal/picasso` (`packages/picasso`) is the aggregator: 0 source imports of MUI v4 / JSS / `@mui/base` — but declares `@material-ui/core: 4.12.4` as the root peer-dep (the canary commit removes this in PF-2023).
- 23 of 75 packages have `@material-ui/core: 4.12.4` in dependencies.

### 1.2 Tailwind stack (already in place — no upgrade pending)

- `tailwind.config.js` composes `@toptal/base-tailwind` (BASE tokens) + `@toptal/picasso-tailwind` (Picasso plugin + token theme).
- Tailwind 4 (`tailwindcss: ^4.2.1`) installed. **Already at Tailwind 4 — no upgrade is part of the migration.** A bump to a newer 4.x minor is a separate post-PI hardening pass.
- `@toptal/picasso-tailwind-merge` for class composition.
- **Implication:** Tailwind is decided. Migration is rewriting JSS → Tailwind class arrays + swapping component primitives (MUI v4 → `@base-ui/react`, or `@mui/base` → `@base-ui/react`). If a Tier 0 migration ever fails because a `@base-ui/react` example uses a Tailwind 4.3+ feature, bump reactively — but don't preempt.

### 1.3 `@base-ui/react` status

- **`@base-ui/react` is now stable.** v1.0.0 shipped Dec 11, 2025. Current release: **v1.4.1** (Apr 20, 2026). Per the [llms.txt](https://base-ui.com/llms.txt), 37 components + 4 utilities are available.
- **Zero imports in Picasso repo as of May 2026.** No package.json declares `@base-ui/react`; no source file imports it. PR #4906 (Button + Switch via Codex) is the canary attempt — **verify status before Phase 2 kickoff**: confirm whether merged and on `@base-ui/react` (not `@mui/base`).
- Per [quick-start](https://base-ui.com/react/overview/quick-start.md), the package was previously published as `@base-ui-components/react` and renamed to `@base-ui/react`. Use `@base-ui/react` in all imports.
- The agent prompt + reference implementation must use **`@base-ui/react`** APIs, not `@mui/base` patterns.

### 1.4 Per-component source-stack audit (May 2026)

Numbers below are file counts for **non-test, non-story source files** importing MUI v4 / `@mui/base` / JSS.

| Component | MUI v4 src | `@mui/base` src | JSS src | pkg-mui | pkg-`@mui/base` | What MUI v4 actually imports |
|---|---|---|---|---|---|---|
| Accordion | 7 | 0 | 7 | ✓ | — | `Accordion`, `AccordionSummary`, `Theme`, `makeStyles`, `createStyles`, `withStyles` |
| Backdrop | 0 | 1 | 0 | — | ✓ | `@mui/base/Modal` (`ModalBackdropSlotProps`) |
| Badge | 0 | 1 | 0 | — | ✓ | `@mui/base` (`Badge as MuiBadge`) |
| Button | 0 | 1 | 0 | — | ✓ | `@mui/base/Button` |
| Checkbox | 2 | 0 | 2 | ✓ | — | `Checkbox as MUICheckbox`, `Theme`, `makeStyles`, `createStyles` |
| Container | 1 | 0 | 0 | — | — | `import type { PropTypes }` (type-only, **0.1d fix**) |
| Drawer | 0 | 1 | 0 | ✓ | ✓ | `@mui/base/Modal` |
| Dropdown | 1 | 1 | 0 | ✓ | ✓ | `@material-ui/core/Grow` (transition) + `PopperPlacementType` (type) + `@mui/base` |
| FileInput | 6 | 0 | 6 | ✓ | — | JSS (`Theme`, `makeStyles`, `createStyles`) only |
| Form | 0 | 0 | 0 | ✓ | — | (already clean — peer-dep cleanup only) |
| FormLabel | 1 | 0 | 0 | ✓ | — | `import type { FormControlLabelProps }` (type-only, **0.1d fix**) |
| FormLayout | 0 | 0 | 0 | ✓ | — | (already clean — peer-dep cleanup only) |
| Grid | 1 | 0 | 0 | ✓ | — | `export type { GridSize }` (type-only re-export, **0.1d fix**) |
| Menu | 0 | 0 | 0 | — | ✓ | (source clean; stale `@mui/base` package.json declaration only — **0.1d fix**) |
| Modal | 0 | 1 | 0 | — | ✓ | `@mui/base/Modal` |
| ModalContext | 0 | 0 | 0 | ✓ | — | (already clean — peer-dep cleanup only) |
| Note | 0 | 0 | 0 | ✓ | — | (already clean — peer-dep cleanup only — **orchestrator sandbox**) |
| Notification | 1 | 0 | 0 | — | — | `import type { SnackbarOrigin }` (type-only, **0.1d fix**) |
| OutlinedInput | 1 | 1 | 0 | — | ✓ | `import type { InputBaseComponentProps }` (type-only) + `@mui/base` |
| Page | 2 | 0 | 2 | ✓ | — | `Theme`, `makeStyles`, `createStyles` (JSS-heavy) |
| Popper | 2 | 0 | 0 | ✓ | — | `Popper as MUIPopper` (runtime — needs Floating-UI or Popover replacement) |
| Radio | 3 | 0 | 2 | ✓ | — | `Radio`, `RadioGroup`, `Theme`, `makeStyles`, `createStyles`, `useTheme`, `RadioGroupProps` |
| Slider | 0 | 2 | 0 | — | ✓ | `@mui/base/Slider` (`SliderValueLabelSlotProps`) |
| Switch | 0 | 1 | 0 | — | ✓ | `@mui/base/Switch` |
| Tabs | 0 | 2 | 0 | — | ✓ | `@mui/base/Tab`, `@mui/base/Tabs` (`TabProps`) |
| Tooltip | 2 | 0 | 2 | ✓ | — | `Tooltip as MUITooltip`, `TooltipProps`, `Theme`, `makeStyles`, `createStyles` |
| Typography | 0 | 0 | 0 | ✓ | — | (already clean — peer-dep cleanup only) |
| Utils | 4 | 0 | 2 | ✓ | — | `ClickAwayListener` re-export + `capitalize` re-export + `Theme`/`makeStyles`/`createStyles` (in `Transitions/Rotate180`) |

**Reclassification vs v13.** Components previously in v13 Tier 2 heavy that are actually trivial type-only or stale-package fixes: **Container, FormLabel, Grid, Notification, Menu** (all 0.1d each). v3 plan moves these to Tier 1 cleanup. Real heavy migrations: **Accordion, Checkbox, FileInput, Page, Radio, Tooltip** (6 components, all use MUI v4 runtime + JSS). **Popper** is special (runtime MUI usage but no JSS). **Utils** is small (~0.3d — replace 2 small re-exports + 1 transition).

### 1.5 Sibling packages (outside `packages/base/*`)

| Package | MUI v4 src files | JSS src files | pkg-mui | Notes |
|---|---|---|---|---|
| `picasso-provider` | 19 | 9 | 2 (`@material-ui/core` + `@material-ui/utils`) | Theme runtime, CssBaseline, NotificationsProvider, PicassoRootNode, responsive helpers (4 files), SSR pipeline (`get-serverside-stylesheets.ts`). System rewrite, not per-component. **Final commit gates root peer-dep removal.** |
| `picasso-charts` | 2 | 2 | 1 | LineChart only. Smallest sibling — single PR. |
| `picasso-query-builder` | 21 | 21 | 1 | 11 components: AutoComplete, CombinatorSelector, FieldSelector, MultiSelect, OperatorSelector, QueryBuilder, RangeInput, RunQueryButton, Select, TextInput, ValueEditor. |
| `picasso-rich-text-editor` | 22 | 22 | 2 (`@material-ui/core` + `@material-ui/utils`) | 8 components, includes `create-lexical-theme.ts` (theme bridge depends on MUI v4 Theme shape — non-trivial Tailwind-token replacement). |

None of the sibling packages currently import `@mui/base`; they're all on the heavy path.

### 1.6 The 50 base/* packages NOT in scope

Of the 78 directories under `packages/base/`, only 28 have any MUI v4 / `@mui/base` / JSS source-level usage. The remaining ~50 — Alert, Amount, ApplicationUpdateNotification, Autocomplete, Avatar, AvatarUpload, Breadcrumbs, Calendar, Carousel, Collapse, DatePicker, DateSelect, Dialog, Dropzone, EmptyState, EnvironmentBanner, Fade, Helpbox, Icons, Image, Input, InputAdornment, Link, List, Loader, Logo, NumberInput, OverviewBlock, Pagination, Paper, PasswordInput, PromptModal, Quote, Rating, Section, Select, ShowMore, SkeletonLoader, Slide, Step, Table, Tag, Tagselector, Test-Utils, Timeline, Timepicker, TreeView, TypographyOverflow, UserBadge, AccountSelect — are **already on Picasso primitives + Tailwind**. They inherit migration transitively when their dependencies (Button, Tooltip, OutlinedInput, etc.) migrate.

**Caveat for these 50**: they all need `package.json` peer-dep + React 19 cap lift as a final sweep. Treated as "PF-2023 final cleanup" alongside the provider canary, not separately ticketed.

### 1.7 Existing infrastructure

- **Codemod framework:** `@toptal/picasso-codemod` with `jscodeshift`, fixtures-based test structure (`__testfixtures__/*.input.tsx` + `*.output.tsx` + `__tests__`). Active versions v5.0.0 → v52.2.0. Pattern is well-worn.
- **Testing:** Jest unit (`test.tsx` + `__snapshots__/`), Cypress 13.6 component (53 specs), Happo visual regression (cloud baselines), Storybook 6.5 with `PicassoBook` wrapper.
- **Reference implementations:** Button (~186 LOC, full Tailwind helper-function pattern) and Switch (~115 LOC, inline `cx` pattern). Both target `@base-ui/react` per PR #4906; verify before using as reference.

### 1.8 Agent Experience artifacts

- `bin/generate-docs.mjs` exists (Phase 0) — produces `llm-docs/`, currently git-ignored.
- **Not yet in repo:** `.picasso/`, `CLAUDE.md`, `.cursorrules`, `llms.txt`, `.figma.tsx` files. These land in the AIC + Figma tracks.

### 1.9 Engine versions to watch

| Tool | Current | Action |
|---|---|---|
| Node | `>=20` engines | Keep — no upgrade needed |
| TypeScript | `~4.7.0` (root + 10 packages explicitly pin) | **Prereq: upgrade to 5.5 or 5.6 before Phase 2** (R1, §9.1). Tracked in a **separate ticket** — runs in parallel with PF-1992. Target version 5.5 or 5.6 (not 5.4 minimum, not 5.7+; rationale in §9.1). |
| React | peer-dep `>=16.12.0 < 19.0.0` (88 declarations) | **Prereq: lift cap to <20.0.0** as part of per-component migration (R2, §9.2) |
| Yarn | 1.22.22 (classic) | pnpm migration in progress (PF-1993) |
| Lerna | 8.1.2 | Keep |
| Nx | 21.5.1 | Keep |
| Tailwind | 4.2.1 | Keep — target stack |
| Storybook | 6.5.15 | Old; story format works for now. Optional: upgrade to 7+ post-PI |
| Cypress | 13.6 | Keep |
| Jest | (via davinci-qa) | Keep |
| `@material-ui/core` | 4.12.4 (23 declarations) | **Removed by PF-2023 canary commit** |
| `@material-ui/utils` | 4.11.3 (1 declaration) | Removed alongside core |
| `notistack` | 3.0.1 | Keep — Notification integration |

---

## 2. What "migrated" means

A component is migrated when **all** of the following are true:

### 2.1 Dependency exits

- Zero `@material-ui/core` imports in source
- Zero `@material-ui/styles` imports (`makeStyles`, `withStyles`, `createStyles`, `Theme`)
- Zero `@mui/base` imports in source
- Zero JSS-specific selectors (`&$expanded`, `&$disabled` parent-refs)
- Package's `package.json` no longer lists `@material-ui/core` or `@mui/base` in `dependencies` or `peerDependencies`
- If the component uses a primitive, it's via `@base-ui/react` ([base-ui.com docs](https://base-ui.com/react/overview/quick-start)) — `@base-ui/react/Button`, `@base-ui/react/Switch`, etc. — or implemented as plain React with `@base-ui/react/useX` hooks where available
- `PicassoProvider.override(() => ({ MuiX: ... }))` calls removed (no longer apply once underlying component isn't MUI v4)

### 2.2 Styles on Tailwind

- All CSS in Tailwind utility classes via `cx(...)` + `twMerge` (Button pattern)
- `styles.ts` either deleted or contains helper functions returning `string[]` of Tailwind classes (Button pattern)
- Hex / px values converted to tokens from `@toptal/picasso-tailwind` / `@toptal/base-tailwind` presets where tokens exist; otherwise commented `// TODO(tokens): <description>`
- Dynamic styles use Tailwind arbitrary-value syntax (`[--var]`, `[color:var(--foo)]`) or `style={{ ... }}` for numeric interpolation

### 2.3 API preservation (default)

- Public prop surface unchanged vs `master` pre-migration.
- **`classes` prop preserved on every migrated component via a Tailwind-routing compatibility shim** (decision May 2026; see [`PI-4318-PF-1992-design-decisions.md`](./PI-4318-PF-1992-design-decisions.md) §7). Per-slot strings are merged into the relevant Tailwind className via `twMerge`. Each component declares its own `*ClassKey` slot-key type, e.g. `ButtonClassKey = 'root' | 'label' | 'icon'`.
- Helper for slot routing lives at `packages/base/Utils/src/utils/with-classes.ts`:
  ```ts
  export function withClasses<K extends string>(
    base: Record<K, string>,
    overrides: Partial<Record<K, string>> | undefined
  ): Record<K, string> {
    if (!overrides) return base
    const out = { ...base } as Record<K, string>
    for (const key in base) {
      if (overrides[key]) out[key] = twMerge(base[key], overrides[key])
    }
    return out
  }
  ```
- The shim covers the "add a class to slot X" pattern (~80% of MUI v4 `classes` usage). It does **not** preserve MUI's nested-state selectors (`& .Mui-disabled`, `&$expanded`) or generated MUI class names (`.MuiButton-root`). Consumers using those still break and need codemods or manual fixes — but those are rare.
- Other breaking changes only when an MUI-leaked prop can't be preserved; each gets a codemod (§7).

### 2.4 Tests green

- Jest green; snapshots regenerate if class names change (unavoidable; documented in PR)
- Cypress component spec green
- Happo diff reviewed by designer; >0.5% pixel diff requires explicit OK
- React 19 smoke green (§6.2)

### 2.5 `.figma.tsx` valid (when applicable)

- If a `.figma.tsx` exists from PF-2005/PF-2009, still parses, Figma node resolves, snippet matches new prop surface

---

## 3. Tier inventory (v3 — May 2026 re-audit)

Tiered by **migration complexity, not file count**. v3 reorganises around five distinct work shapes:

- **Tier 0** — `@mui/base` → `@base-ui/react` package swap (light path, 8 active components — Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs; Menu is already migrated and only needs Tier 1 pkg cleanup)
- **Tier 1** — Cleanup-only fixes (peer-dep cleanup + type-only import removal + stale package.json — 11 components)
- **Tier 2** — Heavy migrations: MUI v4 + JSS rewrite to `@base-ui/react` + Tailwind (5 components)
- **Tier 3** — Heavy composites with architectural complexity (3 components, including Page)
- **Tier 4** — Sibling packages (4 packages)
- **Tier 5** — Provider runtime canary (1 package)

### 3.1 Tier 0 — `@mui/base` → `@base-ui/react` (light path, 8 components)

Tailwind already in place. Per-component cost ~0.25-0.5d (calibrated against PR #4906). Package swap + import-path rewrite + minor API alignment. Run via the orchestrator with the **light-path prompt** (§5.3).

| Component | `@base-ui/react` target | Confidence | Notes |
|---|---|---|---|
| Backdrop | `@base-ui/react/dialog` (`Dialog.Backdrop`) | Medium | Backdrop is **not standalone** in `@base-ui/react` — only available as part of Dialog/AlertDialog/Drawer. Picasso's standalone Backdrop becomes a thin wrapper around `Dialog.Backdrop` OR a small custom `<div>` with scroll-lock. |
| Badge | None — keep custom | High | No Badge in `@base-ui/react`. Already mostly custom; just remove `@mui/base` import. Plain `<span>` + Tailwind. |
| Button | `@base-ui/react/button` (`Button`) | High | Direct match. Reference implementation per PR #4906. |
| Drawer | `@base-ui/react/drawer` (`Drawer.Root` + parts) | High | Direct match — newly available. Includes swipe-to-dismiss gestures. |
| Modal | `@base-ui/react/dialog` | High | Picasso's "Modal" is the dialog primitive → `Dialog.Root` + `Dialog.Backdrop` + `Dialog.Portal` + `Dialog.Popup`. |
| Slider | `@base-ui/react/slider` | High | Direct match. |
| Switch | `@base-ui/react/switch` | High | Direct match. Reference implementation per PR #4906. |
| Tabs | `@base-ui/react/tabs` | High | Direct match. |
| Menu (already migrated in source) | (no source change) | High | Source already uses `@toptal/picasso-popper` + `@toptal/picasso-paper`. Only need `package.json` cleanup — **counted under Tier 1, listed here only for visibility since it had `@mui/base` in the past.** |

**Mixed-state (light + heavy in same component):**

| Component | Light portion | Heavy portion | Combined target |
|---|---|---|---|
| Dropdown | `@mui/base` import (use-dropdown / similar) | MUI v4 `Grow` transition + `PopperPlacementType` type | `@base-ui/react/menu` + `@base-ui/react/popover` for positioning. Replace `Grow` with CSS `data-starting-style`/`data-ending-style` transitions. **Tier 3 carries this** (single PR for both passes). |
| OutlinedInput | `@mui/base` Input | `import type { InputBaseComponentProps }` (type-only) | `@base-ui/react/input` + `@base-ui/react/field`. Type import replaced with React's `InputHTMLAttributes`. **Tier 3 carries this** (single PR for both passes). |

### 3.2 Tier 1 — Cleanup-only (11 components)

No real migration; just `package.json` cleanup, type-only imports replaced with native React types or Picasso own types, or stale package declarations removed. Per-component cost ~0.1d each, ~1.1d total. **Note runs first** as the orchestrator sandbox.

| Component | What's there now | What changes | Effort |
|---|---|---|---|
| Form | (clean source) | Remove `@material-ui/core` peer-dep + React 19 cap | 0.05d |
| FormLayout | (clean source) | Same | 0.05d |
| ModalContext | (clean source) | Same | 0.05d |
| Note | (clean source) | Same — **orchestrator sandbox** | 0.05d |
| Typography | (clean source) | Same | 0.05d |
| Container | `import type { PropTypes } from '@material-ui/core'` (1 file) | Replace with own type or `React.HTMLAttributes` + cleanup | 0.1d |
| FormLabel | `import type { FormControlLabelProps } from '@material-ui/core/FormControlLabel'` (1 file) | Replace with own type (only `onChange` is consumed); cleanup | 0.1d |
| Grid | `export type { GridSize } from '@material-ui/core/Grid'` (1 file) | Define own `GridSize` literal type union | 0.1d |
| Notification | `import type { SnackbarOrigin } from '@material-ui/core/Snackbar'` (1 file) | Replace with own type (`{ vertical, horizontal }`) | 0.1d |
| Menu | (source clean; stale `@mui/base` in `package.json`) | Remove dep | 0.05d |
| Utils | 2 re-exports (`ClickAwayListener`, `capitalize`) + 1 transition (`Rotate180` with JSS) | Reimplement `capitalize` (1-line); reimplement `ClickAwayListener` as small custom hook (~15 lines, or use `@base-ui/react`'s built-in handling in Dialog/Popover/Menu where the consumer is already a Base UI component); replace `Rotate180` JSS with Tailwind `transition-transform` | 0.3d |

**Total Tier 1: ~1.1d for 11 cleanup units.**

> **Why FormLabel/Container/Grid/Notification moved here from v13 Tier 2.** The v13 retiering treated these as heavy migrations, but the May 2026 re-audit confirmed each has only **1 type-only import** of `@material-ui/core`. They're not rewrites — they're type-replacement plus peer-dep cleanup.

### 3.3 Tier 2 — Heavy migrations (6 components)

Heavy path: MUI v4 + JSS → `@base-ui/react` + Tailwind. Real rewrites with runtime MUI v4 components and JSS styles. Per-component cost ~0.5-1d.

| Component | `@base-ui/react` target | Confidence | Notes |
|---|---|---|---|
| Checkbox + CheckboxGroup | `@base-ui/react/checkbox` + `@base-ui/react/checkbox-group` | High | Direct match for both. |
| Radio + RadioGroup | `@base-ui/react/radio` (Root) + own group wrapper | High | `@base-ui/react/radio` exists; group composition uses `@base-ui/react/field` + own context. |
| Tooltip | `@base-ui/react/tooltip` | High | Direct match. `Tooltip.Provider`, `Tooltip.Root`, `Tooltip.Trigger`, `Tooltip.Portal`, `Tooltip.Positioner`, `Tooltip.Popup`. |
| FileInput | None — keep custom | High | No file-input primitive in `@base-ui/react`. Build on plain `<input type="file">` + Tailwind. 3 subcomponents (FileListItem, ProgressBar, FileList) all custom. |
| Popper | `@floating-ui/react` (locked May 2026) | High | `@base-ui/react` has no standalone Popper — positioning logic is internal to Tooltip/Popover/Menu/Dialog. **Decision**: depend on `@floating-ui/react` directly. Picasso's Popper has external consumers (apps in the 23-repo portfolio import `<Popper anchorEl={ref}>` directly), so the existing position-anchored API must be preserved verbatim. `@floating-ui/react`'s `useFloating` + `<FloatingPortal>` matches the API shape exactly. `@base-ui/react/popover` is trigger-anchored (`<Popover.Trigger>` owns the anchor) — would force every consumer to refactor, which is the break we're avoiding. See [`PI-4318-PF-1992-design-decisions.md`](./PI-4318-PF-1992-design-decisions.md) §5 for the full reasoning + [`docs/migration/decisions/popper-replacement.md`](../migration/decisions/popper-replacement.md) for the locked decision doc. |

**Total Tier 2: ~3-5d for 5 components.** (Page moves to Tier 3 — see §3.4.)

> **Risk.** Tooltip viability + Popper decision feed into Tier 3 (Dropdown/Accordion need stable positioning). Tooltip is verified via the `@base-ui/react/tooltip` direct match. Popper architectural decision is **locked** (Floating-UI). Both unblocked before PF-2024 starts.

### 3.4 Tier 3 — Heavy composites (3 components)

Heavy path with architectural complexity (`PicassoProvider.override`, JSS parent-refs, mixed-state). Buffer 1.5-2× a Tier 2 component. Per-component cost ~1.5-2d.

| Component | `@base-ui/react` target | Confidence | Notes |
|---|---|---|---|
| Accordion | `@base-ui/react/accordion` | High | Direct match. `Accordion.Root` + `Accordion.Item` + `Accordion.Header` + `Accordion.Trigger` + `Accordion.Panel`. JSS `&$expanded` parent-refs unwind to `data-[state=open]` Tailwind selectors. `PicassoProvider.override` removed once migrated. |
| Dropdown (mixed-state) | `@base-ui/react/menu` + `@base-ui/react/popover` (for anchored positioning) | Medium | Single PR covers both `@mui/base` portion AND `@material-ui/core/Grow` transition replacement. |
| Page | None — keep custom (pure Tailwind) | High | Page is composition of many migrated primitives (Accordion, Tooltip, Menu, Notification, etc.) — it depends on **all of Tier 2 + most of Tier 0**. Migrate last in the heavy chain. |

**Type-leak fixes (folded into Tier 1, not Tier 3 anymore in v3):** Container, FormLabel, Grid, Notification, OutlinedInput type-leak — moved to Tier 1.

> **OutlinedInput** is mixed-state (1 MUI type + 1 `@mui/base` import). Light-path swap of `@mui/base` portion + type-leak fix in a single PR. Lives in Tier 0 conceptually but counted under PF-2025 because the type-leak fix bundles cleanly with the other Tier 1/3 type-leak work. **Effort: ~0.5d, single PR.**

**Total Tier 3: ~5-6d for 3 components + OutlinedInput mixed-state PR.**

### 3.5 Tier 4 — Sibling packages (4 packages)

Per-package effort depends on component count + JSS depth. Heavy path throughout — none import `@mui/base`. Same per-component loop (§4) but testing is package-level.

| Package | Components | Source-file LOC | `@base-ui/react` consumption | Notes |
|---|---|---|---|---|
| `picasso-charts` | LineChart | 2 files | None primitive | Pure Recharts wrapping; just remove MUI v4 + JSS. Smallest sibling. |
| `picasso-query-builder` | 11 components | 21 files | Indirect — uses migrated Picasso primitives (Autocomplete, Select, TextInput, Button) | Batch into 3-4 PRs by cluster (Selectors / Inputs / Buttons / QueryBuilder root). |
| `picasso-rich-text-editor` | 8 components | 22 files | None primitive (Lexical-based) | Lexical handles editor; replace styling. **`create-lexical-theme.ts` is the architecture concern** — depends on MUI v4 Theme shape, needs Tailwind-token-based rewrite. Batch into 2-3 PRs. |

### 3.6 Tier 5 — Provider runtime (system rewrite, 1 package)

`picasso-provider` is **not** a component migration — it's a system rewrite. Comes **last** in Phase 2 and gates the root `@material-ui/core` peer-dep removal (the PI's canary).

| Package | Scope | `@base-ui/react` consumption |
|---|---|---|
| `picasso-provider` (19 MUI v4 src files, 9 JSS src files) | PicassoProvider (drop `createTheme`/`Overrides`/`ThemeProvider`); theme.ts module augmentation; styles.tsx; CssBaseline → Tailwind preflight; NotificationsProvider; PicassoRootNode; PreventPageWidthChangeOnScrollbar; responsive-styles helpers (4 files in `Picasso/utils/responsive-styles/`); `get-serverside-stylesheets.ts` SSR pipeline retired. | Optional: `@base-ui/react/direction-provider` for RTL (if needed) and `@base-ui/react/csp-provider` for CSP nonce support. Not required for the canary. |
| `packages/picasso/package.json` | Remove `@material-ui/core: 4.12.4` peer-dep + `@material-ui/utils` (canary commit) | — |

### 3.7 Migration ordering (dependency-aware)

Component dependency analysis (May 2026):

```
                                       ┌─ Backdrop ─┐
                                       │            │
                                       v            v
ModalContext ─→ Modal ←─ Drawer ←─ FormLayout  Form    Note
(clean)        (Tier 0) (Tier 0)   (clean)    (clean) (clean — sandbox)
                                       │
                                       v
                                   FormLabel (Tier 1 type-fix)
                                   ↑       ↑       ↑
                                   │       │       │
                              Switch    Checkbox  Radio
                              (T0)     (T2)      (T2)
```

**Key cross-tier dependencies discovered in re-audit:**

- **Switch (Tier 0) imports FormLabel (Tier 1)** — Switch can run after FormLabel cleanup ships.
- **Checkbox + Radio (Tier 2 heavy) import FormLabel (Tier 1)** — same.
- **Modal + Drawer (Tier 0) import Backdrop (Tier 0)** — order Backdrop first within Tier 0.
- **Dropdown + Menu (already-migrated/T0) import Popper (Tier 2)** — Tier 2 Popper migration must finish before Tier 3 Dropdown completes.
- **FileInput (Tier 2) imports Tooltip (Tier 2)** — Tooltip first within Tier 2.
- **Page (Tier 3) imports nearly everything** — runs last in `base/*`.
- **Utils (Tier 1) `ClickAwayListener` re-export consumed by Dropdown, DatePicker, Menu, Tooltip story** — Utils cleanup should happen alongside Tier 1 batch so consumers can swap to `@base-ui/react` built-in dismiss handling.

**Recommended execution order within PF-1994 (Tier 1 + Tier 0 batch):**

1. **Tier 1 first (~1d, sandbox + leaves):** Note (sandbox) → Form → FormLayout → ModalContext → Typography → Container → Grid → Notification → FormLabel → Menu (pkg cleanup) → Utils (full)
2. **Tier 0 in dependency order (~3-4d):** Backdrop → Badge (independent) → Button → Slider → Switch → Tabs → Modal → Drawer (Modal/Drawer use Backdrop)

**PF-2024 (Tier 2 heavy) order:** Tooltip → Popper → Checkbox + Radio (parallel; both need FormLabel) → Notification (already in Tier 1 — type fix only, removed from Tier 2) → FileInput (uses Tooltip).

**PF-2025 (Tier 3) order:** Accordion → Dropdown (mixed) + OutlinedInput (mixed) → Page (last — depends on all the above).

### 3.8 Out of scope (no migration needed)

- **Already clean siblings:** `picasso-forms`, `picasso-codemod`, `picasso-pictograms`, `picasso-tailwind`, `picasso-tailwind-merge`, `base-tailwind`, `shared`, `topkit-analytics-charts`
- **Icons / Pictograms** — SVG-only
- **Test-Utils** — tooling
- **~50 additional `packages/base/*` directories** (Alert, Autocomplete, Avatar, Calendar, Carousel, DatePicker, Dialog, Input, Loader, Logo, Pagination, Paper, Select, Table, Tag, Timeline, etc.) — already on Picasso primitives + Tailwind, inherit migration transitively. They need only a final peer-dep + React 19 cap sweep, bundled into PF-2023.

### 3.9 Final counts (v3)

**28 component-migration units + 4 sibling packages + 1 provider rewrite:**

- 8 Tier 0 (light path, pure `@mui/base` → `@base-ui/react` — Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs)
- 11 Tier 1 (cleanup-only — 5 already-clean + 5 type-only fixes + Menu pkg cleanup; **Utils** counted here)
- 5 Tier 2 (heavy real rewrites — Checkbox, Radio, Tooltip, FileInput, Popper)
- 3 Tier 3 (heavy composites — Accordion, Dropdown, Page) + 1 mixed-state PR (OutlinedInput) bundled into PF-2025
- 4 Tier 4 sibling packages (charts, query-builder, RTE — provider goes to Tier 5)
- 1 Tier 5 (provider canary)
- ~50 transitive consumers — peer-dep cleanup only, bundled into PF-2023 final sweep

Total ticket coverage:
- **PF-1994** — Tier 1 (~1d) + Tier 0 batch (~3-4d) ≈ **3-5d effort** ← unchanged from v13
- **PF-2024** — Tier 2 heavy (~3-5d for 5 components) ≈ **4-7d effort** (range preserves headroom for the Popper decision and Tooltip viability check)
- **PF-2025** — Tier 3 (3 composites incl. Page) + OutlinedInput mixed-state (~5-7d) ≈ **5-7d effort**
- **PF-2020/2021/2022** — sibling packages (1-2d / 4-6d / 5-7d)
- **PF-2023** — provider runtime + canary + ~50 transitive-consumer peer-dep sweep (6-9d)

> **Net effort change vs v13.** Track total stays in 38-58d band. Internal redistribution: PF-2024 narrows from "9 heavy" to "5 truly heavy" because FormLabel + Notification + Container + Grid + Utils moved to Tier 1 (type-only/cleanup work, ~0.5d total instead of ~3-5d). Page moves from Tier 2 to Tier 3 because it's a high-surface composite that consumes most of the rest of base/*. Risk-budget stays the same; effort just lands in a different ticket.

---

## 4. Per-component migration playbook

Same loop for both light and heavy paths, with path-specific prompt templates (§5).

```
┌──────────────────────────────────────────────────────────────────────┐
│  PER-COMPONENT LOOP                                                  │
│                                                                      │
│  1. Prep        → orchestrator picks next component from manifest    │
│                   reads per-component plan from docs/migration/      │
│                   creates branch                                     │
│                   refreshes Happo baseline on master                 │
│                                                                      │
│  2. Migrate     → applies path-specific AI prompt with context pack  │
│                   (light path or heavy path; see §5)                 │
│                                                                      │
│  3. Gate        → tsc → lint → Jest → Cypress → Happo →              │
│                   React 19 smoke → peer-dep audit                    │
│                                                                      │
│  4. Diff        → bin/migration-diff.sh emits prop-surface diff,     │
│                   import diff, Happo diff summary, React 19 warnings │
│                                                                      │
│  5. PR          → gh pr create with diff report as PR body           │
│                                                                      │
│  6. Iterate     → on CI fail or review feedback, classify + fix.     │
│                   Hard cap: 3 agent iterations before escalation     │
│                                                                      │
│  7. Land        → on review-approved + CI green:                     │
│                   gh pr merge --squash --auto                        │
│                   manifest updates: status="done"                    │
│                                                                      │
│  8. Next        → return to step 1                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

The orchestrator (`bin/migration-orchestrator.ts`, built in PF-1992) drives this loop end-to-end. Engineer's role: review PRs (15-30 min each), handle the ~20-30% that escalate (architecture decisions, hostile review feedback).

### 4.1 Gate script (`bin/migration-gate.sh`)

```bash
yarn workspace @toptal/picasso-<name> build:package \
  && yarn tsc --noEmit \
  && yarn lint \
  && yarn jest packages/base/<Name> \
  && yarn cypress run --component --spec cypress/component/<Name>.spec.tsx \
  && yarn happo --only <Name> \
  && yarn test:react19 --only <Name>
```

Fast-fail order: typecheck cheapest first, Happo + React 19 last.

### 4.2 Diff report (`bin/migration-diff.sh` → markdown)

```
## <Component> migration diff (path: light|heavy)

### Prop surface
- [ADDED]    `as?: ElementType`
- [REMOVED]  `classes?: Classes`   ← codemod required
- [RENAMED]  `expanded` → `open`   ← codemod required

### Imports
- [REMOVED]  @material-ui/core/{ Button, Typography }
- [REMOVED]  @mui/base/Button
- [ADDED]    @base-ui/react/Button
- [REMOVED]  @material-ui/core/styles/{ makeStyles, createStyles }

### Happo diff
- 3 screens changed, 1 unchanged.
  • primary-button-default.png — 0.3% pixel diff (sub-threshold)
  • primary-button-hover.png  — 2.1% pixel diff (REVIEW)
  • primary-button-disabled.png — 0.1% pixel diff

### React 19 smoke
- 0 warnings, 0 errors.

### Peer-dep audit
- packages/base/<Name>/package.json: @material-ui/core removed ✓
- packages/base/<Name>/package.json: @mui/base removed ✓
- packages/base/<Name>/package.json: @base-ui/react added ✓
```

### 4.3 Review

- **Designer** owns Happo diff. >0.5% pixel diff requires explicit OK.
- **Engineer** owns prop-surface diff. `[REMOVED]` or `[RENAMED]` props create codemod entries (§7).
- Cross-track secondary reviewer per `tickets-by-track_final.md` collaboration patterns.

### 4.4 Iterate

If a gate fails, the orchestrator collects the failing output and feeds it back to the agent via a targeted follow-up prompt. **Hard cap: 3 agent iterations** before escalating to manual takeover (manifest status="needs_human").

---

## 5. AI prompt + context pack

Two prompts: one for light path, one for heavy path. Both share the context pack.

### 5.1 Files the agent sees

```
docs/migration/
├── PROMPT-light.md                ← @mui/base → @base-ui/react (Tier 0)
├── PROMPT-heavy.md                ← MUI v4 + JSS → @base-ui/react + Tailwind (Tier 1-3)
├── ORCHESTRATOR.md                ← agent loop spec
├── manifest.json                  ← per-component status
├── reference/
│   ├── Button.tsx                 ← canonical light-path output (post-PR #4906)
│   ├── Button-styles.ts
│   ├── Button-package.json
│   ├── Switch.tsx                 ← minimal light-path output
│   └── HEAVY-EXAMPLE.tsx          ← canonical heavy-path output (first Tier 2 component)
├── rules/
│   ├── styling.md                 ← Tailwind class composition
│   ├── api-preservation.md        ← prop surface rules
│   ├── jss-to-tailwind-crib.md    ← JSS pattern → Tailwind pattern table
│   └── base-ui-react-api-crib.md  ← @base-ui/react component patterns from base-ui.com
├── tokens/
│   └── picasso-tailwind-tokens.md ← extracted from preset
└── components/
    ├── _README.md
    ├── Note.md                    ← per-component plan files (one per migration unit)
    ├── FormLabel.md
    └── ... (one per Tier 0/1/2/3 component)
```

The agent sees: the path-specific prompt, the appropriate reference component(s), all 4 rule docs, the token reference, the per-component plan, and the **component being migrated** (source + styles + test + story + package.json).

### 5.2 PROMPT-light.md — `@mui/base` → `@base-ui/react`

```
You are migrating a Picasso component from @mui/base to @base-ui/react.
Tailwind is already in place; the component already uses cx/twMerge for
class composition. Your task is the package swap + API alignment, not a
full rewrite.

You have read access to:
- reference/Button.tsx — canonical @base-ui/react migration (light path).
- reference/Switch.tsx — minimal @base-ui/react migration.
- rules/base-ui-react-api-crib.md — @base-ui/react component patterns.
- rules/api-preservation.md — prop surface rules.

You are migrating: packages/base/<NAME>

Your task:

1. Replace @mui/base imports with @base-ui/react equivalents:
   - @mui/base/<X>           → @base-ui/react/<X> (when API matches)
   - @mui/base/use<X>        → @base-ui/react/use<X> (when hook exists)
   - For API differences, consult rules/base-ui-react-api-crib.md.

2. Update package.json:
   - Remove @mui/base from dependencies.
   - Add @base-ui/react.

3. Preserve the public prop surface. If a prop must change (e.g. an
   @mui/base-leaked type that doesn't exist in @base-ui/react), add
   it to docs/migration/<Component>-diff.json with codemod=required.

4. Tailwind class composition (cx/twMerge usage) stays as-is — that
   was the win of the @mui/base era. Don't rewrite styles.

5. Do NOT change:
   - test.tsx assertions (snapshots OK to regenerate)
   - story files (they exercise the public API)
   - file locations or export names

Output: file edits only. No explanations.
```

### 5.3 PROMPT-heavy.md — MUI v4 + JSS → `@base-ui/react` + Tailwind

```
You are migrating a Picasso component from MUI v4 (@material-ui/core)
+ JSS to @base-ui/react + Tailwind. This is a full rewrite — both the
component primitive and the styling system change.

You have read access to:
- reference/Button.tsx — canonical Tailwind reference (post-migration).
- reference/HEAVY-EXAMPLE.tsx — canonical heavy-path output.
- rules/styling.md — Tailwind class composition rules.
- rules/api-preservation.md — prop surface rules.
- rules/jss-to-tailwind-crib.md — JSS pattern → Tailwind pattern table.
- rules/base-ui-react-api-crib.md — @base-ui/react patterns.
- tokens/picasso-tailwind-tokens.md — available tokens.

You are migrating: packages/base/<NAME>

Your task:

1. Replace @material-ui/core imports:
   - @material-ui/core/<X>          → @base-ui/react/<X> when available.
                                      For primitives missing in @base-ui/react,
                                      consult rules/base-ui-react-api-crib.md.
   - @material-ui/core/styles       → delete; styles move to Tailwind.
   - @material-ui/core/PicassoTheme → delete; tokens via Tailwind classes.

2. Replace JSS with Tailwind:
   - Every createStyles/makeStyles object becomes either:
     a) inline className={cx(...)} for static styles, or
     b) a helper function in styles.ts returning string[] (Button pattern).
   - JSS parent-refs ("&$expanded") convert to Tailwind pseudo-classes
     or conditional class arrays driven by component state. Common case:
     data-attribute selectors (data-[state=open]:bg-blue-500).
   - Raw hex / px values: replace with Picasso Tailwind tokens.
     Where no token exists, keep the literal + add comment:
     // TODO(tokens): <description>

3. Preserve the public prop surface EXCEPT where a prop leaks an MUI v4
   type (e.g., classes: Classes) that cannot be preserved. Removed props
   go to docs/migration/<Component>-diff.json with codemod=required.

4. Update package.json:
   - Remove @material-ui/core from dependencies AND peerDependencies.
   - Add @base-ui/react if used.
   - Add @toptal/picasso-tailwind-merge (peer) and
     @toptal/picasso-tailwind (peer) if not already present.

5. Do NOT change:
   - test.tsx assertions
   - story files
   - file locations or export names

Output: file edits only. No explanations.
```

### 5.4 Rule docs

**`base-ui-react-api-crib.md`** — NEW. Required because `@base-ui/react`'s API differs from `@mui/base` and from `@material-ui/core`. Pin the specific component imports the agent is allowed to use, with examples from [base-ui.com](https://base-ui.com/react/overview/quick-start). Update each time `@base-ui/react` releases (currently in active development).

**`styling.md`** — Tailwind class composition (Button pattern, no inline styles, no CSS files, conditional classes via ternaries or data-attributes).

**`api-preservation.md`** — public prop surface rules; deprecation alias policy; diff JSON contract.

**`jss-to-tailwind-crib.md`** — common JSS → Tailwind transformation patterns:

```
| JSS pattern                          | Tailwind equivalent                    |
|--------------------------------------|----------------------------------------|
| `color: palette.grey.dark`           | `text-gray-700`                        |
| `'&$expanded': { margin: 0 }`        | conditional class `{ 'm-0': expanded }` |
| `'&:hover': { bg: palette.primary }` | `hover:bg-blue-500`                    |
| `marginLeft: '1rem'`                 | `ml-4` (Picasso spacing scale)         |
| dynamic via `${size * 4}px`          | `style={{ width: size * 4 }}` OR `w-[${size*4}px]` |
| `transition: 'transform 150ms ...'`  | `transition-transform duration-150 ease-[cubic-bezier(...)]` |
```

---

## 6. Testbed setup

### 6.1 Local command

```
yarn migrate:component <Name>
```

Wraps `bin/migration-gate.sh <Name>` + `bin/migration-diff.sh <Name>`. Both emit to `migration-runs/<date>/<Name>/`.

### 6.2 React 19 smoke

Picasso peer-deps cap React at `<19.0.0`. Smoke suite installs React 19 in a side-by-side workspace and verifies the migrated component renders without warnings or errors in strict mode.

Recommendation: start with a CI job (`react19-validate`) that runs `yarn install --force react@19 react-dom@19` in a scratch dir + runs the component's stories via RTL. Graduate to Jest `--projects` in Phase 2 if it gets flaky.

### 6.3 Happo policy (gate-enforced)

- **Pre-migration:** baseline refreshed on the integration branch (`picasso-modernization`) before the orchestrator picks the component.
- **Post-migration: gate enforces zero-diff or designer-accepted.** The gate script (`bin/migration-gate.sh`) calls Happo's REST API after `yarn happo` runs and parses the report summary:
  - `diffsTotal == 0` → PASS.
  - All diffs are `accepted` (designer reviewed and approved in Happo's web UI) → PASS.
  - Any `unreviewed` or `rejected` diff → FAIL. Includes the report URL in the failure message so the designer can review.
- **Pre-merge step:** before `gh pr merge --auto`, the orchestrator re-checks Happo state via the same API. Unresolved diffs block auto-merge even if a code reviewer approves; orchestrator posts a comment to the PR ("Happo diffs unresolved, see <report-url>") and loops back to review polling.
- **Tier 1 + Tier 0 expectation:** zero diffs (these are cleanup or stack-swap migrations that should be pixel-identical). Any diff = a real visual regression to investigate.
- **Tier 2/3/sibling/provider expectation:** intentional diffs are possible. Designer reviews in Happo's UI, marks accepted, gate re-runs and passes.
- **Verification on Note canary:** before any real migration, run `MIGRATION_GATE_HAPPO=run yarn orchestrate --component=Note --no-merge` to verify `HAPPO_API_KEY`/`HAPPO_API_SECRET` env vars, `HAPPO_PROJECT=Picasso/Storybook` setup, and `--only` filter behavior. Note has zero source diff so Happo should return zero diffs; any diff = a transitive issue (Storybook config drift, font loading, etc.) to investigate before scaling.
- After merge: new screenshots become Phase 3 pre-migration baseline for consumer apps.

See [`PI-4318-PF-1992-design-decisions.md`](./PI-4318-PF-1992-design-decisions.md) §9 (canary verification) and §10 (gate strictness implementation) for full details.

### 6.4 Cypress

Component specs in `cypress/component/<Name>.spec.tsx` must pass. No changes expected. If specs assert on class names (bad practice), flag separately.

---

## 7. Codemod strategy (feeds PF-1995)

`[REMOVED]` or `[RENAMED]` props in §4.2's diff report require codemods. Codemods live in `@toptal/picasso-codemod/src/v<next>/<change-name>/`.

### 7.1 What AI writes, what humans review

- **AI writes** the codemod body from before/after snippets, following the fixture pattern in v52.2.0.
- **Human reviews** — codemods are blast-radius tools. Target: 90% AI, 10% manual refinement.

### 7.2 Fixture convention (existing repo pattern)

```
packages/picasso-codemod/src/v<next>/<change-name>/
├── index.ts                          # export { default }
├── <change-name>.ts                  # the Transform
├── __testfixtures__/
│   ├── basic.input.tsx
│   ├── basic.output.tsx
│   ├── aliased.input.tsx              # handles `import { X as Y }`
│   └── aliased.output.tsx
└── __tests__/
    └── <change-name>.test.ts          # jscodeshift test runner
```

### 7.3 Real-usage validation

Each codemod gets smoke-tested on 2-3 real usage patterns mined from the 23 active repos. Add those as fixtures.

### 7.4 Codemod count target

v5+ replaced the original 8-12 codemod suite plan with **AI-led migration prompt + 0-3 escape-hatch codemods**. Codemods now reserved for high-blast-radius API breaks where deterministic transformation is required.

**v4 update (May 2026):** the `classes` prop — historically the headline codemod target — is no longer a codemod candidate because §2.3 introduces a Tailwind-routing compatibility shim that preserves it. Codemod budget freed up reallocates to:
- Compound-component reshape codemods for Modal / Drawer / Dialog (the `@base-ui/react` compound API differs from `@mui/base`'s flat shape — consumers reaching into Picasso's slot system need rewiring).
- A fallback codemod for MUI nested-state selectors (`& .Mui-disabled`, `&$expanded` chains) for the rare consumer who used those — flagged but not high-priority unless usage data shows it's common.

Net codemod count expectation: still 0-3, but the targets are different.

---

## 8. Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | TypeScript 4.7 too old for modern agent tooling | High | Medium | Upgrade to TS 5.4+ as Phase 2 prerequisite. §9.1. |
| R2 | React 19 peer-dep cap (`<19.0.0`) cascades across 17 packages | High | Medium | Bump each package's peer range to `>=16.12.0` as part of per-component migration. Add React 19 smoke. |
| R3 | JSS parent-refs (`&$expanded`) don't map 1:1 to Tailwind | Medium | Medium | Pattern documented in `jss-to-tailwind-crib.md`; agent sees the pattern; Tier 3 (Accordion, Page) expects manual touch-up. |
| R4 | `PicassoProvider.override(() => ({ MuiX: ... }))` scattered across the codebase; removing it can regress unmigrated siblings | Medium | High | Audit all `PicassoProvider.override` call sites up front (§9.5). Remove override only when its target component is migrated. Run full Happo suite after each Tier-3 PR. |
| R5 | Agent hallucinates nonexistent `@base-ui/react` exports | **Low (was Medium)** | Low | **DOWNGRADED v3**: `@base-ui/react` is now stable v1.4.1 (Apr 2026) with comprehensive [llms.txt](https://base-ui.com/llms.txt). `base-ui-react-api-crib.md` pins the per-Picasso-component target paths from the audit (§3). Refresh per minor release. |
| R6 | Happo diff-fatigue — too many screens change, designer approves reflexively | Medium | High | Happo review budget: no more than one Tier-2/3 PR in review at a time. Diff summary highlights >0.5%. |
| R7 | Consumer apps use internal MUI v4 exports that Picasso re-exports by accident | Low | High | Audit `@toptal/picasso` exports for `@material-ui/core` type leakage. Add ESLint rule `no-reexport-mui-v4`. **Status (May 2026):** §1.4 audit shows 5 known type-only re-exports / leaks (Container `PropTypes`, FormLabel `FormControlLabelProps`, Grid `GridSize`, Notification `SnackbarOrigin`, OutlinedInput `InputBaseComponentProps`). All folded into Tier 1 fixes. |
| R8 | `@base-ui/react` API stability | **Low (was Medium)** | Low | **DOWNGRADED v3**: `@base-ui/react` shipped stable v1.0.0 in Dec 2025; current v1.4.1. Pin version in `resolutions`. Track minor releases (v1.1, v1.2, v1.3, v1.4 all backwards-compatible) but breaking changes are rare in stable. |
| R9 | Codemod false positives on custom wrappers (`<AppButton>` re-exports) | Medium | Medium | Codemod tests include "wrapped" fixture per change. Run codemods on 2-3 real consumer repos before release. |
| R10 | AI agent quality drift between pilot and Phase 2 | Low | Low | Re-validate prompts at Phase 2 start; version-control PROMPT-{light,heavy}.md. |
| R11 | `@material-ui/styles` types leak into public component prop types | High | Medium | Diff report flags these; each is preserved as Picasso-native type or removed via codemod. |
| R12 | Tier 0 light-path multipliers calibrated against PR #4906 may not generalise (Button + Switch are simple primitives; Drawer/Modal/Slider may have more API drift, especially since Drawer in `@base-ui/react` is newer than Button/Switch) | Medium | Medium | Run first 2-3 Tier 0 components serially before scaling parallel orchestrator runs. Recalibrate after first batch. |
| R13 | Mixed-state components (Dropdown, OutlinedInput) need both light + heavy path | Low | Medium | Per-component plan files document the mixed scope explicitly. Single PR covers both passes. Bundled into PF-2025. |
| R14 | **NEW**: Backdrop has no standalone equivalent in `@base-ui/react` (only `Dialog.Backdrop`) — Picasso's standalone Backdrop component needs different treatment | Medium | Low | Spike during PF-1992: decide whether Picasso's standalone Backdrop becomes (a) a thin wrapper around `Dialog.Backdrop`, (b) a tiny custom `<div>` with scroll-lock + Tailwind, or (c) deprecated in favour of Dialog. Recommended: (b) — minimal blast radius. |
| R15 | **NEW**: Popper has no standalone equivalent in `@base-ui/react` — positioning is internal to Tooltip/Popover/Menu/Dialog | Medium | Medium | §9.8 open decision. **Two options**: (a) `@floating-ui/react` direct dep for the ~2 standalone-positioning use sites (already a transitive dep); (b) refactor Popper consumers (Dropdown, Menu) onto `@base-ui/react/popover`. Recommend (a) for v3 to keep blast radius bounded; consider (b) post-PI. |
| R16 | **NEW**: Switch (Tier 0 light) depends on FormLabel (Tier 1 cleanup) — a Tier 0 component blocks on a Tier 1 fix | Low | Low | Sequence Tier 1 → Tier 0 in PF-1994 (per §3.7 ordering). Since Tier 1 is just type-only fixes (~0.1d each), this adds ~1d of leading work, not a dependency stall. |
| R17 | **NEW**: Utils `ClickAwayListener` re-export is consumed by ~6 components including Dropdown (Tier 3) — replacement strategy must be decided early | Low | Medium | Replace with small custom hook (~15 lines) OR rely on `@base-ui/react`'s built-in dismiss handling at the consumer level. Consumer audit ships in PF-1992. Pure code change, no ABI break for consumers. |

---

## 9. Prerequisites before Phase 2 execution

These must be done in PF-1992 (Phase 1) or early PF-1994 (day 1), otherwise the per-component loop stalls.

### 9.1 TypeScript upgrade to 5.5 or 5.6 (R1) — separate ticket

**Status (May 2026):** repo on TS `~4.7.0` (root + 10 packages explicitly pin). Modern agent tooling (Claude Code, Codex), `@base-ui/react` types, and Tailwind 4 type plugins all assume TS 5.x. **Action**: single PR to monorepo root upgrading TS to **5.5 or 5.6** (target version locked May 2026 — see [`PI-4318-PF-1992-design-decisions.md`](./PI-4318-PF-1992-design-decisions.md) §3). Not 5.4 (skips meaningful narrowing wins for no reason). Not 5.7+ (path-mapping changes risk breaking the monorepo's TypeScript project-reference graph; defer to post-PI). **Effort: ~2-3d (debugging-bound, not coding-bound — module resolution + verbatim-module-syntax flag may surface latent issues).**

**Tracking.** Moved out of PF-1992 into its **own ticket** (decision May 5, 2026). Runs in parallel with PF-1992 as a Phase-1 prerequisite. PF-1994 cannot start until both PF-1992 lands AND the TS upgrade ticket lands — they're parallel-prerequisite to PF-1994, not to each other. The orchestrator code itself works under TS 4.7; the prerequisite is for Tier 0 light-path migrations to compile under the agent-generated patterns (which use 5.x features).

### 9.2 Lift React 19 peer-dep cap across all packages (R2)

**Status (May 2026):** 88 declarations of `"react": ">=16.12.0 < 19.0.0"` across 75+ package.json files. **Action**: bulk codemod / script update to `"react": ">=16.12.0 < 20.0.0"` (or `<19.5.0` if conservative). Run as part of per-component migration so each PR's React 19 smoke gate validates the change for that package. **Effort: ~0.5d ambient (no separate ticket).**

### 9.3 Author `docs/migration/` pack (§5.1)

Reference components + rules + token map + per-component plans for Tier 0 (9) + Tier 1 (11). Core deliverable of PF-1992. **The `base-ui-react-api-crib.md` rule doc is built from the §3 component-target mapping above** — agent can read it directly.

### 9.4 Ship `bin/migration-orchestrator.ts` + `bin/migration-gate.sh` + `bin/migration-diff.sh`

(§4). Build in PF-1992.

### 9.5 Audit `PicassoProvider.override` call sites (R4)

Single file listing every `PicassoProvider.override(() => ({ MuiX: ... }))` + which component target must migrate first. Override removal is sequenced with the underlying component's migration.

### 9.6 Verify PR #4906 status

**Currently the repo has Button + Switch on `@mui/base`, not `@base-ui/react`.** Either PR #4906 is unmerged, or it migrated to `@mui/base` (in which case the reference implementation needs an update before becoming the canonical light-path output). **Action**: in PF-1992, confirm status with @ Codex pilot owner; if needed, use Note (Tier 1 sandbox) as the canonical light-path reference instead.

### 9.7 Produce `bin/migration-audit.sh`

(Appendix A). Run as part of PF-1992; output current per-package source-stack inventory. **A reference run from May 2026 is captured in §1.4 of this plan.**

### 9.8 Standalone-primitive replacement decisions (locked May 2026)

`@base-ui/react` does **not** provide standalone Popper or Backdrop primitives — both are internal to Dialog/Popover/Menu/Tooltip. Picasso has both as standalone components with external consumers in the 23-repo portfolio. Decisions:

- **Backdrop (R14) — locked: small custom `<div>` + Tailwind + scroll-lock.** External consumers expect `<Backdrop>` as standalone, not nested inside a Dialog. A custom div with appropriate ARIA + scroll-lock + Tailwind is ~50 lines. Bounded blast radius. Decision doc: [`docs/migration/decisions/backdrop-replacement.md`](../migration/decisions/backdrop-replacement.md).
- **Popper (R15) — locked: `@floating-ui/react` direct dependency.** External consumers use `<Popper anchorEl={ref} placement={p}>` directly — a position-anchored API. `@base-ui/react/popover` is trigger-anchored (`<Popover.Trigger>` owns the anchor) and would force every consumer to refactor — that's the API break we're avoiding. `@floating-ui/react`'s `useFloating` hook gives the same shape Popper has; Picasso's Popper becomes a ~30-line wrapper preserving the existing API verbatim. Decision doc: [`docs/migration/decisions/popper-replacement.md`](../migration/decisions/popper-replacement.md).

Both implementations land in PF-1992 deliverables alongside the per-component plans for Backdrop and Popper.

### 9.9 Other components without direct `@base-ui/react` equivalents

| Picasso component | `@base-ui/react` analog | Strategy |
|---|---|---|
| Badge | None | Keep custom (already mostly custom) — plain `<span>` + Tailwind |
| Container | None | Keep custom — pure layout wrapper |
| FileInput | None | Keep custom — `<input type="file">` + Tailwind |
| Grid | None | Keep custom — pure CSS Grid + Tailwind |
| Page | None | Keep custom — Picasso-specific shell (hamburger, responsive) |
| Notification | `@base-ui/react/toast` exists but Picasso uses `notistack` | Keep `notistack` integration; just type-only fix |

These are not migrations to `@base-ui/react` — they're **JSS/MUI-removal-only** rewrites that stay on plain React + Tailwind. Documented inline in §3 tier inventory.

### 9.10 Sandboxed Note migration via the orchestrator

Before scaling. Note is Tier 1 (peer-dep cleanup only) — simplest possible end-to-end validation of the agent loop.

---

## 10. Sequence proposal (Phase 2)

Order leaf-first, lighter-path first. Tier 1 can start as soon as PF-1992 ships the orchestrator. **Updated for v3 dependency-aware ordering (§3.7).**

```
WEEK 1            WEEK 2-3         WEEK 3-4         WEEK 4-5         WEEK 5-7         WEEK 7-8
─────────────     ─────────────    ─────────────    ─────────────    ─────────────    ─────────────

Tier 1 + Tier 0   Tier 2           Tier 3           Tier 4 siblings  Tier 4 siblings  Tier 5 provider
(PF-1994)         (PF-2024)        (PF-2025)        (PF-2020)        (PF-2021/2022)   (PF-2023)

  Tier 1 (~1d):     Tooltip ★       Accordion         picasso-charts   query-builder    • Provider rewrite
   Note (sandbox)    [@base-ui/      [@base-ui/       (LineChart)      (3-4 PRs)         - theme runtime
   Form              react/tooltip]  react/accordion] (1 PR)           rich-text-editor  - CssBaseline
   FormLayout       Popper★         Dropdown                          (2-3 PRs)         - NotificationsProvider
   ModalContext      [Floating-UI    [@base-ui/                                          - Responsive styles
   Typography        OR Popover]     react/menu +                                        - SSR pipeline
   Container        Checkbox         popover; mixed]                                   • Remove
   FormLabel        Radio            OutlinedInput                                       @material-ui/core
   Grid             FileInput        [mixed]                                             from root peer-dep
   Notification                                                                         • Final peer-dep
   Menu (pkg)       (FormLabel       Page                                                 sweep across ~50
   Utils            already done    [keep custom —                                        transitive consumers
                    in PF-1994)      pure Tailwind]                                     • Lock Happo
  Tier 0 (~3-4d):                                                                         baselines (Phase 3)
   Backdrop★
   Badge / Button
   Slider / Switch
   Tabs
   Modal / Drawer
   (Backdrop first;
    Modal/Drawer
    use it)
```

★ = blocking dependency for downstream tier.

**Rationale:**
- **Integration branch.** All per-component PRs land on the long-lived `picasso-modernization` branch (not master). Branch merges to master after each completed tier. Single revertible point per tier; master stays clean of half-migrated state. Optional `picasso@next` npm dist-tag for early Staff Portal canary testing during Phase 2. See [`PI-4318-PF-1992-design-decisions.md`](./PI-4318-PF-1992-design-decisions.md) §2.
- **Tier 1 first** (peer-dep cleanup + type-only fixes) — fastest value, fewest unknowns, validates the orchestrator. Note as the sandbox. FormLabel runs early so Switch + Checkbox + Radio can proceed cleanly. Utils runs early so its consumers (Dropdown etc.) have a clean dep path.
- **Tier 0** (light-path `@mui/base` → `@base-ui/react`) — straightforward package swaps. **Backdrop first** within Tier 0 (Modal + Drawer depend on it). Backdrop replaces with custom `<div>` per §9.8.
- **Tier 2** — heavy rewrites (5: Checkbox, Radio, Tooltip, FileInput, Popper). **Tooltip first** (FileInput depends on it). **Popper backed by `@floating-ui/react`** per §9.8 locked decision — Picasso's Popper API is preserved verbatim for external consumers. Checkbox + Radio in parallel (both depend only on the now-migrated FormLabel).
- **Tier 3** (composites) — last in `base/*`. Page depends on most of Tier 0 + Tier 2; it migrates absolutely last in `base/*`.
- **Sibling packages** (Tier 4) run after `base/*` so they consume migrated primitives. picasso-charts is a single-PR warm-up.
- **Provider rewrite (Tier 5)** is last because every package consumes it. Swap once, immediately before removing root peer-dep.
- **Final commit**: `@material-ui/core` peer-dep removed from `packages/picasso/package.json` + final peer-dep sweep across ~50 transitive-consumer base/* packages (no source changes, just `package.json` cleanups). Then `picasso-modernization → master` integration merge.

---

## 11. Acceptance criteria for PF-1992 (this document's deliverable)

This document committed to `docs/migration/` (along with the prompt pack in §5.1). Plus:

**Infrastructure**
- [ ] `bin/migration-orchestrator.ts` implemented per the pipelined state machine in §4 (single process, multiple in-flight components, agent slot serialised, polling parallelised)
- [ ] `bin/migration-gate.sh` + `bin/migration-diff.sh` working end-to-end
- [ ] `bin/migration-gate.sh` Happo gate enforces zero-diff or designer-accepted via Happo REST API (§6.3)
- [ ] Pre-merge orchestrator step blocks auto-merge if Happo diffs unresolved (§6.3)
- [ ] Slack webhook notifications wired (`PICASSO_ORCH_SLACK_WEBHOOK` env var); fires on escalation, tier-started, tier-completed, run-failure (see [`PI-4318-PF-1992-design-decisions.md`](./PI-4318-PF-1992-design-decisions.md) §8)

**Branch + release**
- [x] `picasso-modernization` long-lived integration branch created (May 2026)
- [ ] Branch protection on `picasso-modernization`: required reviews (1+), required CI checks, no direct pushes
- [ ] Orchestrator's PR base set to `picasso-modernization` (not master)
- [ ] Decision recorded on `picasso@next` dist-tag publishing during Phase 2

**Content**
- [ ] `docs/migration/manifest.json` populated with all 28 component-migration units (8 Tier 0 + 11 Tier 1 + 5 Tier 2 + 3 Tier 3 + OutlinedInput mixed-state + 4 sibling packages + provider) per §3.9
- [ ] Per-component plan files (`docs/migration/components/<Name>.md`) for Tier 1 (11) + Tier 0 (8) — required to start the PF-1994 batch. **Backdrop.md** and **Popper.md** explicitly authored.
- [ ] `base-ui-react-api-crib.md` rule doc lists per-Picasso-component target paths from §3.1-3.4 (table form: source → `@base-ui/react/<path>` or "keep custom")
- [ ] `rules/api-preservation.md` documents the `classes` prop shim slot-preservation requirement (§2.3)
- [ ] `PROMPT-light.md` + `PROMPT-heavy.md` include the `classes` shim pattern as required output shape
- [ ] `packages/base/Utils/src/utils/with-classes.ts` helper implemented and exported

**Decisions locked (decision docs in `docs/migration/decisions/`)**
- [ ] `decisions/backdrop-replacement.md` — small custom `<div>` + Tailwind + scroll-lock (§9.8)
- [ ] `decisions/popper-replacement.md` — `@floating-ui/react` direct dep (§9.8)
- [ ] `decisions/classes-shim.md` — Tailwind-routing compatibility shim (§2.3)
- [ ] `decisions/integration-branch.md` — `picasso-modernization` + per-tier merge cadence (§10)

**Prerequisites**
- [ ] §9.1 TypeScript upgrade complete (5.5 or 5.6, not 5.7+) — **tracked in a separate ticket**, runs in parallel with PF-1992; must land before PF-1994 starts
- [ ] §9.2 React 19 peer-dep cap-lift mechanism in place (per-component PR sweeps)
- [ ] §9.6 PR #4906 status verified; reference implementations confirmed on `@base-ui/react` (or fresh light-path migration of Note used as canonical reference)

**Validation**
- [ ] Sandboxed Note migration validates orchestrator end-to-end (agent picks Note, applies prompt, runs gates including Happo with `MIGRATION_GATE_HAPPO=run`, opens PR on `picasso-modernization`, polls CI, merges on approval)
- [ ] Happo wiring verified on the Note canary: `HAPPO_API_KEY`/`HAPPO_API_SECRET` set, `HAPPO_PROJECT=Picasso/Storybook`, `--only Note` filter picks up correct stories, report URL is diff-reviewable
- [ ] Risk register reviewed (R5 + R8 downgraded; R14-R17 added); mitigations queued for Phase 2
- [ ] Reviewed by ≥1 engineer outside PF-1992

---

## 12. Decisions log

### Closed (May 2026 design conversations — see [`PI-4318-PF-1992-design-decisions.md`](./PI-4318-PF-1992-design-decisions.md))

1. **TypeScript upgrade target — closed.** Target **5.5 or 5.6**. Not 5.4 (skips meaningful narrowing wins). Not 5.7+ (path-mapping changes risk breaking the monorepo's project-reference graph). **Tracked in a separate ticket**, not part of PF-1992; runs in parallel as a Phase-1 prerequisite to PF-1994. (§9.1)
2. **Popper replacement — closed.** **`@floating-ui/react` direct dependency.** Picasso's Popper has external consumers using a position-anchored API; `@base-ui/react/popover` is trigger-anchored and would force every consumer to refactor. Floating-UI matches Popper's API shape verbatim. (§9.8, R15)
3. **Backdrop replacement — closed.** **Small custom `<div>` + Tailwind + scroll-lock.** External consumers expect standalone Backdrop, not nested inside Dialog. Bounded blast radius. (§9.8, R14)
4. **`classes` prop policy — closed.** **Preserve via Tailwind-routing compatibility shim** (`packages/base/Utils/src/utils/with-classes.ts`). Walks back v3's "remove `classes` universally" plan. Preserves ~80% of MUI v4 `classes` usage in consumer code; codemod budget reallocates from `classes` removal to compound-component reshape codemods (Modal/Drawer/Dialog). (§2.3, §7.4)
5. **Happo gate strictness — closed.** **Gate enforces zero-diff or designer-accepted** via Happo REST API check after `yarn happo` runs. Pre-merge step also blocks auto-merge on unresolved diffs. (§6.3)
6. **Branching strategy — closed + branch created.** **Long-lived `picasso-modernization` integration branch** (already created on the remote, May 2026). All per-component PRs land there. Integration merges to master after each completed tier. Single revertible point per tier; master stays clean. (§10)
7. **Slack notifications — closed.** **Wired in PF-1992** (not deferred). Events: escalation, tier-started, tier-completed, run-failure. Env var `PICASSO_ORCH_SLACK_WEBHOOK`.
8. **Orchestrator execution model — closed.** **Single pipelined-state-machine process.** One agent slot serialised, polling parallelised across many in-flight components. Replaces the original sequential per-component loop.
9. **Release cadence during Phase 2 — closed.** Hold behind `picasso@next` dist-tag from the integration branch. Single major published when `picasso-modernization → master` lands.

### Still to confirm in PF-1992 kickoff

- **React 19 smoke form.** CI job vs Jest `--projects`. §6.2 recommends CI job.
- **PR #4906 status.** Verify whether merged, and target stack (`@mui/base` or `@base-ui/react`). Reference implementations depend on this. (§9.6)
- **Which AI agent for migration.** Codex did Phase 0; Cursor + Claude Code have matured. Validate on Note sandbox.
- **Happo diff threshold.** 0.5% proposed; confirm with designer.
- **Notification toast strategy.** Keep `notistack` (current) or migrate to `@base-ui/react/toast`? Recommend keep `notistack` for now — minimal blast radius; revisit post-PI.

---

## Appendix A — Audit commands

For reproducibility (run from repo root):

```bash
# JSS usage (whole monorepo)
grep -rl "createStyles\|makeStyles\|withStyles" packages \
  --include="*.tsx" --include="*.ts" \
  | grep -vE "node_modules|dist-package"

# MUI v4 source imports (whole monorepo)
grep -rl "@material-ui/" packages \
  --include="*.tsx" --include="*.ts" \
  | grep -vE "node_modules|dist-package"

# @mui/base source imports
grep -rl "@mui/base" packages \
  --include="*.tsx" --include="*.ts" \
  | grep -vE "node_modules|dist-package"

# @base-ui/react source imports (target stack — currently 0)
grep -rl "@base-ui/react" packages \
  --include="*.tsx" --include="*.ts" \
  | grep -vE "node_modules|dist-package"

# package.json dependencies
grep -l "@material-ui/core" packages/*/package.json packages/base/*/package.json
grep -l "\"@mui/base\"" packages/*/package.json packages/base/*/package.json
grep -l "@base-ui/react" packages/*/package.json packages/base/*/package.json

# Per-base-package tally (for tiering)
for d in packages/base/*/; do
  name=$(basename "$d")
  mui_src=$(grep -rl "@material-ui/" "$d/src" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -vE "node_modules|dist-package|\.test\.|/test\.|\.example\.|/story/|\.spec\." | wc -l | tr -d ' ')
  base_src=$(grep -rl "@mui/base" "$d/src" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -vE "node_modules|dist-package|\.test\.|/test\.|\.example\.|/story/|\.spec\." | wc -l | tr -d ' ')
  jss_src=$(grep -rl "makeStyles\|createStyles\|withStyles" "$d/src" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -vE "node_modules|dist-package|\.test\.|/test\.|\.example\.|/story/|\.spec\." | wc -l | tr -d ' ')
  pkgmui=$(grep -c "@material-ui/core" "$d/package.json" 2>/dev/null | tr -d ' ')
  pkgbase=$(grep -c "\"@mui/base\"" "$d/package.json" 2>/dev/null | tr -d ' ')
  printf "%-28s mui=%s @mui/base=%s jss=%s pkg-mui=%s pkg-@mui/base=%s\n" "$name" "$mui_src" "$base_src" "$jss_src" "$pkgmui" "$pkgbase"
done
```

These graduate into `bin/migration-audit.sh` per §9.7.

---

## Appendix B — Update cadence

This plan is a living document during Phase 2 execution. Update triggers:

- **After Note sandbox merges** — refine prompts (§5) and per-component plan templates.
- **After first Tier 0 batch** — recalibrate light-path multipliers; refresh `base-ui-react-api-crib.md`.
- **After first Tier 3 PR** — re-estimate Phase 2 duration; surface architectural surprises early.
- **At each weekly review** — update §3 inventory with status column.
- **At Phase 2 end** — final write-up replaces §10 with actuals; feeds Phase 3 wave planning.
