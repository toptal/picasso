# JSS → Tailwind cribsheet

Pattern table for translating common JSS shapes into Picasso Tailwind. Use alongside `tokens/picasso-tailwind-tokens.md` for token names.

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
