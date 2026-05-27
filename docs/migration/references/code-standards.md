# Picasso code standards (canonical)

Synthesized from `.eslintrc.js`, the canonical Button component (`packages/base/Button/src/Button/*`), the codebase survey (`_survey-findings.md`), and `/docs/contribution/{component-api,unit-testing,changeset-guidelines,creating-examples,new-component-creation,packages-architecture}.md`. Evidence-backed by the 28-component survey: ≥70% frequency → RULE; 30-70% → preferred; ≤30% → minority pattern.

This file complements `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (the props/API spec at repo root). `PICASSO_COMPONENT_DESIGN_PATTERNS.md` says WHAT the API surface should look like; this file says HOW to organize, name, type, test, and compose the code that delivers that surface.

## Component file structure (RULE — 22/28 conform)

Canonical layout: `packages/base/<Component>/src/<Component>/`

```
<Component>/
├── index.ts          # public exports (named + default + types)
├── <Component>.tsx   # implementation + Props interface
├── styles.ts         # Tailwind class-building functions (pure, return string[])
├── test.tsx          # unit tests
├── story/            # *.example.tsx files (PicassoBook API)
│   └── *.example.tsx
└── __snapshots__/    # generated
```

If it makes sense to have sub-components, co-locate them in the same dir (e.g., Button has `ButtonBase.tsx`, `ButtonCheckbox.tsx` — not split into sibling dirs).

**Hooks and utilities**: when a component needs custom hooks or helpers, co-locate as `hooks.ts` or `<use-hook-name>.ts` inside the component folder — never split into a parallel `packages/.../hooks/` directory.

### Compound-component wrapper pattern (6/28 components — Modal, Accordion, Tabs, Menu, Dropdown, Note + Drawer)

When a component exposes a `Component.Item` / `Component.Tab` / `Component.Title`-style compound API to consumers, Picasso splits across two files:

- `<Component>.tsx` — the main functional component, unchanged shape.
- `<Component>Compound/index.ts` — wraps the main export and attaches static properties (`Tabs.Tab = TabsTab`, `Menu.Item = MenuItem`).

Canonical shape (`Object.assign` on the main export):

```ts
// FormCompound/index.ts
import { FormLabel } from '@toptal/picasso-form-label'

import { Form } from '../Form'
import { FormError } from '../FormError'
import { FormField } from '../FormField'
import { FormHint } from '../FormHint'
import { FormWarning } from '../FormWarning'

export const FormCompound = Object.assign(Form, {
  Field: FormField,
  Hint: FormHint,
  Error: FormError,
  Label: FormLabel,
  Warning: FormWarning,
})
```

Tests import `FormCompound as Form` to access the compound API. Other examples: `TabsCompound`, `MenuCompound`, `DropdownCompound`, `NoteCompound`.

For when to apply this pattern (3+ distinct sub-parts), see `PICASSO_COMPONENT_DESIGN_PATTERNS.md` rule 15 — single source of truth.

### Context-based coordination for compound parts (2/28 — Dropdown, Menu)

When compound children need to communicate **upward** to the parent (e.g., an item triggers `close()` on the wrapping dropdown), use a React Context at the component level + an exported hook:

```ts
// Dropdown.tsx:92-104
type ContextProps = { close: () => void }
const DropdownContext = React.createContext<ContextProps | null>(null)
export const useDropdownContext = () => useContext(DropdownContext)

// In the body:
<DropdownContext.Provider value={{ close: forceClose }}>
  {children}
