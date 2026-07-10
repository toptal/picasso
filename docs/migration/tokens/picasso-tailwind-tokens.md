# Picasso Tailwind tokens (canonical reference)

Tokens available to migrated components via the composed Tailwind config (`@toptal/base-tailwind` + `@toptal/picasso-tailwind` presets).

**Source files** (do not edit this doc by hand if these change — regenerate):
- `packages/picasso-tailwind/src/index.js` — Picasso preset.
- `packages/base-tailwind/src/index.js` — BASE preset extension.
- `tailwind.config.js` (repo root) — composes both.

When migrating a component, **prefer Picasso tokens to raw values**. If no token exists for a value, keep the literal but add `// TODO(tokens): <description>` so P1-FIG-03 can triage.

---

## Screens (breakpoints)

```
xs: 0px      sm: 480px    md: 768px    lg: 1024px    xl: 1440px
```

Usage: `md:flex`, `xl:gap-12`.

## Spacing

`@toptal/picasso-tailwind` deviates from the Tailwind default — only the values below are valid. Reference: [BASE Spacing wiki](https://toptal-core.atlassian.net/wiki/spaces/Base/pages/3217031216/Spacing).

| Token | Value | Use |
|---|---|---|
| `0`  | `0`       | reset |
| `1`  | `0.25rem` | 4px |
| `2`  | `0.5rem`  | 8px |
| `3`  | `0.75rem` | 12px |
| `4`  | `1rem`    | 16px (default unit) |
| `6`  | `1.5rem`  | 24px |
| `8`  | `2rem`    | 32px |
| `10` | `2.5rem`  | 40px |
| `12` | `3rem`    | 48px |

Drives `m-*`, `p-*`, `gap-*`, `mx-*`, `space-x-*`, etc.

**Important:** `5`, `7`, `9`, `11`, etc. are **not valid** Picasso tokens. Don't write `m-5` — Tailwind will not produce a class.

`minWidth`, `maxWidth`, `minHeight`, `maxHeight` extend `spacing` plus:

| Token | Value | Use |
|---|---|---|
| `min-w-14` | `3.5rem` | |
| `min-w-16` | `4rem`   | |
| `min-w-24` | `6rem`   | |
| `max-w-1/12` … `max-w-11/12` | 12-column grid widths |

## Border radius

```
rounded-none = 0px
rounded-sm   = 4px
rounded-md   = 8px
rounded-full = 9999px
```

## Border width

```
border       = 1px (default)
border-0     = 0px
```

## Font family

```
font-sans = proxima-nova, Arial, sans-serif
font-mono = ui-monospace, SFMono-Regular, Menlo, ...
```

## Font weight

```
font-inherit  = inherit
font-thin     = 100
font-light    = 300
font-regular  = 400
font-semibold = 600
```

## Font size

| Token | Size | Line height |
|---|---|---|
| `text-2xs`  | 0.688rem | 1rem    |
| `text-xxs`  | 0.75rem  | 1.125rem |
| `text-sm`   | 0.8125rem | 1.25rem |
| `text-md`   | 0.875rem | 1.375rem |
| `text-lg`   | 1rem     | 1.5rem  |
| `text-xl`   | 1.25rem  | 1.875rem |
| `text-2xl`  | 1.75rem  | 2.625rem |
| `text-xxl`  | 1.75rem  | 2.625rem |
| `text-button-small`  | 12px | 15px |
| `text-button-medium` | 13px | 16px |
| `text-button-large`  | 15px | 18px |

If you add new font sizes, **also update** `@toptal/picasso-tailwind-merge`.

## Line height (BASE preset)

`leading-5 = 1.25rem` (BASE addition).

## Box shadow

24 named shadow tokens. Picasso semantics:

| Token | Use |
|---|---|
| `shadow-0` | none |
| `shadow-1` | notification center, paper |
| `shadow-2` | modal |
| `shadow-3` | notification growl |
| `shadow-4` | tooltip |
| `shadow-5` | scroll menu |
| `shadow-6` … `shadow-24` | MUI v4 elevation parity (paper levels) |

Use `shadow-1`–`shadow-5` for new components; `shadow-6+` exists for legacy parity (`@material-ui/core/styles/shadows.js` mapping). Marked `TODO: deprecate legacy shadow classes` in the source — don't introduce new uses of 6+.

## Colors

Whole-named colors:

```
white       = #FFFFFF
black       = #000000
transparent
current     (currentColor)
inheritColor (inherit)
```

| Family | Tokens | Notes |
|---|---|---|
| `blue`     | `100 150 400 500 600 700` | `500` is brand primary |
| `green`    | `100 150 500 600 700` | success |
| `gray`     | `50 100 200 300 400 500 600` | neutrals |
| `graphite` | `700 800 900` | dark surfaces, text |
| `red`      | `100 150 500` | error |
| `yellow`   | `100 150 500` | warning |
| `purple`   | `500` | accents |

Classes: `text-blue-500`, `bg-graphite-800`, `border-gray-300`, etc.

## Z-index

```
z-drawer    = 1200
z-modal     = 1300
z-snackbar  = 1400
```

## Width / height / padding (semantic)

```
w-input  = 18.75rem
h-input  = 2rem
p-input  = 0.5rem
```

## Transition duration

```
duration-350 = 350ms
```

(Tailwind defaults `75/100/150/200/300/500/700/1000` are also available.)

## Animations

```
animate-circle-spin   ← @keyframes stroke-dash, 1.4s ease-in-out infinite
```

## Custom utilities (plugin)

```
.font-inherit-weight   { font-weight: inherit }
.font-inherit-size     { font-size: 1em }
```

---

## Cribsheet: most-common JSS → Picasso Tailwind mappings

For the full mapping see [`../rules/jss-to-tailwind-crib.md`](../rules/jss-to-tailwind-crib.md). Summary:

| JSS                                     | Tailwind (Picasso) |
|---|---|
| `color: palette.grey.dark`              | `text-gray-700` (or graphite if dark text) |
| `color: palette.primary.main`           | `text-blue-500` |
| `backgroundColor: palette.grey.light`   | `bg-gray-100` |
| `padding: spacing(2)`                   | `p-4` (MUI's `spacing(2)` = 16px = `p-4`) |
| `marginRight: spacing(1)`               | `mr-2` (MUI's `spacing(1)` = 8px = `mr-2`) |
| `borderRadius: 4`                       | `rounded-sm` |
| `boxShadow: shadows[2]`                 | `shadow-2` |
| `fontWeight: 600`                       | `font-semibold` |
| `transition: 'all 150ms ease'`          | `transition duration-150 ease` |
| `[theme.breakpoints.up('md')]: { ... }` | `md:...` |

**Watch out:** MUI's `spacing(N)` returns `N * 8px` — most code halves to Picasso (`spacing(2)` → `p-4`). Always verify the px value, not the index.
