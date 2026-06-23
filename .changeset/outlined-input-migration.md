---
'@toptal/picasso-outlined-input': patch
---

### OutlinedInput
- Re-implement on native elements + `react-textarea-autosize`, removing `@mui/base` (`Input` / `TextareaAutosize`) and the `@material-ui/core` `InputBaseComponentProps` type; public API unchanged.
- Behavioral parity: outline root, `startAdornment` / `endAdornment`, `inputComponent`, `multiline` (`rows` / `rowsMax`), `error` / `warning` / `success` states, the narrowed `classes?: { input?, root? }` slots, and root-click-to-focus are all preserved.
