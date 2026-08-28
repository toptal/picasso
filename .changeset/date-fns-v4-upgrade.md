---
'@toptal/picasso-calendar': major
'@toptal/picasso-date-picker': patch
'@toptal/picasso': patch
---

### Calendar

- upgrade `date-fns` to `^4.1.0`. `@base-ui/react` — the primitive layer the kit is migrating to — peers `date-fns: ^4.0.0`, which the previous `^2.30.0` did not satisfy
- import `isWeekend` and `isSameMonth` from the `date-fns` barrel instead of the `date-fns/isWeekend` and `date-fns/isSameMonth` submodules. date-fns v3 removed the default export from every submodule, so the old form resolves to `undefined`
- **consumer action (the reason for the major)**: `react-day-picker@8.x` declares a required peer of `date-fns: ^2.28.0 || ^3.0.0` and no 8.x release admits v4, while this package now ships `date-fns@^4` alongside it. npm 7+ and yarn consumers of `@toptal/picasso-calendar` (directly or via `@toptal/picasso`) will hit an `ERESOLVE` peer conflict on install and need `--legacy-peer-deps` or an override for `react-day-picker > date-fns` until the react-day-picker v9+ migration (PF-2297) removes that peer entirely. The combination is verified safe at runtime: react-day-picker reaches date-fns only through named barrel imports, and all 31 functions it uses are unchanged in v4

### DatePicker

- upgrade `date-fns` to `^4.1.0` and `date-fns-tz` to `^3.2.0`. `date-fns-tz@3` is required because it is the first line whose peer range admits date-fns v3 and v4
- rename `utcToZonedTime` to `toZonedTime`, which is what `date-fns-tz@3` calls it. This is internal to `timezoneConvert`; the `timezone` prop behaves exactly as before
- import `parse`, `isValid`, `format`, `isWithinInterval`, `isEqual`, `isBefore` and `isAfter` from the `date-fns` barrel instead of per-function submodules, for the same reason as Calendar
- one absorbed upstream semantic: date-fns v3+ `isWithinInterval` normalizes reversed intervals instead of throwing, so a `DatePicker` given `minDate > maxDate` no longer crashes and treats the interval as swapped

No other API or behavior change in any package. The
`peerDependencyRules.allowedVersions` entry in `pnpm-workspace.yaml` silences
the react-day-picker peer warning for development in this repository only —
that file is not published, so it does not change what consumers install.
