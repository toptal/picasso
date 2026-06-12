---
'@toptal/picasso-rich-text-editor': major
---

### RichTextEditor

- Re-implement styling on Tailwind; remove the `@material-ui/core` dependency (JSS `makeStyles`/`createStyles` → static Tailwind class maps and arbitrary variants). Public component API is unchanged and behavioral parity is the goal.
- **Breaking**: editor content is no longer styled through MUI/JSS-generated class names (`makeStyles` `name:`-prefixed classes such as `LexicalEditor-editorContainer-*`, `PicassoCode-*`, etc.). Consumers that targeted those generated class names from their own stylesheets must migrate to the Tailwind-based markup.
- `@material-ui/core` removed from `peerDependencies` and `devDependencies`; the `react`/`react-dom` peer cap is widened to `>=16.12.0` (React 19 unblocked).
