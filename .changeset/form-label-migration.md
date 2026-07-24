---
'@toptal/picasso-form-label': patch
---

### FormLabel

- drop `@material-ui/core` from `peerDependencies`. Replace the lone `import type { FormControlLabelProps } from '@material-ui/core/FormControlLabel'` with a local `onChange` type. Public API unchanged; `FormControlLabel`'s narrowed `classes?: { root?, label? }` slot surface preserved for Switch/Radio/Checkbox consumers.
