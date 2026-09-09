---
'@toptal/picasso-modal': patch
---

### Modal

- fix a `Select` or `Autocomplete` popup inside a `Modal` closing as soon as it opens. The focus trap read `document.activeElement`, which is still the outgoing element during capture-phase `focus` dispatch, so focus entering a popper portaled outside the modal looked like an escape and was pulled back
- the trap did nothing in modals whose first focusable match was a hidden input, so it now applies where it previously did not
