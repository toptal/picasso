---
'@toptal/picasso-calendar': patch
---

### Calendar

- upgrade `react-day-picker` to `^8.10.2` so the package can run under React 19. `8.10.2` is the first release whose `react` peer range admits `^19.0.0`, and it is the last release of the `8.x` line. It also stops inlining React 18's `react-jsx-runtime` into its bundle and imports `react/jsx-runtime` instead — the inlined copy read `React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`, which React 19 removes, so under React 19 importing `8.10.0` threw `Cannot read properties of undefined` before anything rendered
- no `@toptal/picasso-calendar` API or behavior change. `8.10.2` keeps the whole v8 export surface, including the `useDayRender`, `useDayPicker` and `useNavigation` hooks that `Calendar`, `CalendarDay` and `CalendarMonthHeader` build on, and it renders identically under React 18. The `react` peer range stays capped at `< 19.0.0`; lifting that cap library-wide is tracked separately in PF-2262
