# Base UI styling — reference

> Objective reference for how the **Base UI v1** library (`@base-ui/react`) is designed to be styled, and how to apply Tailwind CSS on top of it. Written from Base UI's own documentation — no Picasso-specific conventions baked into the main body. For Picasso-specific deltas, see the appendix.
>
> **Package**: `@base-ui/react` v1.x (stable since 2025-12-11; current ≥ v1.5.0 as of 2026-05).
> **Predecessor names**: `@base-ui-components/react` (v1.0.0-rc.x), `@mui/base` (v0 / MUI Base). The v0 API (`slotProps`, `components`, `componentsProps`) is NOT how v1 works — treat any tutorial older than late 2025 as stale.
> **Canonical docs**: <https://base-ui.com/react/handbook/styling>
>
> **See also**: `docs/modernization/base-ui-styling-strategy.md` is a longer-form kit-builder strategy doc covering the same ground from a kit-author POV. This file is the per-migration quick reference.

---

## 1. Mental model

Base UI ships **behavior, accessibility, and composition** — not styles. Every primitive renders with no className, no inline style, no opinion about appearance. That is the entire point: the library is *styling-agnostic* so you can layer your own design system on top without fighting CSS specificity, theme tokens, or override APIs.

The consequence: **the kit author owns every styling decision** — class composition, variant declaration, consumer override merging, state reflection (open / checked / disabled / hovered), dark mode, token resolution, and when to escape the headless contract.

Every primitive is split into named **parts** (`Menu.Root`, `Menu.Trigger`, `Menu.Portal`, `Menu.Positioner`, `Menu.Popup`, `Menu.Item`). Style each part *directly*. There is no top-level `slots`/`slotProps`/`classes` indirection.

---

## 2. The five mechanisms

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

---

## 3. Mechanism 1 — `className` strategies

### 3.1 Class composition — `twMerge(cx(...))`

