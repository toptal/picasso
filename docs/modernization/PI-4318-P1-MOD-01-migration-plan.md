# P1-MOD-01 — Picasso AI-assisted Migration Plan (Detailed)

**Parent story:** P1-MOD-01 ([tickets doc](./PI-4318-tickets.md#p1-mod-01--create-migration-plan-for-ai-assisted-picasso-migration))
**Technical context:** [PI-4318-technical-ideation.md — P1-MOD-01](./PI-4318-technical-ideation.md#p1-mod-01--migration-plan-for-ai-assisted-picasso-migration)
**Status:** Detailed plan, pre-execution. Reviewed findings from `packages/base/*`, `packages/picasso-*` sibling packages, `packages/picasso-codemod/*`, and the existing Tailwind stack. Open questions flagged inline; resolve before Phase 2 kickoff.
**Audience:** Engineer(s) picking up Phase 2 execution (`P2-MOD-01`) + reviewers in Phase 1 Go/No-Go meeting.

---

## TL;DR

Picasso's Base UI + Tailwind migration is already in flight, not starting from scratch. The Tailwind stack (`@toptal/base-tailwind` + `@toptal/picasso-tailwind`, Tailwind 4) is installed. 11 components are on `@mui/base`; Button + Switch are fully Tailwind. **22 packages across the monorepo still pull `@material-ui/core`** — 17 in `packages/base/*`, plus `packages/picasso` (aggregator canary), `packages/picasso-provider` (theming runtime), `packages/picasso-charts`, `packages/picasso-query-builder`, and `packages/picasso-rich-text-editor`. **7 base packages still use JSS** plus significant JSS usage in the 4 sibling packages. This plan takes the library from that mixed state to zero MUI v4 + zero JSS, AI-assisted, with Button as the canonical reference implementation.

Three things determine success:
1. **A per-component loop that is cheap to run repeatedly** (branch → AI prompt → tests → diff → iterate).
2. **Strong automated gates** — Happo + Jest + Cypress + React 19 smoke + peer-dep audit — so AI output can be accepted or rejected without human-eyeballing every file.
3. **Sequencing leaf-first** — Page, Dropdown, and Accordion depend on smaller components; migrating upstream components first is cheaper and de-risks downstream.

---

## 1. Current state (grounded in the repo, April 2026)

### 1.1 Repo shape

- Yarn workspaces + Lerna 8 + Nx 21. `packages/*` + `packages/base/*`.
- Node ≥20, TypeScript `~4.7.0` (old — see §8).
- React peer-dep pinned to `>=16.12.0 < 19.0.0` across almost every base package.
- `@toptal/picasso` (`packages/picasso`) is an aggregator that re-exports from `@toptal/picasso-*` base packages. No component source lives here — but it still declares `@material-ui/core: 4.12.4` as the canary peer-dep.
- 78 directories under `packages/base/*`; some are subcomponents (e.g. `ButtonBase`, `Test-Utils`). Deduped "components" count is closer to 65–70 — the PI's "75" is rounded up and includes satellites.
- **Sibling packages outside `packages/base/*`** that also need migration and are NOT aggregators:
  - `@toptal/picasso-provider` — the theming runtime (`PicassoProvider`, `CssBaseline`, `NotificationsProvider`, responsive-style helpers, SSR stylesheet pipeline). 22 source files import from `@material-ui/core`, 9 use JSS. Declares `@material-ui/core` + `@material-ui/utils` as real (not peer) deps. **This is the backbone — it has to go before the root peer-dep can be removed.**
  - `@toptal/picasso-charts` — `LineChart` uses `makeStyles` + `Theme` from `@material-ui/core`. 2 source files.
  - `@toptal/picasso-query-builder` — 11 components (AutoComplete, CombinatorSelector, FieldSelector, MultiSelect, OperatorSelector, QueryBuilder, RangeInput, RunQueryButton, Select, TextInput, ValueEditor). 21 source files on MUI v4 + JSS.
  - `@toptal/picasso-rich-text-editor` — 8 components (LexicalEditor, LexicalEditorView, RichText, RichTextEditor, RichTextEditorEmojiPicker, RichTextEditorToolbar, plugins/FocusOnLabelClickPlugin, plugins/Toolbar). 23 source files on MUI v4 + JSS.
- Already-clean non-base packages: `picasso-forms`, `picasso-codemod`, `picasso-pictograms`, `picasso-tailwind`, `picasso-tailwind-merge`, `base-tailwind`, `shared`, `topkit-analytics-charts`, `Carousel` (base).

### 1.2 Styling: where each component sits today

Scanned `packages/base/*/src/**/*.{ts,tsx}` for `makeStyles|createStyles|withStyles` (JSS) and `@material-ui/core` imports, and for `@mui/base` + `twMerge`/`classnames` (new stack).

**On new stack already** (Tailwind + `@mui/base`, no JSS):

```
Backdrop · Badge · Button · Drawer · Menu · Modal · OutlinedInput · Slider · Switch · Tabs
```
(10 of the 11 @mui/base packages; Dropdown is mixed — see below.)

**Partially migrated (Tailwind + JSS or Tailwind + MUI v4 coexisting)** — these already use `cx`/`twMerge` alongside `@material-ui/core` or JSS:

```
Accordion · Checkbox · Dropdown · FileInput · FormLabel · Grid · Notification · Page · Radio · Tooltip · Utils
```

**Still MUI v4 peer-dep only** (no `@mui/base`, still JSS in some places):

```
Form · FormLayout · ModalContext · Note · Popper · Typography
```
(Most of these are thin wrappers or providers, low JSS surface.)

**Packages still listing `@material-ui/core` in their `package.json`** (22 across the monorepo):

- `packages/base/*` (17): Accordion, Checkbox, Drawer, Dropdown, FileInput, Form, FormLabel, FormLayout, Grid, ModalContext, Note, Page, Popper, Radio, Tooltip, Typography, Utils.
- `packages/picasso` (aggregator peer-dep canary).
- `packages/picasso-provider` (real dep; also `@material-ui/utils`).
- `packages/picasso-charts`, `packages/picasso-query-builder`, `packages/picasso-rich-text-editor`.

**Packages still using JSS primitives** in source:

- `packages/base/*` (7): Accordion, Checkbox, FileInput, Page, Radio, Tooltip, Utils.
- `packages/picasso-provider` (9 source files — theme, responsive styles, CssBaseline, NotificationsProvider).
- `packages/picasso-charts` (2 source files — LineChart).
- `packages/picasso-query-builder` (21 source files across 11 components).
- `packages/picasso-rich-text-editor` (23 source files across 8 components).

**Type-only MUI v4 leaks inside packages marked "migrated"** (easy to miss, still block peer-dep removal):

- `packages/base/Container/src/Container/Container.tsx` — `import type { PropTypes } from '@material-ui/core'`
- `packages/base/OutlinedInput/src/OutlinedInput/types.ts` — `import type { InputBaseComponentProps } from '@material-ui/core/InputBase'`
- `packages/base/Notification/src/use-notification/use-notifications.tsx` — `import type { SnackbarOrigin } from '@material-ui/core/Snackbar'`

At the root, `packages/picasso/package.json` still declares `@material-ui/core: 4.12.4` as a peer-dep — this is the canary. When it goes, modernization is done. **But removing the root canary requires `packages/picasso-provider` to be migrated first, since the provider holds the MUI v4 theme runtime that every component consumes.**

### 1.3 Tailwind stack (already here)

- `tailwind.config.js` at repo root composes two presets:
  - `@toptal/base-tailwind` — minimal BASE tokens (spacing extensions, line-heights).
  - `@toptal/picasso-tailwind` — Picasso-specific plugin + token theme (screens, spacing, typography).
- `@toptal/picasso-tailwind-merge` — `tailwind-merge` configured for Picasso's classes. Used in `Button.tsx` like `twMerge(cx(...))`.
- Tailwind 4 (`tailwindcss: ^4.2.1`) and `@tailwindcss/postcss` are installed.
- Components consume tokens from `base-tailwind` + `picasso-tailwind` preset paths.

Implication for the migration: **styles are already expressible in Tailwind; the migration is largely rewriting `styles.ts` files from JSS to Tailwind utility arrays, plus swapping underlying components from `@material-ui/core` to `@mui/base`**. The styling system itself is decided.

### 1.4 Reference implementations (Phase 0)

- `Button.tsx` — canonical Tailwind-migrated component. 186 lines. `styles.ts` is a set of helper functions returning Tailwind class arrays (e.g. `createSizeClassNames`, `createVariantClassNames`). Uses `classnames` + `twMerge`.
- `Switch.tsx` — 115 lines, even simpler: no `styles.ts`, pure `cx(...)` inline + `@mui/base/Switch`.
- Button is a better reference because it has all the shapes (variants, sizes, slot-style icon composition). Switch is a good "minimal" reference.

### 1.5 Codemod infrastructure (already here)

- `@toptal/picasso-codemod` package with `jscodeshift`, `meow` CLI, fixtures-based test structure (`__testfixtures__/*.input.tsx` + `*.output.tsx` + `__tests__`).
- Active versions: `v5.0.0` through `v52.2.0`. New breaking changes get a new version folder with `index.ts`, `<codemod>.ts`, fixtures, and tests. Pattern is well-worn.
- Utilities under `src/utils` handle import manipulation (`addImportMember`, `findSpecifierForImport`, `isImportFor`).

Implication: **codemods are not a Phase 2 greenfield problem. We extend an existing framework** (P2-MOD-02). The AI-assisted part is generating the codemod body from the before/after component change.

### 1.6 Testing (already here)

- **Jest unit tests**: `packages/base/<Component>/src/<Component>/test.tsx` + `__snapshots__/`. Custom `@toptal/picasso-test-utils` wrapper ships `PicassoProvider`.
- **Cypress component tests**: `cypress/component/<Component>.spec.tsx`. 53 component specs.
- **Happo visual regression**: `yarn happo` / `yarn happo:storybook`, plus `happo-cypress` for Cypress-rendered stories. Baselines are in Happo cloud.
- **Storybook**: 6.5 with a custom `PicassoBook` wrapper. Every component has a `story/` folder with `*.example.tsx` files + `index.jsx`.

### 1.7 Agent Experience artifacts

- `bin/generate-docs.mjs` exists (Phase 0) — produces `llm-docs/` output, but that folder is git-ignored / not committed in the working tree at time of reading.
- **No** `.picasso/` folder, `CLAUDE.md`, `.cursorrules`, or `llms.txt` in the Picasso repo yet. These land in P1-AIC-01 / P1-AIC-03.
- No `.figma.tsx` files (Code Connect starts in P1-FIG-01).

### 1.8 Phase 0 AI migration result (Button + Switch)

Per PI-4318 prose + the observable repo state: Button + Switch were migrated via a Codex prompt ([PR #4906](https://github.com/toptal/picasso/pull/4906)). Both are now Tailwind + (for Switch) `@mui/base`. Button went through `.figma.tsx`-free because Code Connect didn't exist yet, but we have test parity.

Open question: **the exact Phase 0 prompt is not versioned in the repo**. It needs to be retrieved and made a first-class artifact of this plan (§5).

---

## 2. Migration targets (what "migrated" means)

A component is migrated when all of the following are true:

### 2.1 Dependency exits

- **Zero `@material-ui/core` imports** in source. This is the primary MUI v4 exit.
- **Zero `@material-ui/styles` imports** (including `makeStyles`, `withStyles`, `createStyles`, `Theme`).
- **Zero `jss`-specific selectors** (`&$expanded`, `&$disabled` parent-refs).
- Package's `package.json` no longer lists `@material-ui/core` in `dependencies` or `peerDependencies`.
- If the component has an `@mui/base` equivalent, it's used. If not, the primitive is implemented with `@mui/base/useX` hooks or plain React.
- `PicassoProvider.override(() => ({ MuiX: ... }))` calls are removed (they don't apply once the underlying component isn't MUI v4).

### 2.2 Styles on Tailwind

- All CSS lives in Tailwind utility classes, authored via `cx(...)` + `twMerge` (pattern from Button).
- `styles.ts` either (a) is deleted, or (b) contains helper functions returning `string[]` of Tailwind classes (pattern from Button). No JSS objects.
- Raw hex / px values in source are converted to tokens from `@toptal/picasso-tailwind` / `@toptal/base-tailwind` presets when a token exists. Where a value has no token equivalent, a comment documents the gap (input to P1-FIG-03).
- Dynamic / runtime-computed styles use Tailwind's arbitrary-value syntax (`[--var]`, `[color:var(--foo)]`) or `style={{ ... }}` for numeric interpolation — the Page component already demonstrates this pattern.

### 2.3 API preservation (default)

- Public prop surface unchanged vs `master` pre-migration.
- If a prop must change (legitimately — e.g. an MUI-leaked prop that can't be preserved), it lands behind a semver-major with a codemod in `picasso-codemod` (§7).

### 2.4 Tests green

- `test.tsx` — Jest green, snapshot intentionally regenerated if class names change (unavoidable; documented in PR).
- `cypress/component/<Component>.spec.tsx` — green.
- Happo — diff reviewed by designer. Accepted diffs documented in PR body with the rationale.
- React 19 smoke suite (see §6) — green.

### 2.5 `.figma.tsx` validity

- If a `.figma.tsx` exists for the component (from P1-FIG-01), it still parses, its Figma node still resolves, and the snippet it emits matches the new prop surface.

---

## 3. Component inventory + tiering

Tiered by **migration complexity** (LOC in `.tsx` + `styles.ts`, surface of MUI v4 usage, number of subcomponents, theme-override presence). A machine-produced audit script (see §9) will re-rank this before Phase 2 kickoff; this initial tiering is read-by-hand.

### Tier 1 — Leaf, small surface (≤150 LOC, zero or one child component)

Cheapest to migrate. AI-first, one-shot expected to work.

| Component | Current state | Notes |
|---|---|---|
| Form | MUI v4 peer only, thin wrapper | Good canary |
| FormLabel | MUI v4 + some Tailwind | Straightforward |
| FormLayout | MUI v4 peer only | Mostly layout |
| Note | MUI v4 peer only | Near-trivial |
| Typography | MUI v4 peer only | Watch out for variant enum |
| ModalContext | MUI v4 peer only | Context provider |
| Utils | Mixed JSS + helpers | Migrate the Transitions submodules (Rotate180) |

### Tier 2 — Compound, medium surface (150–400 LOC, 2–5 subcomponents)

AI-first but expect 1–2 iterations. Compound DoD (all subcomponents green in one PR).

| Component | Current state | Notes |
|---|---|---|
| Checkbox | JSS + MUI v4 | CheckboxGroup included |
| Radio | JSS + MUI v4 + override | `RadioGroup` included |
| Tooltip | JSS + MUI v4 + `use-tooltip-state` | `@mui/base/Tooltip` exists — use it |
| FileInput | JSS + MUI v4, 3 subcomponents | FileListItem, ProgressBar, FileList |
| Popper | MUI v4 | `@mui/base/Popper` or `@floating-ui/react` |
| Notification | MUI v4 hook-heavy | `use-notifications` ties in with `notistack` |
| Grid | MUI v4 | Consider CSS Grid Tailwind utilities directly; low value staying on `@mui/base` |

### Tier 3 — Composite, high surface (400+ LOC, deep composition, theme-override-dependent)

AI-assisted but expect manual touch-up. Buffer 1.5–2× a Tier 2 component.

| Component | Current state | Notes |
|---|---|---|
| Dropdown | JSS + MUI v4 + some `@mui/base` | Partial migration already; finish it |
| Accordion | JSS + MUI v4 + `PicassoProvider.override` | `$expanded` parent-refs to unwind |
| Page | JSS + MUI v4 + complex layout (hamburger, responsive) | Already has some Tailwind |

### Tier 4 — Sibling packages (outside `packages/base/*`)

These packages need their own migration stories in Phase 2. Split by package boundary so each has a clear owner and independent DoD. Same per-component loop (§4) applies, but testing is package-level (Cypress + Jest + Happo per the package's existing suite).

| Package | Components | Source-file LOC | Notes |
|---|---|---|---|
| `picasso-charts` | LineChart | ~2 files (low) | Small; one PR. JSS + `Theme` import only. |
| `picasso-query-builder` | AutoComplete · CombinatorSelector · FieldSelector · MultiSelect · OperatorSelector · QueryBuilder · RangeInput · RunQueryButton · Select · TextInput · ValueEditor | 11 components, 21 files | Medium; batch into 3–4 PRs by component cluster. |
| `picasso-rich-text-editor` | LexicalEditor · LexicalEditorView · RichText · RichTextEditor · RichTextEditorEmojiPicker · RichTextEditorToolbar · plugins/FocusOnLabelClickPlugin · plugins/Toolbar | 8 components, 23 files | Medium; batch into 2–3 PRs. `create-lexical-theme.ts` + `typographyStyles.ts` are the tricky parts. |

### Tier 5 — Runtime / Provider (decommission the MUI v4 theme layer)

`picasso-provider` is not a component migration — it's a system rewrite. It has to come **last** in Phase 2 and gates the root `@material-ui/core` peer-dep removal (the PI's canary).

| Package | What needs to change | Notes |
|---|---|---|
| `picasso-provider` | `PicassoProvider` (removes `createTheme` + `Overrides`); `theme.ts` module augmentation of `@material-ui/core/styles` dropped; `styles.tsx` JSS removed; `CssBaseline`, `NotificationsProvider`, `PicassoRootNode`, `PreventPageWidthChangeOnScrollbar` re-styled in Tailwind; responsive-styles JSS class-name generator replaced with Tailwind arbitrary-value selectors; `get-serverside-stylesheets` SSR pipeline replaced (Tailwind 4 extracts CSS at build time, no runtime JSS sheet). | Different DoD: no per-component Happo; whole-repo Storybook + Portal smoke tests must stay green. Expect 1–2 weeks of focused work. |
| `packages/picasso/package.json` | Remove `@material-ui/core: 4.12.4` peer-dep. Remove JSS runtime setup from any bootstrap paths. | The **final** commit of Phase 2. |

### Out-of-scope items

- `Icons`, `Pictograms` — SVG-only, no MUI dep.
- `Test-Utils` — tooling.
- `Carousel` (base) — confirmed clean on audit.
- `picasso-forms`, `picasso-codemod`, `picasso-tailwind`, `picasso-tailwind-merge`, `base-tailwind`, `shared`, `topkit-analytics-charts` — no MUI v4 / JSS; benefit from migration transitively via the base primitives they depend on.
- ~48 additional `packages/base/*` directories (Alert, Autocomplete, Avatar, Select, Table, Tag, Timeline, etc.) — these build on top of core primitives (Container, Typography, Button, Input, OutlinedInput, Popper) and are already on Tailwind. They inherit migration transitively and don't need their own story.

### Final counts (for this plan)

**~38 migration units + 1 provider/runtime rewrite**, split across 5 tiers:

- 7 Tier 1 `base/*` (Form, FormLabel, FormLayout, Note, Typography, ModalContext, Utils)
- 7 Tier 2 `base/*` (Checkbox, Radio, Tooltip, FileInput, Popper, Notification, Grid)
- 3 Tier 3 `base/*` (Dropdown, Accordion, Page)
- 3 Tier 3 `base/*` type-leak cleanups (Container, OutlinedInput, Notification type imports) — roll into Phase 2 wrap-up
- ~20 components in Tier 4 siblings (1 charts + 11 query-builder + 8 RTE)
- 1 Tier 5 — `picasso-provider` + root peer-dep removal (canary)

→ **Roughly 38 PRs for base + siblings, plus the provider rewrite as its own PR stream.** At 3–5 working days per Tier 2/3 unit and 1–2 per Tier 1, two parallel engineers finish base/* + siblings in ~6–8 weeks, and the provider rewrite adds ~1.5–2 weeks on top. Phase 2 shape in the PI should be revisited with these numbers.

---

## 4. Per-component migration playbook

One loop per component. The loop is designed so human time is only spent on the review step.

```
┌────────────────────────────────────────────────────────────────────┐
│  PER-COMPONENT LOOP                                                │
│                                                                    │
│  1. Prep        → create branch                                    │
│                   regenerate Happo baseline                        │
│                   snapshot current test.tsx output                 │
│                                                                    │
│  2. Migrate     → run AI prompt with context pack (§5)             │
│                                                                    │
│  3. Gate        → pnpm build → tsc → lint → Jest →                 │
│                   Cypress → Happo → React 19 smoke                 │
│                                                                    │
│  4. Diff        → npm-run diff script: report                      │
│                   • prop-surface diff                              │
│                   • import diff                                    │
│                   • Happo diff summary                             │
│                                                                    │
│  5. Review      → designer reviews Happo;                             │
│                   engineer reviews prop diff                       │
│                                                                    │
│  6. Iterate     → if any gate red, feed errors back to AI          │
│                                                                    │
│  7. Land        → PR, changeset, merge                             │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 4.1 Prep

- `yarn build:package` to ensure all deps build.
- `happo` on the component's stories to refresh the pre-migration baseline (so the diff is honest).
- Capture the component's current public prop interface via `tsc --declaration --emitDeclarationOnly --outDir /tmp/pre` and diff later.

### 4.2 Migrate (AI prompt)

See §5 for the prompt pack. The agent writes directly into the worktree — no clipboard copy-paste.

### 4.3 Gate

Script (in `bin/migration-gate.sh`):

```
yarn workspace @toptal/picasso-<name> build:package \
  && yarn tsc --noEmit \
  && yarn lint \
  && yarn jest packages/base/<Name> \
  && yarn cypress run --component --spec cypress/component/<Name>.spec.tsx \
  && yarn happo --only <Name> \
  && yarn test:react19 --only <Name>
```

Fast-fail order: typecheck cheapest first, Happo + React 19 last.

### 4.4 Diff report

Script outputs markdown:

```
## <Component> migration diff

### Prop surface
- [ADDED]    `as?: ElementType`
- [REMOVED]  `classes?: Classes`   ← codemod required
- [RENAMED]  `expanded` → `open`   ← codemod required

### Imports
- [REMOVED]  @material-ui/core/{ Button, Typography }
- [ADDED]    @mui/base/Button
- [REMOVED]  @material-ui/core/styles/{ makeStyles, createStyles }

### Happo diff
- 3 screens changed, 1 unchanged.
  • primary-button-default.png — 0.3% pixel diff (sub-threshold)
  • primary-button-hover.png  — 2.1% pixel diff (REVIEW)
  • primary-button-disabled.png — 0.1% pixel diff

### React 19 smoke
- 0 warnings, 0 errors.
```

This is the artifact designer reads.

### 4.5 Review

- **designer** owns the Happo diff. Any diff >0.5% needs explicit OK.
- **Engineer** owns the prop-surface diff. Anything under `[REMOVED]` or `[RENAMED]` creates a codemod entry (§7).

### 4.6 Iterate

If a gate step fails, collect the failing output (Jest trace, Happo PR URL, tsc output) and feed it back to the agent via a targeted follow-up prompt. Hard cap: **3 agent iterations** before escalating to manual migration.

### 4.7 Land

- PR title: `[<Tier>] migrate <Component> to Tailwind + @mui/base`
- Changeset: auto-generated from the prop-surface diff.
- PR description: the diff report (§4.4), Happo URL, codemod refs.
- Breaking changes → semver major on the package.

---

## 5. AI prompt & context pack

A prompt is useless without a context pack. Both live under `docs/migration/` and are versioned.

### 5.1 Files the agent sees (context pack)

```
docs/migration/
├── PROMPT.md                           ← §5.2
├── reference/
│   ├── Button.tsx                      ← canonical migrated component
│   ├── Button-styles.ts
│   ├── Button-package.json
│   └── Switch.tsx                      ← minimal migrated component
├── rules/
│   ├── styling.md                      ← Tailwind-class composition rules
│   ├── api-preservation.md             ← "don't change props unless..."
│   └── jss-to-tailwind-crib.md         ← JSS pattern → Tailwind pattern table
└── tokens/
    └── picasso-tailwind-tokens.md      ← extracted from preset
```

The agent gets: the prompt, the 2 reference components, the 3 rule docs, the token reference, and the **component it is migrating** (source + styles + test + story + package.json). Nothing more — context bloat is the enemy.

### 5.2 PROMPT.md (v1 draft)

```
You are migrating a component from Picasso's legacy stack
(MUI v4 + JSS) to Picasso's modern stack (Tailwind + @mui/base).

You have read access to:
- reference/Button.tsx — canonical Tailwind-migrated reference.
- reference/Switch.tsx — minimal Tailwind-migrated reference.
- rules/ — three rule files you MUST follow.
- tokens/picasso-tailwind-tokens.md — the tokens available.

You are migrating: packages/base/<NAME>

Your task:

1. Replace @material-ui/core imports:
   - @material-ui/core/<Component>      → @mui/base/<Component> when available.
   - @material-ui/core/styles           → delete; styles move to Tailwind classes.
   - @material-ui/core/PicassoTheme     → delete; use tokens directly via Tailwind classes.

2. Replace JSS with Tailwind:
   - Every createStyles/makeStyles object becomes either:
     a) inline className={cx(...)} if styles are static, or
     b) a helper function in styles.ts that returns string[] (pattern from Button).
   - JSS parent-refs like "&$expanded" convert to Tailwind pseudo-classes or
     conditional class arrays driven by the component's state.
   - Raw hex / px values: replace with Picasso Tailwind tokens where tokens exist.
     Where no token exists, keep the literal BUT add a comment
     // TODO(tokens): <description> so P1-FIG-03 can triage.

3. Preserve the public prop surface EXCEPT where a prop leaks an MUI v4 type
   (e.g., `classes: Classes`) that cannot be preserved. If you remove a prop,
   add it to a machine-readable diff at docs/migration/<Component>-diff.json.

4. Update the component's package.json:
   - Remove @material-ui/core from dependencies AND peerDependencies.
   - Add @mui/base if used.
   - Add @toptal/picasso-tailwind-merge (peer) and
     @toptal/picasso-tailwind (peer) if not already present.

5. Do NOT change:
   - test.tsx assertions (snapshots will regenerate; assertions must stay).
   - story files (they exercise the public API).
   - file locations or export names.

Output: file edits only. Do not write explanations. Stop when all files
under packages/base/<NAME>/src/** are updated.
```

Open questions on the prompt (resolve during pilot wk1 when harness runs):
- Does the agent follow "don't explain"? Claude Code does; Cursor's agent mode sometimes adds commentary — document the tool-specific wrappers needed.
- Should the prompt include Happo screenshots of the current state? Probably yes for Tier 3; wasteful for Tier 1.

### 5.3 Rule docs

**styling.md — excerpt**

```
- Always compose className via `cx(...)`. If multiple sources merge, wrap in `twMerge(cx(...))`.
- Class arrays (string[]) returned from helper functions are the canonical "styles.ts" shape.
- No `style={{...}}` unless a value is truly dynamic (e.g., a user-provided width).
- No CSS files.
- Conditional classes: plain ternaries or Tailwind's data-attribute selectors
  (`data-[state=open]:bg-blue-500`), not JSS parent-refs.
```

**api-preservation.md — excerpt**

```
- Public props listed in the component's interface MUST remain.
- Types may tighten (remove unused union members) but not broaden (adding
  a required prop is a breaking change).
- Props whose values are MUI v4-specific (e.g., `MuiSwitchClassKey`)
  should be replaced with Picasso-specific equivalents, with the old
  name kept as a deprecated alias for one major.
- If you MUST remove a prop, add an entry to docs/migration/<Component>-diff.json
  with { prop, reason, codemod: "required"|"none" }.
```

**jss-to-tailwind-crib.md — excerpt**

```
| JSS pattern                            | Tailwind equivalent                                  |
|----------------------------------------|------------------------------------------------------|
| `color: palette.grey.dark`             | `text-gray-700`                                      |
| `'&$expanded': { margin: 0 }`          | conditional class `{ 'm-0': expanded }`              |
| `'&:hover': { bg: palette.primary }`   | `hover:bg-blue-500`                                  |
| `marginLeft: '1rem'`                   | `ml-4` (uses Picasso spacing scale)                  |
| dynamic size via `${size * 4}px`       | `style={{ width: size * 4 }}` OR arbitrary `w-[${size*4}px]` |
| `transition: 'transform 150ms cubic-bezier(...)'` | `transition-transform duration-150 ease-[cubic-bezier(...)]` |
```

---

## 6. Testbed setup

### 6.1 Local command

```
yarn migrate:component <Name>
```

This wraps:

```
bin/migration-gate.sh <Name>   # §4.3
bin/migration-diff.sh  <Name>  # §4.4
```

Both scripts emit to `migration-runs/<date>/<Name>/` — no shell output to scroll through.

### 6.2 React 19 smoke (new for this plan)

Picasso peer-deps cap React at `<19.0.0` today. The smoke suite installs React 19 in a side-by-side workspace and verifies the migrated component renders without warnings or errors in strict mode.

Proposed setup:

- New package `packages/base/<Name>/react19-smoke.test.tsx` runs under a Jest config with `--projects` pointing at a React-19 project.
- Or: a CI job `react19-validate` that `yarn install --force react@19 react-dom@19` in a scratch dir and runs the component's stories via RTL.

Recommendation: start with the CI job form (less config noise, cleaner rollback) and graduate to `--projects` in Phase 2 if it gets flaky.

### 6.3 Happo policy during migration

- Pre-migration: baseline refreshed on `master`.
- Post-migration: diff against that refreshed baseline. Anything >0.5% pixel change in a diff-eligible region requires designer sign-off.
- After merge: the new screenshots become the Phase 3 pre-migration baseline for consumer apps.

### 6.4 Cypress integration

- Component specs in `cypress/component/<Name>.spec.tsx` must pass.
- No changes expected, but the migration may force selector updates if class names are referenced. If Cypress asserts on class names (bad practice), flag as a separate fix.

---

## 7. Codemod strategy (feeds P2-MOD-02)

Any `[REMOVED]` or `[RENAMED]` prop from §4.4's diff report requires a codemod. Codemods live in `@toptal/picasso-codemod/src/v<next>/<change-name>/`.

### 7.1 What AI writes, what humans write

- **AI writes** the codemod body from the before/after snippets, following the fixture pattern already in `v52.2.0/non-compound-forms/`.
- **Human reviews** — codemods are blast-radius tools; cheap to author, expensive to get wrong. Target: 90% AI, 10% manual refinement.

### 7.2 Fixture convention (already in repo)

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
    └── <change-name>.test.ts         # jscodeshift test runner
```

### 7.3 Testing real usage

Each codemod gets smoke-tested on 2–3 real usage patterns mined from the 23 active repos (reusing the P1-MEAS-01 usage analyzer). Add those as fixtures.

---

## 8. Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | TypeScript 4.7 is too old for modern agent tooling | High | Medium | Upgrade TS to 5.4+ as a **prerequisite** to Phase 2. Tracked in §9. |
| R2 | React 19 peer-dep cap (`<19.0.0`) cascades across 17 packages | High | Medium | Bump each package's peer range to `>=16.12.0` as part of per-component migration. Add React 19 smoke. |
| R3 | JSS parent-refs (`&$expanded`) don't map 1:1 to Tailwind | Medium | Medium | Pattern documented in jss-to-tailwind-crib.md; agent sees the pattern; Tier 3 (Accordion, Page) expect manual pass. |
| R4 | `PicassoProvider.override(() => ({ MuiX: ... }))` is scattered; removing it can regress unmigrated siblings | Medium | High | Audit all `PicassoProvider.override` call sites up front. Remove override only when its target component is migrated. Canary: run full Happo suite after each Tier-3 PR. |
| R5 | Agent hallucinates nonexistent `@mui/base` exports (e.g., `@mui/base/Tooltip` naming) | Medium | Low | Prompt pins the list of available `@mui/base` exports; rules file carries it. |
| R6 | Happo diff-fatigue — too many screens change, designer approves reflexively | Medium | High | Happo review budget: no more than one Tier-2/3 PR in review at a time. Automated diff summary highlights >0.5%. |
| R7 | Consumer apps use internal MUI v4 exports that Picasso re-exports by accident | Low | High | Audit `@toptal/picasso` exports for any `@material-ui/core` type leakage. Add an ESLint rule `no-reexport-mui-v4`. |
| R8 | `@mui/base` is beta (`5.0.0-beta.58`) — API may move | Low | Medium | Pin `@mui/base` version in `resolutions`. Track next beta → stable. |
| R9 | Codemod false positives on custom wrappers (`<AppButton>` re-exports) | Medium | Medium | Codemod tests include a "wrapped" fixture per change. Run codemods on 2–3 real consumer repos before release. |
| R10 | AI agent quality drift between pilot and Phase 2 | Low | Low | Re-validate the prompt at Phase 2 start; version-control PROMPT.md. |
| R11 | `@material-ui/styles` types leak into public component prop types | High | Medium | Diff report flags these; each is either preserved as a Picasso-native type or removed with a codemod. |

---

## 9. Prerequisites before Phase 2 execution

These are the prep items that must be **done in Phase 1 non-gating or early Phase 2 day 1**, otherwise the per-component loop will stall.

1. **Upgrade TypeScript to 5.4+** (R1). Check that `@toptal/davinci-*` tooling supports it. One PR to the monorepo root, not a per-component thing.
2. **Lift the React 19 peer-dep cap** across base packages (R2). A codemod on `package.json` files.
3. **Author `docs/migration/` pack** (§5.1). Reference components + rules + token map. This is the core deliverable of P1-MOD-01 itself.
4. **Ship `yarn migrate:component <Name>`** (§6.1). The gate + diff scripts.
5. **Audit `PicassoProvider.override` call sites** (R4). Produce a single file listing every override and which component target must be migrated first.
6. **Version and retrieve the Phase 0 Button/Switch prompt**. Put it in `docs/migration/PROMPT.md` as v0; iterate to v1 during pilot.
7. **Produce a machine-generated tiering audit** (replaces §3's hand-tiering). Run a script that outputs, per package: LOC, MUI v4 import count, JSS call count, subcomponent count, existing Tailwind % → ranks Tier 1/2/3.
8. **Decide on `@mui/base` vs Radix/Floating-UI for Popper/Tooltip/Grid** (R8). `@mui/base`'s beta status makes this a live question for these three.

---

## 10. Sequence proposal (Phase 2)

Order components leaf-first and by risk. Dependencies come from the `packages/base/<X>/package.json` dependency blocks.

```
WEEK 1-3            WEEK 3-5           WEEK 5-6           WEEK 6-7           WEEK 7-8
─────────────       ─────────────      ─────────────      ─────────────      ─────────────

Tier 1 base/*       Tier 2 base/*      Tier 3 base/*      Tier 4 siblings    Tier 5 provider
(7 PRs, parallel)   (7 PRs)            (3 PRs,            (~20 PRs,           (rewrite + canary)
                                        one-at-a-time)    parallel across
  Note ─┐            Checkbox ─┐        Dropdown ─┐        3 packages)        • picasso-provider
  Typography ─┤      Radio ────┤        Accordion ┤                            rewrite:
  Form ───────┤      Tooltip ──┤        Page ─────┘        charts (1 PR) ──┐    - theme runtime
  FormLabel ──┤      Popper ───┤                           query-builder   │    - CssBaseline
  FormLayout ─┤      Notific. ─┤        Type-leak fixes:    (3-4 PRs) ─────┤    - Notifications
  ModalCtx ───┤      Grid ─────┤        Container          RTE (2-3 PRs) ─┘     - Responsive
  Utils ──────┘      FileInput ┘        OutlinedInput                             styles
                                        Notification                         • Remove
                                        (type imports)                        @material-ui/core
                                                                              from root peer
                                                                            • Decommission
                                                                              JSS SSR pipeline
                                                                            • Regenerate Happo
                                                                              baselines (locked
                                                                              for Phase 3)
```

Rationale:
- Typography + FormLabel + Form + FormLayout are depended on by Checkbox / Radio / etc. — migrating them first means downstream components see a clean dependency.
- Dropdown + Accordion + Page are the expensive `base/*` units; saving them for last means the playbook has matured before we hit the hard cases.
- Tier 4 sibling packages (charts / query-builder / RTE) consume migrated base primitives, so they run **after** Tier 1–3 is done. The three sibling packages are independent of each other — parallelize across available engineers.
- Tier 5 (`picasso-provider`) is last because **every** package consumes the provider's theme. Swap it once, right before removing the root peer-dep. Running it earlier would force coordinated changes in every in-flight component PR.
- The `@material-ui/core` peer-dep removal in `packages/picasso/package.json` is the **final** commit of Phase 2.

---

## 11. Acceptance criteria for P1-MOD-01 (this document)

Re-stating from the tickets doc, scoped to what this plan must deliver:

- [ ] `docs/migration/migration-plan.md` committed in Picasso repo — this document, adapted.
- [ ] Complexity tiering for all 17 migration units — §3, replaced by machine-generated audit (§9.7).
- [ ] Codemod strategy — §7.
- [ ] 2–3 example codemod stubs — follow-up PR once Tier 1 migrations produce real prop diffs.
- [ ] Risk register with mitigations — §8.
- [ ] Reviewed by at least one engineer outside the pilot team.
- [ ] Prompt pack (`docs/migration/`) scaffolded (§5.1).
- [ ] `yarn migrate:component <Name>` wrapper scripted (§6.1) with a working dry-run.

---

## 12. Open decisions (raise in Phase 1 kickoff)

1. **TypeScript upgrade** — 5.4 minimum, but do we go to 5.6? Driven by `@toptal/davinci-*` compatibility.
2. **React 19 smoke form** — separate CI job vs Jest `--projects`. §6.2 recommends the CI job.
3. **`@mui/base` vs alternatives for Popper / Tooltip / Grid** — spike in pilot wk1.
4. **Which AI agent for migration** — Codex did Phase 0 well; Cursor and Claude Code have matured since. Validate all three on one Tier-1 component (suggest: `Note`) during Phase 1 non-gating time.
5. **Happo diff threshold** — 0.5% proposed; confirm with designer.
6. **PR granularity** — one PR per migration unit (17 PRs) vs grouped (e.g., all Forms together)? Proposed: 17 PRs — smaller rollback surface, easier review cadence.
7. **Breaking-change policy** — strict API preservation (everything gets a codemod), or allow small removals without codemods when usage is provably zero? Proposed: strict.
8. **Release cadence during Phase 2** — do we ship a Picasso major per migration unit, or hold all behind a feature flag and ship a single major at the end? Proposed: hold behind a `picasso@next` tag; single major at the end, with intermediate `@next` releases consumable by willing early adopters.

---

## Appendix A — Commands used to ground this plan

For reproducibility (run from repo root):

```
# JSS usage (whole monorepo, not just base/*)
grep -rl "createStyles\|makeStyles\|withStyles" packages \
  --include="*.tsx" --include="*.ts" \
  | grep -v dist-package | grep -v node_modules

# MUI v4 source imports (whole monorepo)
grep -rl "@material-ui/" packages \
  --include="*.tsx" --include="*.ts" \
  | grep -v dist-package | grep -v node_modules

# MUI v4 package.json dependencies (whole monorepo) — must return 22
grep -l "@material-ui/core" packages/*/package.json packages/base/*/package.json

# @mui/base adopters
grep -rl "@mui/base" packages \
  --include="*.tsx" --include="*.ts" \
  | grep -v dist-package | grep -v node_modules

# Tailwind/classnames adopters
grep -rl "twMerge\|classnames" packages --include="*.tsx" \
  | grep -v dist-package | grep -v node_modules \
  | grep -v test | grep -v story

# Per-base-package tally (handy for tiering)
for d in packages/base/*/; do
  name=$(basename "$d")
  mui_src=$(grep -rl "@material-ui/" "$d/src" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -vE "node_modules|dist-package|\.test\.|/test\.|\.example\.|/story/|\.spec\." | wc -l | tr -d ' ')
  jss_src=$(grep -rl "makeStyles\|createStyles\|withStyles" "$d/src" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -vE "node_modules|dist-package|\.test\.|/test\.|\.example\.|/story/|\.spec\." | wc -l | tr -d ' ')
  pkgmui=$(grep -c "@material-ui/core" "$d/package.json" 2>/dev/null | tr -d ' ')
  printf "%-28s mui=%-3s jss=%-3s pkg-mui=%-1s\n" "$name" "$mui_src" "$jss_src" "$pkgmui"
done
```

These commands graduate into `bin/migration-audit.sh` per §9.7.

---

## Appendix B — Document review / update cadence

This plan is a living document for the Phase 2 execution. Update triggers:

- **After each Tier 1 PR merges** — refine §5 (prompt) and §4 (loop).
- **After the first Tier 3 PR merges** — re-estimate Phase 2 duration.
- **At each Phase 2 weekly** — update §3 inventory with status column.
- **At Phase 2 end** — final write-up replaces §10 with actuals; feeds Phase 3 wave planning.
