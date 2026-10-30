---
'@toptal/picasso-button': patch
---

### ButtonCheckbox, ButtonRadio

- make the checkbox or radio the only tab stop: the label is no longer a focusable `button` around it; query it by role `checkbox` or `radio` in tests
- show one focus ring, around the label, instead of also ringing the checkbox or radio inside it