Every Tailwind-on-headless codebase needs a class-merging pipeline that resolves conflicts. Picasso uses [`classnames`](https://github.com/JedWatson/classnames)' `cx` (conditional joining) with `twMerge` from [`@toptal/picasso-tailwind-merge`](../../../packages/picasso-tailwind-merge) (Tailwind-aware deduplication, extended with Picasso-specific font sizes):

```ts
import cx from 'classnames';
import { twMerge } from '@toptal/picasso-tailwind-merge';

twMerge(cx('px-4 text-sm', isLarge && 'px-6 text-base'), className)
```

**Why both?** `cx` only joins strings conditionally. If a wrapper applies `px-4` and the consumer passes `px-2`, `cx` alone produces `"px-4 px-2"` — both classes ship to the DOM and Tailwind's last-wins rule becomes order-of-CSS-rules dependent and brittle. `twMerge` deduplicates Tailwind-conflicting classes deterministically: **rightmost class wins regardless of source order**. This is the single most important guarantee for override ergonomics.

> External Base UI tutorials commonly show a `cn = clsx + tailwind-merge` helper. In this repo, `twMerge(cx(...))` from `@toptal/picasso-tailwind-merge` + `classnames` is the equivalent. Don't introduce `clsx` — Picasso already ships `classnames`. See `rules/styling.md` §"Twmerge boundary".

### 3.2 Default classes + consumer override

The basic wrapper pattern: the kit owns its default classes; consumers override via standard `className`.

```tsx
import { Checkbox } from '@base-ui/react/checkbox';
import cx from 'classnames';
import { twMerge } from '@toptal/picasso-tailwind-merge';

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
  );
}
```

**Rules of the road**:

1. **Consumer `className` is always last** — rightmost in `twMerge(...)` wins.
2. **Never spread `...props` after explicit `className`** — the consumer's `className` is in `props` and silently overrides your merged value. Pass `className` explicitly, then spread the rest.
3. **Group your defaults by concern** (layout / colors / state / focus). Future-you will thank present-you.

### 3.3 `className` as a function of state

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

Prefer the function form **only when data-attribute variants are awkward** — usually because the class itself depends on multiple state values combined. For single-state styling, `data-[checked]:` (§5) is shorter, declarative, and SSR-stable.

### 3.4 Typed variants — helper functions (primary) or `cva` (optional/future)

**Picasso primary form** — pure functions returning `string[]`, kept in a sibling `styles.ts`. TypeScript exhaustiveness on the discriminated union catches missed variants at compile time. This is the convention enforced by `rules/styling.md` §"Helper-fn shape":

```ts
// styles.ts
export function createSizeClassNames(size: 'small' | 'medium' | 'large'): string[] {
  switch (size) {
    case 'small':  return ['text-button-small',  'px-3', 'h-8'];
    case 'medium': return ['text-button-medium', 'px-4', 'h-10'];
    case 'large':  return ['text-button-large',  'px-6', 'h-12'];
  }
}

export function createVariantClassNames(variant: 'primary' | 'secondary' | 'ghost'): string[] {
  switch (variant) {
    case 'primary':   return ['bg-blue-500', 'text-white', 'hover:bg-blue-600'];
    case 'secondary': return ['bg-white', 'text-graphite-900', 'border', 'border-gray-300', 'hover:bg-gray-100'];
    case 'ghost':     return ['bg-transparent', 'hover:bg-gray-100'];
  }
}
```

Applied at the call site:

```tsx
import cx from 'classnames';
import { twMerge } from '@toptal/picasso-tailwind-merge';
import { createSizeClassNames, createVariantClassNames } from './styles';

className={twMerge(cx(
  'inline-flex items-center justify-center rounded-md',
  ...createSizeClassNames(size),
  ...createVariantClassNames(variant),
  className,
))}
```

**Alternative — `cva`** (NOT adopted in Picasso today; **do not introduce mid-migration**): [`class-variance-authority`](https://cva.style/docs) declares base + variant map + defaults in one place and produces a typed function with `VariantProps<typeof …>` inferred. It's the de-facto standard in Tailwind-on-headless kits and worth knowing for context, but adopting it across Picasso is a separate technical decision — out of scope for individual migrations.

### 3.5 What NOT to do

- **Inline `style` is for properties unreachable via `className` / `data-[…]:` variant / CSS variable** — typically transforms, computed positions, dimensions read from a ref, or assigning CSS variables (`style={{ '--x': dynamic }}`). It is **the legitimate Base UI escape hatch** when the alternative would be `!important` or a wrapper-element hack — Base UI's `mergeProps` even places inline `style` at the top of the override cascade by design. **The anti-pattern is inline `style` for colors / spacing / typography that DO have class equivalents** — those belong in `className`. See `code-standards.md` §"CSS specificity ladder for @base-ui/react overrides" and `practices.md` §"Inline-style overrides on @base-ui/react parts" for the full escalation.
- **Never reach for `!important`.** If a Tailwind utility isn't winning, you've skipped a rung on the override ladder (`className` → `data-[…]:` → inline `style` rung-0 → `render` wrapper). Find the right rung instead.
- **Don't string-concat classes without `twMerge`.** `` `px-4 ${className}` `` produces silent override failures the moment a consumer passes `px-2`. Always pipe through `twMerge(cx(...))`.
- **Don't introduce new `classes` props.** Existing narrowed `classes?: { … }` on Tier 3.b components (Dropdown, OutlinedInput) and Modal are documented migration-period exceptions — see `design-patterns-addendum.md` and `decisions/classes-audit.md`. End-state is full rule-5 compliance once consumers migrate off the narrowed shape.

---

## 4. Mechanism 2 — `render` prop and composition

`render` is Base UI's primary composition mechanism. Two things `className` cannot do: **change the DOM tag**, and **replace the rendered element with a custom component while preserving Base UI's behavior, accessibility, and ref forwarding**.

### 4.1 Replace the tag

```tsx
// Button rendered as an anchor for navigation
<Button render={<a href="/dashboard" />}>Dashboard</Button>

// Tab rendered as a Next.js Link
<Tabs.Tab nativeButton={false} render={<Link href="/overview" />} value="overview">
  Overview
</Tabs.Tab>
```

**Gotcha — `nativeButton={false}`**: For parts Base UI renders as `<button>` by default (Button, Menu.Trigger, Tabs.Tab, NumberField.Increment/Decrement, Toolbar.Button, …), pass `nativeButton={false}` when swapping for a non-button element. Otherwise Base UI emits keyboard-handling code that assumes a native button and the result is broken.

**Forward refs, spread props**: The replacement component must forward `ref` and spread received props onto its root DOM node. Custom components without `React.forwardRef` (React 18) or a `ref` prop (React 19) silently lose accessibility.

### 4.2 Compose with a custom component

You can hand Base UI an arbitrary component — typically one of your own wrappers — and it injects event handlers, `aria-*`, and `data-*` into that component:

```tsx
<Menu.Trigger render={<MyButton size="md" />}>Open menu</Menu.Trigger>
```

`MyButton` is a normal component. Base UI calls it with `<MyButton {...injectedProps} size="md">Open menu</MyButton>` and expects `MyButton` to spread `injectedProps` onto its root DOM element. This is how you reuse the kit's `Button` as the trigger for a `Menu`, `Dialog`, or `Popover` without duplicating styling.

### 4.3 The function form + `mergeProps`

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

When your props collide with Base UI's injected ones (notably event handlers and `className`), use [`mergeProps`](https://base-ui.com/react/utils/merge-props):

```tsx
import { mergeProps } from '@base-ui/react/merge-props';

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
- **`ref`**: only the right-most ref is kept — refs are NOT merged. To merge with an internal ref, use `useRender`'s `ref` option (§4.5).
- **Other props**: right-most wins (`Object.assign` behavior).
- Up to 5 sources; for more, use `mergePropsN(arr)`.

### 4.4 Nesting compositions

Multiple Base UI components can compose into a single trigger element by chaining `render` props. Canonical pattern for "a button that is also a tooltip trigger and a menu trigger":

```tsx
<Dialog.Root>
  <Tooltip.Root>
    <Tooltip.Trigger
      render={
        <Dialog.Trigger
          render={
            <Menu.Trigger render={<MyButton size="md" />}>
              Open
            </Menu.Trigger>
          }
        />
      }
    />
    <Tooltip.Portal>…</Tooltip.Portal>
  </Tooltip.Root>
  <Dialog.Portal>…</Dialog.Portal>
</Dialog.Root>
```

Each layer injects its event handlers and `aria-*`; `mergeProps` runs at every level. One DOM node participates correctly in three independent accessibility trees.

### 4.5 `useRender` — when you build the wrapper

When your kit component itself wants to expose a `render` prop (so its consumers get the same composition power), use [`useRender`](https://base-ui.com/react/utils/use-render):

```tsx
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

interface ButtonProps extends useRender.ComponentProps<'button'> {}

export function Button({ render, ...props }: ButtonProps) {
  const defaultProps: useRender.ElementProps<'button'> = {
    type: 'button',
    className: 'inline-flex h-10 items-center rounded-md bg-gray-50 px-3.5 hover:bg-gray-100',
  };

  return useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps<'button'>(defaultProps, props),
  });
}
```

Now `<Button render={<a href="/x" />}>Go</Button>` works exactly as against Base UI primitives — the kit's home-grown parts and Base UI's are indistinguishable to consumers.

**State-aware variant**: pass `state` to expose internal state to consumer render callbacks:

```tsx
const element = useRender({
  defaultTagName: 'button',
  render,
  state,                                  // e.g. { odd: boolean }
  props: mergeProps<'button'>(defaults, otherProps),
});

