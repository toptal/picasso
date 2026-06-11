---
'@toptal/picasso-file-input': major
---

### FileInput

- Re-implement FileInput, FileList, FileListItem and ProgressBar on plain
  `<input type="file">` + Tailwind; remove `@material-ui/core` JSS
  (`makeStyles` / `createStyles`) and drop the `@material-ui/core` peer
  dependency. Public prop API and behavior are unchanged (behavioral parity).
- Breaking: the JSS-generated class names (`FileList-root-*`,
  `FileListItem-*`, `PicassoProgressBar-*`) no longer exist — consumers with
  CSS or snapshot selectors keyed on those internal class names must update.
- Widen the `react` peer range (drop the `< 19.0.0` upper bound).
