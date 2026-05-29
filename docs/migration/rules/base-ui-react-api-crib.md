# `@base-ui/react` API crib

**Version pinned:** `@base-ui/react` v1.4.1 (Apr 20, 2026 — stable since Dec 2025).
**Authoritative source:** [base-ui.com/llms.txt](https://base-ui.com/llms.txt) and per-component pages under [base-ui.com/react/components](https://base-ui.com/react/components).
**Refresh cadence:** verify this doc against `base-ui.com/llms.txt` at the start of each `@base-ui/react` minor release (v1.5, v1.6, …). Currently pinned: **v1.4.1**.
**Source mapping:** per-Picasso-component target table sourced verbatim from [migration plan v3 §3.1 / §3.3 / §3.4 / §9.9](../../modernization/PI-4318-P1-MOD-01-migration-plan.md).

> **Why this doc exists.** `@base-ui/react`'s API differs from `@mui/base` (its predecessor) and from `@material-ui/core`. Components are now compound primitives (`Tooltip.Root` + `Tooltip.Trigger` + `Tooltip.Portal` + `Tooltip.Positioner` + `Tooltip.Popup`) rather than monolithic ones. The agent must use the patterns pinned here, not its training data.

---

## Per-Picasso-component target table

| Picasso component | `@base-ui/react` target | Confidence | Strategy |
|---|---|---|---|
| Backdrop | None — keep custom | High | No standalone Backdrop in `@base-ui/react`; only `Dialog.Backdrop`. Replace with `<div>` + scroll-lock + Tailwind per [`decisions/backdrop-replacement.md`](../decisions/backdrop-replacement.md). |
| Badge | None — keep custom | High | No Badge in `@base-ui/react`. Plain `<span>` + Tailwind. Already mostly custom. |
| Button | `@base-ui/react/button` (`Button`) | High | Direct match. PR #4906 reference. |
| Drawer | `@base-ui/react/drawer` (`Drawer.Root` + parts) | High | Direct match. Includes swipe-to-dismiss gestures. |
| Modal | `@base-ui/react/dialog` (`Dialog.Root` + parts) | High | Picasso's "Modal" maps to the dialog primitive. |
| Slider | `@base-ui/react/slider` (`Slider.Root` + parts) | High | Direct match. |
| Switch | `@base-ui/react/switch` (`Switch.Root` + `Switch.Thumb`) | High | Direct match. PR #4906 reference. |
| Tabs | `@base-ui/react/tabs` (`Tabs.Root` + `Tabs.List` + `Tabs.Tab` + `Tabs.Panel`) | High | Direct match. |
| Menu (already migrated in source) | (no source change) | High | Source already uses `@toptal/picasso-popper` + `@toptal/picasso-paper`. Only `package.json` cleanup. |
| Form / FormLayout / ModalContext / Note / Typography | None — already-clean | High | Tier 1: peer-dep cleanup + React 19 cap lift only. No primitive change. |
| Container | None — keep custom | High | No `@base-ui/react` Container. Pure layout wrapper. Tier 1 type-only fix: replace `import type { PropTypes } from '@material-ui/core'`. |
| FormLabel | None — own type | High | No `@base-ui/react` FormControlLabel. Tier 1 type-only fix: replace `import type { FormControlLabelProps }` with own type. |
| Grid | None — keep custom | High | No `@base-ui/react` Grid. Pure CSS Grid + Tailwind. Tier 1 type-only fix: replace `export type { GridSize }`. |
| Notification | None — keep `notistack` | High | `@base-ui/react/toast` exists but Picasso uses `notistack`. Tier 1 type-only fix: replace `import type { SnackbarOrigin }`. |
| Utils | None — own implementation | High | Replace `capitalize` re-export (1-line); replace `ClickAwayListener` re-export (small custom hook OR consumers swap to `@base-ui/react`'s built-in dismiss in Dialog/Popover/Menu); convert `Rotate180` JSS → Tailwind transition. |
| Checkbox + CheckboxGroup | `@base-ui/react/checkbox` + `@base-ui/react/checkbox-group` | High | Direct match for both. |
| Radio + RadioGroup | `@base-ui/react/radio` (Root) + own group wrapper using `@base-ui/react/field` + own context | High | `@base-ui/react/radio` exists; group composition needs custom wrapper. |
| Tooltip | `@base-ui/react/tooltip` (`Tooltip.Provider` + `Tooltip.Root` + `Tooltip.Trigger` + `Tooltip.Portal` + `Tooltip.Positioner` + `Tooltip.Popup`) | High | Direct match. Compound parts pattern. |
| FileInput | None — keep custom | High | No file-input primitive in `@base-ui/react`. Build on plain `<input type="file">` + Tailwind. 3 subcomponents (FileListItem, ProgressBar, FileList) all custom. |
| Popper | `decision-pending` | — | No standalone Popper in `@base-ui/react`. See [`decisions/popper-replacement.md`](../decisions/popper-replacement.md). Recommended: `@floating-ui/react` direct dep. |
| Accordion | `@base-ui/react/accordion` (`Accordion.Root` + `Accordion.Item` + `Accordion.Header` + `Accordion.Trigger` + `Accordion.Panel`) | High | Direct match. JSS `&$expanded` parent-refs unwind to `data-[state=open]:` Tailwind selectors. |
| Dropdown (mixed-state) | `@base-ui/react/menu` + `@base-ui/react/popover` | Medium | Single PR covers `@mui/base` portion + `@material-ui/core/Grow` transition replacement. Replace `Grow` with CSS `data-starting-style` / `data-ending-style`. |
| Page | None — keep custom | High | No `@base-ui/react` Page analog. Picasso-specific shell (hamburger, responsive). |
| OutlinedInput (mixed-state) | `@base-ui/react/input` + `@base-ui/react/field` | High | `@mui/base` Input swap + `import type { InputBaseComponentProps }` → React.InputHTMLAttributes. |

---

## "No standalone analog" — components that stay custom

These Picasso components have **no direct `@base-ui/react` equivalent**. Migration scope is JSS / MUI-removal only — they stay on plain React + Tailwind. Sourced from migration plan §9.9.

| Picasso component | Why no analog | Strategy |
|---|---|---|
| **Backdrop** | `@base-ui/react` only ships `Dialog.Backdrop` (internal to Dialog/AlertDialog/Drawer), not a standalone primitive. | Custom `<div>` with scroll-lock + Tailwind per [`decisions/backdrop-replacement.md`](../decisions/backdrop-replacement.md). |
| **Badge** | No Badge in `@base-ui/react`. | Plain `<span>` + Tailwind (already mostly custom). |
| **Container** | No Container in `@base-ui/react`. | Pure layout wrapper. |
| **FileInput** | No file-input primitive in `@base-ui/react`. | Plain `<input type="file">` + Tailwind. Custom subcomponents. |
| **Grid** | No Grid in `@base-ui/react`. | Pure CSS Grid + Tailwind utilities. |
| **Notification** | `@base-ui/react/toast` exists but Picasso uses `notistack` (decision: keep `notistack` for v3 — minimal blast radius). | `notistack` integration unchanged; type-only fix on `SnackbarOrigin`. |
| **Page** | No Page in `@base-ui/react` (Picasso-specific shell). | Pure Tailwind rewrite. Custom. |
| **Popper** | `@base-ui/react` has no standalone Popper — positioning is internal to Tooltip/Popover/Menu/Dialog. | **Decision pending** per [`decisions/popper-replacement.md`](../decisions/popper-replacement.md). Recommended: `@floating-ui/react` direct dep (already a transitive dep) for the rare standalone-positioning use site. |

---

## Compound parts pattern (the big API shift)

`@base-ui/react` components are compound primitives. Where MUI v4 / `@mui/base` shipped a single `<Tooltip>` component with props, `@base-ui/react` ships a tree of named parts.

### Example: Tooltip

```tsx
// MUI v4
import Tooltip from '@material-ui/core/Tooltip'
<Tooltip title="info">
  <button>Trigger</button>
</Tooltip>

// @mui/base (predecessor — still appears in Picasso source pre-migration)
import { Tooltip } from '@mui/base/Tooltip'
<Tooltip>
  <Tooltip.Trigger>Trigger</Tooltip.Trigger>
  <Tooltip.Popper>
    <Tooltip.Content>info</Tooltip.Content>
  </Tooltip.Popper>
</Tooltip>

// @base-ui/react (target)
import { Tooltip } from '@base-ui/react/tooltip'
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger render={<button>Trigger</button>} />
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={8}>
        <Tooltip.Popup>info</Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

Same pattern for Dialog, Drawer, Slider, Tabs, Switch, Accordion, Menu, Popover. The compound-parts shape is consistent.

### Example: Switch (simplest)

```tsx
import { Switch } from '@base-ui/react/switch'
<Switch.Root checked={value} onCheckedChange={setValue}>
  <Switch.Thumb />
</Switch.Root>
```

### Example: Accordion

```tsx
import { Accordion } from '@base-ui/react/accordion'
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger>Section title</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Section body</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

JSS `&$expanded` parent-refs translate to **`data-[state=open]:` Tailwind variants**:

```tsx
// Before (JSS)
'&$expanded .panel': { paddingTop: 16 }

// After (Tailwind)
<Accordion.Panel className="data-[state=open]:pt-4" />
```

---

## `render` prop (slot-style composition)

Most `@base-ui/react` parts accept a `render` prop that lets you pass your own element / component. This replaces the `as` / `component` / class-key prop patterns in MUI v4 AND the `slots`/`slotProps`/`rootElementName` patterns in `@mui/base`.

```tsx
// MUI v4
<Button component={Link} to="/foo">Go</Button>

// @mui/base (predecessor — what Picasso has today)
<Button slots={{ root: Link }} slotProps={{ root: { to: "/foo" } }} rootElementName="a">Go</Button>

// @base-ui/react
import { Button } from '@base-ui/react/button'
<Button render={<Link to="/foo">Go</Link>} />
```

Or as a function for prop merging:

```tsx
<Button render={(props) => <Link {...props} to="/foo">Go</Link>} />
```

### Polymorphic Button: `nativeButton` + `render`

`@base-ui/react/button` is **stricter** than `@mui/base/Button` about what it renders. It has a `nativeButton: boolean` prop (default: `true`) that asserts whether the rendered root is a native `<button>` element. If you render anything other than `<button>` (e.g., `<a>` for an Picasso Button with `href` or `as="a"`) and leave `nativeButton: true`, Base UI emits a runtime warning that breaks tests:

> `Base UI: A component that acts as a button expected a native <button> because the nativeButton prop is true.`

The correct pattern for a polymorphic component (Picasso Button, ButtonBase) that may render either `<button>` or `<a>` (or any other element):

```tsx
import { Button as BaseUIButton } from '@base-ui/react/button'

const isNativeButton = finalAs === 'button'

<BaseUIButton
  nativeButton={isNativeButton}
  render={isNativeButton ? undefined : React.createElement(finalAs)}
  // ...rest
>
```

When `finalAs === 'button'`: `nativeButton: true` (default), `render: undefined` — Base UI renders the native `<button>` itself.
When `finalAs !== 'button'` (e.g., `'a'`): `nativeButton: false`, `render: React.createElement('a')` — Base UI renders the alternative element via the `render` prop and skips the native-button warning.

This same pattern applies to other polymorphic Picasso components migrating off `@mui/base` (e.g., other `as`-prop primitives if they exist).

### Don't add runtime `typeof` guards for `as`

A pattern you may see in early migrations or copy from older lessons:

```ts
const isValidAs = (value: Props['as']) => {
  const valueType = typeof value
  return valueType === 'string' || valueType === 'function' ||
    (valueType === 'object' && value !== null)
}
const finalAs: ElementType = isValidAs(as) ? as : 'a'
```

**Don't write this.** TypeScript's `as?: ElementType` already constrains the input to acceptable values. The runtime guard is dead code; reviewers will ask you to remove it (see [PR #4906 review thread](https://github.com/toptal/picasso/pull/4906)). Use the simple form:

```ts
const finalAs: ElementType = as ?? 'a'
```

### Type alignment at the boundary (don't weaken the public API)

When `@base-ui/react` types narrow vs Picasso's wider public types (common for polymorphic components — Picasso's `MouseEvent<HTMLButtonElement & HTMLAnchorElement>` vs Base UI's `BaseUIEvent<MouseEvent<HTMLButtonElement>>`), **preserve the public type unchanged** and cast at *one* boundary point — hoisted into a helper return type or a local typed binding. Don't sprinkle inline casts at the JSX call site.

**Preferred — hoist the cast into a helper's return type:**

```ts
// In the public Props interface — unchanged from MUI v4 era:
onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void

// One cast, in the helper, at the boundary into Base UI types:
const getClickHandler = (
  loading?: boolean,
  handler?: Props['onClick']
): BaseUIButton.Props['onClick'] =>
  (loading ? noop : handler) as BaseUIButton.Props['onClick']

// In JSX — no cast, reads as ordinary TypeScript:
<BaseUIButton onClick={getClickHandler(loading, onClick)} />
```

**Acceptable when there's no helper — local typed binding before render:**

```ts
const handler: BaseUIButton.Props['onClick'] = onClick as BaseUIButton.Props['onClick']
return <BaseUIButton onClick={handler} ... />
```

**Avoid — call-site casts proliferate and re-open the trust question every render:**

```tsx
<BaseUIButton
  {...(rest as BaseUIButton.Props)}
  ref={ref as React.Ref<HTMLElement>}
  onClick={getClickHandler(loading, onClick) as BaseUIButton.Props['onClick']}
  // ...
/>
```

Specifically:
- `forwardRef<HTMLButtonElement, Props>(...)` already types `ref` correctly. Casting `ref as React.Ref<HTMLElement>` at the JSX site is dead.
- `{...(rest as BaseUIButton.Props)}` is `// @ts-ignore` in disguise. If `rest` doesn't conform to `BaseUIButton.Props`, that's a real type mismatch — drop the offending Picasso-only prop *before* spreading, don't paper over.
- The `as ComponentName.Props['<key>']` indexed-type-access pattern is still canonical — just hoist it. **Do NOT** change the public type to `any` to "fix" the type mismatch — that violates `rules/api-preservation.md` (no broadening of public types).

### Boundary cast for form-component `onChange` adapters

`@base-ui/react` v1 form-control callbacks (`onCheckedChange`, `onValueChange`, etc.) hand the consumer a native DOM `Event` via `eventDetails.event`. Picasso's public `onChange` types pre-date the migration and expect `React.ChangeEvent<T>` — a `React.SyntheticEvent` variant. React doesn't expose a public API to construct a SyntheticEvent, so the cast at the boundary is unavoidable. Two helpers in `@toptal/picasso-shared` concentrate the cast:

- **`toReactChangeEvent<T>(event)`** — specialized for form-input `onChange` adapters (Switch, Checkbox, Radio, FileInput). Generic constrained to `HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement`; dev-warns on unexpected target shapes. **Prefer this** for the common form-input case.
- **`toReactEvent<R>(event)`** — generic primitive for non-change-event boundary cases (Slider value events, MouseEvent adapters, FocusEvent adapters, etc.). Caller supplies the target React.SyntheticEvent type via the `R` generic.

Both are Proxy-based: native event identity preserved, four React-SyntheticEvent shim methods synthesized (`nativeEvent`, `persist`, `isDefaultPrevented`, `isPropagationStopped`). Runtime: O(1) Proxy allocation; zero property copying.

```tsx
import { toReactChangeEvent } from '@toptal/picasso-shared'

const Switch = (props: Props) => {
  const { onChange, ...rest } = props
  return (
    <BaseUISwitch.Root
      {...rest}
      onCheckedChange={(checked, { event }) =>
        onChange?.(toReactChangeEvent(event), checked)
      }
    />
  )
}
```

**Anti-pattern**: hand-fabricating a `React.ChangeEvent` by copying 13+ native event properties into a literal object (the prior `toSyntheticChangeEvent` pattern surfaced in PR #4965 r3302165743). The fabrication loses event identity, ships semantically-wrong copied props (`currentTarget`, `eventPhase`, `persist`-as-noop misleading), and re-implements the same shim in every form-component migration. Use the shared helpers instead.

---

## Data-attribute selectors (state styling)

`@base-ui/react` parts emit `data-state`, `data-disabled`, `data-active`, etc. Style with Tailwind data-attribute variants instead of JSS pseudo-class chains.

| State signal | Tailwind variant |
|---|---|
| `data-state="open"` (Accordion, Dialog, Drawer, Popover, Tooltip) | `data-[state=open]:...` |
| `data-state="closed"` | `data-[state=closed]:...` |
| `data-disabled` | `data-disabled:...` |
| `data-active` (Tabs, Menu) | `data-active:...` |
| `data-selected` (Radio, Tabs) | `data-selected:...` |
| `data-focus-visible` | `data-focus-visible:...` |

For animations on enter/exit:

| Phase | Attribute |
|---|---|
| Entering (CSS keyframe origin) | `data-starting-style` |
| Leaving (CSS keyframe origin) | `data-ending-style` |

These replace MUI v4's `Grow` / `Fade` / `Slide` transition components — used in Dropdown's mixed-state migration.

### Jest snapshot impact

When migrating from `@mui/base` (Tier 0), the rendered DOM changes shape in two predictable ways. Both surface in Jest snapshot tests:

1. **`@base-ui/react` parts emit `data-disabled=""`** (empty-string attribute) on the disabled root element. The MUI v4 era didn't have this attribute.
2. **The stale `base-` class literal disappears.** This was a side-effect of `@mui/base`'s `slots`/`slotProps` system — it injected a `base-Component-` class prefix that the post-migration root no longer produces. Both `<Button class="... base-Button base- ...">` and `<Button class="... base-Button-root base- ...">` collapse to `<Button class="... base-Button ...">`.

Run `yarn davinci-qa unit -u --testPathPattern packages/base/<NAME>` (or `jest -u <path>`) to regenerate snapshots — don't try to preserve the old DOM shape by injecting fake attributes or adding back the stale `base-` literal. The new shape is correct; the old shape was the artifact.

---

## Hook utilities

`@base-ui/react` ships hook-based utilities for situations where you need positioning / dismiss without a UI component:

| Hook | Use case |
|---|---|
| `useFloating` | Custom positioning (sparingly — most cases the part-based components handle this) |
| `useId` | SSR-safe ID generation (replaces `@material-ui/core/utils` `useUniqueId`) |

For most positioning needs, **prefer Popover / Menu / Tooltip / Dialog parts** over hook composition.

---

## Provider components (Picasso provider rewrite scope)

Optional Provider components for the Picasso provider rewrite (Tier 5, PF-2023):

| Provider | Use case | Required for canary? |
|---|---|---|
| `@base-ui/react/direction-provider` | RTL support | No — only if Picasso adopts RTL. |
| `@base-ui/react/csp-provider` | Content Security Policy nonce propagation | No — only if Picasso consumers need CSP-strict environments. |

Both are optional. The PF-2023 canary commit doesn't require either.

---

## Anti-patterns (what NOT to do)

- ❌ **Don't import `@mui/base` as a target.** It's the predecessor; if you find an `@mui/base` import in source, you're migrating *from* it, not *to* it.
- ❌ **Don't pass MUI-style `classes` props.** `@base-ui/react` components accept `className` (single string) on each named part, not a `classes` map.
- ❌ **Don't use `style={{ ... }}` for state-conditional styling.** Use `data-[state=...]:` Tailwind variants.
- ❌ **Don't reach for `@floating-ui/react` for positioning when a `@base-ui/react` part handles it.** Floating-UI is the escape hatch for the Popper standalone case (R15), not the default.
- ❌ **Don't search npm for `@base-ui-components/react`.** That was the previous publish name; it's now `@base-ui/react`.

---

## Refresh checklist

When `@base-ui/react` ships a minor release (v1.5, v1.6, …):

1. Read the changelog: [github.com/mui/base-ui/releases](https://github.com/mui/base-ui/releases).
2. Re-fetch [base-ui.com/llms.txt](https://base-ui.com/llms.txt). Diff against the prior pinned version.
3. Update the version pin at the top of this doc.
4. If a Picasso-targeted primitive's API changed (e.g., a part renamed), update the table above and bump the relevant PROMPT-{light,heavy}.md changelog with a note about the API shift.
5. If a primitive that was previously "no analog" became available (e.g., a Backdrop or Popper standalone shipping in v1.5), update the affected per-component plan and the `target_path` in `manifest.json`.
6. If any current target was deprecated, surface in the next iteration's PROMPT-light's "Open questions" so the agent prefers the replacement.