// Consumer:
<Counter render={(props, state) => (
  <button {...props}>
    {props.children} {state.odd ? '(odd)' : '(even)'}
  </button>
)} />
```

**React 18 vs 19 ref handling**:

- **React 19**: external `ref` is already in `props`. Pass your internal ref via `useRender({ ref: internalRef, … })` and Base UI merges them.
- **React 18**: wrap with `React.forwardRef`, accept the forwarded ref, and pass it via the `ref` option. The same `useRender` API works in both.

---

## 5. Mechanism 3 — `data-*` state attributes

Base UI exposes every meaningful piece of state as a `data-*` attribute on the DOM. Combined with Tailwind's variant syntax, this gives state-driven styling **without React state subscriptions, without re-renders, without props plumbing**.

### 5.1 The vocabulary

Each component publishes its own set. A non-exhaustive sample:

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
| `data-swipe-direction` | Toast | Direction of in-progress swipe |
| `data-expanded` / `data-behind` / `data-limited` | Toast | Stacking state |

Each component's reference page (`base-ui.com/react/components/<name>`) lists the complete table — always cross-reference before assuming.

### 5.2 Targeting from Tailwind

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

### 5.3 First-class variants in Tailwind v4

If you repeat `data-[checked]:` patterns, define custom variants once and use clean keywords:

```css
/* app.css */
@import "tailwindcss";

