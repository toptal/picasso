# Base UI + Tailwind: Styling and Customization Strategy

A practical engineering guide for building a Tailwind-styled UI kit on top of [Base UI](https://base-ui.com) (`@base-ui/react`, v1.0+), the unstyled, accessible React component library from the teams behind Material UI, Radix, and Floating UI.

> **Package name note.** Base UI v1.0 (December 2025) renamed the package from `@base-ui-components/react` to `@base-ui/react`. All imports in this document use the v1 name. If you're still on a pre-v1 version, mentally substitute the old name when copying snippets.

This document defines **how to consume Base UI primitives, override their look and feel with Tailwind, and expose a stable, idiomatic API to UI-kit consumers**. It is framework-agnostic — no project-specific conventions are baked in — and assumes the reader is comfortable with React, Tailwind, and basic accessibility concepts.

---

## 1. Why this document exists

Base UI ships **behavior, accessibility, and composition** — not styles. Every part of every component renders with no className, no inline style, and no opinion about how it should look. That is the entire point: the library is "styling-agnostic" so you can layer your own design system on top without fighting CSS specificity, theme tokens, or override APIs.

But "no opinion" means **the UI kit author owns every styling decision**: how classes are composed, how variants are declared, how consumer overrides are merged, how state (open / disabled / hovered / checked) is reflected, how dark mode and tokens are resolved, and when to escape the headless contract entirely.

This document codifies those decisions into a small set of patterns that scale across a 20-to-50-component kit.

---

## 2. The five mechanisms Base UI gives you

Every styling and override pattern in a Base UI codebase reduces to combinations of these five mechanisms. Understand them once, apply them consistently.

| Mechanism | What it controls | When to reach for it |
| --- | --- | --- |
| **1. `className` prop** | What classes land on the DOM node | Default — every styling decision starts here |
| **2. `render` prop** | What DOM tag / wrapper component is used | Replace the underlying element, compose with custom components, integrate with `next/link`, framer-motion, etc. |
| **3. `data-*` state attributes** | Style-by-state without React state plumbing | Hover, open, checked, disabled, side-positioning, animation phases |
| **4. CSS variables (`--var`)** | Computed values exposed by Base UI | Position, dimensions, animation transform-origin, snap-point math |
| **5. `style` prop (static or function-of-state)** | Inline styles | Last resort — only when a computed style cannot be expressed as a class |

These exist on virtually every Base UI part. The signature is consistent:

```ts
className?: string | ((state: State) => string | undefined);
style?: React.CSSProperties | ((state: State) => React.CSSProperties | undefined);
render?: ReactElement | ((props: HTMLProps, state: State) => ReactElement);
```

---

## 3. Mechanism 1 — `className` strategies

### 3.1 The minimum-viable pattern: a `cn` helper

Every Tailwind-on-headless codebase needs a class-merging utility that resolves conflicts. The de-facto standard combines `clsx` (conditional class joining) with `tailwind-merge` (Tailwind-aware deduplication):

```ts
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Why both? `clsx` only joins strings. If a wrapper applies `px-4` and the consumer passes `px-2`, plain `clsx` produces `"px-4 px-2"` — both classes ship to the DOM and Tailwind's last-wins rule is order-dependent and brittle. `twMerge` deduplicates Tailwind-conflicting classes deterministically, with the **rightmost class winning** regardless of source order. This is the single most important guarantee for override ergonomics.

### 3.2 Default classes + consumer override

The basic wrapper pattern: a UI-kit component owns its default classes and lets consumers override any of them via the standard `className` prop.

```tsx
// ui-kit/checkbox.tsx
import { Checkbox } from '@base-ui/react/checkbox';
import { cn } from '../utils/cn';

export function Root({ className, ...props }: Checkbox.Root.Props) {
  return (
    <Checkbox.Root
      className={cn(
        // defaults
        'flex size-4 shrink-0 items-center justify-center rounded border',
        'border-neutral-700 bg-white text-white',
        'data-checked:bg-neutral-900 data-checked:text-white',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900',
        // consumer overrides win
        className,
      )}
      {...props}
    />
  );
}
```

Rules of the road:

- **Consumer `className` is always last** in the `cn(...)` call. Rightmost wins under `twMerge`.
- **Never spread `...props` before `className`** when the consumer's className would be overwritten — pass `className` explicitly so the merged value lands on the DOM.
- **Group your defaults by concern** (layout / colors / state / focus). Future-you will thank present-you.

### 3.3 The state-aware `className` function

Base UI lets `className` be a function of component state. Reach for this when CSS data-attribute selectors are insufficient — usually because the class itself needs to be conditional on multiple state values:

```tsx
<Switch.Thumb
  className={(state) =>
    cn(
      'block size-4 rounded-full transition-transform',
      state.checked ? 'translate-x-4 bg-white' : 'translate-x-0 bg-neutral-300',
      state.disabled && 'opacity-50',
    )
  }
/>
```

Prefer the function form **only when data-attributes (§5) are awkward**. For single-state styling, the data-attribute approach is shorter, more declarative, and survives SSR without re-renders.

### 3.4 Variants with `cva`

For components with intrinsic variants (size, intent, surface), use `class-variance-authority` (`cva`). It declares a base + variant map + defaults in one place and produces a typed function:

```tsx
// ui-kit/button.tsx
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const button = cva(
  // base — applied to every variant
  [
    'inline-flex items-center justify-center gap-2 rounded-md',
    'text-sm font-medium select-none transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    variants: {
      intent: {
        primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
        secondary: 'bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100',
        ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
);

type ButtonProps = React.ComponentProps<typeof BaseButton> & VariantProps<typeof button>;

export function Button({ className, intent, size, ...props }: ButtonProps) {
  return <BaseButton className={cn(button({ intent, size }), className)} {...props} />;
}
```

Key points:

- `cva` types are inferred — `VariantProps<typeof button>` gives you `{ intent?: 'primary' | ...; size?: ... }` for free.
- Wrap the `cva` output with `cn(...)` (which calls `twMerge`) **only at the consumption site**, so consumer `className` can still override variant classes.
- Define one `cva` per component, not one per part. The Switch's `Root`, `Thumb`, and `Track` each get their own — but they all live in the same file.

### 3.5 What NOT to do

- **Don't reach for `style` to color a part.** Inline styles win against any Tailwind class, including consumer overrides. This is an escape hatch, not a styling primitive. The legitimate uses are CSS-variable-driven computed values (`style={{ '--x': dynamicValue }}`) and animation positioning that cannot be expressed in classes.
- **Don't string-concat without `twMerge`.** `"px-4 " + className` produces silent override failures the moment a consumer passes `px-2`.
- **Don't expose a `classes` prop (slot-keyed override object).** This is the MUI-v4-era pattern that Tailwind makes obsolete. Consumers should override slot styles by passing `className` directly to the slot they care about (§4.2).

---

## 4. Mechanism 2 — Render prop and component composition

The `render` prop is Base UI's primary composition mechanism. It does two things you cannot do with `className` alone: **change the DOM tag, and replace the rendered element with a custom component while preserving Base UI's behavior, accessibility, and ref forwarding**.

### 4.1 Replace the tag

```tsx
// Render Button as an anchor for navigation
<Button render={<a href="/dashboard" />}>Go to dashboard</Button>

// Render Tab as a Next.js Link for client-side routing
<Tabs.Tab nativeButton={false} render={<Link href="/overview" />} value="overview">
  Overview
</Tabs.Tab>
```

Two gotchas:

- For components Base UI renders as `<button>` by default (Button, Menu.Trigger, Tabs.Tab, NumberField.Increment, etc.), pass `nativeButton={false}` when replacing with a non-button element. Otherwise Base UI emits keyboard-handling code that assumes a native button.
- The replacement component must **forward refs and spread props** to the underlying DOM node, or Base UI's behavior breaks. Custom components without `React.forwardRef` (React 18) or a `ref` prop (React 19) silently lose accessibility.

### 4.2 Compose with a custom component

You can hand Base UI an arbitrary component — typically one of your own wrappers — and it will inject its props (event handlers, aria-*, data-*) into that component:

```tsx
<Menu.Trigger render={<MyButton size="md" />}>
  Open menu
</Menu.Trigger>
```

`MyButton` here is a normal React component. Base UI calls it with `<MyButton {...injectedProps} size="md">Open menu</MyButton>` and expects `MyButton` to spread `injectedProps` onto its root DOM element. This is how you reuse your own kit's `Button` as the trigger for a `Menu`, a `Dialog`, or a `Popover` without duplicating styling.

### 4.3 The function form: full control

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

When the props you want to apply collide with Base UI's injected props (notably event handlers and `className`), use `mergeProps` from `@base-ui/react/merge-props`:

```tsx
import { mergeProps } from '@base-ui/react/merge-props';

<Switch.Thumb
  render={(props, state) => (
    <span
      {...mergeProps<'span'>(props, {
        className: cn('size-4 rounded-full', state.checked && 'bg-white'),
        onClick: () => console.log('clicked'),
      })}
    />
  )}
/>
```

`mergeProps` handles the three things naive spreading gets wrong:

- **Event handlers** are chained (rightmost first, leftmost last). The rightmost handler can prevent the prior ones with `event.preventBaseUIHandler()`.
- **`className`** is concatenated rightmost-first, so your additions don't clobber Base UI's internal classes (rare, but real for Popover positioning).
- **`style`** is merged with rightmost winning.

### 4.4 Nesting compositions

Multiple Base UI components can compose into a single trigger element by chaining `render` props. This is the canonical pattern for "a button that is also a tooltip trigger and a menu trigger":

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
    <Tooltip.Portal>...</Tooltip.Portal>
  </Tooltip.Root>
  <Dialog.Portal>...</Dialog.Portal>
</Dialog.Root>
```

Each layer injects its event handlers and aria-* attributes; `mergeProps` runs at every level under the hood. The result is one DOM node that participates in three independent accessibility trees correctly.

### 4.5 The `useRender` hook — when you build the wrapper

When **your UI-kit component itself wants to expose a `render` prop** so its consumers get the same composition power, use the `useRender` hook:

```tsx
import { useRender } from '@base-ui/react/use-render';

type ButtonProps = {
  render?: React.ReactElement | ((props: React.HTMLAttributes<HTMLElement>, state: {}) => React.ReactElement);
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ render, className, ...props }: ButtonProps) {
  return useRender({
    defaultTagName: 'button',
    render,
    props: {
      ...props,
      className: cn('inline-flex items-center …', className),
    },
  });
}
```

Now consumers can do `<Button render={<a href="…" />}>…</Button>` against your wrapper exactly as they can against Base UI's primitives. This is what makes a kit feel native to Base UI rather than bolted on top.

For React 18, wrap with `React.forwardRef` and pass `ref: [forwardedRef, internalRef]`. For React 19, pass a single internal ref — React 19 handles forwarding automatically through props.

---

## 5. Mechanism 3 — `data-*` state attributes

Base UI's headless components expose **every meaningful piece of state as a `data-*` attribute on the DOM**. Combined with Tailwind's variant syntax, this gives you state-driven styling without React state subscriptions, without re-renders, and without props plumbing.

### 5.1 The vocabulary

Every component publishes its own attribute set. A non-exhaustive sample:

| Attribute | Components | Meaning |
| --- | --- | --- |
| `data-open` / `data-closed` | Dialog, Popover, Menu, Select, Tooltip, Drawer, Accordion | Visibility state |
| `data-checked` / `data-unchecked` | Checkbox, Switch, Radio, Menu.RadioItem | Selection state |
| `data-highlighted` | Menu.Item, Select.Item, Combobox.Item | Keyboard / hover highlight |
| `data-disabled` | All interactive | Disabled state |
| `data-popup-open` | Menu.Trigger, NavigationMenu.Trigger | Whether the associated popup is open |
| `data-side` (`top`/`bottom`/`left`/`right`) | Popover, Menu, Tooltip arrows | Which side the popup is on |
| `data-align` (`start`/`center`/`end`) | Positioner, Arrow | Alignment relative to anchor |
| `data-starting-style` / `data-ending-style` | Animatable popups | Enter / exit animation phases |
| `data-instant` | Animated parts | Animation should skip |
| `data-orientation` | Tabs, Accordion, Slider | Layout direction |
| `data-valid` / `data-invalid` / `data-dirty` / `data-touched` / `data-filled` / `data-focused` | Form fields under `Field.Root` | Form-state slots |

Each component's reference page (`base-ui.com/react/components/<name>`) lists the full table for every part.

### 5.2 Targeting from Tailwind

Tailwind's arbitrary-variant syntax addresses `data-*` directly:

```tsx
<Menu.Item
  className="
    flex cursor-default items-center gap-2 px-3 py-2 text-sm
    data-highlighted:bg-neutral-900 data-highlighted:text-white
    data-disabled:opacity-50 data-disabled:pointer-events-none
  "
>
  Add to library
</Menu.Item>
```

For attributes with values (`data-side="top"`, `data-align="end"`), use bracketed variants:

```tsx
<Tooltip.Arrow
  className="
    data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180
    data-[side=bottom]:top-[-6px]
    data-[side=left]:right-[-9px] data-[side=left]:rotate-90
    data-[side=right]:left-[-9px] data-[side=right]:-rotate-90
  "
/>
```

### 5.3 First-class variants in Tailwind v4

If you find yourself repeating `data-[state=open]:` patterns, define a custom variant once and use a clean keyword everywhere. In Tailwind v4 (CSS-config):

```css
/* app.css */
@import "tailwindcss";

@custom-variant open (&[data-open]);
@custom-variant closed (&[data-closed]);
@custom-variant checked (&[data-checked]);
@custom-variant highlighted (&[data-highlighted]);
@custom-variant popup-open (&[data-popup-open]);
```

Then:

```tsx
<Menu.Popup className="opacity-0 open:opacity-100 closed:opacity-0 transition-opacity" />
```

This is a one-time investment that pays back across every component in the kit.

### 5.4 Animation: `data-starting-style` and `data-ending-style`

Base UI applies `data-starting-style` for one frame at the start of an enter transition and `data-ending-style` for one frame at the start of an exit transition. Combined with Tailwind transitions, this gives you exit animations without `<AnimatePresence>`:

```tsx
<Popover.Popup
  className="
    origin-(--transform-origin)
    transition-[transform,opacity] duration-150
    data-starting-style:scale-90 data-starting-style:opacity-0
    data-ending-style:scale-90 data-ending-style:opacity-0
  "
/>
```

For keyframe animations, target `data-open` / `data-closed`:

```css
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
@keyframes scaleOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.9); } }

.Popup[data-open]  { animation: scaleIn  250ms ease-out; }
.Popup[data-closed] { animation: scaleOut 250ms ease-in; }
```

For library-driven animation (framer-motion), use `<Portal keepMounted>` and the `render` prop's function form (§4.3) to plug a `motion.div` in directly.

---

## 6. Mechanism 4 — CSS variables, tokens, dark mode

### 6.1 CSS variables Base UI exposes

Many parts publish computed values as CSS variables. The big ones:

| Variable | On part | Use |
| --- | --- | --- |
| `--transform-origin` | Popup parts | Origin of scale-in/out animation anchored at the trigger |
| `--anchor-width` / `--anchor-height` | Positioner | Size of the trigger element |
| `--available-width` / `--available-height` | Positioner | Free space between trigger and viewport edge |
| `--positioner-width` / `--positioner-height` | Positioner | Fixed positioner dimensions |
| `--active-tab-{left,right,top,bottom,width,height}` | Tabs.Indicator | Active tab geometry for animated indicator |
| `--scroll-area-overflow-y-{start,end}` | ScrollArea.Viewport | Overflow at top/bottom for fade masks |
| `--drawer-swipe-progress`, `--drawer-swipe-movement-{x,y}` | Drawer | Live swipe state |
| `--toast-index`, `--toast-offset-y` | Toast | Stacking and expanded offsets |

You consume these from CSS or Tailwind arbitrary values:

```tsx
<Popover.Popup className="origin-(--transform-origin) max-h-[var(--available-height)]" />
```

```css
.MenuPopup {
  max-height: var(--available-height);
  transform-origin: var(--transform-origin);
}
```

### 6.2 Design-token strategy

The kit's own tokens should live as CSS variables under `:root` and a dark scope, and be wired into Tailwind's theme:

```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-surface:        var(--surface);
  --color-surface-muted:  var(--surface-muted);
  --color-fg:             var(--fg);
  --color-fg-muted:       var(--fg-muted);
  --color-accent:         var(--accent);
  --color-accent-fg:      var(--accent-fg);
  --color-border:         var(--border);
  --color-ring:           var(--ring);

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
}

:root {
  --surface:       oklch(100% 0 0);
  --surface-muted: oklch(96% 0 0);
  --fg:            oklch(20% 0 0);
  --fg-muted:      oklch(50% 0 0);
  --accent:        oklch(20% 0 0);
  --accent-fg:     oklch(100% 0 0);
  --border:        oklch(85% 0 0);
  --ring:          oklch(20% 0 0);
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

### 6.3 Dark mode: variants vs scoped variables

There are two viable approaches and they compose:

1. **Token-scoped (preferred for color).** Define your colors as CSS variables under `:root` and `.dark` as above. No `dark:` variant in component code — `bg-surface` is correct in both modes.
2. **Tailwind `dark:` variant (for one-offs).** When a single property needs to differ in dark mode but does not warrant a token (e.g., a one-off border treatment), use Tailwind's `dark:` prefix. Configure Tailwind v4 with the `class` strategy:

```css
@variant dark (.dark &);
```

Most production kits land on (1) for the 80% case and (2) for the long-tail. Mixing both is fine; consistency within a single component is what matters.

### 6.4 Scoping component-local variables

Components frequently need to define local CSS variables for animation math. Define them on the root and consume them on children:

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

This keeps the math co-located with the consumer and avoids polluting `:root` with component internals.

---

## 7. Mechanism 5 — When and how to override Base UI

Most "overriding Base UI" is actually overriding **styles** with the four mechanisms above. But occasionally you need to change **behavior** — and there is a clear escalation ladder.

### 7.1 The escalation ladder

| Need | Mechanism |
| --- | --- |
| Different colors / spacing / typography / size | `className` (§3) |
| Different DOM tag (anchor instead of button, custom wrapper) | `render` prop (§4) |
| Style based on state (open, checked, side) | `data-*` attributes (§5) |
| Computed positions / dimensions from Base UI | CSS variables (§6.1) |
| Theme-level changes (color, radius, spacing scale) | Design tokens (§6.2) |
| Different sub-element / additional sub-element | Compose with extra DOM **inside** the slot |
| Different default state / controlled-state behavior | Wrap the Root and own the state |
| Different DOM structure than Base UI ships | Wrap with your own component **above** Base UI |
| Fundamentally different behavior | Don't override — build the part yourself with `useRender` |

The rule is **never reach for a stronger mechanism than the problem requires**. Each step up the ladder costs ergonomics, accessibility risk, or maintenance burden.

### 7.2 Adding DOM inside a slot

Common case: you want an icon prefix inside the Select trigger. Don't replace the trigger — render extra content inside it:

```tsx
<Select.Trigger className="…">
  <ChevronIcon className="size-4 text-fg-muted" />
  <Select.Value />
  <Select.Icon className="ml-auto size-4 text-fg-muted" />
</Select.Trigger>
```

### 7.3 Wrapping with controlled-state defaults

When the kit wants a different default behavior — say, a Dialog that always traps focus to a specific element, or a Combobox with a built-in clear button — wrap the Root and inject the behavior:

```tsx
export function ConfirmDialog({
  trigger,
  title,
  description,
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger render={trigger} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40 data-starting-style:opacity-0 data-ending-style:opacity-0 transition-opacity" />
        <Dialog.Popup className="…">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
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

This is the kit's *opinionated* layer on top of Base UI's *un*opinionated primitives. The Root is still Base UI's — you have not forked anything.

### 7.4 Building a sibling part with `useRender`

When the kit needs a part Base UI does not ship (a button group, a card, a custom select item with rich content), use the `useRender` hook to give it the same ergonomics as Base UI parts:

```tsx
import { useRender } from '@base-ui/react/use-render';

export function Card({ render, className, ...props }: CardProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      ...props,
      className: cn(
        'rounded-md border border-border bg-surface p-4 shadow-sm',
        className,
      ),
    },
  });
}

// Now consumers can do:
<Card render={<article />} className="bg-surface-muted">…</Card>
```

The benefit: the kit's home-grown parts and Base UI's primitives are **indistinguishable to consumers** — same `render` semantics, same `className` semantics, same composition.

### 7.5 When to fork

Almost never. Base UI's behavior, focus management, and accessibility are non-trivial; the cost of forking is owning a parallel implementation forever. The signals that justify a fork are:

- The component's core behavior conflicts with the kit's interaction model (e.g., the kit wants combobox-with-multiple-selection and Base UI doesn't ship Combobox.Multiple at the time of the decision — check current status before forking).
- The accessibility model in the kit's host product diverges fundamentally from WAI-ARIA defaults.
- The component is unmaintained for many minor versions (this has not happened in Base UI to date, given the team behind it).

In all other cases, prefer "wrap + override" over fork.

---

## 8. Putting it together: a worked example

Here is a complete `Switch` component built with every pattern from §3-§7. It demonstrates: default classes, consumer override merge, `data-*` state styling, animation via `data-starting-style`, `cva` variants, `forwardRef` for React 18 compat.

```tsx
// ui-kit/switch.tsx
import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const root = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors',
    'bg-neutral-300 data-checked:bg-neutral-900',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900',
    'data-disabled:opacity-50 data-disabled:cursor-not-allowed',
    'dark:bg-neutral-700 dark:data-checked:bg-white',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

const thumb = cva(
  [
    'block rounded-full bg-white transition-transform',
    'data-checked:translate-x-full dark:bg-neutral-900',
  ],
  {
    variants: {
      size: {
        sm: 'size-3 translate-x-0.5',
        md: 'size-4 translate-x-0.5',
        lg: 'size-5 translate-x-0.5',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root> &
  VariantProps<typeof root>;

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch({ size, className, ...props }, ref) {
    return (
      <BaseSwitch.Root ref={ref} className={cn(root({ size }), className)} {...props}>
        <BaseSwitch.Thumb className={cn(thumb({ size }))} />
      </BaseSwitch.Root>
    );
  },
);
```

Consumer usage:

```tsx
<Switch size="lg" defaultChecked />
<Switch className="data-checked:bg-emerald-600" />  {/* color override wins via twMerge */}
<Switch render={<a href="#" role="switch" />} />     {/* tag override via Base UI's render */}
```

---

## 9. Decision quick reference

| You want to… | Use |
| --- | --- |
| Apply a class to a Base UI part | `className` |
| Override classes from outside the kit | `className` last in `cn(...)` |
| Style differently when the part is open / checked / hovered | `data-*` Tailwind variants |
| Style differently based on multiple state values | `className={(state) => …}` function form |
| Declare typed variants (size, intent) | `cva` |
| Render as a different HTML tag | `render={<a />}` (+ `nativeButton={false}` for button-default parts) |
| Render through a Next.js / React Router link component | `render={<Link href="…" />}` |
| Replace the rendered element with your own kit component | `render={<MyButton />}` |
| Inspect state inside `render` | `render={(props, state) => …}` |
| Add an event handler without losing Base UI's | `mergeProps(props, { onClick })` inside `render` function |
| Build a kit part that supports `render` like Base UI does | `useRender` hook |
| Read computed positions / dimensions | `var(--transform-origin)`, `var(--available-height)` etc. |
| Theme colors globally | CSS variables on `:root` + `.dark`, wired via Tailwind `@theme` |
| Animate enter / exit | `data-starting-style:` / `data-ending-style:` |
| Animate with framer-motion | `<Portal keepMounted>` + `render={(p, s) => <motion.div … />}` |
| Add an icon inside a part | Compose extra DOM **inside** the part, not via `render` |
| Add custom default behavior (controlled state, defaults) | Wrap the Root in your own component |

---

## 10. Anti-patterns and traps

| Anti-pattern | Why it's bad | Do this instead |
| --- | --- | --- |
| `style={{ color: 'red' }}` for colors | Inline styles beat every class, including consumer overrides | `className="text-red-600"` |
| `className={'px-4 ' + className}` (no `twMerge`) | Consumer `px-2` doesn't override; Tailwind order is order-of-CSS, not order-of-string | `cn('px-4', className)` |
| Spreading `...props` after explicit `className` | Consumer `className` is silently dropped | Pass `className` explicitly: `<X className={cn(defaults, className)} {...rest} />` |
| Expose `classes` prop with slot keys | Old MUI-v4 pattern; redundant when slots are individually addressable | Let consumers pass `className` to the slot directly |
| Replace a `<button>` slot with a `<div>` via `render` and forget `nativeButton={false}` | Base UI keeps emitting `<button>`-specific keyboard handling | Always pair tag swap with `nativeButton={false}` on button-default parts |
| Wrap `render` in a non-forwarding custom component | Refs and accessibility silently break | Use `React.forwardRef` (React 18) or accept `ref` as a prop (React 19), spread props onto the DOM node |
| Use `useState` to mirror Base UI's `data-open` and re-style | Doubles the source of truth, races on transitions | Style with `data-open:` variants directly |
| Fork a component to add an icon | Loses every future Base UI improvement | Render the icon as a child of the part |
| Mix `dark:` variants and token-scoped colors in one component | Cognitively expensive to maintain | Pick one per component (token-scoped recommended for color) |

---

## 11. Reference checklist for new components in the kit

When adding a new Base-UI-backed component to the kit, verify:

- The component file owns its default classes via `cva` (if variants exist) or inline class strings (if it doesn't).
- All slots accept `className` and merge it through `cn(...)` with consumer `className` **last**.
- `data-*` state styling is used for any state-driven visual (no React state mirroring).
- Animation phases use `data-starting-style:` / `data-ending-style:` or keyframes on `data-open`/`data-closed`.
- Wrapping components forward refs correctly (React 18: `forwardRef`; React 19: `ref` prop).
- Colors come from design tokens, not Tailwind palette literals (`bg-surface`, not `bg-neutral-50`).
- Dark mode works without `dark:` variants in component code (tokens flip automatically).
- The component's storybook covers each `data-*` state explicitly (open, disabled, checked, etc.) so visual regression catches state-styling drift.
- Consumer override is documented: which classes can be safely overridden, which slots are addressable, what `render` accepts.

---

## 12. Sources and further reading

- [Base UI — Styling handbook](https://base-ui.com/react/handbook/styling) — official guidance on `className`, `style`, data attributes, CSS variables.
- [Base UI — Composition handbook](https://base-ui.com/react/handbook/composition) — `render` prop, nested composition, refs.
- [Base UI — Animation handbook](https://base-ui.com/react/handbook/animation) — `data-starting-style`, keyframes, framer-motion integration.
- [Base UI — useRender utility](https://base-ui.com/react/utils/use-render) — building your own parts.
- [Base UI — mergeProps utility](https://base-ui.com/react/utils/merge-props) — event handler chaining, className concatenation.
- [class-variance-authority docs](https://cva.style/docs) — variant declaration, typed props.
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) — deterministic Tailwind class deduplication.
- [clsx](https://github.com/lukeed/clsx) — conditional class string builder.
- [Tailwind CSS v4 — custom variants](https://tailwindcss.com/docs/adding-custom-variants) — `@custom-variant` for first-class `data-*` keywords.
