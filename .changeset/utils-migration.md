---
'@toptal/picasso-utils': patch
---

### Utils

- re-implement off `@material-ui/core`; public API unchanged (behavioral parity).
- `capitalize` is now a local implementation (identical output to MUI's, including the throw on non-string input).
- the `ClickAwayListener` is now a local Picasso component (same `onClickAway` / `mouseEvent` / `touchEvent` / `disableReactTree` surface).
- the `Rotate180` transition migrated from JSS to Tailwind (`transition-transform duration-150 ease-in-out` + `rotate-180`); animation timing/curve unchanged.
- drop `@material-ui/core` peer dependency.
