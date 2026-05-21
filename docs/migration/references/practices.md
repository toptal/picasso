# Picasso migration practices (graduated)

> Last graduation: 2026-05-21 from `lessons-learned.md` entries through 2026-05-20.
> Next graduation due: after 5–10 more successful migrations, or when `lessons-learned.md` accumulates ~50 new entries past this point.

Cross-cutting patterns that have proven load-bearing across multiple migrations. Each pattern here appears in **≥ 3 lessons-learned entries** OR is cited explicitly by **≥ 1 reviewer** as a blocking rule. Read this whole file at the start of every migration — these are the rules whose violation has cost real iteration time.

Categorized by problem domain. The agent applies the relevant category as each migration phase comes up; the orchestrator's contextPack ensures the whole file is available throughout.

## Build & snapshot precondition

- **Always run `pnpm -F @toptal/picasso-<NAME> build:package` before `pnpm jest -u` on consumer snaps.** Bootstrap-build failures produce 1-line empty `<div>` snapshots that CI then diffs as `-1 / +120` against prior baseline (Modal restart precedent). If the orchestrator logged `continuing anyway (consumers stage may fail)`, that's your cue: STOP and fix the migrating package's build BEFORE any snapshot work.
- **Detect consumer packages by import scan**, not by classname in snap files. The orchestrator's local gate does this automatically — but a manual takeover must use `grep -rn "from '@toptal/picasso-<name>'" packages/` to find ALL consumers. Snap-file regeneration to new Base UI DOM (e.g., `data-base-ui-portal` replacing `base-Modal` classNames) breaks the className-based heuristic.

## Pixel-perfect visual parity

