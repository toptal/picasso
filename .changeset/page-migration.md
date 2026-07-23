---
'@toptal/picasso-page': patch
---

### Page

- re-implement the `Page` root shell styling on Tailwind; behavioral parity with the JSS implementation, public Props API unchanged
- remove `@material-ui/core` from `peerDependencies` — consumers no longer need it installed for this package
