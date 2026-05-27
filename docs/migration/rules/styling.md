# Styling rules

These rules are **non-negotiable** for migrated components. The agent must follow every one.

> For the underlying Base UI styling doctrine these rules implement (mechanisms, `render`/`useRender`, `data-[…]:` variants, anti-patterns, escalation ladder), see `references/base-ui-styling.md`.

## @base-ui/react v1 prescriptions (RULE)

These apply specifically to `@base-ui/react` v1 migrations (Tier 0). Background: `references/base-ui-styling.md` §3.5, §4.1, §7.1.

- **State-driven styling uses `data-[…]:` Tailwind variants** (e.g., `data-[checked]:`, `data-[highlighted]:`, `data-[disabled]:`, `data-[popup-open]:`). The legacy `group-[.base--checked]:` / `group-[.base--disabled]:` form belongs to `@mui/base` v0 — do NOT introduce in v1 code. Pre-v1 components retain `base--*` selectors until their own migration.
- **`nativeButton={false}` is mandatory** whenever you use `render` to swap a button-default Base UI part to a non-button element (anchor, custom wrapper, Next.js `<Link>`, etc.). Affected parts include Button, Menu.Trigger, Tabs.Tab, NumberField.Increment/Decrement, Toolbar.Button. Omitting it silently breaks keyboard accessibility.
- **No `!important`.** If a Tailwind utility isn't winning, walk the override-preference ladder per `references/base-ui-styling.md` §7.1: rung -1 (don't override) → rung 1 (`data-[…]:`) → rung 2 (`className` fn) → rung 3 (`render` prop, optionally filtering style) → rung 4 (`useRender`) → rung 5 (inline `style`). `!important` means a rung was skipped — usually rung -1.
- **Override-pressure check.** If you're adding `style={{ translate / position / transform: … }}` to a Base UI part to match legacy visual byte-for-byte, STOP. Check whether the legacy was a hand-rolled approximation of what the new primitive does geometrically exactly (e.g., legacy `-mt-[7px] -ml-[6px]` was approximating half-of-15px-thumb; Base UI's `translate: -50% -50%` does this exactly). If yes — remove the legacy offsets entirely, accept the new geometry, propose the sub-pixel diff as "intentional improvement" per `references/happo-iteration.md`. Don't reflexively reach for rung 5 inline `style` when rung -1 is correct. See `references/base-ui-styling.md` §7.1 rung -1.

## Composition

- **Default: `twMerge(...)` alone** from `@toptal/picasso-tailwind-merge`. It accepts strings, arrays, and falsy values (`false`, `null`, `undefined`, `''`) directly — so conditionals via `&&` and ternaries work without a wrapping helper. Adopter examples: `Tabs.tsx:98-103`, `Drawer.tsx:112`, `Dropdown.tsx:271`, `PageHeadBase.tsx:74`.
- **Reach for `cx`** (from `classnames`) ONLY when you need the clsx-object-syntax form (`cx({ active: isActive, disabled })`). Picasso's established forms (`condition && 'class'`, ternary, nested arrays) don't need it. See `references/base-ui-styling.md §3.1` for the underlying mechanics.
- **`twJoin`** is re-exported from `@toptal/picasso-tailwind-merge` for concatenation without conflict-resolution.
- **Consumer `className` is always LAST** in the `twMerge(...)` argument list — rightmost wins.
- **Class arrays (`string[]`)** returned from helper functions in `styles.ts` are the canonical "styles" shape for variant-driven classes. See `reference/Button-styles.ts`.

## What to avoid

- **No `style={{...}}`** unless a value is truly dynamic (user-provided width, computed from a ref, etc.). Numeric interpolation OK; static styles must move to Tailwind.
- **No CSS files.** No `.css`, `.scss`, `.module.css`. Anything CSS-shaped lives in Tailwind classes or helper-returned arrays.
- **No JSS objects.** No `makeStyles`, `createStyles`, `withStyles`. No `&$selector` parent-refs.
- **No raw hex / px values** when a Picasso Tailwind token covers it. Refer to `tokens/picasso-tailwind-tokens.md`. Where no token exists, keep the literal but mark it: `// TODO(tokens): <description>`.

## Conditionals

Plain ternaries or Tailwind's data-attribute selectors:

```tsx
// Good
className={cx({ 'm-0': expanded, 'm-2': !expanded })}

// Good — data-attribute driven (lets parent styling participate)
<div data-state={expanded ? 'open' : 'closed'} className="data-[state=open]:bg-blue-500" />

// Bad — JSS parent-ref
'&$expanded': { margin: 0 }
```

## Hover / focus / disabled / responsive

Use Tailwind variant prefixes, not state-tracking JS:

```
hover:bg-blue-500
focus:ring-2 focus:ring-blue-400
disabled:opacity-50
md:flex lg:gap-12
```

## Dynamic values

When a value really must be computed at runtime, use Tailwind's arbitrary-value syntax or `style`:

```tsx
// Arbitrary value
<div className={`w-[${size * 4}px]`} />

// style for numeric interpolation
<div style={{ width: size * 4 }} />
```

Prefer arbitrary values when the result is a discrete enum (purgeable); use `style` for true computed numbers.

## Token usage

Use Picasso tokens by their semantic name where possible:

```
Good: text-graphite-800, bg-blue-100, shadow-2 (modal), p-4 (16px)
Bad:  text-[#262D3D], bg-[#EDF1FD], shadow-[0_4px_8px_0_rgba(0,0,0,0.08)], p-[16px]
```

If you find yourself reaching for an arbitrary value, double-check `tokens/picasso-tailwind-tokens.md` first. Then add a `// TODO(tokens):` comment so it surfaces in the P1-FIG-03 audit.

## Twmerge boundary

When you accept a `className` prop from a consumer, merge with `twMerge` so consumer-provided utilities can override component defaults:

```tsx
import { twMerge } from '@toptal/picasso-tailwind-merge'

<div className={twMerge(cx('p-4 bg-blue-100', baseClasses), className)} />
```

The consumer should always be able to win.

## Helper-fn shape (from Button)

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

Then in the component:

```tsx
className={twMerge(cx(
  'inline-flex items-center justify-center',
  ...createSizeClassNames(size),
  ...createVariantClassNames(variant),
  className,
))}
```
