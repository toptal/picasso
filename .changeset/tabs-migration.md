---
'@toptal/picasso-tabs': patch
---

### Tabs

- Re-implement on `@base-ui/react`; public API unchanged (behavioral parity).
- Swap `@mui/base/Tabs` + `@mui/base/TabsList` + `@mui/base/Tab` for `@base-ui/react/tabs` (`Tabs.Root` + `Tabs.List` + `Tabs.Tab`).
- Lift the `react` peer cap to `>=16.12.0`.
