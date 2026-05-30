---
'@toptal/picasso-switch': major
---

### Switch

- Migrate internals from @mui/base to @base-ui/react (behavioral parity); compound parts (`Switch.Root` + `Switch.Thumb`) replace the single `@mui/base/Switch` slot system
- Adapt the public `onChange(event, checked)` callback over base-ui's `onCheckedChange` so consumer signatures are preserved
- **Breaking:** `ref` and event-handler element types change from `HTMLButtonElement` to `HTMLSpanElement` to match the rendered `<span>` (base-ui's `Switch.Root`). Button-only HTML attributes (`type`, `form`, `formAction`, …) are no longer accepted; the native `value` prop is preserved
- Lift the `react` peer-dependency upper bound to `>=16.12.0` (drop the `< 19.0.0` cap)
