---
'@toptal/picasso-rich-text-editor': patch
---

### RichTextEditor

- drop the `@emoji-mart/react` dependency and render emoji-mart's `Picker` through a local component instead. `@emoji-mart/react@1.1.1` is the latest release, was last published in January 2023, and declares a `react` peer range of `^16.8 || ^17 || ^18` that excludes React 19 — so no upgrade could unblock React 19 support. The wrapper was around 20 lines and used no API React 19 removes, so owning it removes the constraint without changing behavior. `emoji-mart` and `@emoji-mart/data` were already direct dependencies and are unchanged, so nothing is added to the dependency tree
- the local component pushes prop updates into the picker from an effect. The upstream wrapper did this during render, which is a render-phase side effect