@custom-variant checked       (&[data-checked]);
@custom-variant unchecked     (&[data-unchecked]);
@custom-variant open          (&[data-open]);
@custom-variant closed        (&[data-closed]);
@custom-variant highlighted   (&[data-highlighted]);
@custom-variant popup-open    (&[data-popup-open]);
@custom-variant starting      (&[data-starting-style]);
@custom-variant ending        (&[data-ending-style]);
```

Then:

```tsx
<Menu.Popup className="opacity-0 open:opacity-100 closed:opacity-0 transition-opacity" />
<Menu.Item  className="px-3 py-2 highlighted:bg-neutral-900 highlighted:text-white" />
```

A one-time investment that pays back across the entire kit. For Tailwind v3, define the equivalent via plugin-API `addVariant`, or keep using `data-[…]:` bracketed syntax everywhere.

### 5.4 Animation: `data-starting-style` and `data-ending-style`

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

**Keyframe pattern** — target `data-open` / `data-closed`:

```css
@keyframes scaleIn  { from { opacity: 0; transform: scale(.9); } to { opacity: 1; transform: scale(1); } }
@keyframes scaleOut { from { opacity: 1; transform: scale(1);  } to { opacity: 0; transform: scale(.9); } }

.Popup[data-open]   { animation: scaleIn  250ms ease-out; }
.Popup[data-closed] { animation: scaleOut 250ms ease-in;  }
```

**framer-motion**: use `<Portal keepMounted>` plus the function-form `render` to plug in a `motion.div` directly. Base UI keeps the element mounted so motion's `exit` animations have a chance to run.

---

## 6. Mechanism 4 — CSS variables, tokens, dark mode

### 6.1 CSS variables Base UI exposes

| Variable | On part | Use |
| --- | --- | --- |
| `--transform-origin` | Popover/Menu/Select/Tooltip `Popup` | `transform-origin` so scale-in/out anchors to the trigger |
| `--available-width` / `--available-height` | Positioner / Popup | Maximum size without colliding with viewport edge |
| `--anchor-width` / `--anchor-height` | Same | Trigger size — useful for `min-width: var(--anchor-width)` |
| `--positioner-width` / `--positioner-height` | Positioner | Fixed positioner dimensions |
| `--active-tab-{left,right,top,bottom,width,height}` | Tabs.Indicator | Active-tab geometry for animated indicators |
| `--scroll-area-overflow-y-{start,end}` | ScrollArea.Viewport | Top/bottom overflow for fade masks |
| `--drawer-swipe-progress`, `--drawer-swipe-movement-{x,y}` | Drawer | Live swipe state |
| `--toast-index`, `--toast-offset-y`, `--toast-swipe-movement-{x,y}`, `--toast-height`, `--toast-frontmost-height` | Toast | Stacking and gesture animations |
| `--duration`, `--easing` | NavigationMenu | Coordinated transitions across menu items |

Consume from CSS or Tailwind arbitrary values:

```tsx
<Popover.Popup className="origin-[var(--transform-origin)] max-h-[var(--available-height)]" />
<Select.Item   className="min-w-[var(--anchor-width)]" />
```

### 6.2 Design tokens via `@theme`

The kit's tokens should live as CSS variables on `:root` and a dark scope, and be wired into Tailwind's theme:

```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-surface:       var(--surface);
  --color-surface-muted: var(--surface-muted);
  --color-fg:            var(--fg);
  --color-fg-muted:      var(--fg-muted);
  --color-accent:        var(--accent);
  --color-accent-fg:     var(--accent-fg);
  --color-border:        var(--border);
  --color-ring:          var(--ring);

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
}

