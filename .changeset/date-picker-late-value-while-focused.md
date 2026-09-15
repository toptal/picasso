---
'@toptal/picasso-date-picker': patch
'@toptal/picasso': patch
---

### DatePicker

- show a value that arrives while the input is focused and empty. The input skips an incoming `value` while it has focus, so as not to overwrite what someone is typing, but an empty input the user has not typed into has nothing to protect. A form library that registers its fields in an effect delivers the first value after mount, so an autofocused picker was focused before its value landed and kept an empty input while the calendar showed the right date, and the form then submitted `null`. Text the user has typed, and an input they have cleared themselves, are still protected for as long as the focus lasts
