# JSS → Tailwind cribsheet

> **Scope: migration-only doc.** This cribsheet exists to support the @material-ui/core JSS → Tailwind translation during the modernization program. Once the migration completes, the structural patterns here (parent-refs, pseudo-elements, transitions) will be promoted to a Picasso Storybook tutorial (similar to the styled-components tutorial at <https://picasso.toptal.net/?path=/story/tutorials-styled-components--styled-components>), and the token-mapping rows will be retired in favor of pointing directly at `tokens/picasso-tailwind-tokens.md`. Until then, this file remains the migration agent's authoritative translation reference.

Pattern table for translating common JSS shapes into Picasso Tailwind. Use alongside `tokens/picasso-tailwind-tokens.md` for canonical token names.

## Spacing

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

## Color

**Color tokens are Picasso-dependent and live in [`docs/migration/tokens/picasso-tailwind-tokens.md`](../tokens/picasso-tailwind-tokens.md)** — the canonical source for MUI palette → Picasso Tailwind token mappings. Do NOT duplicate the mapping here; the tokens doc is the single source of truth (avoids drift when designers update the palette).

When translating a JSS color expression:

1. Identify the MUI palette path (`palette.text.primary`, `palette.primary.main`, etc.).
2. Look up the matching Picasso token in `tokens/picasso-tailwind-tokens.md`.
3. If no canonical token exists, keep the literal `[arbitrary-value]` AND add `// TODO(tokens): <description>` (per §"Token usage" in `rules/styling.md`).

## Hover / focus / disabled

| JSS                                       | Picasso Tailwind |
|---|---|
| `'&:hover': { backgroundColor: ... }`     | `hover:bg-...` |
| `'&:focus': { outline: ... }`             | `focus:outline-...` |
| `'&:focus-visible': { ... }`              | `focus-visible:...` |
| `'&:disabled': { opacity: 0.5 }`          | `disabled:opacity-50` |
| `'&[disabled]': { ... }`                  | `disabled:...` |
| `'&:not(:last-child)': { marginRight }`   | `[&:not(:last-child)]:mr-4` (arbitrary variant) |

## Parent-refs

The big one. JSS allows `&$expanded` to mean "this element when the parent has the `expanded` class". Tailwind has no equivalent — convert to **conditional classes driven by component state**:

```jsx
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

```jsx
<Accordion data-state={expanded ? 'open' : 'closed'}>
  <Panel className="data-[state=open]:mt-4" />
</Accordion>
```

## Pseudo-elements

| JSS                                     | Picasso Tailwind |
|---|---|
| `'&::before': { content: '""' }`        | `before:content-['']` |
| `'&::after': { ... }`                   | `after:...` |
| `'&::placeholder': { color: ... }`      | `placeholder:text-...` |

## Responsive

| JSS                                                  | Picasso Tailwind |
|---|---|
| `[theme.breakpoints.up('md')]: { display: 'flex' }` | `md:flex` |
| `[theme.breakpoints.down('sm')]: { ... }`           | `max-sm:...` (or invert: write the default for ≥sm) |
| `[theme.breakpoints.between('md', 'lg')]: { ... }`  | `md:max-lg:...` |

## Transitions

| JSS                                                   | Picasso Tailwind |
|---|---|
| `transition: 'all 150ms ease-in-out'`                 | `transition duration-150 ease-in-out` |
| `transition: 'transform 200ms cubic-bezier(0.4,0,0.2,1)'` | `transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]` |
| `transitionDuration: '350ms'`                         | `duration-350` (Picasso token) |

## Shadows

| JSS                          | Picasso Tailwind |
|---|---|
| `boxShadow: shadows[1]`      | `shadow-1` (notification, paper) |
| `boxShadow: shadows[2]`      | `shadow-2` (modal) |
| `boxShadow: shadows[4]`      | `shadow-4` (tooltip) |
| `boxShadow: 'none'`          | `shadow-0` |
| `boxShadow: shadows[6..24]`  | `shadow-6` … `shadow-24` (legacy MUI parity; do not introduce new uses) |

## Z-index

| JSS                              | Picasso Tailwind |
|---|---|
| `zIndex: zIndex.drawer`          | `z-drawer` (1200) |
| `zIndex: zIndex.modal`           | `z-modal` (1300) |
| `zIndex: zIndex.snackbar`        | `z-snackbar` (1400) |

## Border radius

| JSS                          | Picasso Tailwind |
|---|---|
| `borderRadius: 0`            | `rounded-none` |
| `borderRadius: 4`            | `rounded-sm` |
| `borderRadius: 8`            | `rounded-md` |
| `borderRadius: '50%'`        | `rounded-full` |

## Font

| JSS                                             | Picasso Tailwind |
|---|---|
| `fontFamily: '"proxima-nova", Arial, sans-serif'` | `font-sans` |
| `fontWeight: 600`                                | `font-semibold` |
| `fontWeight: 400`                                | `font-regular` |
| `fontSize: '0.875rem'` + `lineHeight: '1.375rem'` | `text-md` |
| `fontSize: '1rem'` + `lineHeight: '1.5rem'`      | `text-lg` |

## Layout

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

## Dynamic values

| JSS                                          | Picasso Tailwind |
|---|---|
| `width: ${size * 4}px`                       | `style={{ width: size * 4 }}` (numeric runtime) |
| `width: ${size}px` where size ∈ {120,160,200} | `w-[120px]` / `w-[160px]` / `w-[200px]` (purgeable) |
| `transform: rotate(${angle}deg)`             | `style={{ transform: \`rotate(${angle}deg)\` }}` |
| `gridTemplateColumns: \`repeat(${cols}, 1fr)\`` | `style={{ gridTemplateColumns: \`repeat(${cols}, 1fr)\` }}` |

## When in doubt

1. Look up the px value of the JSS expression.
2. Check `tokens/picasso-tailwind-tokens.md` for a matching token.
3. If a token exists, use its name. If not, use `[arbitrary-value]` AND add `// TODO(tokens): <description>`.
4. If the JSS pattern isn't in this table, search for the same pattern in `reference/Button.tsx` / `reference/Switch.tsx` first — Phase 0 has likely already solved it.

---

# Worked examples

Use these as templates when the lookup table above isn't enough. Each example shows a real JSS pattern from Picasso source and the equivalent Tailwind, with the reasoning inline.

## Example 1: JSS parent-ref selector → data-attribute selector

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

## Example 2: Dynamic class from prop state → conditional class array

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

**Why**: a `switch` over the union literal mirrors the JSS branching while staying type-safe. The PURE function shape (input props → string[]) is the Picasso convention from Button (see `reference/Button.tsx`).

## Example 3: Raw hex / px → Picasso token (with TODO fallback)

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

**Why**: never invent a Picasso token. If the canonical token exists in `tokens/picasso-tailwind-tokens.md`, use it. If not, use `[arbitrary-value]` AND a `TODO(tokens):` comment so the next reader can resolve. The migration is NOT the place to introduce new tokens — that's a coordinated design-system change.

## Example 4: JSS pseudo `&:hover:not(:disabled)` → Tailwind `hover:enabled:*`

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

**Note on `@base-ui/react`**: if you're migrating away from `:focus-visible` to `@base-ui/react`'s `[data-focused]`, the equivalent is `data-[focused]:outline-2 data-[focused]:outline-blue-500`. See `references/visual-verification.md` §"Worked compensation examples" for that swap.

## Example 5: `theme.spacing(N)` → gap-/space- utilities

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

**Why**: `space-y-*` mirrors the JSS `'& > * + *': { marginTop }` pattern exactly (margin between adjacent children, none on first/last). `gap-*` is preferred for new code, but verify it works on the layout shape (gap only applies inside flex/grid; space-y applies to any block container with multiple children).

---

## Anti-patterns to avoid

- **Don't sprinkle `[arbitrary]` values when a token exists.** Always check `tokens/picasso-tailwind-tokens.md` first.
- **Don't use `style={{...}}` for static values.** Only use inline `style` when the value is computed at runtime from props (Example 3-style "Dynamic values" table above).
- **Don't keep `cx` chains longer than ~6 entries.** If you're listing 10 classes via `cx`, factor into a `createXxxClassNames` function in `styles.ts` (Button pattern).
- **Don't rebuild parent-refs as `:has()`.** Use `data-*` attributes — `:has()` has weaker browser support and is harder to test.
- **Don't compose `twMerge` with user `className` first.** `twMerge(className, structural)` lets the structural classes override the consumer. Reverse: `twMerge(structural, className)` — consumer-last wins (see `references/practices.md` §Tailwind ordering).