:root {
  --surface:       oklch(100% 0 0);
  --surface-muted: oklch(96%  0 0);
  --fg:            oklch(20%  0 0);
  --fg-muted:      oklch(50%  0 0);
  --accent:        oklch(20%  0 0);
  --accent-fg:     oklch(100% 0 0);
  --border:        oklch(85%  0 0);
  --ring:          oklch(20%  0 0);
}

.dark {
  --surface:       oklch(15% 0 0);
  --surface-muted: oklch(22% 0 0);
  --fg:            oklch(98% 0 0);
  --fg-muted:      oklch(70% 0 0);
  --accent:        oklch(98% 0 0);
  --accent-fg:     oklch(15% 0 0);
  --border:        oklch(30% 0 0);
  --ring:          oklch(98% 0 0);
}
```

Now `bg-surface`, `text-fg`, `border-border`, `outline-ring`, `rounded-md` all resolve through tokens and the entire kit responds to a `.dark` class on `<html>`.

### 6.3 Dark mode: tokens vs variants

Two viable approaches; they compose.

1. **Token-scoped (preferred for color).** Define colors as CSS variables under `:root` and `.dark`. No `dark:` variant needed — `bg-surface` is correct in both modes.
2. **Tailwind `dark:` variant (for one-offs).** When a single property must differ in dark mode but doesn't warrant a token (e.g., a one-off border treatment), use `dark:`. Configure Tailwind v4:
   ```css
   @variant dark (.dark &);
   ```

Most production kits land on (1) for the 80% case and (2) for the long tail. Mixing both is fine; consistency *within a component* is what matters.

### 6.4 Component-local variables

Components often need local vars for animation math. Declare them inline on the element using Tailwind's arbitrary-property syntax:

```tsx
<Drawer.Popup
  className="
    [--bleed:3rem]
    [--stack-height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))-var(--bleed)))]
    h-[var(--drawer-height,auto)]
    data-[nested-drawer-open]:h-[calc(var(--stack-height)+var(--bleed))]
  "
/>
```

Co-locates the math with the consumer; avoids polluting `:root` with component internals.

---

## 7. When and how to override Base UI

Most "overriding Base UI" is overriding **styles** with §3–§6. Occasionally you need to change **behavior** — and there is a clear escalation ladder.

### 7.1 Escalation ladder

| Need | Mechanism |
| --- | --- |
| Different colors / spacing / typography / size | `className` (§3) |
| Style based on state (open, checked, side) | `data-*` attributes (§5) |
| Different DOM tag (anchor instead of button, custom wrapper) | `render` prop (§4) |
| Computed positions / dimensions from Base UI | CSS variables (§6.1) |
| Theme-level changes (color, radius, spacing scale) | Design tokens (§6.2) |
| Additional DOM inside a slot | Compose extra children **inside** the part |
| Different default state / controlled-state behavior | Wrap the Root in your own component |
| Different DOM structure than Base UI ships | Wrap with your own component **above** Base UI |
| A sibling part Base UI doesn't ship | Build with `useRender` (§4.5) |
| Fundamentally different behavior | Don't override — fork (almost never the answer) |

**Never reach for a stronger mechanism than the problem requires.** Each step up costs ergonomics, accessibility risk, or maintenance burden.

### 7.2 Adding DOM inside a slot

Want an icon in the Select trigger? Don't replace the trigger — render content inside it:

```tsx
<Select.Trigger className="…">
  <Select.Value />
  <Select.Icon className="ml-auto size-4 text-fg-muted" />