</DropdownContext.Provider>
```

Children call `useDropdownContext()?.close()`. This is the canonical Picasso pattern for compound-internal state sharing — do NOT thread callbacks through props or use refs for this purpose.

### Documented variance: `PrivateProps` / `PublicProps` split (1/28 — Notification only)

Notification (`Notification.tsx:19-40`) uses an internal/public split: `PrivateProps` (with internal-only `elevated`/`icon`) consumed by the component body, `PublicProps = Omit<PrivateProps, 'elevated' | 'icon'>` exported as the public type. This is a Notification-specific pattern with 1/28 adoption — not a general rule. If a new component genuinely needs internal-only props, prefer this shape over JSDoc-marked "internal" comments because the type system enforces the API boundary.

## Export & component conventions (RULE — 26/28 conform)

- **Named export PREFERRED, default export ALSO provided.**
  ```tsx
  // Component.tsx:
  export const Button = forwardRef<HTMLButtonElement, Props>(function Button(props, ref) { ... })
  Button.displayName = 'Button'
  export default Button
  ```
- `forwardRef` wraps a **NAMED inner function** (not anonymous) — sets `displayName` correctly without a separate assignment.
- Set `Button.displayName = 'Button'` explicitly anyway (some sub-components need it for DevTools after compound attachment).
- `index.ts` re-exports the default + named, and re-exports the Props type as `<Component>Props`:
  ```ts
  export { default } from './Button'
  export { Button } from './Button'
  export type { Props as ButtonProps } from './Button'
  ```

## Props interface declaration (RULE — 28/28 use interface, NEVER type)

- Use `interface Props extends ...`, never `type Props = { ... }`.
- Boolean prop naming follows `PICASSO_COMPONENT_DESIGN_PATTERNS.md` rule 14 (bare adjective; no `is`/`has`/`should` prefix) — see canonical for the rule.
- Default values: destructuring in function signature, NEVER use React's `Component.defaultProps = { ... }` static assignment (legacy anti-pattern). 26/28 components surveyed avoid the static-assignment pattern entirely.
  ```tsx
  forwardRef<HTMLButtonElement, Props>(function Button(
    { disabled = false, variant = 'primary', size = 'medium', ...rest },
    ref
  ) { ... })
  ```

> Documented variance: `Dropdown.tsx` exposes `defaultProps?: Partial<PropsWithBaseSpacing>` in its Props type for overload support — that's a type-level field name, not the runtime anti-pattern. Single-component carve-out; do NOT model new code on it.

## JSDoc rules (RULE — 24/28 have 100% public-prop coverage; ESLint enforcement is WARN-level only)

- **Required** on EVERY public Props interface field.
- Format: single-line `/** description */` immediately above the property.
  ```ts
  interface Props extends BaseProps {
    /** Show button in the active state (left mouse button down) */
    active?: boolean
    /** Disables button */
    disabled?: boolean
    /** Content of Button component */
    children?: ReactNode
  }
  ```
- **Forbidden on passthrough internal props.** These surface in TS doc generation as public API (Backdrop iter 9 review feedback). The reserved-props list (do NOT JSDoc, pass through silently):
  - `data-private?: string` — framework hook (theme access / analytics). Used internally by Tooltip, Slider, Switch, Checkbox.
  - `data-testid?: string` — comes from `BaseProps`; never declare per-component.
  - `ownerState`, MUI-Base / `@base-ui/react` injected props — implementation detail of the underlying primitive.
  If your migration touches a component that uses these, preserve the pass-through without adding JSDoc.
- For `@deprecated` JSDoc tags: should include a Jira reference `[ABC-1234]` or URL. ESLint `todo-plz/ticket-ref` is configured as **warn** (not error), so non-compliant `@deprecated` tags ship without blocking CI (verified violation: `PageHead.tsx` has `@deprecated` with no ticket ref). Reviewers consistently flag this; the warn-level rule produces visible CI warnings but does NOT fail the build.

## Type-narrowing & casting (RULE — 0 violations across the 28 migration-scope components)

- **NEVER** `any` in component source. (`: any` count in the 28 migration-scope components: 0. ESLint `@typescript-eslint/no-explicit-any` is **error** in source, off in tests.) **However**: outside the migration scope, 2 violations exist in legacy untouched code (`TreeViewContainer.tsx:43`, `List/utils/generateListItems.tsx:6`). Those are out-of-scope for this program; do not model new code on them. Dropdown also has 2 legacy `// @ts-ignore` comments with TODO+Jira markers at `Dropdown.tsx:223,227` — explicit refactor markers, not blanket suppressions.
- **NEVER** `as unknown as T` blanket casts in component source. Tests may cast mock objects.
- **NEVER** bare `// @ts-ignore` — count in 28-scope components: 0 (Dropdown's two are wrapped in TODO comment blocks with explicit explanation, acceptable per `practices.md §"Type-narrowing & casting"`). If you absolutely need to suppress a type, use `@ts-expect-error <reason>`.

### The "prop-by-prop boundary" — canonical resolution for root-element-type mismatches

When `@base-ui/react`'s root part has a type that doesn't fully line up with your public `Props` (e.g. `Props extends ButtonHTMLAttributes<HTMLButtonElement>` but `BaseUISwitch.Root.Props` doesn't extend `ButtonHTMLAttributes`), **destructure SPECIFIC incompatible props** (or transform them via an adapter), then **spread `...rest` unchanged**. Three worked examples:

**Switch — `onChange` adapter + `checked` clamp:**

```tsx
const Switch = (props: Props) => {
  const {
    onChange, // signature mismatch — adapt to onCheckedChange below
    checked,  // type narrowing (number? → boolean clamp)
    ...rest   // ← everything else flows through, fully typed
  } = props
  return (
    <BaseUISwitch.Root
      {...rest}
      checked={checked ?? false}
      onCheckedChange={c => onChange?.(syntheticEvent(c), c)}
    />
  )
}
```

**Drawer — `onClose` adapter (Base UI uses `onOpenChange`):**

```tsx
const Drawer = (props: Props) => {
  const { onClose, ...rest } = props
  return (
    <BaseUIDrawer.Root
      {...rest}
      onOpenChange={open => { if (!open) onClose?.() }}
    />
  )
}
```

**Slider — `onValueChange` re-expose (Base UI omits the synthetic event):**

```tsx
const Slider = (props: Props) => {
  const { onChange, ...rest } = props
  return (
    <BaseUISlider.Root
      {...rest}
      onValueChange={(value, activeThumbIndex) =>
        onChange?.(syntheticEvent, value, activeThumbIndex)
      }
    />
  )
}
```

**To find the props to destructure**: open `node_modules/@base-ui/react/<group>/<part>/<Part>.d.ts` and compare its `*.Props` interface against your public `Props`. The set of names that appear in BOTH with DIFFERENT types is your destructure list. Everything else is type-compatible and spreads safely. For Tier 0 components the destructure list is typically 1–3 props.

**Anti-patterns to avoid** (both are forbidden):

- **Blanket cast** (`const rootProps = rest as unknown as BaseUISwitch.Root.Props`). Silences the type checker without addressing the mismatch. Listed in §"Type-narrowing & casting" as forbidden.
- **Exhaustive allowlist** (manually picking 4–6 props and forwarding only those). Drops all other props at runtime — `onClick`/`onFocus`/`onBlur`/`data-*`/`aria-*` claimed by the public type silently disappear. Reviewers call this the "typed but no-op" anti-pattern.

If you find yourself destructuring 6+ props, re-read the library's `.d.ts` — you're sliding into the exhaustive-allowlist anti-pattern. The library's type is probably more permissive than you think. Cite this section (and the worked example in `practices.md §"API preservation"`) directly in PR replies when reviewers raise the question.

## CSS specificity hierarchy for overriding `@base-ui/react` internal inline styles (reviewer-enforced, NOT lint-enforced)

> **Scope**: this section addresses the narrow case of overriding Base UI's **internal inline styles** (e.g., `translate: -50% -50%` on `Slider.Thumb`, `position: relative` on `Slider.Track`). For the general **override-preference ladder** — when to reach for `className` vs `data-[…]:` vs `render` vs inline `style` vs `useRender` vs not-overriding-at-all — see `references/base-ui-styling.md §7.1`. This section describes what wins via the CSS cascade in the specific inline-vs-inline case; that section describes the broader preference order. They are different ladders measuring different things; do not conflate.

Style conflicts with `@base-ui/react` emitted styles (inline `style=""`, `data-*` attributes, internal CSS) happen often during migration. Pick the **lowest-specificity tool that solves the problem** — escalate only if the lower one doesn't work. Reviewers will block PRs that jump straight to a higher-specificity tool when a lower one was viable.

- **Pass `style` prop directly to the `@base-ui/react` component.** `@base-ui/react`'s `mergeProps` (`node_modules/@base-ui/react/.../mergeProps.js`) shallow-merges the consumer's `style` AFTER the component's internal inline style with rightmost-wins semantics on key collisions. For any per-component override of styles the kit sets internally (`translate`, `position`, `transform`, sizing, etc.), inline `style` is the only thing that beats inline `style` without `!important`. This is doctrine §7.1's **rung 5** for the broader ladder, but in the narrow inline-vs-inline case it's the natural — and often only — answer.

   Example — override `<Slider.Thumb>`'s internal `translate: -50% -50%`:
   ```tsx
   <Slider.Thumb style={{ translate: 'none' }} ... />  // YES — wins via mergeProps right-wins
   <Slider.Thumb className='![translate:none]' ... />   // NO — !important is forbidden; this is the wrong tool
   ```

   But first, ask whether rung -1 applies (doctrine §7.1): can DOM restructure remove the need? Can you accept Base UI's geometry and remove the legacy approximation you're defending? In the Slider Thumb case, removing legacy `-mt -ml` margins is rung -1 and beats this rung 5 path. Rung 3 (`render` prop with `mergeProps` filtering) also beats rung 5 when it's practical.

   Why inline `style` exists at all: when @base-ui/react's component renders, the props your component passed are merged into the final element via `useRenderElement`. The style prop is merged last with `mergeObjects(componentInternalStyle, consumerStyle)` — so rightmost (yours) wins on each individual style property. This is the headless-kit's contract; it's designed for you to override its defaults *when you need to*. Tailwind `!important` against headless-kit internals is a code smell that doctrine §7.1's higher-preference rungs were skipped.

   Limits: inline `style` covers per-property overrides (e.g. `translate`, `position`). It does NOT cover style based on internal state (`data-focused`, `data-orientation`) — for state-driven styling use `data-[…]:` per doctrine rung 1.

- **Exhaust `@base-ui/react`'s official customization API.** Most slots accept `className`, and many composite components accept slot-targeted overrides:
   - Pass `className` directly on the part that owns the style you want to change.
   - Use the component's render prop if it exposes one (e.g., `<Slider.Thumb render={(props, state) => <Thumb {...props} className="..." />}>`). This is doctrine §7.1's rung 3 and is OFTEN the right answer.
   - Check the `@base-ui/react` source under `node_modules/@base-ui/react/<group>/<part>/` for documented props that customize the slot.
- **Tailwind selectors matching emitted attributes.** `@base-ui/react` emits `data-*` attributes for state (`data-focused`, `data-expanded`, `data-orientation`, etc.). Target them with Tailwind: `data-[focused]:outline-2`, `data-[expanded]:bg-blue-100`, etc. This is doctrine §7.1's rung 1.
- **Higher CSS specificity via selector compounds.** When data-attribute selectors aren't enough, layer selectors (`[&_input]:`, `[&[data-state=open]]:`, `[&:hover:not([data-disabled])]:`) before reaching for `!important`.
- **`!important` — FORBIDDEN.** Per `rules/styling.md` §"@base-ui/react v1 prescriptions" and doctrine §7.1, `!important` is never the right answer. If a Tailwind utility isn't winning, the doctrine §7.1 ladder has a rung you haven't tried. The legacy occurrences in `Radio/styles.ts` and `RichTextEditorToolbar/styles.ts` predate `@base-ui/react`; don't model new code on them.

**ANTI-PATTERN — imperative `ref` callbacks that mutate `.style` for theme/visual purposes are FORBIDDEN, no exceptions.** Examples: `inputRef={node => { node.style.margin = '0' }}`, `ref={n => n?.style.setProperty('translate', 'none')}`, `useCallback` wrapping any `.style.X = …` assignment passed as a slot ref. It bypasses CSS, breaks responsive style changes, isn't tree-shaken, and creates a runtime side-channel that fights the design system. Use the doctrine §7.1 preference ladder instead.

Earlier Switch migration code (iter 2) used this pattern; treat any such occurrence as a defect to remove during cleanup, NOT a precedent to extend. This rule has no "one-off compromise" carve-out. Explicitly rejected justifications (do not cite these to defend the pattern):
- "Tailwind `!important` slot selector failed Happo parity" → `!important` is forbidden per `rules/styling.md`. Walk doctrine §7.1: check rung -1 (don't override) and rung 3 (`render` prop with `mergeProps` filtering) before reaching for higher-specificity tools. Do not fall back to `.style` mutation.
- "base-ui inline `style=""` can't be overridden by CSS" → true that only inline `style` (doctrine §7.1 rung 5) beats inline `style` via CSS specificity. The idiomatic fix is the `style` prop on the part (mergeProps merges consumer style with rightmost-wins) — NOT an imperative ref-mutation. And before reaching for rung 5, check whether rung -1 (don't override) applies.
- "Cited as a precedent in practices.md / lessons-learned" → no, it's an anti-pattern. Older wording that framed it as a "compromise" was contamination superseded by this rule.

Imperative `ref` callbacks remain valid for non-style concerns (focus management, measurement, third-party library handles, port resize observers).

## Other forbidden CSS patterns

- Hex / px literals: prefer Picasso Tailwind tokens (`tokens/picasso-tailwind-tokens.md`). When no token exists, use `[arbitrary-value]` AND a `// TODO(tokens): <description>` comment. Don't invent new tokens; that's a coordinated design-system change.
- Cast at the type BOUNDARY (helper return type, local typed binding), not at the JSX call site:
  ```tsx
  // Preferred — hoist cast into helper return type:
  const getClickHandler = (
    loading?: boolean,
    handler?: Props['onClick']
  ): BaseUIButton.Props['onClick'] =>
    (loading ? noop : handler) as BaseUIButton.Props['onClick']

  // Then JSX is clean:
  <BaseUIButton onClick={getClickHandler(loading, onClick)} />
  ```
  See `rules/base-ui-react-api-crib.md` §"Type alignment at the boundary".

## ESLint custom rules to know

All enforced repo-wide via root `.eslintrc.js`:

| Rule | Severity | What it enforces |
|---|---|---|
| `local-rules/future-proof-deprecation-warning` | warn | Deprecation comments preceded by warnings. |
| `todo-plz/ticket-ref` | warn | TODO/FIXME/@deprecated must reference Jira `[ABC-1234]` or URL. |
| `@toptal/davinci/no-package-self-imports` | **error** | Sub-packages MUST NOT import from aggregate `@toptal/picasso`. |
| `no-restricted-imports` (useLayoutEffect) | **error** | `useLayoutEffect` from React is forbidden — use `useIsomorphicLayoutEffect` from `@toptal/picasso-shared` (SSR-safe). |
| `ssr-friendly/no-dom-globals-in-*` | warn (source); off (examples/tests) | No `window`, `document` in module scope, constructor, or render. |
| `@typescript-eslint/no-explicit-any` | error (source); off (tests) | No `any` in component source. |
| `react/no-multi-comp` | off in `.example.tsx` only | Multiple components per file are allowed only in stories. |

When editing **orchestrator code** (`bin/lib/*.ts`), additional ESLint rules trip in CI's "Static checks" — see `CLAUDE.md` §"Code style for orchestrator". Always run `pnpm eslint --ext=.ts --no-ignore bin/lib/<file>.ts` before declaring orchestrator changes done.

## Import conventions

- **Order** — enforced + auto-fixable by `import/order` (error) in `@toptal/davinci-syntax`'s ESLint config. Groups: `[builtin, external]` → `internal` → `[parent, sibling, index, unknown]`, with `newlines-between: always`. Run `pnpm davinci-syntax lint code packages/base/<NAME>/src` to auto-fix.
- **Barrel imports — RULE (NEVER deep paths)**: `import { StandardProps, SizeType } from '@toptal/picasso-shared'`, not `import { StandardProps } from '@toptal/picasso-shared/src/...'`. Survey: 28/28 conform.

### No self-imports from aggregate package · **RULE** (ESLint error)

`@toptal/davinci/no-package-self-imports` ESLint rule is **error**: sub-packages MUST NOT import from `@toptal/picasso` (the aggregate). Each sub-package imports directly from sibling packages it depends on, never via the aggregate. Config in root `.eslintrc.js` excludes `*.example.jsx`/`*.example.tsx` (stories may use the aggregate for ergonomics).

### Where to import what

| Symbol | Source |
|---|---|
| `StandardProps`, `BaseProps`, `TextLabelProps`, `SizeType`, `OverridableComponent`, `useIsomorphicLayoutEffect` | `@toptal/picasso-shared` |
| `render` (test wrapper), `fireEvent`, test types | `@toptal/picasso-test-utils` |
| `noop`, `usePageScrollLock`, ref utilities | `@toptal/picasso-utils` |
| `twMerge`, `twJoin` | `@toptal/picasso-tailwind-merge` |
| `cx` | `classnames` |

`withClasses` from `@toptal/picasso-utils` is **deprecated** — do not introduce new usages.

## Test conventions (RULE — 8/8 sampled conform)

- **Single top-level** `describe('ComponentName', () => { ... })`. Nested describes only for behavioral groupings (`describe('when max is set', ...)`). Never nest 3+ deep.
- **`renderComponent` helper** (87.5% adoption): a local function that wraps `render()` from `@toptal/picasso-test-utils`, preselects common props, returns the destructured API:
  ```tsx
  const renderButton = (props: Partial<OmitInternalProps<Props>> = {}) =>
    render(<Button {...defaultProps} {...props}>Click</Button>)
  ```
- **Assertion style**: prefer user-centric queries (`getByText`, `getByTestId`, `getByRole`). `fireEvent` count: 0 — use `userEvent` from `@testing-library/user-event` or RTL's `screen.getByX`.
- **Snapshot ratio**: 2-3 snapshots per component for shape; 50-80% of tests are explicit assertions. NO "renders without crashing" anti-pattern (Backdrop iter 3 lesson — bare `render()` without assertion is reviewer-blocking).
- **Mocks**: `jest.spyOn()` / `jest.fn()` for callbacks. NO DOM-API mocks.

## Tailwind class composition (RULE — established by Button canonical)

> For the underlying Base UI styling model (mechanisms, `render` / `data-*` / CSS vars, anti-patterns, override escalation ladder), see `references/base-ui-styling.md`. The composition rules below are the Picasso operational form of that doctrine.

- Class-building logic lives in `styles.ts` as **pure functions returning `string[]`** (Button pattern, 14/28 conform; 8/28 use `cx` inline).
- Merge in `Component.tsx` via `twMerge(coreClassNames, variantClassNames, ..., className)` — **user-supplied `className` LAST** so consumer overrides win (Drawer iter 3 lesson).
- **Default: `twMerge(...)` alone — `cx` is usually unnecessary.** Picasso's `twMerge` (via `extendTailwindMerge` per `packages/picasso-tailwind-merge/src/twMerge.ts:35`) accepts the same input types as `twJoin`: strings, arrays, and falsy values (`false`, `null`, `undefined`, `''`) are filtered out. So all of these work directly in `twMerge(...)`:
  - `condition && 'class'` — e.g. `Drawer.tsx:112`, `PaginationButton.tsx:20-22`
  - `condition ? 'a' : 'b'` — e.g. `Dropdown.tsx:271`, `DropdownArrow.tsx:21`
  - Nested arrays — e.g. `PageHeadBase.tsx:74` uses `['py-3', rightPadding && 'pr-8']`
  - Tabs canonical: `twMerge('relative min-h-0 flex overflow-hidden', classesByOrientation[orientation].root, classesByVariant[variant].root, className)` — no `cx`
- **Reach for `cx` only** when you need the `clsx`-object-syntax (`cx({ active: isActive, disabled })`) — Picasso's established pattern uses `&&` / ternary forms above, so `cx` rarely earns its keep.
- **`twJoin`** is also re-exported from `@toptal/picasso-tailwind-merge` for the case where you just need to concatenate without conflict-resolution.
- `@toptal/picasso-tailwind-merge` has Picasso-specific extensions — see `packages/picasso-tailwind-merge/src/twMerge.ts`:
  - Custom font sizes: `text-2xs`, `text-xxs`, `text-button-{small|medium|large}`, `font-inherit-size`
  - Custom weights: `font-regular`, `font-semibold`, `font-inherit-weight`
  - Text-align preservers: `text-align-inherit`, `text-start`, `text-end`

## SSR safety (RULE — ESLint-enforced)

- `useIsomorphicLayoutEffect` instead of `useLayoutEffect` (count of `useLayoutEffect` in source: 0 — fully enforced).
- No DOM globals (`window`, `document`) in module scope, constructor, or render — only inside effects/handlers.
- `.example.tsx` files exempt from SSR rules.

## Custom hooks (CONVENTION — 4+ examples)

- `use*` prefix universal.
- **Preferred filename: `use-{hook-name}.ts`** (one hook per file, searchable filename). `hooks.ts` is acceptable for legacy components or when a component owns 2–3 tiny related hooks where a single file is genuinely simpler.
- Co-locate inside the component folder (e.g., `Tooltip/use-tooltip-state.ts`, `Slider/hooks.ts` for the legacy grouping).
- Examples: `useLabelOverlap` (Slider), `useTooltipState` (Tooltip), `useOnScreen` (Slider), `useCombinedRefs` (shared utility for merging user + internal refs).

## Changeset conventions

Authoritative source: `docs/contribution/changeset-guidelines.md` (lines 5-46).

### Precedence (migration PRs) · **RULE**

**Source of truth for migration PRs**: `docs/migration/manifest.json#versionBump` (ajv-enforced via `manifest.schema.json`). The taxonomy below is the **authoring guidance** for the value in that field + reviewer judgment on non-migration PRs. Agents must read the manifest value verbatim and not deviate; if the manifest value looks wrong for a specific migration, escalate rather than override (see `ORCHESTRATOR.md §Changesets`).

For non-migration PRs (regular feature/bugfix work), apply the taxonomy directly to the change.

### Version bump taxonomy (from changeset-guidelines.md:5-26)

- **`patch`** — bug fix; change in existing functionality; change which does not affect Picasso users.
- **`minor`** — new property; new property value; new functionality; new component.
- **`major`** — deleting a component; deleting a component property; changing values for existing properties; changing the purpose of a property; changing horizontal layout (page-layout-break risk); any change requiring user action to upgrade.

### Migration PRs follow the standard taxonomy — NOT auto-major

Apply the taxonomy above to whatever the PR actually changes. No bump tier is reserved for "migration" as a category. The bump tier is a function of consumer-visible impact, not implementation effort.

- **`patch`** is correct for a pure library swap (`@mui/base` → `@base-ui/react` or `@material-ui/core` → `@base-ui/react`) when the public Props API is identical, types match, and behavioral parity is verified by snapshot + Happo + unit tests. The CI gates (Jest, Lint, Visual Tests) are the contract that "no consumer-visible change" actually holds. **Rationale for why a library swap alone does NOT force major:**
  - `@mui/base`, `@material-ui/core`, `@mui/*` are Picasso `dependencies`, NOT `peerDependencies`. Consumers do not have them in their `package.json`. Swapping them is invisible at the consumer dep tree.
  - The `react: < 19.0.0` peer cap lift is not a major-trigger on its own — widening a peer range is not a breaking change for any existing consumer (they continue to resolve the React version they already use). Tightening a range is breaking; widening is not.
  - Behavioral parity is verified by CI gates; we don't preemptively `major` on the chance of a regression. If a regression slips, that's a `patch` followup fix.
- **`minor`** when the migration deliberately adds a new prop, a new prop value, or a new behavior the consumer can opt into.
- **`major`** ONLY when the migration genuinely breaks a consumer's existing usage: removed/renamed prop, narrowed prop type, removed prop value, changed default that flips visible behavior, or a layout-shifting CSS change consumers would need to react to. List the specific breaking surface in the changeset body — if you can't name a concrete break, it's not major.

### Body format (from changeset-guidelines.md:32-45)

```markdown
---
'@toptal/picasso-<name>': patch  # or minor / major — pick per the taxonomy above
---

### <ComponentName>
- what changed in one sentence (e.g., "Re-implement on `@base-ui/react`; public API unchanged.")
- IF minor: the new prop / value / behavior added
- IF major: the specific breaking surface (named prop removed, default flipped, etc.) — required
- compound parts only if newly assembled and consumer-relevant (e.g., "Slider now assembled from `Slider.Root + Control + Track + Indicator + Thumb`")
```

- Present-simple tense ("Fix button alignment", not "Fixed").
- See `references/practices.md` §Changesets for the migration-specific graduated rule on what to enumerate.

## CI job pipeline

Authoritative source: `docs/contribution/github-workflow.md:14-20` and `docs/contribution/pr_jobs.md`.

Every PR push runs these jobs automatically (~4 min total):

| Job | What it checks |
|---|---|
| **Danger** | Commit conventions (capital-letter start, imperative mood, no trailing period, ≤79 chars). Re-runs when PR title changes. |
| **Jest Test** | Unit-test snapshots (not visual tests). |
| **Lint** | ESLint repo-wide. |
| **Visual Tests** | Happo visual regression (see `references/happo-iteration.md`). |
| **Deploy docs** | Live Storybook preview for the PR branch. |

**Commit conventions** (github-workflow.md:25-30): capital-letter start; no trailing period; imperative mood ("Build" not "Built"); ≤79 chars. Fixup/squash commits (`fixup!`/`squash!` prefix) skip these checks.

### Manual CI override via `@toptal-bot`

When Jenkins stalls or you need to re-trigger a specific stage (e.g., after a PR-title edit that should re-run Danger), use these commands as a PR comment (from `docs/contribution/pr_jobs.md:9-12`):

- `@toptal-bot run all` — re-run the whole pipeline
- `@toptal-bot run build` — re-run build only
- `@toptal-bot run deploy:documentation` — re-run docs deploy
- `@toptal-bot run package:alpha-release` — cut an alpha release

## Build + Storybook tsconfig hierarchy

Authoritative source: `docs/contribution/packages-architecture.md:7-21`.

Picasso has 4 build-config layers; touching one usually requires updating the others:

| File | Purpose |
|---|---|
| `packages/<pkg>/tsconfig.build.json` | Used by `tsc -b` during package build for publishing. `paths` reference other Picasso packages. |
| `/tsconfig.json` (root) | Dev-time IDE resolution + base config for per-package extends. `paths` are also used by Storybook to resolve cross-package imports in code examples. |
| `/.storybook/tsconfig.json` | Storybook build inclusion (Storybook-only files). |
| `/.storybook/webpack.config.js` `alias` | Required for cross-package import resolution at Storybook build time (works in combination with root `tsconfig.json` `paths`). |

**Migration impact**: when you drop a workspace dep from `package.json`, ALSO remove the matching `references` entry from `packages/<pkg>/tsconfig.json` (Drawer iter 2 precedent — `tsc -b` failed Build job despite `pnpm install` succeeding). See `references/practices.md §"tsconfig & build hygiene"`.

## `*.example.tsx` story files (CONVENTION — universal)

- Location: `<Component>/story/<Domain>.example.tsx`. NEVER a central `stories.ts` index.
- One example per file. Filename in PascalCase, matches the story title kebab-cased in URLs (see `references/visual-verification.md` §"Story URLs").
- Story registration in `story/index.jsx` via the PicassoBook API. Canonical chain — see `docs/contribution/creating-examples.md` for the full method surface:

  ```js
  import PicassoBook from '@toptal/picasso-book'

  const page = PicassoBook.section('Components').createPage('Button')

  page
    .createChapter('Variants')
    .addExample('Button/story/Primary.example.tsx', 'Primary')
    .addExample('Button/story/Secondary.example.tsx', 'Secondary')
    .addExample('Button/story/Ghost.example.tsx', {
      title: 'Ghost',
      screenshotBreakpoints: true,    // responsive component → all breakpoints
    })
  ```

  Available methods include `section`, `createPage`, `createChapter`, `addExample` (with title or options object), `addTextSection`, etc. — see `docs/contribution/creating-examples.md`.
- `.example.tsx` files exempt from SSR rules, multi-comp rule, and a number of `@typescript-eslint` rules.

## Re-export pattern (UNIVERSAL)

### Sub-package `src/index.ts`

The sub-package's top-level `src/index.ts` re-exports every component and its Props type:

```ts
export { default as Button, type ButtonProps } from './Button'
export { default as Modal, type ModalProps } from './Modal'
```

DO NOT change this shape during a migration — the package's public API surface is contractual.

### Aggregate package re-export · **RULE** (universal)

Every sub-package's public exports MUST also be surfaced in `packages/picasso/src/index.ts` (the aggregate `@toptal/picasso` package). Canonical shape (315 lines as of 2026-05; one named-component + one matching `type` export per sub-package):

```ts
// packages/picasso/src/index.ts
export { AccordionCompound as Accordion } from '@toptal/picasso-accordion'
export type { AccordionProps } from '@toptal/picasso-accordion'

export { ButtonCompound as Button, ButtonCircular } from '@toptal/picasso-button'
export type {
  ButtonCheckboxProps,
  ButtonProps,
  ButtonRadioProps,
  ButtonCircularProps,
  VariantType as ButtonVariantType,
} from '@toptal/picasso-button'
```

When a sub-package adds a new public symbol, also add it to `packages/picasso/src/index.ts` in the same PR. If a symbol is missing from the aggregate, consumers using `@toptal/picasso` can't reach it. Reviewers verify this on every PR that touches a sub-package's public API.

## Prettier formatting (inferred — verify with `pnpm prettier --check`)

`.prettierrc.js` extends `@toptal/davinci-syntax/src/configs/.prettierrc.cjs`. Inferred:

- 80-column line width
- Single quotes
- Semicolons present
- Trailing commas in multiline expressions

The agent's output MUST pass `pnpm prettier --check` on touched files. If a formatter run produces unexpected reflowing, that's a sign you wrote against the wrong config — re-run with `pnpm prettier --write` and review.

## Existing canonical references in the repo

- [`PICASSO_COMPONENT_DESIGN_PATTERNS.md`](../../../PICASSO_COMPONENT_DESIGN_PATTERNS.md) — the 16 + 3 canonical rules.
- [`design-patterns-addendum.md`](design-patterns-addendum.md) — migration-period delta + existing-violations carve-out.
- `/docs/contribution/component-api.md` — Q&A on compound vs facade patterns, prop naming.
- `/docs/contribution/unit-testing.md` — debugging setup.
- `/docs/contribution/changeset-guidelines.md` — full version-bump rules.
- `/docs/contribution/creating-examples.md` — PicassoBook Storybook API.
- `/docs/contribution/new-component-creation.md` — scaffolding.
- `/docs/contribution/packages-architecture.md` — monorepo structure.
- [`_survey-findings.md`](_survey-findings.md) — evidence base for everything in this doc.
