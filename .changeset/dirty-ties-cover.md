---
'@toptal/picasso': patch
'@toptal/picasso-provider': patch
---

---
PicassoProvider
  - uses `createTheme` instead of deprecated `createMuiTheme` due to the function was renamed

---
Grid
  - uses the `justifyContent` property instead of deprecated `justify` one

---
Loader
  - uses the `determinate` variant property value instead of deprecated `static` one

---
OutlinedInput
  - uses `minRows` and `maxRows` props instead of deprecated `rows` and `rowsMax` respectively
