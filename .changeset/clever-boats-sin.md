---
'@toptal/picasso': major
---

`Typography` component with prop `size='inherit'` (default) now inherits parent's line-height.

Previously line-height was calculated as `1.5em` but when used in `TableCell` line-height was
calculated to 19.5px.

This change fixes the issue but **may cause some visual changes**. 
It is advised when using custom `font-size` to also set proper `line-height` 
to avoid it. 
