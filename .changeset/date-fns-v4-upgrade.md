---
'@toptal/picasso-calendar': major
'@toptal/picasso-date-picker': major
'@toptal/picasso': major
---

### Calendar and DatePicker

- upgrade `date-fns` to `^4.1.0`, inside the `^4.0.0` range `@base-ui/react` peers on. It's Picasso's own dependency, so an app's code can stay on its `date-fns` version
- npm, yarn and pnpm warn about `react-day-picker@8`'s `date-fns` peer (`^2.28.0 || ^3.0.0`), which Picasso's `date-fns` 4 is outside of. By default the install doesn't fail, and runtime is unaffected
