---
'@toptal/picasso-calendar': patch
'@toptal/picasso-date-picker': patch
'@toptal/picasso': patch
---

### Calendar

- upgrade `date-fns` to `^4.1.0`. `@base-ui/react` — the primitive layer the kit is migrating to — peers `date-fns: ^4.0.0`, which the previous `^2.30.0` did not satisfy
- import `isWeekend` and `isSameMonth` from the `date-fns` barrel instead of the `date-fns/isWeekend` and `date-fns/isSameMonth` submodules. date-fns v3 removed the default export from every submodule, so the old form resolves to `undefined`

### DatePicker

- upgrade `date-fns` to `^4.1.0` and `date-fns-tz` to `^3.2.0`. `date-fns-tz@3` is required because it is the first line whose peer range admits date-fns v3 and v4
- rename `utcToZonedTime` to `toZonedTime`, which is what `date-fns-tz@3` calls it. This is internal to `timezoneConvert`; the `timezone` prop behaves exactly as before
- import `parse`, `isValid`, `format`, `isWithinInterval`, `isEqual`, `isBefore` and `isAfter` from the `date-fns` barrel instead of per-function submodules, for the same reason as Calendar

No API or behavior change in any package. `react-day-picker@8.x` peers
`date-fns: ^2.28.0 || ^3.0.0` and no `8.x` release admits v4, so that peer is now
unsatisfied and recorded as an accepted exception in `pnpm-workspace.yaml`.
It is verified safe: react-day-picker reaches date-fns only through named barrel
imports, and all 31 functions it uses are unchanged in v4. The exception goes
away with the react-day-picker v9+ migration, where date-fns stops being a peer
of that package altogether.
