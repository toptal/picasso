---
'@toptal/picasso-switch': major
---

### Switch

- place the top-level `data-testid` of a labeled `Switch` on the `[role="switch"]` element instead of the label wrapper, aligning it with `Checkbox` and with the unlabeled `Switch` (previously the placement changed when a `label` was added). Tests that resolved a labeled Switch testid to the wrapper — e.g. asserting label text on it or calling `.find('input')` from it — should query the label text directly, or use the new `testIds.input` to address the hidden input
