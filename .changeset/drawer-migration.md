---
'@toptal/picasso-drawer': major
---

### Drawer

- Migrate internals from @mui/base/Modal to @base-ui/react/drawer compound parts (`Drawer.Root` + `Drawer.Portal` + `Drawer.Viewport` + `Drawer.Backdrop` + `Drawer.Popup`)
- Inline the backdrop as `Drawer.Backdrop` with Tailwind classes preserving the prior visual (drops the runtime dependency on `@toptal/picasso-backdrop`)
- Drop `@material-ui/core` from `peerDependencies` and `@mui/base` from `dependencies`; lift the `react` peer-dependency upper bound to `>=16.12.0` (drop the `< 19.0.0` cap)
- Animation now driven by @base-ui/react native CSS transitions on `Drawer.Popup` via `data-[starting-style]` / `data-[ending-style]` Tailwind variants (replaces internal `react-transition-group/Slide`); drops the runtime dependency on `@toptal/picasso-slide`
- **Swipe-to-dismiss is opt-in (off by default):** @base-ui/react/drawer ships touch swipe-to-dismiss gestures, but this migration disables them by default to preserve pre-migration behavior. Pass `disableSwipeToDismiss={false}` to opt in (gesture is keyed to `anchor`). Will be revisited as a follow-up.
- `disablePortal` preserved — when `true`, renders the drawer viewport inline (no portal); default (`false`) portals into the document body
