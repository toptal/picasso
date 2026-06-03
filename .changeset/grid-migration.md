---
'@toptal/picasso-grid': patch
---

### Grid

- Replace the MUI v4 `GridSize` type re-export with the Picasso-native `GridSize` union; public API unchanged, behavioral parity preserved.
- Drop `@material-ui/core` peer dependency and widen the React peer range to `>=16.12.0`.
