---
'@toptal/picasso-tabs': patch
---

### Tabs

- re-implement on `@base-ui/react`; public API unchanged (behavioral parity).
- swap `@mui/base/Tabs` + `@mui/base/TabsList` + `@mui/base/Tab` for `@base-ui/react/tabs` (`Tabs.Root` + `Tabs.List` + `Tabs.Tab`).
- restore MUI v4's sliding active-tab underline on horizontal tabs via `Tabs.Indicator` (the Tailwind migration had replaced it with a static per-tab box-shadow). Vertical tabs keep the static per-tab active bar — no slide.
