---
'@toptal/picasso-tabs': patch
---

### Tabs

- Re-implement on `@base-ui/react`; public API unchanged (behavioral parity).
- Swap `@mui/base/Tabs` + `@mui/base/TabsList` + `@mui/base/Tab` for `@base-ui/react/tabs` (`Tabs.Root` + `Tabs.List` + `Tabs.Tab`).
- Restore MUI v4's sliding active-tab underline on horizontal tabs via `Tabs.Indicator` (the Tailwind migration had replaced it with a static per-tab box-shadow). Vertical tabs keep the static per-tab active bar — no slide.
- Lift the `react` peer cap to `>=16.12.0`.
