# `@base-ui/react` API patterns

Steady-state reference for the `@base-ui/react` component API patterns Picasso builds on. For styling doctrine (the five mechanisms, `twMerge(cx())`, `data-*` variants, the override ladder) see `./base-ui-styling.md`; for tokens see `./tailwind-tokens.md`; for props/API rules see `../../PICASSO_COMPONENT_DESIGN_PATTERNS.md`.

**Package:** Picasso uses `@base-ui/react` v1.x. Its API differs from predecessors (`@mui/base`, `@material-ui/core`): components are compound primitives (`Tooltip.Root` + `Tooltip.Trigger` + `Tooltip.Portal` + `Tooltip.Positioner` + `Tooltip.Popup`) rather than monolithic ones.

**Authoritative source:** [base-ui.com/llms.txt](https://base-ui.com/llms.txt) and per-component pages under [base-ui.com/react/components](https://base-ui.com/react/components).

---

## Compound parts pattern (the big API shift)

`@base-ui/react` components are compound primitives — a tree of named parts rather than a single component with props.

### Example: Tooltip

```tsx
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

The same compound-parts shape applies to Dialog, Drawer, Slider, Tabs, Switch, Accordion, Menu, and Popover.

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

Style parts by open state with `data-[state=open]:` variants — read state from the DOM rather than a parent-ref selector:

```tsx
<Accordion.Panel className="data-[state=open]:pt-4" />
```

---

## `render` prop (composition)

Most `@base-ui/react` parts accept a `render` prop that lets you pass your own element / component to a part:

```tsx
import { Button } from '@base-ui/react/button'
<Button render={<Link to="/foo">Go</Link>} />
```

Or as a function for prop merging:

```tsx
<Button render={(props) => <Link {...props} to="/foo">Go</Link>} />
```

### Polymorphic Button: `nativeButton` + `render`

`@base-ui/react/button` is strict about what it renders. It has a `nativeButton: boolean` prop (default: `true`) that asserts whether the rendered root is a native `<button>` element. If you render anything other than `<button>` (e.g., `<a>` for a Button with `href` or `as="a"`) and leave `nativeButton: true`, Base UI emits a runtime warning that breaks tests:

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

This same pattern applies to other polymorphic Picasso components (any `as`-prop primitives).

### Don't add runtime `typeof` guards for `as`

A tempting but unnecessary pattern:

```ts
const isValidAs = (value: Props['as']) => {
  const valueType = typeof value
  return valueType === 'string' || valueType === 'function' ||
    (valueType === 'object' && value !== null)
}
const finalAs: ElementType = isValidAs(as) ? as : 'a'
```

**Don't write this.** TypeScript's `as?: ElementType` already constrains the input to acceptable values. The runtime guard is dead code; reviewers will ask you to remove it. Use the simple form:

```ts
const finalAs: ElementType = as ?? 'a'
```

### Type alignment at the boundary (don't weaken the public API)

When `@base-ui/react` types narrow vs Picasso's wider public types (common for polymorphic components — Picasso's `MouseEvent<HTMLButtonElement & HTMLAnchorElement>` vs Base UI's `BaseUIEvent<MouseEvent<HTMLButtonElement>>`), **preserve the public type unchanged** and cast at *one* boundary point — hoisted into a helper return type or a local typed binding. Don't sprinkle inline casts at the JSX call site.

**Preferred — hoist the cast into a helper's return type:**

```ts
// In the public Props interface — unchanged:
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
- The `as ComponentName.Props['<key>']` indexed-type-access pattern is still canonical — just hoist it. **Do NOT** change the public type to `any` to "fix" the type mismatch — that broadens the public type; don't.

### Boundary cast for form-component `onChange` adapters

`@base-ui/react` v1 form-control callbacks (`onCheckedChange`, `onValueChange`, etc.) hand the consumer a native DOM `Event` via `eventDetails.event`. Picasso's public `onChange` types expect `React.ChangeEvent<T>` — a `React.SyntheticEvent` variant. React doesn't expose a public API to construct a SyntheticEvent, so the cast at the boundary is unavoidable. Two helpers in `@toptal/picasso-shared` concentrate the cast:

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

**Anti-pattern**: hand-fabricating a `React.ChangeEvent` by copying 13+ native event properties into a literal object. The fabrication loses event identity, ships semantically-wrong copied props (`currentTarget`, `eventPhase`, `persist`-as-noop misleading), and re-implements the same shim in every form-component. Use the shared helpers instead.

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

These replace the old `Grow` / `Fade` / `Slide` transition-component approach — animate via CSS on the emitted attributes instead.

---

## Hook utilities

`@base-ui/react` ships hook-based utilities for situations where you need positioning / dismiss without a UI component:

| Hook | Use case |
|---|---|
| `useFloating` | Custom positioning (sparingly — most cases the part-based components handle this) |
| `useId` | SSR-safe ID generation |

For most positioning needs, **prefer Popover / Menu / Tooltip / Dialog parts** over hook composition.

---

## Provider components

`@base-ui/react` ships optional providers for cross-cutting concerns:

| Provider | Use case |
|---|---|
| `@base-ui/react/direction-provider` | RTL support |
| `@base-ui/react/csp-provider` | Content Security Policy nonce propagation |

Both are optional — add them only if the app needs RTL or CSP-strict environments.

---

## Anti-patterns (what NOT to do)

- ❌ **Don't import `@mui/base` or `@material-ui/core` in new component code.** Those predate `@base-ui/react`; build on `@base-ui/react`.
- ❌ **Don't pass slot-keyed `classes` maps.** `@base-ui/react` components accept `className` (single string) on each named part, not a `classes` map.
- ❌ **Don't use `style={{ ... }}` for state-conditional styling.** Use `data-[state=...]:` Tailwind variants.
- ❌ **Don't reach for `@floating-ui/react` for positioning when a `@base-ui/react` part handles it.** Floating-UI is the escape hatch for standalone-positioning cases, not the default.
- ❌ **Don't search npm for `@base-ui-components/react`.** That was the previous publish name; it's now `@base-ui/react`.

---

## Refresh checklist

When `@base-ui/react` ships a minor release (v1.5, v1.6, …):

1. Read the changelog: [github.com/mui/base-ui/releases](https://github.com/mui/base-ui/releases).
2. Re-fetch [base-ui.com/llms.txt](https://base-ui.com/llms.txt); diff against the prior version.
3. If a primitive Picasso builds on changed its API (a part renamed, a default flipped), update the affected component and this doc.
