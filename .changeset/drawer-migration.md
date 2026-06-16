---
'@toptal/picasso-drawer': patch
---

### Drawer

- Re-implement on `@base-ui/react/dialog` (`Dialog.Root` + `Dialog.Portal` + `Dialog.Backdrop` + `Dialog.Popup`), replacing the `@mui/base/Modal` backing. The Dialog primitive (not `@base-ui/react/drawer`) backs Picasso's Drawer because Drawer has no swipe affordance and `@base-ui/react/drawer` always enables swipe-to-dismiss. The public Props API and behavior are unchanged — backdrop-click and Escape dismissal are preserved; `disableBackdrop` keeps page content interactive and disables outside-press dismissal.
- Slide/backdrop transitions are now driven by `@base-ui/react` `data-[starting-style]`/`data-[ending-style]` instead of `@toptal/picasso-slide` and `@toptal/picasso-backdrop`. The rendered DOM changes from the `@mui/base` Modal shape; internal `base-Modal-*` markup (never part of the public API) is gone, so tests asserting on it need new selectors.
