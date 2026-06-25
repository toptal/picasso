---
'@toptal/picasso-accordion': major
---

### Accordion

- Re-implement on `@base-ui/react/accordion` + Tailwind with behavioral parity for `children`, `content`, `expanded`, `defaultExpanded`, `disabled`, `expandIcon`, `borders`, `onChange` and `testIds`
- BREAKING: remove the `classes` prop from `Accordion`, `AccordionSummary`, `AccordionDetails`, `Accordion.Summary` and `Accordion.Details` — style overrides go through `className` / `style`
- BREAKING: the expand/collapse animation is now CSS-driven. `transitionProps.timeout` (number, or `enter`/`exit`) sets the transition duration in ms; the previous height-dependent `timeout: 'auto'` default is approximated by a fixed 300ms. `transitionProps.onExited` still fires after the collapse transition completes
- Remove the `@material-ui/core` peer dependency and lift the React `< 19.0.0` peer cap
