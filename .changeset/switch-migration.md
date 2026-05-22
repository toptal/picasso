---
'@toptal/picasso-switch': patch
---

### Switch

- Migrate internals from @mui/base to @base-ui/react (behavioral parity); compound parts (`Switch.Root` + `Switch.Thumb`) replace the single `@mui/base/Switch` slot system
- Adapt the public `onChange(event, checked)` callback over base-ui's `onCheckedChange` so consumer signatures are preserved
- Lift the `react` peer-dependency upper bound to `>=16.12.0` (drop the `< 19.0.0` cap)
