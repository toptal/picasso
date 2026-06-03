---
'@toptal/picasso-drawer': major
---

### Drawer

- Re-implement on `@base-ui/react/drawer` (`Drawer.Root` + `Drawer.Portal` + `Drawer.Backdrop` + `Drawer.Viewport` + `Drawer.Popup`), replacing the `@mui/base/Modal` backing. The public Props API is unchanged.
- **New behavior — swipe-to-dismiss**: the drawer can now be dismissed by swiping toward its anchored edge (right anchor → swipe right, left → swipe left, top → swipe up, bottom → swipe down), provided by `@base-ui/react`. Backdrop-click and Escape dismissal are preserved; `disableBackdrop` keeps page content interactive and disables outside-press dismissal.
- Slide/backdrop transitions are now driven by `@base-ui/react` `data-[starting-style]`/`data-[ending-style]` instead of `@toptal/picasso-slide` and `@toptal/picasso-backdrop`. The rendered DOM changes from the `@mui/base` Modal shape — consumers asserting on internal `base-Modal-*` markup must update their selectors.
