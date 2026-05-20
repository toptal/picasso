---
'@toptal/picasso-drawer': major
---

### Drawer

- Migrate internals from @mui/base/Modal to @base-ui/react/drawer compound parts (`Drawer.Root` + `Drawer.Portal` + `Drawer.Viewport` + `Drawer.Backdrop` + `Drawer.Popup`)
- Inline the backdrop as `Drawer.Backdrop` with Tailwind classes preserving the prior visual (drops the runtime dependency on `@toptal/picasso-backdrop`)
- Drop `@material-ui/core` from `peerDependencies` and `@mui/base` from `dependencies`; lift the `react` peer-dependency upper bound to `>=16.12.0` (drop the `< 19.0.0` cap)
- Gain swipe-to-dismiss gestures from `@base-ui/react/drawer` keyed to the `anchor` prop (new behavior; no existing API surface to disable it)
- `disablePortal` preserved — when `true`, renders the drawer viewport inline (no portal); default (`false`) portals into the document body
