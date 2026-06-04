---
'@toptal/picasso-modal-context': patch
---

### ModalContext

- Drop the vestigial `@material-ui/core` peer-dependency (source is a React context provider that imports nothing from MUI) and lift the `react` peer cap to `>=16.12.0`. Public API unchanged; behavioral parity.
