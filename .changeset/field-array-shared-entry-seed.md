---
'@toptal/picasso-forms': patch
---

### FieldArray

- render the items of an array's own `initialValue` or `defaultValue` on its first render also when another field already reads that array with nothing stored, as a wizard step that reads the array before the step that seeds it does
