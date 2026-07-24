---
'@toptal/picasso-rich-text-editor': major
---

### RichTextEditor

- re-implement styling on Tailwind; remove the `@material-ui/core` dependency (JSS `makeStyles`/`createStyles` → static Tailwind class maps and arbitrary variants). Public component API is unchanged and behavioral parity is the goal.
- **breaking**: editor content is no longer styled through MUI/JSS-generated class names (`makeStyles` `name:`-prefixed classes such as `LexicalEditor-editorContainer-*`, `PicassoCode-*`, etc.). Consumers that targeted those generated class names from their own stylesheets must migrate to the Tailwind-based markup.
- remove `@material-ui/core` from `peerDependencies` and `devDependencies`.
