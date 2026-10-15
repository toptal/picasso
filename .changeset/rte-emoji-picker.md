---
'@toptal/picasso-rich-text-editor': patch
---

### RichTextEditor

- drop `@emoji-mart/react`, unpublished since January 2023 and with a peer range that excludes React 19, for a local wrapper over `emoji-mart`
- push only changed props into the emoji picker, so its grid no longer rebuilds on every editor re-render
- load emoji-mart and its dataset (about 100 KB gzipped) on the first picker open instead of with every editor; if loading fails, the picker stays empty and the editor keeps working
- make the `/eager` entry load the editor and emoji-mart up front; it loaded them lazily like the main entry
- keep the emoji picker open on a click between emojis, and stop calling `onBlur` and `onFocus` on clicks on non-focusable parts of the editor
- stop leaking a `keyup` listener on `document.body` each time the picker opens