- **Default classification for any non-zero pixel diff on a migrated-component story is REGRESSION.**
- **INTENTIONAL** requires explicit plan-file authorization in `docs/migration/components/<X>.md` §"Approved visual deltas". Self-classification is not allowed; agent reaching for INTENTIONAL is a STOP signal.
- **When a positional shift is < 5 px**, capture `getComputedStyle()` JSON for baseline + local BEFORE attempting fixes. Screenshots tell you WHERE; computed styles tell you WHAT. Stalemate is forbidden until ≥ 2 fix attempts have targeted properties from the computed-style diff (Slider PR #4955 burned 5 iterations skipping this).
- **Common @base-ui/react compensations** (more in `references/visual-verification.md`):
  - New `data-*` attribute on slot → add `[data-attr]:<style>` selector replicating prior visual.
  - Mirror old `:focus-visible` under `data-[focused]:`.
  - Adjust geometry via `gap`/`p-*`/`m-*` when wrapper elements shift.
  - Preserve transition parity via `data-[starting-style]`/`data-[ending-style]` translate classes on portal-host elements.

## API preservation

- **Preserve consumer-facing handler signatures.** Wrap with an adapter — NEVER narrow. Examples:
  - `onChange(event, checked)` from `@mui/base` → `@base-ui/react` emits `onCheckedChange(checked)`. Adapt by wrapping: `onCheckedChange={c => onChange?.(syntheticEvent, c)}` (Switch iter 2, iter 3 + Slider iter 12 review precedents).
  - `onValueChange(value, activeThumbIndex)` from `@base-ui/react/slider` → wrap to re-expose `(event, value, activeThumbIndex)` matching `@mui/base` shape.
- **Preserve portal/behavior props.** Audit the new library's compound API first. Example: `disablePortal` on Drawer has no direct prop equivalent in `@base-ui/react/drawer`, but you can emulate it by conditionally omitting `<Drawer.Portal>`. Do NOT silently remove the prop (Drawer iter 2 precedent).
- **Deprecate-don't-delete**: keep removed-in-new-lib props with `@deprecated` JSDoc + Jira ticket ref, route to `_unused` destructure:
  ```ts
  /** @deprecated [PF-1234] no equivalent in @base-ui/react; will be removed in next major */
  disablePortal?: boolean
  ```
- **No `as unknown as T` blanket casts on `...rest` spread.** If `@base-ui/react`'s root element type mismatches the public Props, address it at the prop-by-prop boundary, not a blanket bridge cast (Switch iter 3 precedent).
- **No `any`** in component source (ESLint `@typescript-eslint/no-explicit-any` is **error** in source, off in tests).
- **CSS override specificity ladder for `@base-ui/react`** — pick the lowest rung that works; reviewers block PRs that skip rungs. See `code-standards.md §CSS specificity ladder` for the full version. Short form:
  1. Exhaust `@base-ui/react`'s customization API (slot `className`, render prop, documented slot props).
  2. Tailwind selectors matching emitted `data-*` attributes (`data-[focused]:`, `data-[expanded]:`).
  3. Higher specificity via selector compounds (`[&_input]:`, `[&[data-state=open]]:`).
  4. `!important` — **LAST RESORT**, acceptable only when rungs 1–3 demonstrably can't override. Comment WHY the lower rungs failed.
- **Do NOT use imperative `ref` callbacks (`node.style.margin = '0'`) for visual overrides.** That was a one-off Switch compromise, not the pattern. Use the ladder above.

## Changesets

- Migration PRs are **ALWAYS major**. Major rationale MUST be self-evident from the changeset alone — list the specific breaking surface.
- Enumerate three things explicitly:
  1. **Dep removals + peer cap lifts**: which packages out, which in, and the `react: < 19.0.0` cap drop.
  2. **New implicit behaviors**: e.g., swipe-dismiss, async focus timing (`FloatingFocusManager` rAF-deferred), always-portaled.
  3. **Compound parts being assembled**: e.g., "Slider now assembled from `Slider.Root + Control + Track + Indicator + Thumb`".
- Framing: **"behavioral parity"** — reviewers expect this framing upfront, not after a sweep round (Drawer iter 1, iter 2 + Backdrop iter 9 + Slider iter 11, iter 12 + Switch iter 2).
- For modified Props interfaces, state per-prop whether it's NEW or was INHERITED from a removed parent type (e.g., `ModalBackdropSlotProps`).
- For `@deprecated` props with `_unused` destructure: name them and the planned removal version.

## @base-ui/react idioms

- **Polymorphic components**: use `nativeButton + render={React.createElement(as)}` (Button precedent). Do NOT add runtime `typeof`/`isValidAs` guards for the `as` prop — TypeScript constrains it; reviewers ask for removal.
- **Inline-style overrides on `@base-ui/react` parts**: apply the CSS specificity ladder above (rungs 1–4). Imperative `ref` callbacks for visual changes are not the canonical answer despite the Switch iter 2 precedent.
- **Input-bearing slots** (`Slider.Thumb`, `Switch.Input`): hide visible native `<input>` via:
  ```
  [&_input]:!top-auto [&_input]:!left-auto
  [&_input]:![clip-path:none] [&_input]:[clip:rect(0,0,0,0)]
  ```
- **Async focus management** (rAF-deferred `FloatingFocusManager`) — diverges from `@mui/base`'s synchronous focus. Add a `useIsomorphicLayoutEffect` blur-on-open shim with an explanatory comment when reviewers flag visual-snapshot regressions tied to focus timing.
- **`disablePortal` emulation**: conditionally omit `<Drawer.Portal>` wrapper rather than searching for a non-existent prop.
- **Transition/animation parity**: when swapping the primitive, port the prior open/close motion (`data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full` on `Drawer.Popup`) before opening review. Missing animations are a guaranteed regression flag.
- **For typecheck-noise from upstream type drift**, prefer inline `@ts-expect-error` over a `patches/*.patch` entry. Patches add repo-wide maintenance overhead; reviewers push back unless suppression would spread across many call sites (Drawer iter 2 precedent).
- **The `@base-ui/utils@0.2.8` patch** (strips `const` from generic params) IS required for Tier 0 components — apply via `pnpm.patchedDependencies` + lockfile `patch_hash`. Do NOT re-derive (Drawer + Modal precedent).
- **Slot-based styling (MUI-Base + `@base-ui/react` idiom)**: when wrapping a primitive that accepts `slots` + `slotProps`, use them instead of pumping CSS through `classes`. Example from `OutlinedInput.tsx:174-202`:
  ```tsx
  <Input
    slots={{ input: CustomInput }}
    slotProps={{
      root: { className: twMerge('...', className) },
      input: { className: twMerge('...', inputClassName) },
    }}
  />
  ```
  This is the canonical Picasso pattern for multi-part `@base-ui/react` consumers — preferred over a `classes` prop (which is rule 5 forbidden) and over class dictionaries.
- **Responsive spacing utilities**: components accepting breakpoint-aware spacing (e.g., Dropdown's `offset?.top` / `offset?.bottom`) should use `makeResponsiveSpacingProps()` from `@toptal/picasso-provider` to generate responsive Tailwind classes dynamically. See `Dropdown.tsx:106-109,236-242` for the canonical usage. Do NOT hand-roll responsive class strings for spacing values that should match the breakpoint API.

## Tailwind & class composition

- **`twMerge(className, '…')` ordering is semantic**: put structural/positional classes BEFORE caller-provided `className` so consumer overrides win. The wrong order (`twMerge(className, structural)`) silently breaks consumer customization (Drawer iter 3 precedent).
- **Tier 0 light-path: Tailwind class composition (`cx`/`twMerge`) stays as-is.** Don't rewrite styles when the package swap is the only change.
- **Tier 1+ heavy-path: read `rules/jss-to-tailwind-crib.md` IN FULL** before touching any JSS. The cribsheet's worked examples cover parent-ref selectors, dynamic class-from-state, raw hex → tokens, pseudo selectors, and theme.spacing → gap utilities.
- **Token fallback**: when no canonical token exists for a JSS value, keep the literal + add a `TODO(tokens): <description>` comment. Don't invent a token; that creates drift between code and the BASE design system.

## tsconfig & build hygiene

- When dropping a workspace dependency from `package.json`, remove the matching `references` entry from `tsconfig.json` in the same commit. Otherwise `tsc -b` fails the migration PR's "Build" job even though `pnpm install` succeeds (Drawer precedent: removed Backdrop dep but left `references: ['../Backdrop']` → CI red).
- The two configurations MUST agree about workspace deps. Build-time deps used at compile time go in `devDependencies` (for the package's own `tsc -b`), not only in `peerDependencies` (which only consumers see).

## Verify before commit

- **`git status` clean of scratch/tooling files** before opening PR. Common offenders found at repo root in migration PRs: `*-thumbs.json`, `baseline-*.json`, `local-*.json`, `fetch-happo-diffs.mjs`. Write debug artifacts to a `.gitignore`d scratch dir from iter 1.
- **Verify intended code changes are actually present in the diff** before opening PR. Reviewer comment on `Switch.tsx:55` (Switch iter 2 precedent) was triggered by the initial diff still showing the OLD `@mui/base` code — an avoidable iteration because the planned edit wasn't applied.
- **If `pnpm build:package` failed at bootstrap**, do NOT proceed to `pnpm jest -u`. See "Build & snapshot precondition" above.
- **Strip JSDoc from internal passthrough props** before opening PR (`ownerState`, `data-private`). These surface in TS doc generation as public API (Backdrop iter 9 precedent).

## Test conventions

- Single top-level `describe('ComponentName', () => { ... })`. Nested describes only for behavioral grouping. Never 3+ deep.
- NO "renders without crashing" anti-pattern. Bare `render()` without assertion is reviewer-blocking (Backdrop iter 3 precedent). Tests must assert specific behavior: text content, mock invocation, snapshot content.
- Use a `renderComponent` helper (e.g., `renderBadge`) that wraps the test-utils `render()`, preselects common props, returns the destructured API.
- `jest.spyOn()` / `jest.fn()` for callbacks. NO DOM-API mocks. NO `fireEvent` — prefer user-centric `getByText`/`getByRole`/`getByTestId`.

## Polymorphic + ref forwarding

- `forwardRef<HTMLButtonElement, Props>(...)` already types `ref` correctly. Don't cast `ref` at the JSX site.
- Spreading `{...rest}` with a cast (`{...(rest as BaseUIButton.Props)}`) is `// @ts-ignore` in disguise. If `rest` doesn't conform, drop the offending Picasso-only prop BEFORE spreading. NEVER fall back to `any`.
- See `rules/base-ui-react-api-crib.md` §"Polymorphic Button" for the `nativeButton + render` pattern.

## Responsive component visual testing (MANDATORY)

Authoritative source: `docs/contribution/visual-testing.md:19-78`.

**A "responsive component" is any component that changes layout based on device size or layout breakpoint** (identified in code by use of the Breakpoints API or CSS Media Queries). For these, Happo screenshots at ALL breakpoint variants are mandatory — single-breakpoint coverage is incomplete and reviewers will reject.

Two patterns depending on whether user interaction is needed before the screenshot:

### Pattern 1: Storybook screenshots (no interaction needed) — PREFERRED, simpler

Set `screenshotBreakpoints: true` on the example registration in `<Component>/story/index.jsx`:

```ts
const page = PicassoBook.section('Component').createPage('FooComponent')
page
  .createChapter()
  .addExample('Foo/story/Default.example.tsx', {
    title: 'Default',
    screenshotBreakpoints: true,
  })
```

### Pattern 2: Cypress component test (interaction needed before screenshot)

Use `HAPPO_TARGETS` from `@toptal/picasso-test-utils` to iterate breakpoints:

```ts
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'

describe('test', () => {
  Cypress._.each(HAPPO_TARGETS, target => {
    const { width } = target
    describe(`when on width ${width}`, () => {
      cy.viewport(width, 1000)
      cy.mount(<Foo />)
      cy.get('body').happoScreenshot({
        component,
        variant: `foo-component/${width}-initial`,
        targets: [target],
      })
    })
  })
})
```

If you skip breakpoint coverage on a responsive component, the migration's `happo` gate stage may pass on default-breakpoint screenshots while leaving responsive-only regressions invisible. This was a load-bearing precedent on Grid and Page migrations.

## Accessibility validation

Authoritative source: `docs/contribution/accessibility.md:5-18`.

Storybook has an a11y addon. For every migrated component, before opening the PR:

1. Open the component's Storybook page on `localhost:9001`.
2. Press `A` (or click the 3-dots icon → "Show addons").
3. Click the **Accessibility** tab.

Three result categories:

- **Violations** — a rule definitely failed. **Must fix before PR.**
- **Passes** — a rule definitely passed. Informational.
- **Incompletions** — rule outcome is ambiguous (a11y addon couldn't decide). **Review case-by-case** — common when MUI v4 → @base-ui/react changes the DOM shape that the addon's heuristic relied on.

A migration that introduces a Violations entry (or moves a story from Passes → Incompletions without justification) is a regression. Same logic as visual parity: don't self-classify as INTENTIONAL.

## css-naming.md is LEGACY — do not follow

`docs/contribution/css-naming.md` describes MUI v4 + JSS conventions (`root` + `rootFull`/`rootShrink` for variants, `cx({ [classes.active]: active })`, etc.). **These are PRE-migration patterns.**

For migrated components:
- Use Tailwind class composition via `cx`/`twMerge` (see `code-standards.md §"Tailwind class composition"`).
- For variant-driven classes, return a `string[]` from a pure function in `styles.ts` (Button precedent) and merge with `twMerge`.
- Do NOT introduce new JSS `classes` maps. Existing JSS-using components (Tier 2 Radio, Tier 3 Page, sibling-package picasso-charts/RTE) are migration targets, not pattern sources.

## When in doubt

- Read existing canonical post-migration code: `docs/migration/reference/Button.tsx` (light path) and `docs/migration/reference/HEAVY-EXAMPLE.tsx` (heavy path).
- Cross-reference with `decisions/classes-audit.md` for any `classes`-prop decision.
- For Picasso code style beyond migration concerns: `references/code-standards.md` and `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root).
