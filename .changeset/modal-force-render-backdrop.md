---
'@toptal/picasso-modal': minor
'@toptal/picasso-drawer': minor
---

### Modal, Drawer

- add a `forceRender` prop, defaulting to `true`, so a modal or drawer nested inside another dialog keeps rendering its backdrop. `@base-ui/react`'s `Dialog.Backdrop` skips rendering whenever it detects a parent dialog in the React tree unless `forceRender` is set, which silently dropped the backdrop of such modals and drawers (for example a `Modal` opened from inside a `Drawer`). Pass `forceRender={false}` to opt into the `@base-ui/react` behavior and render a single, outermost backdrop
