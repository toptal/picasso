---
'@toptal/picasso-menu': patch
---

### Menu

- Drop the stale `@mui/base` dependency declaration; source already runs on `@toptal/picasso-popper` + `@toptal/picasso-paper`. Public API unchanged, behavioral parity preserved.
- Lift the `react` peer cap to `>=16.12.0`.
