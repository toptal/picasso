---
'@toptal/picasso-rich-text-editor': patch
---

### RichTextEditor

- load emoji-mart and its emoji dataset (roughly 100 KB gzipped) when the emoji picker is first opened instead of with every editor, including editors without the emoji plugin. The first open waits for that chunk; if it fails to load, the picker stays empty and the editor keeps working
- stop rebuilding the emoji picker's grid on every editor re-render, such as each keystroke in a controlled editor; only changed props reach emoji-mart
- keep the emoji picker open on a click between emojis. Clicks on non-focusable parts of the editor no longer count as leaving it, so they no longer call `onBlur` and then `onFocus`
- make the `@toptal/picasso-rich-text-editor/eager` entry load the editor and emoji-mart up front. Its imports were dropped at build time, so it loaded them lazily like the main entry
