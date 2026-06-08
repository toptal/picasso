---
'@toptal/picasso-drawer': major
---

### Drawer

- Re-implement on `@base-ui/react/drawer` (`Drawer.Root` + `Drawer.Portal` + `Drawer.Backdrop` + `Drawer.Popup`), replacing the `@mui/base/Modal` backing. The public Props API and behavior are unchanged — swipe-to-dismiss is omitted (no `Drawer.Viewport`) to preserve the legacy backdrop-click/Escape-only dismissal. Backdrop-click and Escape dismissal are preserved; `disableBackdrop` keeps page content interactive and disables outside-press dismissal.
- Slide/backdrop transitions are now driven by `@base-ui/react` `data-[starting-style]`/`data-[ending-style]` instead of `@toptal/picasso-slide` and `@toptal/picasso-backdrop`. The rendered DOM changes from the `@mui/base` Modal shape — consumers asserting on internal `base-Modal-*` markup must update their selectors.
