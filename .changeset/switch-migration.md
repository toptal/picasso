---
'@toptal/picasso-switch': patch
---

### Switch

- re-implement on `@base-ui/react` (behavioral parity); compound parts (`Switch.Root` + `Switch.Thumb`) replace the single `@mui/base/Switch` slot system
- adapt the public `onChange(event, checked)` callback over base-ui's `onCheckedChange` so consumer signatures are preserved
- public API unchanged: `Props` and `ref` keep master's `HTMLButtonElement` typing
