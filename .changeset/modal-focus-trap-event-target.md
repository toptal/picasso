---
'@toptal/picasso-modal': patch
---

### Modal

- fix a `Select` or `Autocomplete` popup inside a modal closing the instant it opens. The focus trap read `document.activeElement`, which has not moved yet during the capture-phase `focus` dispatch, so focus landing in a popper portaled outside the modal looked like an escape and got pulled back. The incoming element is now read off the event
