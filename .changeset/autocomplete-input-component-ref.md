---
'@toptal/picasso-autocomplete': patch
---

### Autocomplete

- on React 19, an `inputComponent` that takes `ref` as a prop receives the input ref, which Autocomplete used to drop with a `forwardRef` error. A class component still doesn't
