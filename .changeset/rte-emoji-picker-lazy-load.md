---
'@toptal/picasso-rich-text-editor': patch
---

### RichTextEditor

- load emoji-mart and its emoji dataset (roughly 100 KB gzipped) on the first emoji picker open instead of with every editor, including editors without the emoji plugin; if that chunk fails to load, the picker stays empty and the editor keeps working
- stop rebuilding the emoji picker's grid on every editor re-render, such as each keystroke in a controlled editor
- keep the emoji picker open on a click between emojis; clicks on non-focusable parts of the editor no longer call `onBlur` and then `onFocus`
- make the `/eager` entry load the editor and emoji-mart up front; its imports were dropped at build time, so it loaded them lazily like the main entry
