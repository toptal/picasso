---
'@toptal/picasso-rich-text-editor': patch
---

### RichTextEditor

- fix the emoji picker ignoring every emoji click: the open picker kept `pointer-events: none`, so clicks fell through to the editor underneath and only closed the picker. Its hidden-state classes are now dropped while it is open, and picking an emoji inserts it again. Regression from the Tailwind migration in `v100`
