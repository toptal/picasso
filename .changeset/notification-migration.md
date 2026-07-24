---
'@toptal/picasso-notification': major
---

### Notification

- replace the `@material-ui/core/Snackbar` `SnackbarOrigin` type import with a Picasso-native structural type; behavioral parity, `notistack` integration unchanged.
- drop the vestigial public `classes` prop (audit-verified 0 internal/external usage) via `Omit<StandardProps, 'classes'>`. Removing the prop from the public type is the breaking surface.
