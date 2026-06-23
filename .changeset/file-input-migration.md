---
'@toptal/picasso-file-input': patch
---

### FileInput

- re-implement FileInput, FileList, FileListItem and ProgressBar on plain
  `<input type="file">` + Tailwind; remove `@material-ui/core` JSS
  (`makeStyles` / `createStyles`) and drop the `@material-ui/core` peer
  dependency. Public prop API and behavior are unchanged.
- widen the `react` peer range (drop the `< 19.0.0` upper bound).
