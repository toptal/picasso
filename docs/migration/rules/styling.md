# Styling rules

These rules are **non-negotiable** for migrated components. The agent must follow every one.

## Composition

- Always compose `className` via `cx(...)` (from `classnames`).
- If multiple sources of class strings merge, wrap in `twMerge(cx(...))` from `@toptal/picasso-tailwind-merge`. The Button reference shows the canonical pattern.
- **Class arrays (`string[]`)** returned from helper functions in `styles.ts` are the canonical "styles" shape. See `reference/Button-styles.ts`.

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
