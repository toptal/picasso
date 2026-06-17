---
'@toptal/picasso-page': patch
---

### Page

- Re-implement the `Page` root shell styling on Tailwind; behavioral parity with the JSS implementation, public Props API unchanged
- Remove `@material-ui/core` from `peerDependencies` — consumers no longer need it installed for this package
- Widen the `react` peer range to `>=16.12.0` (React 19 cap lifted)
