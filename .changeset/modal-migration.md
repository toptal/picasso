---
'@toptal/picasso-modal': patch
---

### Modal

- Re-implement on `@base-ui/react`'s `Dialog` (`Dialog.Root` + `Dialog.Portal` + `Dialog.Backdrop` + `Dialog.Popup`), replacing `@mui/base/Modal`. Public Props API is unchanged — `open`, `onClose`, `onOpen`, `onBackdropClick`, `disableBackdropClick`, `hideBackdrop`, `container`, `size`, `align`, `transitionProps`, `transitionDuration`, `paperProps`, `testIds` and the narrowed `classes?: { closeButton }` are all preserved, with behavioral parity (custom focus management, page scroll lock, multi-modal coexistence, backdrop-click and escape close).
- Internally the dim overlay is now a `Dialog.Backdrop` element instead of the composed `@toptal/picasso-backdrop` component, and the open/close fade is driven by `data-starting-style`/`data-ending-style` Tailwind transitions instead of `@toptal/picasso-fade`.
- `@mui/base`, `@toptal/picasso-backdrop` and `@toptal/picasso-fade` are dropped from dependencies; the `react` peer cap is lifted to `>=16.12.0`.
