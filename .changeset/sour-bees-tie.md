---
'@toptal/picasso-rich-text-editor': patch
---

- fix internal Lexical state being initialized without empty paragraph when `{ root: { children: [] } }` is provided as a default value
- fix editor crash when empty list is being inserted into the editor with no paragraph
