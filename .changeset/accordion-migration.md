---
'@toptal/picasso-accordion': major
'@toptal/picasso-page': patch
---

### Accordion

- Re-implement on `@base-ui/react/accordion` + Tailwind with behavioral parity for `children`, `content`, `expanded`, `defaultExpanded`, `disabled`, `expandIcon`, `borders`, `onChange` and `testIds`
- BREAKING: remove the `classes` prop from `Accordion`, `AccordionSummary`, `AccordionDetails`, `Accordion.Summary` and `Accordion.Details` — style overrides go through `className` / `style`
- BREAKING: `transitionProps.timeout` is ignored — the expand/collapse animation is CSS-driven; `transitionProps.onExited` still fires after the collapse transition completes
- Remove the `@material-ui/core` peer dependency and lift the React `< 19.0.0` peer cap

### Page

- `SidebarItemAccordion` routes its Accordion slot styling through `className` instead of the removed `classes` prop; no visual change
