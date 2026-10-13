---
'@toptal/picasso-calendar': major
'@toptal/picasso-date-picker': major
'@toptal/picasso': major
---

### Calendar

- **consumer action**: upgrade `date-fns` to `^4.1.0`, the range `@base-ui/react` peers. `react-day-picker@8` still peers on `date-fns ^2 || ^3`, so npm 7+ and yarn installs fail with `ERESOLVE` until you add an override for `react-day-picker > date-fns` or use `--legacy-peer-deps`. This applies through `@toptal/picasso-date-picker` and `@toptal/picasso` too. Runtime is unaffected
- upgrade `react-day-picker` to `^8.10.2`, the first 8.x release that runs on React 19. It renders identically on React 18
- import `isWeekend` and `isSameMonth` from the `date-fns` barrel, since v3 removed the submodules' default exports

### DatePicker

- upgrade `date-fns` to `^4.1.0` and `date-fns-tz` to `^3.2.0`. The `timezone` prop behaves as before
- a `minDate` later than `maxDate` no longer crashes; the interval is treated as swapped

### Picasso

- remove the unused direct `react-day-picker` dependency
