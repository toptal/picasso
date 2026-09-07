---
'@toptal/picasso-rich-text-editor': patch
---

### RichTextEditor

- drop the `@emoji-mart/react` dependency and render emoji-mart's `Picker` through a local component instead. `@emoji-mart/react` has not been published since January 2023 and its peer range excludes React 19, so no upgrade could unblock React 19; the wrapper was around 20 lines and used no API React 19 removes. `emoji-mart` and `@emoji-mart/data` were already direct dependencies, so nothing is added to the dependency tree
- the local component pushes prop updates into the picker from an effect instead of during render, as the upstream wrapper did
