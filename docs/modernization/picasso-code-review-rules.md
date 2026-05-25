# Picasso code review rules

A centralized, grouped reference of every rule, standard, and convention reviewers should enforce on Picasso PRs. Synthesized from `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root), the `docs/migration/references/`, `docs/migration/rules/`, and `docs/contribution/` doc families. Each rule states the requirement, the rationale, an example where useful, and a citation back to the canonical source.

> **Audience**: Picasso PR reviewers (operator + Picasso team).
> **Maintenance**: This file is a synthesis. The cited sources remain authoritative; if they change, update this file. Promotion path: graduated patterns from `docs/migration/references/lessons-learned.md` enter `practices.md` first, then surface here on the next sweep.
> **Sibling docs**: `docs/modernization/base-ui-styling-strategy.md` (framework-agnostic kit-author strategy) covers the same Base UI territory from a longer-form, library-agnostic angle. This file is the per-PR review reference.

---

## 0. How to use this document

### Rule-strength legend

- **RULE** — ≥70% codebase frequency, ESLint-enforced, or reviewer-blocking. Violations are PR-blocking unless a documented carve-out applies (see Appendix A).
- **Preferred** — 30–70% codebase frequency. Variance is accepted, but new code should follow the preferred form unless there's a compelling reason.
- **Convention** — Cross-cutting practice without a hard frequency threshold. Reviewers may waive on context.

### How to cite this doc in a PR review

Use the section anchor: `picasso-code-review-rules.md §4 — Types & casting · "The prop-by-prop boundary"`. The canonical source is also listed under each rule for deeper dives.

### Source documents synthesized here

- `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root) — props/API spec, 16 + 3 rules
- `docs/migration/references/code-standards.md` — file structure, types, JSDoc, Tailwind composition, ESLint, tests, changesets, CI
- `docs/migration/references/practices.md` — graduated migration patterns
- `docs/migration/references/base-ui-styling.md` — Base UI v1 styling doctrine
- `docs/migration/references/design-patterns-addendum.md` — existing-violations carve-out + architectural exceptions
- `docs/migration/references/visual-verification.md` — Playwright + Happo workflow (reviewer-relevant subset distilled here)
- `docs/migration/references/happo-iteration.md` — Happo classification matrix
- `docs/migration/rules/styling.md` — non-negotiable Tailwind/Base UI styling rules
- `docs/migration/rules/package-and-build.md` — pnpm / lockfile / build policy
- `docs/migration/rules/jss-to-tailwind-crib.md` — JSS → Tailwind pattern table + worked examples
- `docs/contribution/{component-api,unit-testing,changeset-guidelines,github-workflow,visual-testing,accessibility,packages-architecture}.md`

### Out of scope (intentionally excluded)

- Orchestrator-internal code rules (`bin/lib/*.ts` ESLint rules — see `CLAUDE.md` §"Code style for orchestrator")
- Agent operational workflow (Playwright MCP recipes, story URL enumeration, screenshot persistence)
- Orchestrator runbook (CLI flags, kill switch, output paths — see `docs/migration/ORCHESTRATOR.md`)
- Review-response protocol (HIGH/MEDIUM/LOW confidence tiers, reaction-fetch recipes — see `docs/migration/PROMPT-review-response.md`)
- Per-component plans (`docs/migration/components/<X>.md` — those are per-PR)

---

## 1. Public component API

The 16 canonical rules from `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root). These are the source-of-truth API spec validated by CI. Per the 28-component survey (`_survey-findings.md §H`), current compliance is ≥90% on every rule; reviewers enforce them on every PR.

### R1 — Optimize defaults for the common case · **RULE**

Design the props API so the most frequently used look requires zero or near-zero props. Pick sensible defaults for `variant`, `size`, `color`, etc., so consumers only pass props when deviating.

**Why**: a kit that requires 5 props to render a primary button has lost the design system's primary value proposition (consistency by default).

```tsx
// Good — default variant is the common case
<Button>Save</Button>

// Bad — every consumer needs to remember the magic incantation
<Button variant="primary" size="medium" color="blue">Save</Button>
```

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §1)

### R2 — Reuse prop names across components · **RULE**

The same concept must use the same prop name everywhere. If `collapsed` denotes a collapsed state in one component, every other component expressing the same concept must also use `collapsed` — not `isCollapsed`, `folded`, or `minimized`.

**Why**: consumers memorize one vocabulary; arbitrary synonyms tax memory and break IDE autocomplete patterns.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §2)

### R3 — Keep prop names short and simple · **RULE**

Prefer `size` over `sizeText`, `color` over `colorValue`, `label` over `labelString`. Drop redundant suffixes that restate the type or context.

```tsx
// Good
<Field size="small" label="Name" />

// Bad — redundant suffixes
<Field sizeValue="small" labelText="Name" />
```

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §3)

### R4 — Mirror native HTML prop names · **RULE**

When a prop corresponds to a native HTML attribute, use the native name verbatim: `name`, `value`, `type`, `disabled`, `placeholder`, `checked`, `readOnly`, `autoFocus`, `href`, `target`, `rel`, `alt`, `src`. Do not rename, prefix, or alias (no `inputName`, `fieldValue`, `isDisabled`, `linkHref`). For event handlers, keep the native name (`onChange`, `onBlur`, `onFocus`, `onClick`).

**Callback signatures may diverge**: when only a derived value is useful, accept the value directly rather than re-passing the event:

```tsx
// Acceptable — simpler shape, same native name
onChange?: (value: string) => void
```

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §4)

### R5 — Style overrides only via `className` or `style` · **RULE**

Consumers may customize a component's appearance exclusively through the `className` and `style` props. Do not expose other styling hooks: `classes`, `styles`, `sx`, `css`, theme overrides, slot-level class props, or styled-component wrappers.

**Why**: every additional styling hook becomes a maintenance contract. `className` + `style` is sufficient when paired with `twMerge` (consumer-last wins).

**Migration exceptions** (see Appendix A): Modal, Typography, Dropdown, OutlinedInput temporarily retain narrowed `classes?: { ... }` shapes per audit-backed Tier 3.b decisions.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §5)

### R6 — Prefer `children` over content props · **RULE**

For simple components, pass content through `children`, not a dedicated prop. Reserve named content props for components with multiple, distinct content slots.

```tsx
// Good — Button has one content slot
<Button>Save</Button>

// Bad
<Button content="Save" />

// Good — Modal has multiple distinct slots, named props (or compound parts) are appropriate
<Modal>
  <Modal.Title>Confirm</Modal.Title>
  <Modal.Content>Are you sure?</Modal.Content>
</Modal>
```

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §6)

### R7 — Use `rem` for all sizes · **RULE**

Express dimensions, spacing, font sizes, and radii in `rem`. The only exception is `1px` (e.g., hairline borders).

**Why**: `rem` respects the user's root font size — critical for accessibility (zoom, large-text settings). Tailwind tokens enforce this automatically; raw `px` values in component code should be flagged.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §7)

### R8 — Align token names with the BASE design system · **RULE**

Names for colors, typography, sizes, spacings, and other design tokens must match those defined in the BASE design system. Do not introduce local synonyms or renamed aliases.

**Why**: design, code, and documentation share a single vocabulary. Local aliases create drift between Figma, the design-tokens package, and the runtime.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §8; tokens listed in `docs/migration/tokens/picasso-tailwind-tokens.md`)

### R9 — Use `variant` for visual variations · **RULE**

When a component has multiple visual styles, expose them through a single `variant` prop typed as a string-literal union — never split across multiple boolean flags or ad-hoc prop names.

```tsx
// Good
variant?: 'rectangle' | 'circular'

// Bad — booleans multiply combinatorially
isRectangle?: boolean
isCircular?: boolean
isOval?: boolean
```

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §9)

### R10 — Extend `BaseProps` · **RULE**

Every component's Props interface must extend `BaseProps`, which provides the shared root-element contract: `className?: string`, `style?: CSSProperties`, `'data-testid'?: string`. Do not redeclare these props locally.

```ts
import type { BaseProps } from '@toptal/picasso-shared'

interface Props extends BaseProps {
  /** ... */
  variant?: 'primary' | 'secondary'
}
```

**Migration exception** (see Appendix A): 20/28 components currently extend `BaseProps`; 3/28 still extend `StandardProps`; 5/28 mixed. **Do NOT preemptively rebuild prop interfaces** mid-migration — that's a separate refactor track.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §10)

### R11 — Use `as` to change the rendered element · **RULE**

When a component needs to render as a different HTML tag, expose this through an `as` prop. Prefer narrowing to specific tags the component supports rather than accepting any element type. Do not introduce custom alternatives like `tag`, `component`, or `element`.

```ts
// Preferred — narrow to what the component actually supports
as?: 'a' | 'button'

// Acceptable when truly polymorphic
as?: React.ElementType<React.HTMLAttributes<HTMLElement>>
```

**Internal translation**: Picasso's external `as` API is translated to Base UI's `render` mechanism internally — see §5 "Render prop". For button-default Base UI parts (Button, Menu.Trigger, Tabs.Tab, NumberField.Increment/Decrement, Toolbar.Button), the tag swap MUST pair with `nativeButton={false}`.

**No runtime guards**: do NOT add `typeof`/`isValidAs` checks for `as` — TypeScript constrains it; reviewers will ask for removal.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §11; `code-standards.md §"prop-by-prop boundary"`)

### R12 — Use the shared size scale · **RULE**

Expose size as a `size` prop typed against the shared `SizeType` helper, picking the subset the component supports:

```ts
import type { SizeType } from '@toptal/picasso-shared'

size?: SizeType<'small' | 'medium' | 'large'>
```

Canonical scale (from `@toptal/picasso-shared`):

```ts
export type Sizes =
  | 'xxsmall' | 'xsmall' | 'small'
  | 'medium' | 'large' | 'xlarge'

export type SizeType<T extends Sizes> = T
```

Do NOT introduce custom size names (`tiny`, `big`, `huge`) or numeric scales.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §12)

### R13 — Use the shared color palette and shade scale · **RULE**

Color props must draw base color names from the canonical `Palette` and shade names from `ColorSample`, exposing only the subset the component supports.

```ts
interface ColorSample {
  lightest?: string
  lighter?: string
  lighter2?: string
  light?: string
  light2?: string
  main?: string
  main2?: string
  dark?: string
  darker?: string
}

interface Palette {
  blue: SimplePaletteColorOptions
  green: SimplePaletteColorOptions
  yellow: SimplePaletteColorOptions
  red: SimplePaletteColorOptions
  purple: SimplePaletteColorOptions
  gradients: {
    blue: string
    darkerBlue: string
    lightGrey: string
    grey: string
    darkerGrey: string
  }
}
```

Do NOT invent new color or shade names (`bright`, `pale`, `accent`, `orange`) or use raw hex/rgb values in the public API.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §13)

### R14 — No `is` prefix on boolean props · **RULE**

Boolean props are named with the adjective only: `open`, `disabled`, `loading`, `selected`, `collapsed`, `expanded`, `active`, `hovered`, `indeterminate`. NEVER `isOpen`, `isDisabled`, `isLoading`. The same applies to `has`/`should` prefixes.

**Why**: 28/28 current compliance — Picasso's most consistent rule. New code must match.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §14)

### R15 — Use compound components for multi-part components · **RULE**

When a component has distinct, composable sub-parts, expose them as static properties on the parent (`Modal.Title`, `Modal.Content`, `Modal.Actions`) rather than as separate named exports or as content props. Consumers compose the parts as children:

```tsx
<Modal open={open} onClose={onClose}>
  <Modal.Title>Title</Modal.Title>
  <Modal.Content>…</Modal.Content>
  <Modal.Actions>
    <Button onClick={onClose}>Cancel</Button>
  </Modal.Actions>
</Modal>
```

Apply only when the design genuinely requires a compound consumer API (3+ distinct sub-parts the consumer must compose). For one or two parts, keep the component monolithic.

Current adopters: Modal, Accordion, Drawer, Tabs, Menu, Dropdown, Note (plus the Button family internally). See §3 for the canonical `<Component>Compound/index.ts` wrapper-file pattern.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §15)

### R16 — Use `testIds` for multi-part test selectors · **RULE**

When a component has multiple independently testable parts and the root `data-testid` is not enough, expose a single optional `testIds` prop — an object whose keys map to each addressable part. Each key is itself optional; the component should fall back to sensible defaults or skip the attribute when unset. Do NOT add per-part `data-testid` props at the top level.

```ts
testIds?: {
  [partName: string]: string | undefined
}
```

Current adopters: Modal, Accordion, Slider, Tooltip, FileInput, RichTextEditor.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §16)

---

## 2. Form component API

These rules apply only to form components — inputs, selects, checkboxes, radios, date pickers, file uploaders, and similar field-style components.

### F1 — Extend `FieldProps` (or a descendant) · **RULE**

Every form component's props interface must extend `FieldProps` — Picasso's extended version of `final-form`'s field props — or a type that itself extends `FieldProps` (e.g., `InputProps`, `SelectProps`).

**Why**: guarantees a consistent contract for `value`, `onChange`, validation state, error messaging, and form integration.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §F1)

### F2 — Honor the standard form-field props · **RULE**

Form components must accept and respect the full set of standard field props provided by `final-form` / `FieldProps` — including `name`, `value`, `defaultValue`, `required`, `disabled`, `onChange`, `onBlur`, `onFocus`, and any others surfaced by `FieldProps`. Do not selectively omit or rename them.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §F2)

### F3 — Render through `PicassoField` (or a descendant) · **RULE**

Internally, every form component must use `PicassoField` — or a wrapper that itself builds on `PicassoField` (e.g., `OutlinedInput`, `InputBase`-style descendants) — to render its field chrome. This centralizes label, hint, error, required-marker, and layout behavior.

Do NOT reimplement field chrome ad hoc.

(source: `PICASSO_COMPONENT_DESIGN_PATTERNS.md` §F3)

---

## 3. Code organization & file structure

### Canonical layout · **RULE** (22/28 conform)

```
packages/base/<Component>/src/<Component>/
├── index.ts          # public exports (named + default + types)
├── <Component>.tsx   # implementation + Props interface
├── styles.ts         # Tailwind class-building functions (pure, return string[])
├── test.tsx          # unit tests
├── story/            # *.example.tsx files (PicassoBook API)
│   └── *.example.tsx
└── __snapshots__/    # generated
```

Variance (6/28): components with logical sub-components co-locate them in the same dir (Button has `ButtonBase.tsx`, `ButtonCheckbox.tsx` — not split into sibling dirs).

**Hooks and utilities**: when a component needs custom hooks or helpers, co-locate as `hooks.ts` or `<use-hook-name>.ts` inside the component folder — never split into a parallel `packages/.../hooks/` directory.

(source: `code-standards.md §"Component file structure"`)

### Compound-component wrapper pattern · **Convention** (6/28 use it)

When a component exposes a `Component.Item` / `Component.Tab` / `Component.Title`-style compound API, Picasso splits across two files:

- `<Component>.tsx` — the main functional component, unchanged shape.
- `<Component>Compound/index.ts` — wraps the main export and attaches static properties (`Tabs.Tab = TabsTab`, `Menu.Item = MenuItem`).

Tests import `TabsCompound as Tabs` to access the compound API. Examples:

- `Tabs.tsx:1-128` + `TabsCompound/index.ts` exposes `Tabs.Tab`.
- `Menu.tsx:23-118` + `MenuCompound/index.ts` exposes `Menu.Item`.
- `Dropdown.tsx:125-337` + `DropdownCompound/index.ts` exposes `Dropdown.Arrow`.
- `Note.tsx:9-37` + `NoteCompound/index.ts` exposes `Note.Title`, `Note.Subtitle`, `Note.Content`.

Apply this split only when the design genuinely requires a compound consumer API (3+ distinct sub-parts). Don't introduce a `XCompound/` wrapper just to attach a single `.X.Item` — keep simple components monolithic.

(source: `code-standards.md §"Compound-component wrapper pattern"`)

### Context-based coordination for compound parts · **Convention** (2/28 use it)

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

(source: `code-standards.md §"Context-based coordination for compound parts"`)

### `PrivateProps` / `PublicProps` split · **Convention** (1/28 — Notification)

When a component has internal-only props (e.g., `elevated`, `icon` consumed by internal composition but not part of the public API), use the split:

```ts
// Notification.tsx:19-40
interface PrivateProps extends StandardProps {
  /** Internal: drawn with elevation when nested inside Modal */
  elevated?: boolean
  // ... other internal props
  /** Public visible props */
  variant?: 'success' | 'info' | 'warning'
}

