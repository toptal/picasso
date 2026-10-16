---
'@toptal/picasso-date-picker': major
---

### DatePicker

- upgrade `date-fns-tz` to `^3.2.0`. The `timezone` prop behaves as before
- a `minDate` later than `maxDate` no longer crashes; the interval is treated as swapped
