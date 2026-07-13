# Styling (Tailwind)

> **Rule authority lives in `AGENTS.md §Styling`** (repo root) — one principle
> ("Tailwind is the only styling layer; consumer overrides must always win; let state
> live in the DOM") plus the enforced rules. This guide is the contributor-facing
> companion: the same rules shown as working patterns. When the two disagree,
> AGENTS.md wins — and please fix this file.
> API-level constraints (style hooks are `className`/`style` only, no `classes`/`sx`)
> are CI-enforced via `PICASSO_COMPONENT_DESIGN_PATTERNS.md`.

## How a component is styled

Class strings live in `styles.ts` as **pure functions returning `string[]`**; the
component composes them with `twMerge(...)` and puts the **consumer `className`
last** so it wins on conflicts:

```ts
// styles.ts — pure, no imports from React, no side effects
export const createRootClassNames = (disabled?: boolean): string[] => [
  'flex items-center gap-2 rounded-sm',
  'text-md text-graphite-800',
  disabled ? 'opacity-50 pointer-events-none' : '',
]
```

```tsx
// MyComponent.tsx
import { twMerge } from '@toptal/picasso-tailwind-merge'
import { createRootClassNames } from './styles'

<div
  {...rest}
  ref={ref}
  className={twMerge(...createRootClassNames(disabled), className)}
  style={style}
>
```

`pnpm generate:component` scaffolds exactly this shape.

## Conditional and stateful styling

- **Branching classes** use `cx` (from `classnames`) _inside_ `twMerge` — `cx`
  expresses the branching, `twMerge` resolves Tailwind conflicts
  (`twMerge` takes no object syntax; that's `cx`'s job):

  ```ts
  twMerge(cx('flex', { 'm-0': expanded, 'text-red-500': hasError }), className)
  ```

- **State that exists in the DOM stays in the DOM** — style it with `data-[…]:`
  variants instead of mirroring it into React state:

  ```
  data-[checked]:bg-blue-500 data-[disabled]:opacity-50
  ```

## Tokens

Use Picasso token names from the `@toptal/picasso-tailwind` preset
(`text-graphite-800`, `shadow-2`, `p-4`, …); sizes in `rem` (the lone exception is
a `1px` hairline). An `[arbitrary-value]` needs a `// TODO(tokens): …` comment and
a conversation with designers — never invent token names. If you _extend_ the
preset's class set (new font sizes, new groups), `@toptal/picasso-tailwind-merge`
must learn them in the same change, and that package bumps **major** (stale merge
configs silently mis-merge in consumer apps).

## Global reset & box model

The page-level reset ships as **`@toptal/picasso-tailwind/base`**, imported in the
Tailwind entry CSS and emitted in `@layer base`: border-box page box model,
body/root layout, font smoothing. Being cascade-layered, **all utilities and any
unlayered app CSS win over it** — it's a baseline, never an override. Opting out =
omitting the import. Tailwind's full preflight stays off; don't write styles that
depend on preflight normalizations (heading margins, form resets).

## Overriding — the ladder

No `!important`, ever. If a style won't win, walk the ladder: _don't override_ →
`data-[…]:` variant / consumer `className` → `render` prop → (last resort) inline
`style`. Reaching for `!important` means a rung was skipped. No `.css`/`.scss`/
`.module.css` files, no JSS (`makeStyles`/`createStyles`/`withStyles`) — those
patterns left with the MUI v4 migration.

## Gotchas

- **Tailwind only generates classes it can _see_.** The `content` globs in
  `tailwind.config.js` scan `.storybook/**` and `packages/*/src/**` — a class
  authored anywhere else silently produces nothing. Dynamic string-built class
  names (`` `text-${color}` ``) are invisible to the scanner; write full literals.
- **Whole-pixel geometry.** Sub-pixel positions blur borders and text — avoid
  `translate(-50%, …)` on odd-size elements, uneven `%` widths, fractional
  `line-height`. (Exception: Base UI primitives that self-center — accept their
  geometry.)
- **Visual changes are gated by Happo** — see
  [Visual snapshots](https://picasso.toptal.net/?path=/story/contribution-visual-snapshots--visual-snapshots).
  A styling PR with unexplained diffs won't merge.

## Related

- `AGENTS.md §Styling` (repo root) — the canonical rules
- `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root) — CI-enforced API surface (incl. style hooks)
- [Merging classes tutorial](https://picasso.toptal.net/?path=/story/tutorials-merging-classes--merging-classes)
- [New components](https://picasso.toptal.net/?path=/story/contribution-new-components--new-components)
  · [Visual snapshots](https://picasso.toptal.net/?path=/story/contribution-visual-snapshots--visual-snapshots)
