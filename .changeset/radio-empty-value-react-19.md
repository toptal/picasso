---
'@toptal/picasso-radio': patch
---

### Radio

- a `Radio` or `Button.Radio` without a `value` reports `""` as its DOM value on React 19 too, instead of the browser's `"on"`
