---
'@toptal/picasso-page': major
---

### Page

- Re-implement the `Page` root shell styling on Tailwind; behavioral parity with the JSS implementation, public Props API unchanged
- BREAKING: the root element no longer emits the JSS-generated `Page-root` class name — consumer CSS or test selectors targeting `.Page-root` must switch to `className` / `data-testid` hooks
- Remove `@material-ui/core` from `peerDependencies` — consumers no longer need it installed for this package
- Widen the `react` peer range to `>=16.12.0` (React 19 cap lifted)