export type PublicProps = Omit<PrivateProps, 'elevated' | 'icon'>
// Component takes PrivateProps internally
// index.ts exports only PublicProps as the public type
```

This pattern is preferred over commenting "// internal use only" — the type system enforces the API boundary.

(source: `code-standards.md §"PrivateProps / PublicProps split"`)

### Export & component conventions · **RULE** (26/28 conform)

- **Named export PREFERRED, default export ALSO provided.**
- `forwardRef` wraps a **NAMED inner function** (not anonymous) — sets `displayName` correctly without a separate assignment.
- Set `Component.displayName = 'Component'` explicitly anyway (some sub-components need it for DevTools after compound attachment).
- `index.ts` re-exports the default + named, and re-exports the Props type as `<Component>Props`:

```tsx
// Component.tsx
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(props, ref) {
  // ...
})
Button.displayName = 'Button'
export default Button
```

```ts
// index.ts
export { default } from './Button'
export { Button } from './Button'
export type { Props as ButtonProps } from './Button'
```

(source: `code-standards.md §"Export & component conventions"`)

### Props interface declaration · **RULE** (28/28 use `interface`)

- Use `interface Props extends ...`, NEVER `type Props = { ... }`.
- For boolean props: bare adjective only — `disabled`, `checked`, `loading`, `selected`, `collapsed`, `open`, `expanded`, `active`, `hovered`, `indeterminate` (R14).
- **Default values via destructuring** in the function signature, NEVER `Component.defaultProps = { ... }` static assignment (legacy anti-pattern; 26/28 components avoid it).

```tsx
forwardRef<HTMLButtonElement, Props>(function Button(
  { disabled = false, variant = 'primary', size = 'medium', ...rest },
  ref
) { /* ... */ })
```

**Carve-out**: `Dropdown.tsx` exposes `defaultProps?: Partial<PropsWithBaseSpacing>` in its Props type for overload support — that's a type-level field name, not the runtime anti-pattern. Don't introduce a new `defaultProps` type field unless you genuinely need overload support.

(source: `code-standards.md §"Props interface declaration"`)

### JSDoc rules · **RULE** (24/28 have 100% public-prop coverage)

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

- **Forbidden** on passthrough internal props (`ownerState`, MUI-Base injected props, `data-private`, `data-testid` from BaseProps). These surface in TS doc generation as public API.
- For `@deprecated` JSDoc tags: should include a Jira reference `[ABC-1234]` or URL. ESLint `todo-plz/ticket-ref` is configured as **warn** (not error), so non-compliant `@deprecated` tags ship without blocking CI — reviewers consistently flag this regardless.

(source: `code-standards.md §"JSDoc rules"`)

### Reserved props · **Convention**

These props are framework-reserved; pass through without surfacing in JSDoc:

- `data-private?: string` — framework hook (theme access / analytics). Used internally by Tooltip, Slider, Switch, Checkbox.
- `data-testid?: string` — from `BaseProps`; never declare per-component.
- `ownerState`, MUI-Base injected props — implementation detail.

If your migration touches a component that uses these, preserve the pass-through; do NOT add JSDoc to them.

(source: `code-standards.md §"Reserved props"`)

### Import conventions · **RULE**

**Order** (observed in 28/28 components surveyed):

1. React / react-related (`react`, `react-dom`)
2. Third-party (`@mui/base`, `@material-ui/*`, `@base-ui/react`, etc.)
3. `@toptal/*` packages
4. Relative imports (`./styles`, `../utils`)

**Barrel imports preferred**: `import { StandardProps, SizeType } from '@toptal/picasso-shared'` (not deep paths).

**Forbidden**: import from `@toptal/picasso` within sub-packages (ESLint error `@toptal/davinci/no-package-self-imports`). Each sub-package imports directly from sibling packages, never via the aggregate.

#### Where to import what

| Symbol | Source |
|---|---|
| `StandardProps`, `BaseProps`, `TextLabelProps`, `SizeType`, `OverridableComponent`, `useIsomorphicLayoutEffect` | `@toptal/picasso-shared` |
| `render` (test wrapper), `fireEvent`, test types | `@toptal/picasso-test-utils` |
| `noop`, `usePageScrollLock`, ref utilities | `@toptal/picasso-utils` |
| `twMerge`, `twJoin` | `@toptal/picasso-tailwind-merge` |
| `cx` | `classnames` |

`withClasses` from `@toptal/picasso-utils` is **deprecated** — do not introduce new usages.

(source: `code-standards.md §"Import conventions"`)

### Custom hooks · **Convention** (4+ examples)

- `use*` prefix universal.
- Co-locate inside the component folder (`Slider/hooks.ts`, `Tooltip/use-tooltip-state.ts`).
- Examples: `useLabelOverlap` (Slider), `useTooltipState` (Tooltip), `useOnScreen` (Slider), `useCombinedRefs` (shared utility for merging user + internal refs).

(source: `code-standards.md §"Custom hooks"`)

### Re-export pattern · **RULE** (universal)

The package's top-level `src/index.ts` re-exports every component and its Props type:

```ts
export { default as Button, type ButtonProps } from './Button'
export { default as Modal, type ModalProps } from './Modal'
```

**Do NOT change this shape during a migration** — the package's public API surface is contractual.

(source: `code-standards.md §"Re-export pattern"`)

### `*.example.tsx` story files · **Convention** (universal)

- Location: `<Component>/story/<Domain>.example.tsx`. NEVER a central `stories.ts` index.
- One example per file. Filename in PascalCase, matches the story title kebab-cased in URLs.
- Story registration via `addExample` calls in a `story/index.jsx` (one per component) — read this file to discover the component's full story list.
- `.example.tsx` files exempt from SSR rules, multi-comp rule, and a number of `@typescript-eslint` rules.

(source: `code-standards.md §"*.example.tsx story files"`)

---

## 4. Types & casting

Zero violations of these rules across the 28 migration-scope components today. Strict enforcement.

### No `any` in component source · **RULE** (ESLint `error`)

ESLint `@typescript-eslint/no-explicit-any` is **error** in source, off in tests. Tests may cast mock objects.

**Out-of-scope legacy**: 2 pre-existing `any` violations exist in untouched code (`TreeViewContainer.tsx:43`, `List/utils/generateListItems.tsx:6`) and 2 legacy `// @ts-ignore` comments in `Dropdown.tsx:223,227` with TODO+Jira markers. Those are explicit refactor markers, NOT precedents to extend.

(source: `code-standards.md §"Type-narrowing & casting"`)

### No `as unknown as T` blanket casts · **RULE**

In component source. Tests may cast mock objects.

(source: `code-standards.md §"Type-narrowing & casting"`)

### No bare `// @ts-ignore` · **RULE**

If you absolutely need to suppress a type, use `@ts-expect-error <reason>` so the suppression is self-documenting and fails the build when the underlying type drifts.

(source: `code-standards.md §"Type-narrowing & casting"`)

### The "prop-by-prop boundary" — canonical resolution for root-element-type mismatches · **RULE**

When `@base-ui/react`'s root part has a type that doesn't fully line up with your public `Props` (e.g. `Props extends ButtonHTMLAttributes<HTMLButtonElement>` but `BaseUISwitch.Root.Props` doesn't extend `ButtonHTMLAttributes`), the canonical fix is **NOT**:

#### Anti-pattern A — blanket cast

Silences the type checker without addressing the mismatch:

```tsx
// WRONG: papers over the boundary mismatch with a cast.
const Switch = (props: Props) => {
  const rootProps = props as unknown as BaseUISwitch.Root.Props // ❌
  return <BaseUISwitch.Root {...rootProps} />
}
```

#### Anti-pattern B — exhaustive allowlist

Narrows the runtime surface, silently drops every other prop the public type claims to accept:

```tsx
// WRONG: Props extends ButtonHTMLAttributes<HTMLButtonElement>, but
// onClick / onFocus / onBlur / data-* / aria-* are now dropped at runtime.
// Reviewers call this the "typed but no-op" anti-pattern.
const Switch = ({ name, form, tabIndex, ['aria-label']: ariaLabel }: Props) => {
  return <BaseUISwitch.Root name={name} form={form} tabIndex={tabIndex} aria-label={ariaLabel} /> // ❌
}
```

#### Canonical — destructure SPECIFIC incompatible props, spread `...rest`

```tsx
// RIGHT: the only props that genuinely conflict with BaseUISwitch.Root's
// shape are destructured out (or transformed); everything else spreads
// through unchanged. Public API parity preserved, no cast, no allowlist.
const Switch = (props: Props) => {
  const {
    onChange,     // signature differs — adapt to onCheckedChange below
    checked,      // base-ui uses checked: boolean directly, but we want to clamp
    ...rest       // ← all other ButtonHTMLAttributes flow through
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

**How to find which props to destructure**: open `node_modules/@base-ui/react/<group>/<part>/<Part>.d.ts` and diff its `*.Props` interface against your public `Props`. The intersection's NAME-OVERLAPS-WITH-DIFFERENT-TYPES set is what you destructure. Everything else is type-compatible and spreads.

**Empirical sanity check**: for Tier 0 components the destructure list is typically 1–3 props (onChange signature, occasional value/checked clamp, sometimes a removed prop). If you find yourself destructuring 6+ props, re-read the library's `.d.ts` — you're sliding into Anti-pattern B.

The migration-period oscillation observed on Switch review-iter 7 (2026-05-22) — allowlist → cast → allowlist across three consecutive iters — was the agent flipping between the two anti-patterns above because neither it nor the audit-agent named the canonical third option. Cite this section directly in PR replies when reviewers raise the question.

(source: `code-standards.md §"prop-by-prop boundary"`, `practices.md §"API preservation"`)

### Type alignment at the boundary · **RULE**

Cast at the type BOUNDARY (helper return type, local typed binding), NOT at the JSX call site:

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

This isolates the type-system compromise to one location instead of sprinkling casts across the render. Reviewers can verify the boundary cast in one place.

(source: `code-standards.md §"prop-by-prop boundary"`, `rules/base-ui-react-api-crib.md §"Type alignment at the boundary"`)

### Polymorphic + ref forwarding · **RULE**

- `forwardRef<HTMLButtonElement, Props>(...)` already types `ref` correctly. Don't cast `ref` at the JSX site.
- Spreading `{...rest}` with a cast (`{...(rest as BaseUIButton.Props)}`) is `// @ts-ignore` in disguise. If `rest` doesn't conform, drop the offending Picasso-only prop BEFORE spreading. NEVER fall back to `any`.

(source: `practices.md §"Polymorphic + ref forwarding"`)

---

## 5. Base UI styling doctrine

Base UI ships **behavior, accessibility, and composition** — not styles. Every primitive renders with no className, no inline style, no opinion about appearance. The kit author owns every styling decision.

Every primitive is split into named **parts** (`Menu.Root`, `Menu.Trigger`, `Menu.Portal`, `Menu.Positioner`, `Menu.Popup`, `Menu.Item`). Style each part *directly*. There is no top-level `slots`/`slotProps`/`classes` indirection.

### The five mechanisms · **RULE**

Every styling and override decision reduces to combinations of these five. Internalize them once.

| Mechanism | What it controls | Reach for it when |
| --- | --- | --- |
| **1. `className` prop** | Classes on the DOM node | Always — every styling decision starts here |
| **2. `render` prop** | DOM tag and wrapper component | Replacing the element, integrating with `<Link>`, framer-motion, custom kit components |
| **3. `data-*` state attributes** | State-driven styling without React subscriptions | Hover, open, checked, disabled, side-positioning, animation phases |
| **4. CSS variables (`--var`)** | Values Base UI computes (positions, sizes, transform origins) | Position-anchored animation, popup sizing, geometry-driven layout |
| **5. `style` prop (static or function-of-state)** | Inline styles | Last resort — computed values that cannot be expressed as classes |

Every part exposes the consistent signature:

```ts
className?: string | ((state: State) => string | undefined);
style?:     React.CSSProperties | ((state: State) => React.CSSProperties | undefined);
render?:    ReactElement | ((props: HTMLProps, state: State) => ReactElement);
```

(source: `base-ui-styling.md §2`)

### `className` composition — `twMerge(cx(...))` · **RULE**

Every Tailwind-on-headless codebase needs a class-merging pipeline that resolves conflicts. Picasso uses `classnames` (`cx`) + `twMerge` from `@toptal/picasso-tailwind-merge`:

```ts
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'

twMerge(cx('px-4 text-sm', isLarge && 'px-6 text-base'), className)
```

**Why both?** `cx` only joins strings conditionally. If a wrapper applies `px-4` and the consumer passes `px-2`, `cx` alone produces `"px-4 px-2"` — both classes ship to the DOM and Tailwind's last-wins rule becomes order-of-CSS-rules dependent and brittle. `twMerge` deduplicates Tailwind-conflicting classes deterministically: **rightmost class wins regardless of source order**.

**Do NOT introduce `clsx`** — Picasso already ships `classnames`. The `cn = clsx + tailwind-merge` helper common in external tutorials maps to `twMerge(cx(...))` here.

(source: `base-ui-styling.md §3.1`, `rules/styling.md §"Composition"`)

### Default classes + consumer override · **RULE**

The basic wrapper pattern: the kit owns its default classes; consumers override via standard `className`.

```tsx
export function CheckboxRoot({ className, ...props }: Checkbox.Root.Props) {
  return (
    <Checkbox.Root
      className={twMerge(
        cx(
          // layout
          'flex size-4 shrink-0 items-center justify-center rounded border',
          // colors
          'border-neutral-700 bg-white text-white',
          // state
          'data-[checked]:bg-neutral-900 data-[checked]:text-white',
          // focus
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900',
        ),
        // consumer override wins (rightmost in twMerge)
        className,
      )}
      {...props}
    />
  )
}
```

**Rules of the road**:

1. **Consumer `className` is always last** — rightmost in `twMerge(...)` wins.
2. **Never spread `...props` after explicit `className`** — the consumer's `className` is in `props` and silently overrides your merged value. Pass `className` explicitly, then spread the rest.
3. **Group your defaults by concern** (layout / colors / state / focus). Future-you will thank present-you.

(source: `base-ui-styling.md §3.2`)

### `className` as a function of state · **Preferred**

Every part exposing state accepts a function form:

```tsx
<Switch.Thumb
  className={(state) =>
    twMerge(cx(
      'block size-4 rounded-full transition-transform',
      state.checked ? 'translate-x-4 bg-white' : 'translate-x-0 bg-neutral-300',
      state.disabled && 'opacity-50',
    ))
  }
/>
```

Prefer the function form **only when data-attribute variants are awkward** — usually because the class itself depends on multiple state values combined. For single-state styling, `data-[checked]:` is shorter, declarative, and SSR-stable.

(source: `base-ui-styling.md §3.3`)

### Typed variants — helper functions returning `string[]` · **RULE** (Picasso primary form)

```ts
// styles.ts
export function createSizeClassNames(size: 'small' | 'medium' | 'large'): string[] {
  switch (size) {
    case 'small':  return ['text-button-small',  'px-3', 'h-8']
    case 'medium': return ['text-button-medium', 'px-4', 'h-10']
    case 'large':  return ['text-button-large',  'px-6', 'h-12']
  }
}
```

Applied at the call site:

```tsx
className={twMerge(cx(
  'inline-flex items-center justify-center rounded-md',
  ...createSizeClassNames(size),
  ...createVariantClassNames(variant),
  className,
))}
```

TypeScript exhaustiveness on the discriminated union catches missed variants at compile time. `cva` (class-variance-authority) is NOT adopted in Picasso today — do not introduce mid-migration.

(source: `base-ui-styling.md §3.4`, `rules/styling.md §"Helper-fn shape"`)

### `render` prop — tag swap · **RULE**

```tsx
// Button rendered as an anchor for navigation
<Button render={<a href="/dashboard" />}>Dashboard</Button>

// Tab rendered as a Next.js Link
<Tabs.Tab nativeButton={false} render={<Link href="/overview" />} value="overview">
  Overview
</Tabs.Tab>
```

**Gotcha — `nativeButton={false}`**: For parts Base UI renders as `<button>` by default (Button, Menu.Trigger, Tabs.Tab, NumberField.Increment/Decrement, Toolbar.Button), pass `nativeButton={false}` when swapping for a non-button element. Otherwise Base UI emits keyboard-handling code that assumes a native button and the result is broken.

**Forward refs, spread props**: The replacement component must forward `ref` and spread received props onto its root DOM node. Custom components without `React.forwardRef` (React 18) or a `ref` prop (React 19) silently lose accessibility.

(source: `base-ui-styling.md §4.1`, `rules/styling.md §"@base-ui/react v1 prescriptions"`)

### `render` prop — compose with a custom component · **RULE**

```tsx
<Menu.Trigger render={<MyButton size="md" />}>Open menu</Menu.Trigger>
```

`MyButton` is a normal component. Base UI calls it with `<MyButton {...injectedProps} size="md">Open menu</MyButton>` and expects `MyButton` to spread `injectedProps` onto its root DOM element. This is how you reuse the kit's `Button` as the trigger for a `Menu`, `Dialog`, or `Popover` without duplicating styling.

(source: `base-ui-styling.md §4.2`)

### `render` prop — function form + `mergeProps` · **Preferred**

Pass a function to `render` when you need to inspect state, choose between elements, or merge props manually:

```tsx
<Switch.Thumb
  render={(props, state) => (
    <span {...props}>
      {state.checked ? <CheckedIcon /> : <UncheckedIcon />}
    </span>
  )}
/>
```

When your props collide with Base UI's injected ones (notably event handlers and `className`), use `mergeProps`:

```tsx
import { mergeProps } from '@base-ui/react/merge-props'

<Switch.Thumb
  render={(props, state) => (
    <span
      {...mergeProps<'span'>(props, {
        className: twMerge(cx('size-4 rounded-full', state.checked && 'bg-white')),
        onClick: () => console.log('clicked'),
      })}
    />
  )}
/>
```

`mergeProps` semantics:

- **`className`**: concatenated right-to-left (right wins the cascade, but all classes ship).
- **`style`**: merged shallowly; right-most keys overwrite earlier.
- **Event handlers**: chained, executed right-to-left (right-most first). Any handler can call `event.preventBaseUIHandler()` to stop Base UI's own listener for that event.
- **`ref`**: only the right-most ref is kept — refs are NOT merged. To merge with an internal ref, use `useRender`'s `ref` option.
- **Other props**: right-most wins (`Object.assign` behavior).
- Up to 5 sources; for more, use `mergePropsN(arr)`.

(source: `base-ui-styling.md §4.3`)

### `useRender` — when you build the wrapper · **Preferred**

When your kit component itself wants to expose a `render` prop (so its consumers get the same composition power), use `useRender` from `@base-ui/react/use-render`:

```tsx
import { useRender } from '@base-ui/react/use-render'
import { mergeProps } from '@base-ui/react/merge-props'

interface ButtonProps extends useRender.ComponentProps<'button'> {}

export function Button({ render, ...props }: ButtonProps) {
  const defaultProps: useRender.ElementProps<'button'> = {
    type: 'button',
    className: 'inline-flex h-10 items-center rounded-md bg-gray-50 px-3.5 hover:bg-gray-100',
  }

  return useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps<'button'>(defaultProps, props),
  })
}
```

Now `<Button render={<a href="/x" />}>Go</Button>` works exactly as against Base UI primitives.

**React 18 vs 19 ref handling**:

- **React 19**: external `ref` is already in `props`. Pass your internal ref via `useRender({ ref: internalRef, … })` and Base UI merges them.
- **React 18**: wrap with `React.forwardRef`, accept the forwarded ref, and pass it via the `ref` option. The same `useRender` API works in both.

(source: `base-ui-styling.md §4.5`)

### `data-*` state attributes · **RULE**

Base UI exposes every meaningful piece of state as a `data-*` attribute on the DOM. Combined with Tailwind's variant syntax, this gives state-driven styling **without React state subscriptions, without re-renders, without props plumbing**.

#### Vocabulary (non-exhaustive)

| Attribute | Components | Meaning |
| --- | --- | --- |
| `data-checked` / `data-unchecked` | Checkbox, Switch, Radio, Menu.RadioItem | Toggle / selection state |
| `data-disabled` | All interactive parts | Disabled state |
| `data-readonly` | Field, NumberField | Read-only field |
| `data-required` | Field | Required field |
| `data-valid` / `data-invalid` | Field children | Validation state (inside `Field.Root`) |
| `data-dirty` / `data-touched` / `data-filled` / `data-focused` | Field children | Form interaction state |
| `data-open` / `data-closed` | Dialog, Popover, Menu, Select, Tooltip, Drawer, Accordion, Collapsible | Visibility |
| `data-popup-open` | Menu.Trigger, Select.Trigger, Popover.Trigger, NavigationMenu.Trigger | Whether the associated popup is open |
| `data-highlighted` | Menu.Item, Select.Item, Combobox.Item | Keyboard / pointer highlight |
| `data-selected` | Select.Item, Tabs.Tab | Selection state |
| `data-side` (`top`/`right`/`bottom`/`left`/`none`) | Popover, Menu, Tooltip popups + arrows | Computed popup side |
| `data-align` (`start`/`center`/`end`) | Positioner, Arrow | Alignment relative to anchor |
| `data-orientation` (`horizontal`/`vertical`) | Slider, Tabs, Toolbar, Separator, Accordion | Layout direction |
| `data-starting-style` | Animatable popups, toasts | Present for one frame on enter |
| `data-ending-style` | Same | Present during exit |
| `data-instant` | Animated parts | Animation should skip |
| `data-activation-direction` | NavigationMenu | Direction of last activation |
| `data-dragging` | Slider.Thumb | User is dragging |

Each component's reference page (`base-ui.com/react/components/<name>`) lists the complete table — always cross-reference before assuming.

#### Targeting from Tailwind

```tsx
<Menu.Item
  className="
    flex cursor-default items-center gap-2 px-3 py-2 text-sm
    data-[highlighted]:bg-neutral-900 data-[highlighted]:text-white
    data-[disabled]:opacity-50 data-[disabled]:pointer-events-none
  "
>
  Add to library
</Menu.Item>
```

For attributes with values, bracketed variants:

```tsx
<Tooltip.Arrow
  className="
    data-[side=top]:bottom-[-6px]    data-[side=top]:rotate-180
    data-[side=bottom]:top-[-6px]
    data-[side=left]:right-[-9px]    data-[side=left]:rotate-90
    data-[side=right]:left-[-9px]    data-[side=right]:-rotate-90
  "
/>
```

When the state lives on a **parent** part, use `group-data-[…]:`:

```tsx
<Select.Popup className="group …">
  <Select.Item className="… group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)]" />
</Select.Popup>
```

**`@base-ui/react` v1 specifically**: state-driven styling uses `data-[…]:` Tailwind variants. The legacy `group-[.base--checked]:` / `group-[.base--disabled]:` form belongs to `@mui/base` v0 — do NOT introduce in v1 code. Pre-v1 components retain `base--*` selectors until their own migration.

(source: `base-ui-styling.md §5`, `rules/styling.md §"@base-ui/react v1 prescriptions"`)

### CSS variables Base UI exposes · **Preferred**

| Variable | On part | Use |
| --- | --- | --- |
| `--transform-origin` | Popover/Menu/Select/Tooltip `Popup` | `transform-origin` so scale-in/out anchors to the trigger |
| `--available-width` / `--available-height` | Positioner / Popup | Maximum size without colliding with viewport edge |
| `--anchor-width` / `--anchor-height` | Same | Trigger size — useful for `min-width: var(--anchor-width)` |
| `--positioner-width` / `--positioner-height` | Positioner | Fixed positioner dimensions |
| `--active-tab-{left,right,top,bottom,width,height}` | Tabs.Indicator | Active-tab geometry for animated indicators |
| `--scroll-area-overflow-y-{start,end}` | ScrollArea.Viewport | Top/bottom overflow for fade masks |
| `--drawer-swipe-progress`, `--drawer-swipe-movement-{x,y}` | Drawer | Live swipe state |

Consume from Tailwind arbitrary values:

```tsx
<Popover.Popup className="origin-[var(--transform-origin)] max-h-[var(--available-height)]" />
<Select.Item   className="min-w-[var(--anchor-width)]" />
```

(source: `base-ui-styling.md §6.1`)

### Animation: `data-starting-style` and `data-ending-style` · **RULE**

Base UI sets `data-starting-style` for one frame at the start of an enter transition and `data-ending-style` for one frame at the start of an exit transition — and keeps the element mounted until your transition/animation finishes.

**Transition pattern** (recommended for fades/scales — handles interruption cleanly):

```tsx
<Popover.Popup
  className="
    origin-[var(--transform-origin)]
    transition-[transform,opacity] duration-150
    data-[starting-style]:scale-90 data-[starting-style]:opacity-0
    data-[ending-style]:scale-90   data-[ending-style]:opacity-0
  "
/>
```

When swapping the primitive in a migration, port the prior open/close motion (e.g. `data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full` on `Drawer.Popup`) before opening review. Missing animations are a guaranteed regression flag.

(source: `base-ui-styling.md §5.4`, `practices.md §"@base-ui/react idioms"`)

### When to use `as` vs `render` · **RULE**

Picasso's external polymorphic prop is `as` (per R11). Internally, wrappers translate `as` into Base UI's `render`:

```tsx
// Consumer-facing: as prop (unchanged Picasso API)
<Button as="a" href="/dashboard">Go</Button>

// Wrapper internally translates to Base UI's render mechanism
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { as, ...rest },
  ref,
) {
  return (
    <BaseButton.Root
      ref={ref}
      {...(as && { render: React.createElement(as), nativeButton: false })}
      {...rest}
    />
  )
})
```

(source: `base-ui-styling.md §Appendix·4`)

### Polymorphic components — the `nativeButton + render` pattern · **RULE**

Use `nativeButton={false} + render={React.createElement(as)}` when swapping a button-default Base UI part. The `nativeButton={false}` pair is **mandatory** when swapping a button-default Base UI part (Button, Menu.Trigger, Tabs.Tab, NumberField.Increment/Decrement, Toolbar.Button) to a non-button element — without it Base UI keeps emitting `<button>`-keyboard handling and accessibility silently breaks.

Do NOT add runtime `typeof`/`isValidAs` guards for the `as` prop — TypeScript constrains it; reviewers ask for removal.

(source: `practices.md §"@base-ui/react idioms"`, `rules/styling.md §"@base-ui/react v1 prescriptions"`)

### Slot-based styling — MUI-Base + `@base-ui/react` idiom · **Preferred** (legacy + Tier 3.b)

When wrapping a primitive that accepts `slots` + `slotProps`, use them instead of pumping CSS through `classes`. Example from `OutlinedInput.tsx:174-202`:

```tsx
<Input
  slots={{ input: CustomInput }}
  slotProps={{
    root: { className: twMerge('...', className) },
    input: { className: twMerge('...', inputClassName) },
  }}
/>
```

This is the canonical Picasso pattern for multi-part `@base-ui/react` consumers — preferred over a `classes` prop (which is R5 forbidden) and over class dictionaries.

**Important caveat**: `slotProps={{ root: { className } }}` is `@mui/base` (v0), NOT `@base-ui/react` (v1). v1 has no `slotProps`. Each part is a separate component you style directly. Anything that survives a migration with `slotProps` is unmigrated (or one of the Tier 3.b carve-outs preserving the v0 shape for consumer compatibility).

(source: `practices.md §"Slot-based styling"`, `base-ui-styling.md §Appendix·1`)

### Input-bearing slots · **Convention**

For input-bearing slots (`Slider.Thumb`, `Switch.Input`): hide visible native `<input>` via:

```
[&_input]:!top-auto [&_input]:!left-auto
[&_input]:![clip-path:none] [&_input]:[clip:rect(0,0,0,0)]
```

(source: `practices.md §"@base-ui/react idioms"`)

### Async focus management · **Convention**

Base UI's rAF-deferred `FloatingFocusManager` diverges from `@mui/base`'s synchronous focus. Add a `useIsomorphicLayoutEffect` blur-on-open shim with an explanatory comment when reviewers flag visual-snapshot regressions tied to focus timing.

(source: `practices.md §"@base-ui/react idioms"`)

### `disablePortal` emulation · **Convention**

Conditionally omit `<Drawer.Portal>` wrapper rather than searching for a non-existent prop. Some `@mui/base` portal/behavior props (like `disablePortal` on Drawer) have no direct prop equivalent in `@base-ui/react/drawer`, but can be emulated by conditionally omitting the wrapper.

(source: `practices.md §"@base-ui/react idioms"`)

### Responsive spacing utilities · **Convention**

Components accepting breakpoint-aware spacing (e.g., Dropdown's `offset?.top` / `offset?.bottom`) should use `makeResponsiveSpacingProps()` from `@toptal/picasso-provider` to generate responsive Tailwind classes dynamically. See `Dropdown.tsx:106-109,236-242` for the canonical usage. Do NOT hand-roll responsive class strings for spacing values that should match the breakpoint API.

(source: `practices.md §"@base-ui/react idioms"`)

---

## 6. Tailwind class composition

### `styles.ts` as pure functions returning `string[]` · **RULE** (established by Button canonical)

Class-building logic lives in `styles.ts` as **pure functions returning `string[]`** (Button pattern, 14/28 conform; 8/28 use `cx` inline).

```ts
// styles.ts
export function createSizeClassNames(size: 'small' | 'medium' | 'large'): string[] {
  switch (size) {
    case 'small':  return ['text-button-small',  'px-3', 'h-8']
    case 'medium': return ['text-button-medium', 'px-4', 'h-10']
    case 'large':  return ['text-button-large',  'px-6', 'h-12']
  }
}
```

(source: `code-standards.md §"Tailwind class composition"`, `rules/styling.md §"Helper-fn shape"`)

### `twMerge` with caller's `className` LAST · **RULE**

Merge in `Component.tsx` via `twMerge(coreClassNames, variantClassNames, ..., className)` — **user-supplied `className` LAST** so consumer overrides win.

The wrong order (`twMerge(className, structural)`) silently breaks consumer customization (Drawer iter 3 lesson).

```tsx
// Good — consumer wins
className={twMerge(cx(
  'inline-flex items-center justify-center',
  ...createSizeClassNames(size),
  ...createVariantClassNames(variant),
), className)}

// Bad — structural classes silently override the consumer's className
className={twMerge(className, cx(
  'inline-flex items-center justify-center',
  ...createSizeClassNames(size),
))}
```

(source: `practices.md §"Tailwind & class composition"`, `base-ui-styling.md §3.2`)

### `cx` for conditional grouping; `twMerge` for conflict resolution · **RULE**

- `cx` for conditional/boolean grouping when no conflict resolution is needed.
- `twMerge` for merging conflicting Tailwind classes (one wins via the merge algorithm).

```tsx
// cx — conditional groupings without conflicts
className={cx('p-4', loading && 'opacity-50')}

// twMerge wrapping cx — when caller-supplied className may conflict
className={twMerge(cx('p-4', loading && 'opacity-50'), className)}
```

(source: `code-standards.md §"Tailwind class composition"`)

### `@toptal/picasso-tailwind-merge` extensions · **Convention**

`@toptal/picasso-tailwind-merge` wraps `tailwind-merge` with Picasso-specific extensions — see `packages/picasso-tailwind-merge/src/twMerge.ts`:

- Custom font sizes: `text-2xs`, `text-xxs`, `text-button-{small|medium|large}`, `font-inherit-size`
- Custom weights: `font-regular`, `font-semibold`, `font-inherit-weight`
- Text-align preservers: `text-align-inherit`, `text-start`, `text-end`

Always import `twMerge` from `@toptal/picasso-tailwind-merge` — never the upstream `tailwind-merge`.

(source: `code-standards.md §"Tailwind class composition"`)

### Tier 0 light-path: Tailwind class composition stays as-is · **RULE** (migration-period)

Don't rewrite styles when the package swap is the only change. The Tailwind groundwork was done in the `@mui/base` era — the win of that migration was leaving Tier 0 components on `cx`/`twMerge` already.

(source: `practices.md §"Tailwind & class composition"`)

### Tier 1+ heavy-path: read `rules/jss-to-tailwind-crib.md` IN FULL · **RULE** (migration-period)

Before touching any JSS. The cribsheet's worked examples cover parent-ref selectors, dynamic class-from-state, raw hex → tokens, pseudo selectors, and `theme.spacing` → gap utilities. Full table inlined in §9 below.

(source: `practices.md §"Tailwind & class composition"`)

### Twmerge boundary

When you accept a `className` prop from a consumer, merge with `twMerge` so consumer-provided utilities can override component defaults:

```tsx
import { twMerge } from '@toptal/picasso-tailwind-merge'

<div className={twMerge(cx('p-4 bg-blue-100', baseClasses), className)} />
```

The consumer should always be able to win.

(source: `rules/styling.md §"Twmerge boundary"`)

---

## 7. CSS specificity ladder (no `!important`)

Style conflicts with `@base-ui/react` emitted styles (inline `style=""`, `data-*` attributes, internal CSS) happen often during migration. **Pick the lowest rung that solves the problem** — escalate only if the lower rung doesn't work. Reviewers will block PRs that jump straight to a higher rung when a lower one was viable.

### Rung 0 — Pass `style` prop directly to the `@base-ui/react` component · **RULE**

`@base-ui/react`'s `mergeProps` (`node_modules/@base-ui/react/.../mergeProps.js`) shallow-merges the consumer's `style` AFTER the component's internal inline style with rightmost-wins semantics on key collisions. For any per-component override of styles the kit sets internally (`translate`, `position`, `transform`, sizing, etc.), the IDIOMATIC path is the `style` prop — not Tailwind classes (which lose to inline styles by CSS spec), not `!important` (which indicates the wrong escape hatch was chosen).

Example — override `<Slider.Thumb>`'s internal `translate: -50% -50%`:

```tsx
<Slider.Thumb style={{ translate: 'none' }} ... />  // YES — rung 0, idiomatic
<Slider.Thumb className='![translate:none]' ... />   // NO — wrong tool, reach for `style` prop first
```

**Why this exists**: when `@base-ui/react`'s component renders, the props your component passed are merged into the final element via `useRenderElement`. The style prop is merged last with `mergeObjects(componentInternalStyle, consumerStyle)` — so rightmost (yours) wins on each individual style property. This is the headless-kit's contract; it's designed for you to override its defaults. Tailwind `!important` against headless-kit internals is a code smell that the lower rung was skipped.

**Limits**: rung 0 covers per-property overrides (e.g. `translate`, `position`). It does NOT cover style based on internal state (`data-focused`, `data-orientation`) — those still need rungs 1–2 below.

The Slider v2 case (2026-05-24, PR #4975) reached for Tailwind `'![translate:none]'` + `'!absolute'` because the agent's mental model was "kit's inline style needs a CSS specificity weapon" — wrong; the kit's design contract is "consumer's `style` wins per the merge semantics."

(source: `code-standards.md §"CSS specificity ladder"`, `practices.md §"@base-ui/react idioms"`)

### Rung 1 — Exhaust `@base-ui/react`'s official customization API · **RULE**

Most slots accept `className`, and many composite components accept slot-targeted overrides:

- Pass `className` directly on the part that owns the style you want to change.
- Use the component's render prop if it exposes one (e.g., `<Slider.Thumb render={(props, state) => <Thumb {...props} className="..." />}>`).
- Check the `@base-ui/react` source under `node_modules/@base-ui/react/<group>/<part>/` for documented props that customize the slot.

(source: `code-standards.md §"CSS specificity ladder"`)

### Rung 2 — Tailwind selectors matching emitted attributes · **RULE**

`@base-ui/react` emits `data-*` attributes for state (`data-focused`, `data-expanded`, `data-orientation`, etc.). Target them with Tailwind: `data-[focused]:outline-2`, `data-[expanded]:bg-blue-100`, etc.

(source: `code-standards.md §"CSS specificity ladder"`)

### Rung 3 — Higher CSS specificity via selector compounds · **RULE**

When rung 2 isn't enough, layer selectors (`[&_input]:`, `[&[data-state=open]]:`, `[&:hover:not([data-disabled])]:`) before reaching for the next rung.

(source: `code-standards.md §"CSS specificity ladder"`)

### Rung 4 — `!important` — LAST RESORT · **RULE**

Acceptable ONLY after rungs 1–3 are exhausted. Reviewers will ask you to prove they don't work. When you use it, comment WHY the lower rungs failed:

```tsx
className="[&_input]:!top-auto /* @base-ui/react/slider/thumb hard-codes top:0 via inline style — selector-level override doesn't win */"
```

The legacy occurrences in `Radio/styles.ts` and `RichTextEditorToolbar/styles.ts` predate `@base-ui/react`; don't model new code on them.

(source: `code-standards.md §"CSS specificity ladder"`, `rules/styling.md §"@base-ui/react v1 prescriptions"`)

### ANTI-PATTERN — imperative `ref` callbacks mutating `.style` · **RULE — FORBIDDEN, no exceptions**

Examples that violate this:
- `inputRef={node => { node.style.margin = '0' }}`
- `ref={n => n?.style.setProperty('translate', 'none')}`
- `useCallback` wrapping any `.style.X = …` assignment passed as a slot ref.

**Why this is forbidden**: it bypasses CSS, breaks responsive style changes, isn't tree-shaken, and creates a runtime side-channel that fights the design system. Use rung 1–4 instead.

Earlier Switch migration code (iter 2) used this pattern; treat any such occurrence as a defect to remove during cleanup, NOT a precedent to extend. This rule has no "one-off compromise" carve-out.

#### Explicitly rejected justifications (do not cite these to defend the pattern)

- **"Tailwind `!important` slot selector failed Happo parity"** → fix the selector / baseline; do not fall back to `.style` mutation. Check whether the `[&_input]:` selector compounds correctly with the data-state attribute, whether the baseline is stale, whether the input is actually inside the matched parent. Fix the ladder rung; do not fall back to imperative refs.
- **"base-ui inline `style=""` can't be overridden by CSS"** → false framing. The idiomatic fix is rung 0 (pass `style={{ ... }}` to the @base-ui/react component — its `mergeProps` shallow-merges with rightmost-wins semantics, so your `style` wins). If you genuinely need a CSS-class-based override (e.g. for responsive variants), `!important` at rung 4 does beat inline-style specificity — but try rung 0 FIRST.
- **"base-ui writes `margin: -1px` into the hidden input inline style and we can't override inline style with CSS"** → you can: rung 3 (`[&_input]:!m-0` or `[&_input]:![margin:0]`) wins over inline style because `!important` beats inline-style specificity in the cascade. If your selector isn't winning, the selector chain is wrong, not the rung.
- **"Cited as a precedent in practices.md / lessons-learned"** → no, it's an anti-pattern. Older wording that framed it as a "compromise" was contamination superseded by this rule.

Reviewers consistently rejected this pattern across Switch iters 2/3/9. Treat any new instance as a defect, not a precedent.

**Imperative `ref` callbacks remain valid for non-style concerns** (focus management, measurement, third-party library handles, port resize observers).

(source: `code-standards.md §"CSS specificity ladder"`, `practices.md §"API preservation"`)

---

## 8. Tokens & forbidden CSS patterns

### Picasso Tailwind tokens · **RULE**

Use Picasso tokens by their semantic name where possible:

```
Good: text-graphite-800, bg-blue-100, shadow-2 (modal), p-4 (16px)
Bad:  text-[#262D3D], bg-[#EDF1FD], shadow-[0_4px_8px_0_rgba(0,0,0,0.08)], p-[16px]
```

If you find yourself reaching for an arbitrary value, double-check `tokens/picasso-tailwind-tokens.md` first.

(source: `rules/styling.md §"Token usage"`)

### `TODO(tokens):` when no canonical token exists · **RULE**

When no canonical token exists for a CSS value, keep the literal + add a `// TODO(tokens): <description>` comment. Don't invent a new token; that's a coordinated design-system change.

```tsx
'bg-[#4269D6]',     // TODO(tokens): brand-blue-variant — designer can confirm canonical name
'rounded-[6px]',    // TODO(tokens): 6px isn't on the 4px scale; verify if intentional
```

These comments surface in the P1-FIG-03 audit so designers can resolve later.

(source: `rules/styling.md §"Token usage"`, `practices.md §"Tailwind & class composition"`)

### No CSS files · **RULE**

No `.css`, `.scss`, `.module.css`. Anything CSS-shaped lives in Tailwind classes or helper-returned arrays.

(source: `rules/styling.md §"What to avoid"`)

### No JSS objects · **RULE**

No `makeStyles`, `createStyles`, `withStyles`. No `&$selector` parent-refs.

For variant-driven classes, return a `string[]` from a pure function in `styles.ts` (Button precedent) and merge with `twMerge`. Do NOT introduce new JSS `classes` maps. Existing JSS-using components (Tier 2 Radio, Tier 3 Page, sibling-package picasso-charts/RTE) are migration targets, not pattern sources.

`docs/contribution/css-naming.md` describes MUI v4 + JSS conventions (`root` + `rootFull`/`rootShrink` for variants, `cx({ [classes.active]: active })`, etc.). **These are PRE-migration patterns — LEGACY, do not follow.**

(source: `rules/styling.md §"What to avoid"`, `practices.md §"css-naming.md is LEGACY"`)

### No `style={{...}}` for static values · **RULE**

Only use inline `style` when the value is computed at runtime from props. Numeric interpolation is OK; static styles must move to Tailwind.

```tsx
// Bad — static color in inline style
<div style={{ color: 'red' }} />

// Good — Tailwind class
<div className="text-red-500" />

// Acceptable — value computed from props
<div style={{ width: size * 4 }} />
```

(source: `rules/styling.md §"What to avoid"`, `base-ui-styling.md §3.5`)

### Dynamic values · **Convention**

When a value really must be computed at runtime, use Tailwind's arbitrary-value syntax for discrete enums (purgeable) or `style` for true computed numbers:

```tsx
// Arbitrary value — purgeable when size is a finite enum
<div className={`w-[${size * 4}px]`} />

// style for numeric interpolation — Tailwind can't enumerate this
<div style={{ width: size * 4 }} />
```

(source: `rules/styling.md §"Dynamic values"`)

### Conditionals · **Convention**

Plain ternaries or Tailwind's data-attribute selectors:

```tsx
// Good
className={cx({ 'm-0': expanded, 'm-2': !expanded })}

// Good — data-attribute driven (lets parent styling participate)
<div data-state={expanded ? 'open' : 'closed'} className="data-[state=open]:bg-blue-500" />

// Bad — JSS parent-ref
'&$expanded': { margin: 0 }
```

(source: `rules/styling.md §"Conditionals"`)

### Hover / focus / disabled / responsive · **Convention**

Use Tailwind variant prefixes, not state-tracking JS:

```
hover:bg-blue-500
focus:ring-2 focus:ring-blue-400
disabled:opacity-50
md:flex lg:gap-12
```

(source: `rules/styling.md §"Hover / focus / disabled / responsive"`)

---

## 9. JSS → Tailwind translation (migration PRs)

Pattern table for translating common JSS shapes into Picasso Tailwind. Use alongside `tokens/picasso-tailwind-tokens.md` for token names.

### Spacing

MUI's `theme.spacing(N)` returns `N * 8px`. **Always verify the px value** before picking a Picasso token — Picasso tokens are 4px-based.

| JSS                          | px    | Picasso Tailwind |
|---|---|---|
| `padding: spacing(1)`        | 8px   | `p-2`  |
| `padding: spacing(2)`        | 16px  | `p-4`  |
| `padding: spacing(3)`        | 24px  | `p-6`  |
| `padding: spacing(4)`        | 32px  | `p-8`  |
| `marginLeft: spacing(0.5)`   | 4px   | `ml-1` |
| `marginLeft: '1rem'`         | 16px  | `ml-4` |
| `marginRight: '0.5rem'`      | 8px   | `mr-2` |

### Color

MUI palette → Picasso tokens (most common):

| JSS                                 | Picasso Tailwind |
|---|---|
| `color: palette.text.primary`       | `text-graphite-800` |
| `color: palette.text.secondary`     | `text-graphite-700` |
| `color: palette.grey.dark`          | `text-gray-700` |
| `color: palette.primary.main`       | `text-blue-500` |
| `color: palette.primary.dark`       | `text-blue-600` |
| `color: palette.success.main`       | `text-green-500` |
| `color: palette.error.main`         | `text-red-500` |
| `color: palette.warning.main`       | `text-yellow-500` |
| `backgroundColor: palette.common.white` | `bg-white` |
| `backgroundColor: palette.grey.light`   | `bg-gray-100` |
| `backgroundColor: palette.background.paper` | `bg-white` |
| `borderColor: palette.divider`      | `border-gray-300` |

### Hover / focus / disabled

| JSS                                       | Picasso Tailwind |
|---|---|
| `'&:hover': { backgroundColor: ... }`     | `hover:bg-...` |
| `'&:focus': { outline: ... }`             | `focus:outline-...` |
| `'&:focus-visible': { ... }`              | `focus-visible:...` |
| `'&:disabled': { opacity: 0.5 }`          | `disabled:opacity-50` |
| `'&[disabled]': { ... }`                  | `disabled:...` |
| `'&:not(:last-child)': { marginRight }`   | `[&:not(:last-child)]:mr-4` (arbitrary variant) |

### Parent-refs

The big one. JSS allows `&$expanded` to mean "this element when the parent has the `expanded` class". Tailwind has no equivalent — convert to **conditional classes driven by component state**:

```tsx
// JSS (don't)
const useStyles = makeStyles(() => ({
  panel: {
    marginTop: 0,
    '&$expanded': { marginTop: 16 }
  },
  expanded: {}
}))

// Tailwind (do)
const Panel = ({ expanded }) => (
  <div className={cx('mt-0', { 'mt-4': expanded })}>...</div>
)
```

Or, when the state belongs on a parent and the styling on a child, use `data-*` attributes:

```tsx
<Accordion data-state={expanded ? 'open' : 'closed'}>
  <Panel className="data-[state=open]:mt-4" />
</Accordion>
```

### Pseudo-elements

| JSS                                     | Picasso Tailwind |
|---|---|
| `'&::before': { content: '""' }`        | `before:content-['']` |
| `'&::after': { ... }`                   | `after:...` |
| `'&::placeholder': { color: ... }`      | `placeholder:text-...` |

### Responsive

| JSS                                                  | Picasso Tailwind |
|---|---|
| `[theme.breakpoints.up('md')]: { display: 'flex' }` | `md:flex` |
| `[theme.breakpoints.down('sm')]: { ... }`           | `max-sm:...` (or invert: write the default for ≥sm) |
| `[theme.breakpoints.between('md', 'lg')]: { ... }`  | `md:max-lg:...` |

### Transitions

| JSS                                                   | Picasso Tailwind |
|---|---|
| `transition: 'all 150ms ease-in-out'`                 | `transition duration-150 ease-in-out` |
| `transition: 'transform 200ms cubic-bezier(0.4,0,0.2,1)'` | `transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]` |
| `transitionDuration: '350ms'`                         | `duration-350` (Picasso token) |

### Shadows

| JSS                          | Picasso Tailwind |
|---|---|
| `boxShadow: shadows[1]`      | `shadow-1` (notification, paper) |
| `boxShadow: shadows[2]`      | `shadow-2` (modal) |
| `boxShadow: shadows[4]`      | `shadow-4` (tooltip) |
| `boxShadow: 'none'`          | `shadow-0` |
| `boxShadow: shadows[6..24]`  | `shadow-6` … `shadow-24` (legacy MUI parity; do not introduce new uses) |

### Z-index

| JSS                              | Picasso Tailwind |
|---|---|
| `zIndex: zIndex.drawer`          | `z-drawer` (1200) |
| `zIndex: zIndex.modal`           | `z-modal` (1300) |
| `zIndex: zIndex.snackbar`        | `z-snackbar` (1400) |

### Border radius

| JSS                          | Picasso Tailwind |
|---|---|
| `borderRadius: 0`            | `rounded-none` |
| `borderRadius: 4`            | `rounded-sm` |
| `borderRadius: 8`            | `rounded-md` |
| `borderRadius: '50%'`        | `rounded-full` |

### Font

| JSS                                             | Picasso Tailwind |
|---|---|
| `fontFamily: '"proxima-nova", Arial, sans-serif'` | `font-sans` |
| `fontWeight: 600`                                | `font-semibold` |
| `fontWeight: 400`                                | `font-regular` |
| `fontSize: '0.875rem'` + `lineHeight: '1.375rem'` | `text-md` |
| `fontSize: '1rem'` + `lineHeight: '1.5rem'`      | `text-lg` |

### Layout

| JSS                                       | Picasso Tailwind |
|---|---|
| `display: 'flex'`                         | `flex` |
| `display: 'inline-flex'`                  | `inline-flex` |
| `flexDirection: 'column'`                 | `flex-col` |
| `alignItems: 'center'`                    | `items-center` |
| `justifyContent: 'space-between'`         | `justify-between` |
| `position: 'absolute'`                    | `absolute` |
| `inset: 0`                                | `inset-0` |
| `width: '100%'`                           | `w-full` |
| `width: '18.75rem'`                       | `w-input` (Picasso semantic token) |

### Dynamic values

| JSS                                          | Picasso Tailwind |
|---|---|
| `width: ${size * 4}px`                       | `style={{ width: size * 4 }}` (numeric runtime) |
| `width: ${size}px` where size ∈ {120,160,200} | `w-[120px]` / `w-[160px]` / `w-[200px]` (purgeable) |
| `transform: rotate(${angle}deg)`             | `style={{ transform: \`rotate(${angle}deg)\` }}` |
| `gridTemplateColumns: \`repeat(${cols}, 1fr)\`` | `style={{ gridTemplateColumns: \`repeat(${cols}, 1fr)\` }}` |

### Worked example 1: JSS parent-ref selector → data-attribute selector

**Before (JSS with parent-ref `&$expanded`)**:

```ts
const styles = createStyles({
  root: {
    height: 32,
    transition: 'height 0.2s',
    '&$expanded': {
      height: 64,
    },
  },
  expanded: {},
})

// Usage:
<div className={cx(classes.root, expanded && classes.expanded)} />
```

**After (Tailwind data-attribute selector)**:

```tsx
// styles.ts
export const createRootClassNames = (expanded: boolean): string[] => [
  'h-8',                                  // height: 32px → h-8 (32 / 4)
  'transition-[height]',                  // height transition
  'duration-200',                         // 0.2s → 200ms
  expanded ? 'data-[expanded]:h-16' : '', // data-attr selector wins via specificity
]

// Component.tsx
<div
  data-expanded={expanded || undefined}
  className={twMerge(createRootClassNames(expanded), className)}
/>
```

**Why**: parent-refs in JSS apply nested rules conditionally via classname overlap. In Tailwind, the equivalent is a data attribute on the same element + a `data-[attr]:` selector. The `|| undefined` trick prevents `data-expanded="false"` from appearing in the DOM (Picasso convention — boolean attrs are either present or absent).

### Worked example 2: Dynamic class from prop state → conditional class array

**Before (JSS with dynamic selector)**:

```ts
const styles = (theme) => createStyles({
  root: ({ variant, disabled }) => ({
    backgroundColor: variant === 'primary'
      ? (disabled ? theme.palette.grey[400] : theme.palette.primary.main)
      : 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
  }),
})
```

**After (Tailwind conditional array)**:

```tsx
// styles.ts
export const createVariantClassNames = (
  variant: 'primary' | 'transparent',
  disabled: boolean
): string[] => {
  const classes: string[] = []
  switch (variant) {
    case 'primary':
      classes.push(disabled ? 'bg-gray-400' : 'bg-blue-500')
      break
    case 'transparent':
      classes.push('bg-transparent')
      break
  }
  classes.push(disabled ? 'cursor-not-allowed' : 'cursor-pointer')
  return classes
}
```

**Why**: a `switch` over the union literal mirrors the JSS branching while staying type-safe. The PURE function shape (input props → string[]) is the Picasso convention from Button.

### Worked example 3: Raw hex / px → Picasso token (with TODO fallback)

**Before (JSS literals)**:

```ts
const styles = createStyles({
  root: {
    backgroundColor: '#4269D6',  // some specific Picasso brand variant
    borderRadius: '6px',         // non-token, picked by designer
  },
})
```

**After (token where one exists, literal + TODO where not)**:

```tsx
// styles.ts
export const createRootClassNames = (): string[] => [
  'bg-[#4269D6]',     // TODO(tokens): brand-blue-variant — designer can confirm canonical name
  'rounded-[6px]',    // TODO(tokens): 6px isn't on the 4px scale; verify if intentional or rounded-md (4px) acceptable
]
```

**Why**: never invent a Picasso token. If the canonical token exists in `tokens/picasso-tailwind-tokens.md`, use it. If not, use `[arbitrary-value]` AND a `TODO(tokens):` comment so the next reader can resolve. The migration is NOT the place to introduce new tokens.

### Worked example 4: JSS pseudo `&:hover:not(:disabled)` → Tailwind `hover:enabled:*`

**Before (JSS pseudo with state guard)**:

```ts
const styles = (theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    '&:hover:not(:disabled)': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
    },
  },
})
```

**After (Tailwind state modifiers)**:

```tsx
// styles.ts
export const createInteractiveClassNames = (): string[] => [
  'bg-blue-500',                            // primary.main
  'hover:enabled:bg-blue-600',              // primary.dark on hover, but only when not disabled
  'focus-visible:outline-2',                // 2px outline
  'focus-visible:outline-blue-500',
]
```

**Note on `@base-ui/react`**: if you're migrating away from `:focus-visible` to `@base-ui/react`'s `[data-focused]`, the equivalent is `data-[focused]:outline-2 data-[focused]:outline-blue-500`.

### Worked example 5: `theme.spacing(N)` → gap-/space- utilities

**Before (JSS spacing helpers)**:

```ts
const styles = (theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),  // 16px between children
    },
  },
  inline: {
    display: 'flex',
    gap: theme.spacing(1),  // 8px between flex items
  },
})
```

**After (Tailwind space-/gap-)**:

```tsx
// styles.ts
export const createStackClassNames = (): string[] => [
  'flex',
  'flex-col',
  'space-y-4',  // theme.spacing(2) = 16px → space-y-4 (4 × 4 = 16)
]

export const createInlineClassNames = (): string[] => [
  'flex',
  'gap-2',      // theme.spacing(1) = 8px → gap-2 (2 × 4 = 8)
]
```

**Why**: `space-y-*` mirrors the JSS `'& > * + *': { marginTop }` pattern exactly. `gap-*` is preferred for new code, but verify it works on the layout shape (gap only applies inside flex/grid; space-y applies to any block container).

### JSS → Tailwind anti-patterns

- **Don't sprinkle `[arbitrary]` values when a token exists.** Always check `tokens/picasso-tailwind-tokens.md` first.
- **Don't use `style={{...}}` for static values.** Only use inline `style` when the value is computed at runtime from props.
- **Don't keep `cx` chains longer than ~6 entries.** If you're listing 10 classes via `cx`, factor into a `createXxxClassNames` function in `styles.ts` (Button pattern).
- **Don't rebuild parent-refs as `:has()`.** Use `data-*` attributes — `:has()` has weaker browser support and is harder to test.
- **Don't compose `twMerge` with user `className` first.** `twMerge(className, structural)` lets the structural classes override the consumer. Reverse: `twMerge(structural, className)` — consumer-last wins.

(source: `rules/jss-to-tailwind-crib.md` in full)

---

## 10. ESLint custom rules

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

When editing **orchestrator code** (`bin/lib/*.ts`), additional ESLint rules trip in CI's "Static checks" — see `CLAUDE.md` §"Code style for orchestrator". That's operator-facing, not Picasso component code.

(source: `code-standards.md §"ESLint custom rules to know"`)

---

## 11. SSR safety

ESLint-enforced.

### Use `useIsomorphicLayoutEffect` · **RULE**

Instead of `useLayoutEffect`. Count of `useLayoutEffect` in source: 0 — fully enforced via `no-restricted-imports` ESLint error.

```ts
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

useIsomorphicLayoutEffect(() => { /* ... */ }, [deps])
```

(source: `code-standards.md §"SSR safety"`)

### No DOM globals in module/constructor/render scope · **RULE**

No `window`, `document` in module scope, constructor, or render — only inside effects/handlers.

`.example.tsx` files are exempt from SSR rules.

(source: `code-standards.md §"SSR safety"`)

---

## 12. Testing conventions

### Single top-level `describe` · **RULE** (8/8 sampled conform)

```ts
describe('Button', () => {
  describe('when loading is true', () => { /* ... */ })
  describe('when disabled', () => { /* ... */ })
})
```

Nested describes only for behavioral groupings. Never nest 3+ deep.

(source: `code-standards.md §"Test conventions"`)

### `renderComponent` helper · **RULE** (87.5% adoption)

A local function that wraps `render()` from `@toptal/picasso-test-utils`, preselects common props, returns the destructured API:

```tsx
const renderButton = (props: Partial<OmitInternalProps<Props>> = {}) =>
  render(<Button {...defaultProps} {...props}>Click</Button>)
```

(source: `code-standards.md §"Test conventions"`)

### User-centric queries · **RULE**

Prefer user-centric queries (`getByText`, `getByTestId`, `getByRole`).

**`fireEvent` count in current 28-scope components: 0.** Use `userEvent` from `@testing-library/user-event` or RTL's `screen.getByX`.

(source: `code-standards.md §"Test conventions"`)

### Snapshot ratio · **Convention**

- 2–3 snapshots per component for shape.
- 50–80% of tests are explicit assertions.
- NO "renders without crashing" anti-pattern — bare `render()` without assertion is reviewer-blocking (Backdrop iter 3 lesson).

Tests must assert specific behavior: text content, mock invocation, snapshot content.

(source: `code-standards.md §"Test conventions"`, `practices.md §"Test conventions"`)

### Mocks · **Convention**

- `jest.spyOn()` / `jest.fn()` for callbacks.
- NO DOM-API mocks.

(source: `code-standards.md §"Test conventions"`)

### Responsive component testing · **RULE** (MANDATORY)

**A "responsive component" is any component that changes layout based on device size or layout breakpoint** (identified in code by use of the Breakpoints API or CSS Media Queries). For these, Happo screenshots at ALL breakpoint variants are mandatory — single-breakpoint coverage is incomplete and reviewers will reject.

Two patterns depending on whether user interaction is needed before the screenshot:

#### Pattern 1: Storybook screenshots (no interaction needed) — PREFERRED

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

#### Pattern 2: Cypress component test (interaction needed before screenshot)

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

(source: `practices.md §"Responsive component visual testing"`, `docs/contribution/visual-testing.md:19-78`)

### Accessibility validation · **RULE**

Storybook has an a11y addon. For every migrated component, before opening the PR:

1. Open the component's Storybook page on `localhost:9001`.
2. Press `A` (or click the 3-dots icon → "Show addons").
3. Click the **Accessibility** tab.

Three result categories:

- **Violations** — a rule definitely failed. **Must fix before PR.**
- **Passes** — a rule definitely passed. Informational.
- **Incompletions** — rule outcome is ambiguous (a11y addon couldn't decide). **Review case-by-case** — common when MUI v4 → @base-ui/react changes the DOM shape that the addon's heuristic relied on.

A migration that introduces a Violations entry (or moves a story from Passes → Incompletions without justification) is a regression. Same logic as visual parity: don't self-classify as INTENTIONAL.

(source: `practices.md §"Accessibility validation"`, `docs/contribution/accessibility.md:5-18`)

---

## 13. Package.json & build

Applies to every PR that touches `dependencies`, `devDependencies`, or `peerDependencies`. The build-before-snapshot precondition at the bottom applies even when no deps change.

### Version pinning rules · **RULE** (CI-enforced)

- **npm package deps use caret prefix.** Picasso's syncpack rule requires caret-prefix for npm deps; an exact pin fails CI's "Static checks" job with `HighestSemverMismatch`. Example: `"@base-ui/react": "^1.4.1"`, NOT `"1.4.1"`.
- **Workspace package deps use exact version, no caret or tilde.** When adding a `@toptal/picasso-*` dependency, use the package's published version verbatim (e.g. `"2.0.4"`, not `"^2.0.4"`). Caret on a workspace dep fails CI with `LocalPackageMismatch`. Look up the version first:
  ```bash
  cat packages/<pkg>/package.json | jq -r .version
  ```
- **Drop the `react: < 19.0.0` upper bound** from `peerDependencies` if present. Replace with `react: ">=16.12.0"` (or the current Picasso floor). Widening a peer range is NOT a breaking change for existing consumers (they continue to resolve the React version they already use).

(source: `rules/package-and-build.md §"Version pinning rules"`)

### pnpm install — plain, no overrides · **RULE**

After editing any `package.json` deps:

```bash
pnpm install
git add pnpm-lock.yaml
```

**Run plain `pnpm install` from the repo root.** Trust Picasso's `pnpm-workspace.yaml` configuration as-is. **DO NOT pass `--config.link-workspace-packages=false`** (or any other workspace-link override) — overriding that flag rewrites every workspace package entry in the lockfile from compact `link:packages/X` references into expanded peer-suffix form, producing ~7,500 extra lines of unrelated lockfile diff and triggering spurious changeset-bot complaints.

(source: `rules/package-and-build.md §"pnpm install"`)

### Lockfile diff size — STOP conditions · **RULE**

- **Typical migration**: `pnpm-lock.yaml` diff is **< 300 lines** for a single-component dep change. Common patterns: `+ '@base-ui/react': link:...` and `- '@mui/base': ...` plus a few transitive resolution changes.
- **STOP** if the diff is > 1000 lines OR you see `link:packages/X` lines being REPLACED with expanded peer-suffix form: the workspace-link representation has been broken. Reset and retry:
  ```bash
  git checkout origin/<base-branch> -- pnpm-lock.yaml
  pnpm install   # plain — NO flag
  ```

(source: `rules/package-and-build.md §"Lockfile diff size"`)

### Validate before commit · **RULE**

Missing lockfile update is a common reason CI's "Build packages" step fails on dep-bumping migrations.

```bash
git status
# pnpm-lock.yaml MUST appear as modified IFF you touched any
# dependencies / devDependencies / peerDependencies of any package.
```

If deps changed but the lockfile didn't: the resolution didn't move. Verify the new dep is already in the lockfile:

```bash
grep '@base-ui/react' pnpm-lock.yaml
```

(source: `rules/package-and-build.md §"Validate before commit"`)

### peer-vs-dev split for build-time deps · **RULE**

If a runtime dep is used at compile time (e.g. `withClasses` consuming `@toptal/picasso-tailwind-merge`), the package needs it as a **`devDependency`** for its own `tsc -b` resolution, not just as a `peerDependency` — peerDeps are only seen by *consumers* of the package, not by the package's own build.

(source: `rules/package-and-build.md §"peer-vs-dev split"`)

### Build-before-snapshot precondition · **RULE** (STOP rule)

**Before running `pnpm davinci-qa unit -u` (or `pnpm jest -u`) to regenerate snapshots, verify the MIGRATING package builds cleanly:**

```bash
pnpm -F @toptal/picasso-<NAME> build:package
```

If this fails, do NOT proceed to snapshot regeneration. A failing `build:package` silently produces empty `<div>` snapshots that CI then diffs as `-1 / +120` against the prior baseline.

Snapshot regeneration is a one-way commit of whatever is on disk. Stale builds poison the snapshot. Always: build → snapshot → commit, in that order.

(source: `rules/package-and-build.md §"Build-before-snapshot precondition"`, `practices.md §"Build & snapshot precondition"`)

### tsconfig hygiene · **RULE**

When dropping a workspace dependency from `package.json` (e.g. removing the Backdrop dep from Drawer), remove the matching `references` entry from `tsconfig.json` in the same commit. Otherwise `tsc -b` fails the migration PR's "Build" job even though `pnpm install` succeeds. The two configurations must agree.

(source: `rules/package-and-build.md §"tsconfig hygiene"`, `practices.md §"tsconfig & build hygiene"`)

### Build + Storybook tsconfig hierarchy · **Convention**

Picasso has 4 build-config layers; touching one usually requires updating the others:

| File | Purpose |
|---|---|
| `packages/<pkg>/tsconfig.build.json` | Used by `tsc -b` during package build for publishing. `paths` reference other Picasso packages. |
| `/tsconfig.json` (root) | Dev-time IDE resolution + base config for per-package extends. `paths` are also used by Storybook to resolve cross-package imports in code examples. |
| `/.storybook/tsconfig.json` | Storybook build inclusion (Storybook-only files). |
| `/.storybook/webpack.config.js` `alias` | Required for cross-package import resolution at Storybook build time (works in combination with root `tsconfig.json` `paths`). |

**Migration impact**: when you drop a workspace dep from `package.json`, ALSO remove the matching `references` entry from `packages/<pkg>/tsconfig.json` (Drawer iter 2 precedent — `tsc -b` failed Build job despite `pnpm install` succeeding).

(source: `code-standards.md §"Build + Storybook tsconfig hierarchy"`, `docs/contribution/packages-architecture.md:7-21`)

---

## 14. Changesets & versioning

Authoritative source: `docs/contribution/changeset-guidelines.md` (lines 5-46).

### Version bump taxonomy · **RULE**

- **`patch`** — bug fix; change in existing functionality; change which does not affect Picasso users.
- **`minor`** — new property; new property value; new functionality; new component.
- **`major`** — deleting a component; deleting a component property; changing values for existing properties; changing the purpose of a property; changing horizontal layout (page-layout-break risk); any change requiring user action to upgrade.

(source: `code-standards.md §"Changeset conventions"`, `docs/contribution/changeset-guidelines.md:5-26`)

### Migration PRs follow the standard taxonomy — NOT auto-major · **RULE**

Apply the taxonomy above to whatever the PR actually changes. No bump tier is reserved for "migration" as a category. The bump tier is a function of consumer-visible impact, not implementation effort.

- **`patch`** is correct for a pure library swap (`@mui/base` → `@base-ui/react` or `@material-ui/core` → `@base-ui/react`) when the public Props API is identical, types match, and behavioral parity is verified by snapshot + Happo + unit tests. The CI gates (Jest, Lint, Visual Tests) are the contract that "no consumer-visible change" actually holds.

  **Rationale for why a library swap alone does NOT force major:**
  - `@mui/base`, `@material-ui/core`, `@mui/*` are Picasso `dependencies`, NOT `peerDependencies`. Consumers do not have them in their `package.json`. Swapping them is invisible at the consumer dep tree.
  - The `react: < 19.0.0` peer cap lift is not a major-trigger on its own — widening a peer range is not a breaking change for any existing consumer (they continue to resolve the React version they already use). Tightening a range is breaking; widening is not.
  - Behavioral parity is verified by CI gates; we don't preemptively `major` on the chance of a regression. If a regression slips, that's a `patch` followup fix.

- **`minor`** when the migration deliberately adds a new prop, a new prop value, or a new behavior the consumer can opt into.

- **`major`** ONLY when the migration genuinely breaks a consumer's existing usage: removed/renamed prop, narrowed prop type, removed prop value, changed default that flips visible behavior, or a layout-shifting CSS change consumers would need to react to. List the specific breaking surface in the changeset body — if you can't name a concrete break, it's not major.

(source: `code-standards.md §"Migration PRs follow the standard taxonomy"`, `practices.md §"Changesets"`)

### Behavioral parity framing · **RULE**

Reviewers expect this framing upfront (Drawer iter 1, iter 2 + Backdrop iter 9 + Slider iter 11, iter 12 + Switch iter 2). For `patch`-bump migrations this framing IS the changeset's primary content.

Enumerate only what's actually consumer-visible at the chosen tier:

- `patch`: one-line "Re-implement on `@base-ui/react`; public API unchanged" is sufficient.
- `minor`: name the new prop / value / behavior.
- `major`: name the specific breaking surface — required. Optionally enumerate compound parts being assembled (e.g., "Slider now assembled from `Slider.Root + Control + Track + Indicator + Thumb`") if consumers will need to know.

For modified Props interfaces (any tier), state per-prop whether it's NEW or was INHERITED from a removed parent type (e.g., `ModalBackdropSlotProps`).

For `@deprecated` props with `_unused` destructure: name them and the planned removal version.

(source: `practices.md §"Changesets"`)

### Body format · **RULE**

```markdown
---
'@toptal/picasso-<name>': patch  # or minor / major — pick per the taxonomy above
---

### <ComponentName>
- what changed in one sentence (e.g., "Re-implement on `@base-ui/react`; public API unchanged.")
- IF minor: the new prop / value / behavior added
- IF major: the specific breaking surface (named prop removed, default flipped, etc.) — required
- compound parts only if newly assembled and consumer-relevant
```

- Present-simple tense ("Fix button alignment", not "Fixed").
- Per-PR `.changeset/<name>.md` files (avoid the merge-conflict cost of a single growing file). They aggregate via `pnpm changeset version` at release time.

(source: `code-standards.md §"Body format"`, `docs/contribution/changeset-guidelines.md:32-45`)

### Deprecate-don't-delete · **RULE**

Keep removed-in-new-lib props with `@deprecated` JSDoc + Jira ticket ref, route to `_unused` destructure:

```ts
/** @deprecated [PF-1234] no equivalent in @base-ui/react; will be removed in next major */
disablePortal?: boolean
```

(source: `practices.md §"API preservation"`)

---

## 15. CI job pipeline

Authoritative source: `docs/contribution/github-workflow.md:14-20` and `docs/contribution/pr_jobs.md`.

### Pipeline · **RULE**

Every PR push runs these jobs automatically (~4 min total):

| Job | What it checks |
|---|---|
| **Danger** | Commit conventions (capital-letter start, imperative mood, no trailing period, ≤79 chars). Re-runs when PR title changes. |
| **Jest Test** | Unit-test snapshots (not visual tests). |
| **Lint** | ESLint repo-wide. |
| **Visual Tests** | Happo visual regression (see §16). |
| **Deploy docs** | Live Storybook preview for the PR branch. |

(source: `code-standards.md §"CI job pipeline"`)

### Commit conventions · **RULE**

- Capital-letter start
- No trailing period
- Imperative mood ("Build" not "Built")
- ≤79 chars

Fixup/squash commits (`fixup!`/`squash!` prefix) skip these checks.

(source: `code-standards.md §"Commit conventions"`, `docs/contribution/github-workflow.md:25-30`)

### Manual CI override via `@toptal-bot` · **Convention**

When Jenkins stalls or you need to re-trigger a specific stage (e.g., after a PR-title edit that should re-run Danger), use these commands as a PR comment:

- `@toptal-bot run all` — re-run the whole pipeline
- `@toptal-bot run build` — re-run build only
- `@toptal-bot run deploy:documentation` — re-run docs deploy
- `@toptal-bot run package:alpha-release` — cut an alpha release

(source: `code-standards.md §"Manual CI override"`, `docs/contribution/pr_jobs.md:9-12`)

---

## 16. Visual verification & Happo authority

### Pixel-perfect parity is the only acceptable outcome · **RULE**

Picasso is a UI kit. Consumers depend on byte-identical rendering across releases. A migration's job is to swap the underlying library while keeping output pixel-identical. **Any visual delta on the migrated component is a REGRESSION you must fix in source**, not an "intentional consequence of the new DOM".

INTENTIONAL deltas are allowed **only** when an "Approved visual deltas" section in `docs/migration/components/<Component>.md` enumerates the specific delta.

(source: `visual-verification.md §"Pixel-perfect is the only acceptable outcome"`)

### Two complementary visual tools · **Convention**

| Tool | Strength | Use it for |
|---|---|---|
| **Playwright MCP** | Fast feedback, interactive (hover/click/focus/keyboard), surfaces console errors + accessibility tree + runtime warnings | Live iteration during development. Catch obvious regressions FAST before the slower Happo cycle. |
| **Happo** | Authoritative pixel-diff against persisted baselines, designer-approval workflow, parallel browser/viewport coverage, CI-gating | Final regression authority. Even if Playwright says "looks fine to me", Happo is the source of truth — must be green (or all diffs marked intentional with operator approval). |

Playwright is the **fast iteration tool**. Happo is the **authoritative gate**.

(source: `visual-verification.md §"Two complementary visual tools"`)

### DO NOT use the deployed PR preview for verification · **RULE**

`https://toptal.github.io/picasso/prs/<pr-number>/` is the GitHub Pages deployment of the PR's Storybook bundle — useful for human reviewers to click around, but **wrong for visual verification**:

- It lags behind in-progress edits by however long the last CI Pages job took (often minutes, sometimes never if Pages deploy didn't run for this commit).
- It serves the bundle Webpack built for that commit, not the live worktree.

Verification happens on `http://localhost:9001` (worktree-local Storybook) vs `https://picasso.toptal.net` (deployed master baseline).

(source: `visual-verification.md §"DO NOT use the deployed PR preview"`)

### Happo classification matrix · **RULE**

Every Happo diff falls into one of three classes:

| Class | Definition | Action |
|---|---|---|
| **REGRESSION** | DEFAULT for any non-zero pixel diff on a story whose `component` field matches the migration target | Fix in source. Iterate Tailwind/CSS until local matches baseline byte-for-byte. |
| **UNRELATED FLAKE** | The diff's `component` field does NOT match the migration target | Document briefly, do not fix. Happo's flakes resolve on re-run. |
| **INTENTIONAL** | Pre-approved design-led change with operator authorization | Allowed ONLY if `docs/migration/components/<Component>.md` has an "Approved visual deltas" section enumerating the specific delta. |

(source: `happo-iteration.md §"Classification matrix"`)

### INTENTIONAL is effectively forbidden · **RULE**

Self-declared "INTENTIONAL" calls have produced wrong outcomes:

- **Slider PR #4955**: 8 diffs labeled INTENTIONAL ("Base UI emits `data-orientation`, accept it"). Wrong — those diffs needed CSS compensation with `[data-orientation]:` selectors. The agent burned 5 distinct fix attempts before the operator's intervention pointed at the real root cause (a missed `margin-left: -6px` for thumb centering).
- **Backdrop PR #4954**: similar misclassification cluster.

The pattern: when the agent reaches for INTENTIONAL, the actual fix is almost always a Tailwind selector compensating for the new DOM. **Treat the urge to use INTENTIONAL as a STOP signal** — read the `@base-ui/react` source for the affected slot, then fix in source.

(source: `happo-iteration.md §"INTENTIONAL is effectively forbidden"`)

### Read the `@base-ui/react` source BEFORE adding CSS compensation · **RULE**

When you see a positional shift on a migrated compound part (Slider thumb, Tooltip popup, Dropdown popper, etc.), the first move is to read the library's source for the affected slot:

```
node_modules/@base-ui/react/<group>/<part>/<Part>.js
```

For example: `slider/thumb/SliderThumb.js`, `tooltip/popup/TooltipPopup.js`. Look for inline-style assignments inside `useMemo` / `getStyle` / render. The library may already provide centering / positioning / sizing via the modern CSS Transforms 2 `translate:` / `rotate:` / `scale:` properties — these compose with Tailwind's `transform: translate(...)` (CSS `transform` property is independent of `translate` property). If you add `-translate-x-1/2 -translate-y-1/2` on top of a library-provided `translate: -50% -50%`, the element is doubly-shifted → real regression.

(source: `visual-verification.md §"Read the @base-ui/react source"`, `practices.md §"@base-ui/react idioms"`)

### jsdom CSS Transforms 2 quirk · **RULE — reviewer-relevant**

jsdom (jest test env) does NOT serialize the `translate:` / `rotate:` / `scale:` CSS properties into the `style=""` attribute. So a Jest snapshot showing `style="position: absolute; inset-inline-start: X%; top: 50%"` (no translate) does NOT prove the library doesn't center — Chrome (Happo / Playwright) renders it differently.

Use either:
- (a) the library source itself, or
- (b) the Playwright/picasso.toptal.net screenshot comparison,

NEVER the Jest snapshot alone, as your basis for "what positioning the library applies".

(source: `visual-verification.md §"jsdom does NOT serialize"`)

### Picasso's snapshot serializer quirk · **Convention**

Picasso's `jss-snapshot-serializer.cjs` mis-classifies multi-dash Tailwind utilities (`-translate-x-1/2`, `bg-blue-500`, anything matching `X-Y-Z` with Z = digits) as JSS class names and strips the suffix in stored snapshots. So `class="... -translate-x"` in a snapshot file may correspond to `-translate-x-1/2` in source.

If you update a snapshot after editing classes, check the actual SOURCE className string in `<Component>.tsx`, NOT just what shows in the snapshot.

(source: `visual-verification.md §"Picasso's snapshot serializer quirk"`)

### Computed-style diff is the authoritative diagnostic · **RULE**

When Happo shows a positional shift (~2-5 px) on a migrated component, **stop guessing from screenshots and run a computed-style diff**.

Reviewers can ask for `computed-styles-baseline.json` + `computed-styles-local.json` as evidence of diagnosis before accepting a fix. Stalemate is forbidden until ≥ 2 fix attempts have targeted properties from the computed-style diff (Slider PR #4955 burned 5 iterations skipping this).

Common `@base-ui/react` compensations:
- New `data-*` attribute on slot → add `[data-attr]:<style>` selector replicating prior visual.
- Mirror old `:focus-visible` under `data-[focused]:`.
- Adjust geometry via `gap`/`p-*`/`m-*` when wrapper elements shift.
- Preserve transition parity via `data-[starting-style]`/`data-[ending-style]` translate classes on portal-host elements.

(source: `happo-iteration.md §"Computed-style diff is the authoritative diagnostic"`, `practices.md §"Pixel-perfect visual parity"`)

### Worked compensation examples

#### Focus outline shift

**Symptom**: baseline shows a 2px focus ring on the trigger button; local shows a 1px ring (or none).

**Diagnosis**: `@base-ui/react` swapped `:focus-visible` semantics for the `[data-focused]` attribute. The component's old Tailwind `focus-visible:outline-2` rule no longer applies.

**Fix**: mirror old `:focus-visible` styles via the new selector:

```tsx
<BaseUIButton
  className="data-[focused]:outline-2 data-[focused]:outline-offset-2 data-[focused]:outline-blue-500"
  // (was: "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500")
/>
```

#### Hover background-color delta

**Symptom**: baseline hover bg is darker than local.

**Diagnosis**: the JSS rule used `lighten(theme.palette.primary.main, 0.15)`; the migration translated to `hover:bg-blue-400` (the next-lighter palette step), losing 1 token.

**Fix**: correct the Tailwind token to match the JSS-computed shade, OR keep the literal with a `// TODO(tokens):` comment if no canonical token exists.

#### Wrapper-element geometry drift

**Symptom**: baseline and local have the same content, but local sits 4px lower/right.

**Diagnosis**: `@base-ui/react` injected a wrapper element (e.g. `Drawer.Popup` wraps content that previously sat at root level).

**Fix**: adjust `gap`, `p-*`, or `m-*` on the new wrapper so geometry stays identical to the old DOM:

```tsx
<Drawer.Popup className="-m-1 p-1">{children}</Drawer.Popup>
// Negative outer margin compensates the new wrapper's intrinsic border.
```

(source: `visual-verification.md §"Worked compensation examples"`)

---

## 17. PR description & changeset hygiene

### PR description required sections · **RULE**

Every migration PR (and most large feature PRs) opens with this shape, each section ≤4 sentences — reviewers scan, not read:

```markdown
## Summary

<One paragraph. What this PR migrates, at a high level how. Reviewer should grasp the shape in 15 seconds.>

## Decisions

- <Decision 1>: <what you chose> because <why>. <cite rule/decision doc if one applies>
- <Decision 2>: ...
(2-4 bullets focused on choices a reviewer would otherwise ask about: classes-shim path, behavioral parity shims, patches applied to vendor deps, JSS-to-Tailwind compromises.)

## Limitations / Out-of-scope

- <What this PR doesn't address + WHY>.
- <Known edge case worth mentioning>.

## Verification

- **Local gate stages passed**: build, tsc, lint, jest, cypress, happo.
- **Runtime check (Playwright)**: <stories/states exercised>.
- **Visual parity**: <Happo verifier result against base SHA>.
```

Tone: concise, fact-dense. Each section caps at ~4 sentences or ~6 bullets. If a reviewer wants more depth, they ask in a PR comment; the answer goes there.

(source: `PROMPT-light.md §8 / PROMPT-heavy.md §8`)

### Strip JSDoc from internal passthrough props before PR · **RULE**

`ownerState`, `data-private`, MUI-Base injected props — these surface in TS doc generation as public API (Backdrop iter 9 precedent). Verify before opening PR.

(source: `practices.md §"Verify before commit"`)

### Verify intended code changes are actually present in the diff · **RULE**

Before opening PR. Reviewer comment on `Switch.tsx:55` (Switch iter 2 precedent) was triggered by the initial diff still showing the OLD `@mui/base` code — an avoidable iteration because the planned edit wasn't applied.

(source: `practices.md §"Verify before commit"`)

### `git status` clean of scratch/tooling files · **RULE**

Common offenders found at repo root in migration PRs: `*-thumbs.json`, `baseline-*.json`, `local-*.json`, `fetch-happo-diffs.mjs`. Write debug artifacts to a `.gitignore`d scratch dir from iter 1.

(source: `practices.md §"Verify before commit"`)

### If `pnpm build:package` failed at bootstrap · **RULE**

Do NOT proceed to `pnpm jest -u`. See §13 §"Build-before-snapshot precondition".

(source: `practices.md §"Verify before commit"`)

---

## Appendix A — Migration-period carve-outs & exceptions

> **Read this section only when reviewing a migration PR** (Tier 0/1/2/3 swaps in the modernization program). These rules are deliberate, audit-backed exceptions to the canonical patterns in §1–§17. On non-migration PRs, the canonical rules apply without exception.
>
> Source: `references/design-patterns-addendum.md`, `decisions/classes-audit.md`, `_survey-findings.md §H`.

### A.1 — The existing-violations carve-out

`PICASSO_COMPONENT_DESIGN_PATTERNS.md` is the **future spec** validated by CI on new/modified components. The migration is a **library swap**, not a standards-compliance retrofit. **Pre-existing violations of these patterns in already-shipped components REMAIN AS-IS post-migration.** Do NOT opportunistically fix them in a library-swap migration PR.

Per the codebase survey (`_survey-findings.md §H`, extended to 28 rows via scan #21), 25/28 components currently comply with all 16 rules. Documented exceptions (which the migration preserves):

- **Modal**: exposes `classes?: { closeButton?: string, ... }` (R5 violation). Preserve as-is; phased removal tracked in `decisions/classes-audit.md`.
- **Typography**: exposes computed `VARIANT_WEIGHT` / `VARIANT_COLOR` mappings as an internal pattern (not public `classes` per se but R5-adjacent legacy shape). Preserve as-is.
- **OutlinedInput**: exposes `classes?: { root?: string, input?: string }` (legacy @mui/base pattern). Per the Tier 3.b decision, narrowed shape RETAINED.
- **Dropdown**: per the audit-backed Tier 3.b decision, retain narrowed `classes?: { popper?, content? }`.
- **Drawer**: functional component without `forwardRef`. Props don't follow `interface` convention either. Preserve — this is a documented variance for portal-rendering components.

**Form-component context integration** — `FormLabel` and `FormControlLabel` call `useFieldsLayoutContext()` to adapt styles based on form layout (horizontal vs vertical). This is the form-component-specific pattern documented in `_survey-findings.md §I`.

**Rule of thumb**: does the existing component source already do X? If yes, preserve X. If no, follow the canonical rule.

**Newly-introduced code paths** during the migration (e.g., a new adapter helper, a new wrapper around `@base-ui/react`) DO follow the canonical patterns. The carve-out covers preservation of existing public API, not justification for newly-introduced violations.

A future, separate refactor track (post-migration) will sweep components into full compliance. That work is NOT in scope for the modernization program.

(source: `design-patterns-addendum.md §1`)

### A.2 — R5 (no `classes` prop) vs Tier 3.b locked decision

- **Tension scope**: 2 components (Dropdown, OutlinedInput) — transition only.
- **What we do**: retain narrowed `classes?: { popper?, content? }` on Dropdown and `classes?: { input?, root? }` on OutlinedInput. Real external consumers depend on these slots (Dropdown 2 callsites, OutlinedInput 4 callsites per the cross-tier audit).
- **End-state**: Dropdown + OutlinedInput consolidate to `className`-only API once consumers migrate. Tracked in `decisions/classes-audit.md §Tier 3.b`.

(source: `design-patterns-addendum.md §2`)

### A.3 — R5 (no `classes` prop) — Modal & Typography legacy

- **Tension scope**: 2 components (Modal, Typography). These were R5 violators before the migration started.
- **What we do**: preserve their existing `classes?: { ... }` shape. Don't drop the prop in the migration PR even though R5 forbids it.
- **End-state**: a separate API-cleanup sweep removes these `classes` props in a future major.

(source: `design-patterns-addendum.md §2`)

### A.4 — R10 (`extends BaseProps`) vs current Picasso shape

- **Tension scope**: ALL components mid-migration. Per survey, 20/28 already use `extends BaseProps`; 3/28 (Accordion, Tooltip) still use `extends StandardProps`; 5/28 use mixed extends.
- **What we do**: preserve whatever the existing component already extends. **DO NOT** preemptively convert prop interfaces to `extends BaseProps` during a library-swap migration PR. Apply `Omit<StandardProps, 'classes'>` per the classes decision matrix where needed.
- **End-state**: once all 28 components migrate, `StandardProps`, `JssProps`, `Classes` are removed from `@toptal/picasso-shared`. The conversion to `BaseProps`-only happens in a coordinated post-migration sweep.

(source: `design-patterns-addendum.md §2`)

### A.5 — The `classes`-shim decision matrix (locked 2026-05-11)

Cross-tier audit (`decisions/classes-audit.md`) measured each of the 28 components' `classes` API surface — source-level, internal callsites, external consumer usage (with manual `gh search code` textMatches inspection). Audit data drives the per-tier decision.

#### Research steps (MUST complete all 5 before applying the matrix)

1. Read the source — confirm StandardProps extension / local narrowing / body reads of `classes`.
2. Multiline `rg` internal callsites: `rg "<Component>.*classes" packages/`.
3. Cross-reference with `decisions/classes-audit.md` §3/§4/§5.
4. `gh search code` for EXTERNAL consumer usage if Tier 2/3 (audit §6 / §9 has the per-component external counts).
5. If you're migrating Dropdown or OutlinedInput, confirm the locally narrowed shape per §Tier 3.b — DO NOT drop the prop.

**GATE: Do not proceed to the decision matrix until all 5 research steps are complete. If you skip any, the decision will be wrong.**

If the audit contradicts the source state → STOP, update the audit doc, don't proceed unilaterally.

#### Decision matrix

| Tier | Component(s) | Action |
|---|---|---|
| **Tier 0** | Button, Backdrop, Badge, Drawer, Slider, Switch, Tabs | `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` runtime backstop. `classes` was broken since the @mui/base step; 0 internal/external real usage. Reference: PR #4947 Button.tsx + ButtonBase.tsx. |
| **Tier 0 — Modal** | Modal | Re-verify. External consumers use `<Modal classes={{ closeButton }}>` per audit §6/§9 — may need Tier 3.b treatment (keep narrowed) instead of standard Tier 0 drop. |
| **Tier 1 vestigial** | Container, Typography, Notification | Drop via `Omit<StandardProps, 'classes'>` + runtime backstop. Audit-verified vestigial (0 internal, 0 external). Bundle into Tier 1 cleanup PR. |
| **Tier 1 — FormControlLabel** | FormControlLabel | KEEP locally narrowed `classes?: { root?, label? }`. Used internally by Switch/Radio/Checkbox. |
| **Tier 1 no `classes` API** | FormLabel, Grid, Form, Note, Menu, FormLayout, ModalContext, Utils | No-op. |
| **Tier 2** | Checkbox, Radio, Tooltip, FileInput, Popper | `Omit` drop public. Internal MUI plumbing rewrites with the `@base-ui/react` migration. Audit-verified 0 external real usage. |
| **Tier 3.a** | Accordion, Page | `Omit` drop public. Rewrite internal slot-routing on `@base-ui/react` parts. |
| **Tier 3.b** | Dropdown, OutlinedInput | **KEEP locally narrowed `classes?: { ... }`** (Dropdown: `{ popper, content }`; OutlinedInput: `{ input, root }`). Real external consumers depend on these slots — Dropdown 2 callsites, OutlinedInput 4 callsites. |

**End-state target**: once all 28 components migrate, `StandardProps`, `JssProps`, `Classes` removed from `@toptal/picasso-shared`. Dropdown + OutlinedInput permanently retain their locally narrowed `classes?: { ... }`.

(source: `CLAUDE.md §"classes prop handling per tier"`, `decisions/classes-audit.md`)

### A.6 — Survey compliance matrix

From `_survey-findings.md §H` (current per-rule compliance across 28 components):

| Rule | Current compliance | Migration action |
|---|---|---|
| R1 Optimize defaults for common case | 28/28 ✓ | Maintain — apply to new props. |
| R2 Reuse prop names across components | 28/28 ✓ | Maintain. |
| R3 Keep prop names short and simple | 28/28 ✓ | Maintain. |
| R4 Mirror native HTML prop names | 28/28 ✓ | Maintain. |
| R5 Style overrides only via `className`/`style` | 26/28 (Modal, Typography legacy) | Preserve legacy. Apply to NEW slots. |
| R6 Prefer `children` over content props | 28/28 ✓ | Maintain. |
| R7 Use `rem` for sizes | 100% (Tailwind tokens enforce) | Maintain — token system handles it. |
| R8 Align tokens with BASE design system | 100% (via `picasso-tailwind`) | Maintain — `tokens/picasso-tailwind-tokens.md`. |
| R9 `variant` as string-literal union | 28/28 ✓ | Maintain. |
| R10 Extends `BaseProps` | 20/28 (3 use StandardProps, 5 mixed) | Preserve existing. Apply to NEW components only. |
| R11 `as` to change rendered element | Where applicable, ✓ | Maintain. |
| R12 Shared `SizeType` scale | 100% where size prop exists | Maintain. |
| R13 Shared `Palette` + `ColorSample` | 100% where color prop exists | Maintain. |
| R14 No `is`/`has`/`should` prefix | 28/28 ✓ | Maintain. NEW boolean props use bare adjectives. |
| R15 Compound components for multi-part | 4/28 (Modal, Accordion, Drawer, Button-family) | Optional — only for 3+ distinct sub-parts. |
| R16 `testIds` object | 6/28 (Modal, Accordion, Slider, Tooltip, FileInput, RTE) | Optional — only for multi-part addressable test selectors. |

For form components (F1–F3): verify on a per-component basis. Survey did not deep-audit form-field compliance.

(source: `design-patterns-addendum.md §"Quick reference"`)

### A.7 — How the agent applies design patterns during a migration

For migration PRs authored by the orchestrator's agent:

- **Apply canonical rules to NEW code paths** introduced as part of the swap (adapter helpers, wrappers around `@base-ui/react`, new internal types, new hooks).
- **Preserve existing public API** even when it violates a canonical rule. Out-of-scope cleanup goes to the post-migration refactor track.
- **Flag any deliberate API change** in the changeset with a deprecation alias to preserve back-compat.
- **At the `@base-ui/react` boundary**, narrow types per R4 (native HTML prop names), R9 (string-literal union variants), and R14 (no `is`/`has`/`should` prefix on NEW boolean props). Survey confirms 100% existing compliance with R14, so any new code should match.
- **For NEW form components or NEW form-field props**, follow F1–F3.
- **Do NOT widen scope**: a library-swap migration should not introduce sweeping API renames. If a deliberate rename is necessary, add a deprecation alias for one major version.

(source: `design-patterns-addendum.md §3`)

---

## Appendix B — Anti-pattern quick reference (review checklist)

One-line bullets reviewers can scan a diff against, grouped by section. Cross-references point back to the section above where each is fully explained.

### API surface (§1, §2)

- `isOpen` / `hasLabel` / `shouldX` boolean prop names (R14)
- `tag` / `component` / `element` prop name instead of `as` (R11)
- `bright` / `accent` / `pale` color name instead of palette token (R13)
- Raw hex/rgb in public types (R13)
- Custom size names (`tiny`, `big`, `huge`) instead of `SizeType<...>` (R12)
- `classes` / `styles` / `sx` / `css` / theme overrides in new public API (R5)
- Boolean prop combinations replacing a `variant` string-literal union (R9)
- Content props on simple components instead of `children` (R6)
- Static `defaultProps = { ... }` assignment instead of destructuring defaults (§3)
- Missing JSDoc on a public Props field (§3)
- JSDoc on internal passthrough props (`ownerState`, `data-private`) (§3)

### Types & casting (§4)

- Any `: any` in component source (`@typescript-eslint/no-explicit-any` is `error`)
- `as unknown as T` blanket casts on `...rest` spread
- Bare `// @ts-ignore` without `@ts-expect-error <reason>`
- Runtime `typeof` / `isValidAs` guards on `as` prop (TypeScript already constrains it)
- Exhaustive allowlist destructuring at the `@base-ui/react` boundary ("typed but no-op" anti-pattern)
- Cast at the JSX call site instead of hoisted into a helper return type
- `forwardRef` ref cast at JSX site (`forwardRef<HTMLElement, Props>` already types ref correctly)

### Styling (§5–§8)

- `!important` without rung-by-rung rationale in a comment (skipped the ladder)
- Imperative `ref` callbacks mutating `.style` (`node => { node.style.X = ... }`) — FORBIDDEN, no carve-outs
- `clsx` import (use `cx` from `classnames` + `twMerge` from `@toptal/picasso-tailwind-merge`)
- `cn = clsx + tailwind-merge` helper (use `twMerge(cx(...))` directly)
- `style={{ color: 'red' }}` for static values that have Tailwind equivalents
- New `classes` prop on a fresh component (R5; Tier 3.b carve-out is migration-only)
- `slotProps` / `components` / `componentsProps` (v0-era `@mui/base` API, not v1)
- Raw hex / px in source without `// TODO(tokens):` comment
- `makeStyles` / `createStyles` / `withStyles` / `&$selector` JSS in new code
- `.css` / `.scss` / `.module.css` files in component folder
- `tailwind-merge` direct import (use `@toptal/picasso-tailwind-merge`)
- `twMerge(className, structural)` ordering (consumer-last wins; reverse is broken)
- `cx` chain ≥6 entries — factor into `createXxxClassNames` in `styles.ts`
- `:has(...)` selector reproducing a JSS parent-ref (use `data-*` attributes)
- `group-[.base--checked]:` / `group-[.base--disabled]:` selectors in `@base-ui/react` v1 code (those belong to v0)
- Missing `nativeButton={false}` when `render` swaps a button-default part to a non-button element

### Build & packaging (§13)

- `--config.link-workspace-packages=false` (or any workspace-link override) in `pnpm install`
- Workspace dep with caret (`"^2.0.4"` for a `@toptal/picasso-*` dep)
- Npm dep without caret (`"1.4.1"` instead of `"^1.4.1"`)
- Lockfile diff >1000 lines OR `link:packages/X` lines replaced with expanded peer-suffix form
- `react: < 19.0.0` peer cap retained
- Snapshot regeneration without prior `pnpm -F <pkg> build:package` green
- Workspace dep dropped from `package.json` but `references` entry still in `tsconfig.json`
- Build-time dep declared only in `peerDependencies`, not `devDependencies`
- `pnpm-lock.yaml` not in the commit when `package.json` deps changed

### Tests (§12)

- Bare `render()` without an assertion ("renders without crashing")
- `fireEvent` (use `userEvent` or `getByRole`/`getByText` queries)
- `useLayoutEffect` from React (use `useIsomorphicLayoutEffect` from `@toptal/picasso-shared`)
- `useState` mirroring `data-open` (style with `data-[open]:` instead)
- Missing breakpoint coverage on a responsive component (`screenshotBreakpoints: true` or `HAPPO_TARGETS`)
- DOM-API mocks (use `jest.spyOn` / `jest.fn` for callbacks)
- 3+ levels of nested `describe`

### Visual verification (§16)

- Self-classified INTENTIONAL Happo diff without `docs/migration/components/<X>.md §"Approved visual deltas"` entry
- Verification done on `toptal.github.io/picasso/prs/<n>/` (deployed PR preview) instead of `localhost:9001` + `picasso.toptal.net`
- Positional-shift fix proposed without `computed-styles-baseline.json` capture
- "I added `-translate-x-1/2`" without checking whether the `@base-ui/react` source already applies `translate: -50% -50%` (doubly-shifted regression)
- Snapshot-only diagnosis of positioning ("snapshot doesn't show translate, so library doesn't center") — jsdom doesn't serialize CSS Transforms 2

### Changeset (§14)

- `major` bump without a named breaking surface
- "Auto-major because it's a library swap" framing (library swap alone is `patch`)
- Missing behavioral-parity language in the changeset body
- `@deprecated` JSDoc tag without Jira `[ABC-1234]` reference or URL
- `@deprecated` prop without a planned removal version in the changeset

### PR hygiene (§17)

- Untracked scratch files at repo root (`*-thumbs.json`, `baseline-*.json`, debug `.mjs`)
- Planned edit not actually present in the diff
- Missing PR description sections (Summary / Decisions / Limitations / Verification)
- PR title doesn't follow commit conventions (lowercase start, trailing period, past tense, >79 chars)

---

## Appendix C — Canonical references

This doc is a synthesis. For deeper dives, the authoritative sources are:

### Picasso API & code standards
- [`PICASSO_COMPONENT_DESIGN_PATTERNS.md`](../../PICASSO_COMPONENT_DESIGN_PATTERNS.md) (repo root) — 16 + 3 canonical rules
- [`docs/migration/references/code-standards.md`](../migration/references/code-standards.md) — file structure, types, JSDoc, Tailwind composition, ESLint, tests, changesets, CI
- [`docs/migration/references/practices.md`](../migration/references/practices.md) — graduated migration patterns
- [`docs/migration/references/design-patterns-addendum.md`](../migration/references/design-patterns-addendum.md) — migration carve-outs + architectural exceptions

### Base UI styling
- [`docs/migration/references/base-ui-styling.md`](../migration/references/base-ui-styling.md) — full Base UI v1 styling doctrine
- [`docs/modernization/base-ui-styling-strategy.md`](base-ui-styling-strategy.md) — framework-agnostic kit-author strategy (sibling)
- [`docs/migration/rules/styling.md`](../migration/rules/styling.md) — non-negotiable Tailwind/Base UI rules
- [`docs/migration/rules/base-ui-react-api-crib.md`](../migration/rules/base-ui-react-api-crib.md) — `@base-ui/react` component patterns

### Migration-specific
- [`docs/migration/rules/package-and-build.md`](../migration/rules/package-and-build.md) — pnpm / lockfile / build policy
- [`docs/migration/rules/jss-to-tailwind-crib.md`](../migration/rules/jss-to-tailwind-crib.md) — JSS → Tailwind pattern table + worked examples
- [`docs/migration/rules/api-preservation.md`](../migration/rules/api-preservation.md) — prop surface rules
- [`docs/migration/references/visual-verification.md`](../migration/references/visual-verification.md) — Playwright + Happo workflow
- [`docs/migration/references/happo-iteration.md`](../migration/references/happo-iteration.md) — Happo classification matrix
- [`docs/migration/decisions/classes-audit.md`](../migration/decisions/classes-audit.md) — cross-tier `classes`-prop audit
- [`docs/migration/references/_survey-findings.md`](../migration/references/_survey-findings.md) — 28-component evidence base

### Contribution baseline (predate the migration, but still authoritative on shared concepts)
- [`docs/contribution/component-api.md`](../contribution/component-api.md) — compound vs facade patterns, prop-naming Q&A
- [`docs/contribution/unit-testing.md`](../contribution/unit-testing.md) — test wiring + debugging
- [`docs/contribution/changeset-guidelines.md`](../contribution/changeset-guidelines.md) — full version-bump rules
- [`docs/contribution/github-workflow.md`](../contribution/github-workflow.md) — PR CI job list + commit conventions
- [`docs/contribution/pr_jobs.md`](../contribution/pr_jobs.md) — `@toptal-bot` manual CI re-run commands
- [`docs/contribution/visual-testing.md`](../contribution/visual-testing.md) — Happo + responsive component testing
- [`docs/contribution/accessibility.md`](../contribution/accessibility.md) — Storybook a11y addon workflow
- [`docs/contribution/packages-architecture.md`](../contribution/packages-architecture.md) — 4-layer tsconfig + Storybook webpack alias hierarchy
- [`docs/contribution/new-component-creation.md`](../contribution/new-component-creation.md) — `pnpm generate:component` scaffolding tool

### Operator-facing (NOT review-relevant — listed for completeness)
- [`docs/migration/ORCHESTRATOR.md`](../migration/ORCHESTRATOR.md) — orchestrator runbook (CLI flags, kill switch, output paths)
- [`docs/migration/PROMPT-light.md`](../migration/PROMPT-light.md), [`PROMPT-heavy.md`](../migration/PROMPT-heavy.md) — agent migration prompts
- [`docs/migration/PROMPT-review-response.md`](../migration/PROMPT-review-response.md) — agent review-response protocol
- [`CLAUDE.md`](../../CLAUDE.md) — operator working notes

### Legacy (DO NOT use as canonical)
- `docs/contribution/css-naming.md` — describes MUI v4 + JSS conventions (`root` + `rootFull`/`rootShrink` for variants, `classes` prop pattern). These predate the Tailwind migration. For migrated components, use §6 / §7 / §8 of this doc instead.