</Select.Trigger>
```

### 7.3 Wrapping with controlled-state defaults

When the kit wants opinionated behavior on top of an unopinionated primitive (a Dialog that always traps focus to a specific element, a Combobox with a built-in clear button), wrap the Root and inject:

```tsx
export function ConfirmDialog({ trigger, title, description, onConfirm }: ConfirmDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={trigger} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40 transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <Dialog.Popup className="…">
          <Dialog.Title       className="text-lg font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="text-fg-muted">{description}</Dialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close render={<Button intent="ghost">Cancel</Button>} />
            <Button onClick={() => { onConfirm(); setOpen(false); }}>Confirm</Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

This is the kit's *opinionated* layer on top of Base UI's *un*opinionated primitives. The Root is still Base UI's — nothing has been forked.

### 7.4 When to fork

Almost never. Base UI's behavior, focus management, and accessibility are non-trivial; the cost of forking is owning a parallel implementation forever. Signals that justify a fork:

- Core behavior conflicts with the kit's interaction model and no `render` / wrapper structure can reconcile.
- Accessibility model in the host product diverges fundamentally from WAI-ARIA defaults.
- Component is unmaintained for many minor versions (has not happened in Base UI to date).

In all other cases, prefer "wrap + override" over fork.

---

## 8. Worked example — Switch with all patterns

Complete component built with every pattern from §3–§7: default classes via helper functions, consumer override merge through `twMerge(cx(...))`, `data-[…]:` state styling, React-18-compatible `forwardRef`.

```ts
// styles.ts
const ROOT_BASE = [
  'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors',
  'bg-gray-300 data-[checked]:bg-blue-500',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
  'data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed',
];

export function createRootClassNames(size: 'small' | 'medium' | 'large'): string[] {
  switch (size) {
    case 'small':  return [...ROOT_BASE, 'h-4 w-7'];
    case 'medium': return [...ROOT_BASE, 'h-5 w-9'];
    case 'large':  return [...ROOT_BASE, 'h-6 w-11'];
  }
}

const THUMB_BASE = [
  'block rounded-full bg-white transition-transform',
  'data-[checked]:translate-x-full',
];

export function createThumbClassNames(size: 'small' | 'medium' | 'large'): string[] {
  switch (size) {
    case 'small':  return [...THUMB_BASE, 'size-3 translate-x-0.5'];
    case 'medium': return [...THUMB_BASE, 'size-4 translate-x-0.5'];
    case 'large':  return [...THUMB_BASE, 'size-5 translate-x-0.5'];
  }
}
```

```tsx
// Switch.tsx
import * as React from 'react';
import cx from 'classnames';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { twMerge } from '@toptal/picasso-tailwind-merge';
import { createRootClassNames, createThumbClassNames } from './styles';

export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root> & {
  size?: 'small' | 'medium' | 'large';
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch({ size = 'medium', className, ...props }, ref) {
    return (
      <BaseSwitch.Root
        ref={ref}
        className={twMerge(cx(...createRootClassNames(size)), className)}
        {...props}
      >
        <BaseSwitch.Thumb
          className={twMerge(cx(...createThumbClassNames(size)))}
        />
      </BaseSwitch.Root>
    );
  },
);
```

Consumer usage:

```tsx
<Switch size="large" defaultChecked />
<Switch className="data-[checked]:bg-emerald-600" />  {/* override wins via twMerge */}
<Switch render={<a href="#" role="switch" />} />      {/* tag swap via Base UI render */}
```

---

## 9. Decision quick reference

| You want to… | Use |
| --- | --- |
| Apply a class to a Base UI part | `className` |
| Let consumers override your defaults | `twMerge(cx(defaults), className)` with consumer `className` **last** (rightmost) |
| Style differently when open / checked / hovered / disabled | `data-[…]:` Tailwind variants |
| Style based on multiple state values combined | `className={(state) => …}` function form |
| Declare typed variants (size, intent) | Helper functions returning `string[]` per `rules/styling.md` §"Helper-fn shape" (Picasso primary form) |
| Render as a different HTML tag | `render={<a />}` (+ `nativeButton={false}` for button-default parts) |
| Render through a Next.js / React Router link | `render={<Link href="…" />}` |
| Replace the rendered element with your kit component | `render={<MyButton />}` |
| Inspect state inside `render` | `render={(props, state) => …}` |
| Add an event handler without losing Base UI's | `mergeProps(props, { onClick })` inside `render` function |
| Build a kit part that supports `render` like Base UI does | `useRender` hook |
| Read Base UI's computed positions / dimensions | `var(--transform-origin)`, `var(--available-height)` etc. |
| Theme colors globally | CSS variables on `:root` + `.dark`, wired via Tailwind `@theme` |
| Animate enter / exit | `data-[starting-style]:` / `data-[ending-style]:` |
| Animate with framer-motion | `<Portal keepMounted>` + `render={(p,s) => <motion.div … />}` |
| Add an icon inside a part | Compose extra DOM **inside** the part, not via `render` |
| Add custom default behavior (controlled state, defaults) | Wrap the Root in your own component |

---

## 10. Anti-patterns and traps

| Anti-pattern | Why it's bad | Do this instead |
| --- | --- | --- |
| `style={{ color: 'red' }}` for colors / spacing / typography | Inline styles beat every class, including consumer overrides; should be reserved for what can't be expressed as a class | `className="text-red-600"` |
| Reaching for `!important` in className | Means a rung on the override ladder was skipped | Walk the ladder: `className` → `data-[…]:` → inline `style` rung-0 (transforms / vars) → `render` wrapper |
| `className={'px-4 ' + className}` (no `twMerge`) | Consumer `px-2` doesn't override; Tailwind order is order-of-CSS, not order-of-string | `twMerge(cx('px-4'), className)` |
| Spreading `...props` after explicit `className` | Consumer `className` is silently dropped | Pass `className` explicitly first, then `...rest` |
| Introducing a new `classes` slot-key prop | MUI-v4 pattern; redundant with v1's per-slot components. Tier 3.b carve-outs (Dropdown, OutlinedInput, Modal) remain only because real consumers depend on them — documented in `design-patterns-addendum.md` | Let consumers pass `className` to each slot directly |
| Replace a `<button>` slot with `<div>` via `render` and forget `nativeButton={false}` | Base UI keeps emitting button-keyboard handling | Always pair tag swap with `nativeButton={false}` on button-default parts |
| Wrap `render` in a non-forwarding custom component | Refs and accessibility silently break | `React.forwardRef` (React 18) or accept `ref` as prop (React 19); spread props onto DOM |
| `useState` to mirror `data-open` and re-style | Doubles source of truth, races on transitions | Style with `data-[open]:` variants directly |
| Fork a component to add an icon | Loses every future Base UI improvement | Render the icon as a child of the part |
| Mix `dark:` variants and token-scoped colors in one component | Cognitively expensive to maintain | Pick one per component (tokens recommended for color) |
| Reading Base UI state with hooks to compute classes | The state is already on the DOM as `data-*` | `data-[…]:` variants are cheaper and SSR-stable |

---

## 11. Reference checklist for new components

When adding a Base-UI-backed component, verify:

- [ ] Default classes live in helper functions returning `string[]` (variants present, per `rules/styling.md`) or inline class strings (none).
- [ ] All slots accept `className` and merge through `twMerge(cx(...))` with consumer `className` **last** (rightmost).
- [ ] `data-*` state styling is used for state-driven visuals — no React state mirroring.
- [ ] Animation phases use `data-[starting-style]:` / `data-[ending-style]:` or keyframes on `data-open` / `data-closed`.
- [ ] Wrapping components forward refs correctly (React 18: `forwardRef`; React 19: `ref` prop).
- [ ] Tag swaps via `render` for button-default parts include `nativeButton={false}`.
- [ ] Colors come from design tokens, not Tailwind palette literals (`bg-surface`, not `bg-neutral-50`).
- [ ] Dark mode works without `dark:` variants in component code (tokens flip automatically).
- [ ] No `!important` anywhere; no inline `style` for colors / spacing / typography (those have class equivalents).
- [ ] Storybook covers each `data-*` state explicitly (open, disabled, checked, …) so visual regression catches state-styling drift.
- [ ] Consumer override is documented: which classes can be safely overridden, which slots are addressable, what `render` accepts.

---

## 12. References

- Handbook: [Styling](https://base-ui.com/react/handbook/styling) · [Composition](https://base-ui.com/react/handbook/composition) · [Animation](https://base-ui.com/react/handbook/animation) · [TypeScript](https://base-ui.com/react/handbook/typescript)
- Utilities: [`useRender`](https://base-ui.com/react/utils/use-render) · [`mergeProps`](https://base-ui.com/react/utils/merge-props)
- Releases: <https://base-ui.com/react/overview/releases>
- Source: <https://github.com/mui/base-ui>
- [`class-variance-authority`](https://cva.style/docs) — typed variant declaration
- [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) — deterministic Tailwind class deduplication
- [`clsx`](https://github.com/lukeed/clsx) — conditional class string builder
- [Tailwind v4 — custom variants](https://tailwindcss.com/docs/adding-custom-variants) — `@custom-variant` for first-class `data-*` keywords

---

## Appendix — where current Picasso patterns diverge from Base UI doctrine

Informational only. Does not prescribe migration tactics; flags the gap so the doctrine above isn't read through Picasso muscle memory.

1. **`slotProps={{ root: { className } }}` is `@mui/base` (v0), not `@base-ui/react` (v1).** v1 has no `slotProps`. Each part is a separate component you style directly. Anything that survives a migration with `slotProps` is unmigrated.
2. **`classes` prop is also v0-era.** Base UI v1 emits no `classes`; styling goes through `className`/`style`/`render` on each part. The Picasso carve-outs (Tier 3.b Dropdown/OutlinedInput keeping narrowed `classes`) are consumer-compat shims, not Base UI patterns.
3. **JS-computed class arrays vs CSS `data-*` variants.** Patterns like `getInputClassName({ size, disabled })` compute classes from JS state. Base UI's recommended pattern is CSS-driven via `data-[disabled]:`, `data-[invalid]:`, etc. — the component already emits the attribute, so JS branching is redundant and harder to override. JS-computed forms remain valid where the value isn't expressible as a CSS variant (sizes/spacing from a typed enum); state-flags should prefer data-attribute variants.
4. **`render` is the Base UI mechanism; `as` is the Picasso consumer API.** Picasso's external polymorphic prop is `as` (per `PICASSO_COMPONENT_DESIGN_PATTERNS.md` rule 11). Internally, wrappers translate `as` into Base UI's `render`:

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
     );
   });
   ```

   For button-default Base UI parts (Button, Menu.Trigger, Tabs.Tab, NumberField.Increment/Decrement, Toolbar.Button), the tag swap MUST pair with `nativeButton={false}` or Base UI keeps emitting `<button>`-keyboard handling. See the Button precedent in `practices.md` §"@base-ui/react idioms" → "Polymorphic components".
5. **`tailwind-merge` is already in place** via `@toptal/picasso-tailwind-merge` — that aligns with Base UI's expectation that consumer classes should override internal defaults. The package wraps `twMerge` with Picasso-specific font-size extensions; it's the right tool for §3.1.
6. **`cva` is not currently used in Picasso.** Current variant code generates class arrays from typed enums via helper functions. `cva` would centralize variant declaration with inferred types and is the de-facto standard for new Tailwind-on-headless kits, but adopting it across the kit is a separate decision from the per-component migration.
7. **`@mui/base` → `@base-ui/react` is a substantive API change, not a rename.** Anything older than the v1 GA (2025-12-11) referencing `@base-ui-components/react` or `@mui/base` should be treated as predecessor-API, not current.
8. **`nativeButton={false}` is a v1 concern** that pre-v1 code couldn't have. When migrating a component that uses `render` to swap a button-default Base UI part to a non-button element, audit for this prop — it's a silent accessibility regression otherwise.
