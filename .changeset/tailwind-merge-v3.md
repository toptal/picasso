---
'@toptal/picasso-tailwind-merge': major
---

### TailwindMerge

- upgrade `tailwind-merge` to `^3.6.0`, the line that knows Tailwind v4's classes
- the `shadow-0` to `shadow-24` scale counts as box shadows, so `shadow-none` and arbitrary shadows resolve against it instead of ignoring it, and shadow colors coexist with it instead of erasing it
- a consumer `className` now wins for v4-only utilities that were passed through: `min-h-auto`, `max-h-auto`, `outline-hidden` (over `outline-none`), two-axis `translate-*`, `border-2` against `border-x`/`border-y`, `shrink-<number>` and the trailing `!` important syntax
- `bg-linear-to-*` no longer conflicts with `bg-<color>`, which could drop `Modal.Content`'s scroll shades. Tailwind 3's `bg-gradient-to-*` now does, so use `bg-linear-to-*`
- `twMerge` and `twJoin` keep their signatures
- remove the unused react-transition-group dependency
