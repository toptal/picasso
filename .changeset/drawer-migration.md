---
'@toptal/picasso-drawer': major
---

### Drawer

- Migrate internals from @mui/base/Modal to @base-ui/react/drawer compound parts (`Drawer.Root` + `Drawer.Portal` + `Drawer.Viewport` + `Drawer.Backdrop` + `Drawer.Popup`)
- Inline the backdrop as `Drawer.Backdrop` with Tailwind classes preserving the prior visual (drops the runtime dependency on `@toptal/picasso-backdrop`)
- Drop `@material-ui/core` from `peerDependencies` and `@mui/base` from `dependencies`; lift the `react` peer-dependency upper bound to `>=16.12.0` (drop the `< 19.0.0` cap)
- Animation now driven by @base-ui/react native CSS transitions on `Drawer.Popup` via `data-[starting-style]` / `data-[ending-style]` Tailwind variants (replaces internal `react-transition-group/Slide`); drops the runtime dependency on `@toptal/picasso-slide`
- **NEW behavior — swipe-to-dismiss:** @base-ui/react/drawer enables swipe-to-dismiss gestures keyed to the `anchor` prop. **Guarded by a new opt-out prop `disableSwipeToDismiss`** (default `false` — pass `true` to disable, restoring the prior no-swipe behavior)
- `disablePortal` preserved — when `true`, renders the drawer viewport inline (no portal); default (`false`) portals into the document body
