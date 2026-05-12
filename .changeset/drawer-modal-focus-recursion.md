---
'@toptal/picasso-drawer': patch
'@toptal/picasso-modal': patch
'@toptal/picasso-utils': minor
'@toptal/picasso': patch
---

- fix `Maximum call stack size exceeded` when a `Drawer` is opened from inside an open `Modal` and then the `Modal` is closed (ER-49165). `Modal` uses a custom document-level focus listener (with `disableEnforceFocus` on MUI's Modal) while `Drawer` relies on MUI's built-in `FocusTrap`; with both active the two focus mechanisms recursed on `Element.focus()`. `Drawer` now registers with the same shared `ModalManager` singleton that `Modal` uses, so when a `Drawer` is on top the underlying `Modal` correctly identifies itself as no longer the topmost overlay and bails out of its focus listener.
