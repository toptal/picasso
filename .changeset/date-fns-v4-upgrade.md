---
'@toptal/picasso-calendar': major
'@toptal/picasso-date-picker': major
'@toptal/picasso': major
---

### Calendar

- **consumer action** (the reason for the major): `@toptal/picasso-calendar` now installs `date-fns@^4`, while its `react-day-picker@8` dependency still declares a `date-fns ^2 || ^3` peer that no 8.x release widens. npm 7+ and yarn consumers, direct or via `@toptal/picasso`, hit an `ERESOLVE` peer conflict on install until they add an override for `react-day-picker > date-fns` or install with `--legacy-peer-deps`. Runtime is unaffected: react-day-picker reaches date-fns only through named barrel imports, and all 31 functions it uses are unchanged in v4. The peer disappears with the react-day-picker v9 migration (PF-2297)
- upgrade `date-fns` to `^4.1.0`, the range `@base-ui/react` peers
- import `isWeekend` and `isSameMonth` from the `date-fns` barrel; date-fns v3 removed the default export from every submodule, so the old form resolves to `undefined`

### DatePicker

- upgrade `date-fns` to `^4.1.0` and `date-fns-tz` to `^3.2.0`, the first `date-fns-tz` line whose peer range admits date-fns v3 and v4
- rename `utcToZonedTime` to `toZonedTime`, which is what `date-fns-tz@3` calls it. This is internal to `timezoneConvert`; the `timezone` prop behaves exactly as before
- import `parse`, `isValid`, `format`, `isWithinInterval`, `isEqual`, `isBefore` and `isAfter` from the `date-fns` barrel instead of per-function submodules, for the same reason as Calendar
- one absorbed upstream semantic: date-fns v3+ `isWithinInterval` normalizes reversed intervals instead of throwing, so a `DatePicker` given `minDate > maxDate` no longer crashes and treats the interval as swapped

### Picasso

- major for `@toptal/picasso-date-picker` and the `@toptal/picasso` aggregate alongside Calendar: both install `@toptal/picasso-calendar`, so the same install-time peer conflict reaches their consumers, with the same resolution

No other API or behavior change in any package.
