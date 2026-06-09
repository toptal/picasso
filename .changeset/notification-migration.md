---
'@toptal/picasso-notification': major
---

### Notification
- Replace the `@material-ui/core/Snackbar` `SnackbarOrigin` type import with a Picasso-native structural type; behavioral parity, `notistack` integration unchanged.
- Drop the vestigial public `classes` prop (audit-verified 0 internal/external usage) via `Omit<StandardProps, 'classes'>`. Removing the prop from the public type is the breaking surface.
- Widen the `react` peer range to `>=16.12.0` (drop the `< 19.0.0` upper bound).
