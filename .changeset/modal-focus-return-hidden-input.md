---
'@toptal/picasso-modal': patch
---

### Modal

- return focus to the first focusable element even when a hidden input precedes it. `Select` and `Autocomplete` render one to carry the field `name`, so a modal starting with either let focus escape to the page behind it
