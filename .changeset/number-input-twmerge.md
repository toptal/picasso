---
'@toptal/picasso-number-input': patch
---

### NumberInput

- the `NumberInputEndAdornment` resolves its classes with `twMerge` and drops `bg-inherit`, `border-x-solid` and `active:[&+&]:border-t-solid`, which never applied. No visual change
