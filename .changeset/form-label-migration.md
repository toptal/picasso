---
'@toptal/picasso-form-label': patch
---

### FormLabel

- Drop `@material-ui/core` from `peerDependencies`; widen React peer range to `>=16.12.0` (drop `<19.0.0` upper bound). Replace the lone `import type { FormControlLabelProps } from '@material-ui/core/FormControlLabel'` with a local `onChange` type. Public API unchanged; `FormControlLabel`'s narrowed `classes?: { root?, label? }` slot surface preserved for Switch/Radio/Checkbox consumers.
