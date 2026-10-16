---
'@toptal/picasso-autocomplete': patch
---

### Autocomplete

- on React 19, an `inputComponent` that takes `ref` as a prop receives the input ref, which Autocomplete used to drop with a `forwardRef` error. A class component still doesn't
- a `forwardRef` component wrapped in `memo` receives the input ref on React 17 and 18 too, where Autocomplete dropped it with the same error
