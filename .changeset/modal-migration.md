---
'@toptal/picasso-modal': major
---

### Modal

- Re-implement on `@base-ui/react`'s `Dialog` (`Dialog.Root` + `Dialog.Portal` + `Dialog.Backdrop` + `Dialog.Popup`), replacing `@mui/base/Modal`. Public Props API is unchanged — `open`, `onClose`, `onOpen`, `onBackdropClick`, `disableBackdropClick`, `hideBackdrop`, `container`, `size`, `align`, `transitionProps`, `transitionDuration`, `paperProps`, `testIds` and the narrowed `classes?: { closeButton }` are all preserved, with behavioral parity (custom focus management, page scroll lock, multi-modal coexistence, backdrop-click and escape close).
- Breaking for consumers that depend on Modal's internal DOM: the dim overlay is now a `Dialog.Backdrop` element instead of the composed `@toptal/picasso-backdrop` component, the open/close fade is driven by `data-[starting-style]`/`data-[ending-style]` Tailwind transitions instead of `@toptal/picasso-fade`, and the portal markup is `@base-ui/react`'s (`data-base-ui-portal`). Class names and element structure under the Modal change; selector- or snapshot-based consumer code must be updated.
- `@mui/base`, `@toptal/picasso-backdrop` and `@toptal/picasso-fade` are dropped from dependencies; the `react` peer cap is lifted to `>=16.12.0`.
