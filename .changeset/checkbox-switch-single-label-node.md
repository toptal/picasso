---
'@toptal/picasso-form-label': minor
'@toptal/picasso-checkbox': minor
'@toptal/picasso-switch': minor
---

### Checkbox, Switch

- expose a single label-associated node when a `label` is provided, so `getByLabelText`, `getByText` and `getByRole` match once. The base-ui control renders an accessible `role` element plus a hidden native `<input>`; both used to be label-associated (the `role` element via `aria-labelledby`, the input via the wrapping `<label>`), which made those queries throw "Found multiple elements" in consumer tests. The control now names itself via `aria-labelledby`. Note the DOM contract change: a labeled control's root element changes from `<label>` to `<div>`, and the derived `"<id>-label"` node id is gone — update selectors/styles that relied on the `label` tag or that id. Label clicks are still forwarded to preserve click-to-toggle and focus, and interactive content inside the label (links, buttons) no longer toggles the control

### FormControlLabel

- add an optional `labelId` prop. When it's provided, the wrapper renders as a non-`<label>` element (so a control's hidden native input is not a second label-associated node) and forwards label-text clicks to the control (skipping interactive descendants). The default `<label>` path is unchanged, so `Radio` and other consumers are unaffected
