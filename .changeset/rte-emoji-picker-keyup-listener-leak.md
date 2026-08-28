---
'@toptal/picasso-rich-text-editor': patch
---

### RichTextEditor

- fix accumulating `keyup` listeners on `document.body` — the emoji picker's escape-key cleanup passed a new function reference to `removeEventListener`, so every time the picker opened another permanent listener was left behind
