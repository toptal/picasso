---
'@toptal/picasso-modal': patch
'@toptal/picasso-date-picker': patch
---

### Modal

- exempt Popper-based popups (Select, DatePicker, Dropdown, Menu) from the focus trap, so focus is no longer stolen from a popup opened inside a Modal (e.g. a Select's search input)

### DatePicker

- fix Tab dead-ending on the input when entering an open calendar a second time
- fix Shift+Tab on the input jumping forward into the calendar instead of moving back to the previous field
