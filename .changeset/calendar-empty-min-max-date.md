---
'@toptal/picasso-calendar': patch
---

- ignore an empty `minDate` or `maxDate` again, as before react-day-picker 10; forms pass `''` for an empty date field, and the calendar crashed on it
