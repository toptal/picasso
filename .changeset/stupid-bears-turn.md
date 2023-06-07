---
'@toptal/picasso': major
---

### Calendar and DatePicker

- the `simple-react-calendar` was replaced with `react-day-picker` library
  - unit test snapshots might need to be updated due to the changed underlying structure of the `Calendar` component (however, mocking any third-party component like `Calendar` in unit tests should be preferred)
  - test selectors that used `data-simple-react-calendar-day` prop will break as it was replaced by `data-calendar-day` prop to be more generic (the value stays the same)
- the `weekStartsOn` property is typed more strictly using `WeekStart` type (exported from `Calendar` component), please use it in order to migrate in case of compiler errors
