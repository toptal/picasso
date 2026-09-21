---
'@toptal/picasso-select': patch
'@toptal/picasso-outlined-input': minor
---

### Select

- inset the native select by `size` and reserve room for the caret, like every other field; it was a fixed `8px`. A native `width='shrink'` field grows by 4px
- keep the end adornment's reserve on a native select; a leftover MUI `pr-6` rule overrode it and put the icon on the value
- render the empty option only as the `placeholder`, the `enableReset` row, or the empty state; a native select without a placeholder no longer opens with a blank row
- fit a `width='shrink'` field to its value instead of a single character; it no longer clips

### OutlinedInput

- export `spacingBySize`, the field inset per `size`
