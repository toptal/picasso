---
'@toptal/picasso-popper': minor
'@toptal/picasso-select': patch
'@toptal/picasso-autocomplete': patch
'@toptal/picasso-dropdown': patch
'@toptal/picasso-menu': patch
'@toptal/picasso-date-picker': patch
---

### Popper

- add a `role` prop for the floating element (defaults to `tooltip`)

### DatePicker

- expose the calendar popup as `role="dialog"` instead of Popper's default `tooltip`

### Select / Autocomplete / Dropdown / Menu

- mark the popup positioning wrapper as `role="presentation"` — the inner listbox/menu owns the popup semantics, so assistive tech no longer announces these popups as tooltips
