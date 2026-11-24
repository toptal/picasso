---
'@toptal/picasso-calendar': major
---

### Calendar

- move to react-day-picker 10, which shares Picasso's date-fns 4 instead of declaring a date-fns 2/3 peer. Layout, selection and the typed `renderDay`, `renderMonthHeader` and `renderRoot` contracts are unchanged
- with `dropdownNavigation`, the month dropdown lists all 12 months and disables the ones outside `minDate`/`maxDate`, and picking a year moves to the nearest allowed month, so the dropdowns can no longer move past the limits
- `handleOnClick` given to `renderDay` no longer selects a disabled day, and `handleOnEnter` now drives the range hover preview like the default day does
- `renderMonthHeader` no longer receives the untyped `id` and `displayIndex` arguments
- the exported `CalendarDay` and `CalendarMonthHeader` now take react-day-picker 10's `DayButton` and `MonthCaption` slot props; like before, they only work inside the calendar
- the rendered markup follows react-day-picker 10 (`rdp-root` classes, `gridcell` cells with `data-day`, a labelled grid, weekday `aria-label`s, day buttons named by their full date), so snapshot tests that render Calendar or an open DatePicker need updating
