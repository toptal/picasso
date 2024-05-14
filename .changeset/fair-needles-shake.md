---
'@toptal/picasso-notification': major
---

- migrate from MUI to TailwindCSS and MUI Base UI
- change the `role` attribute from `alert` to `presentation` due to an issue with the screen readers in Firefox ([https://github.com/mui/material-ui/issues/29080](related issue))
- change `onClose` type from `(event: MouseEvent<HTMLButtonElement>) => void` to `(event: Event | SyntheticEvent<HTMLButtonElement ,Event> | null) => void` due to the new type defined for the function in MUI/Base Snackbar [API](https://mui.com/base-ui/react-snackbar/components-api/#snackbar-prop-onClose)
