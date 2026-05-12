---
'@toptal/picasso-drawer': patch
'@toptal/picasso-modal': patch
'@toptal/picasso-utils': minor
'@toptal/picasso': patch
---

- fix `Maximum call stack size exceeded` when a `Drawer` is opened inside an open `Modal`. `Modal` opts out of MUI's `FocusTrap` and uses its own document-level focus listener while `Drawer` keeps MUI's, so the two mechanisms recurse on `Element.focus()`. `Drawer` now registers with the shared `ModalManager` singleton, letting the underlying `Modal` bail out of its focus listener when a `Drawer` is on top.
