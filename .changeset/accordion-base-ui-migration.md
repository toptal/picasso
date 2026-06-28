---
'@toptal/picasso-accordion': patch
---

### Accordion

- Re-implement on `@base-ui/react/accordion` + Tailwind with behavioral parity for `children`, `content`, `expanded`, `defaultExpanded`, `disabled`, `expandIcon`, `borders`, `onChange`, `testIds` and `transitionProps`
- The expand/collapse animation is now CSS-driven. `transitionProps.timeout` (number, or `enter`/`exit`) sets the transition duration in ms (the previous height-dependent `timeout: 'auto'` default is approximated by a fixed 300ms); `transitionProps.onExited` still fires after the collapse transition completes
- Drop the vestigial `classes` prop (a no-op since the `@mui/base` / `@material-ui/core` internals were removed) — style overrides go through `className` / `style`
- Remove the `@material-ui/core` peer dependency and lift the React `< 19.0.0` peer cap
