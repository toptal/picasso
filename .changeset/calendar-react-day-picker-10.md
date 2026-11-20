---
'@toptal/picasso-calendar': patch
---

### Calendar

- move to react-day-picker 10, which shares Picasso's date-fns 4 instead of declaring a date-fns 2/3 peer. Layout, selection, navigation and the `renderDay`, `renderMonthHeader` and `renderRoot` contracts are unchanged
- with `dropdownNavigation`, the month dropdown lists all 12 months and disables the ones outside `minDate`/`maxDate`, so it can no longer move past them
- `handleOnClick` given to `renderDay` no longer selects a disabled day, and `handleOnEnter` now drives the range hover preview like the default day does
