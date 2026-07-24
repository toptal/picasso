---
'@toptal/picasso-checkbox': major
---

### Checkbox

- Re-implement on `@base-ui/react/checkbox`; JSS styling rewritten to Tailwind. Public prop API (`checked`, `disabled`, `indeterminate`, `label`, `onChange`, `value`, …) is unchanged and behavioral parity is verified by snapshots, unit tests, and Happo.
- Breaking: the rendered DOM changes. The control is now a `<span role="checkbox">` plus a visually-hidden native `<input type="checkbox">` (was a single MUI `<button>`/`<input>`). Consumers selecting the control in tests should target `role="checkbox"` (or the hidden input) rather than the old MUI button markup, and `ref` now resolves to the Base UI root element.
- `@material-ui/core` removed from `peerDependencies`; the React `< 19` peer cap is lifted.
- `CheckboxGroup` is unchanged (already Grid + Tailwind, MUI-free).
