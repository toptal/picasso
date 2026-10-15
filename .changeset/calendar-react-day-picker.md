---
'@toptal/picasso-calendar': major
---

### Calendar

- upgrade `react-day-picker` to `^8.10.2`, the first 8.x release that runs on React 19. It renders identically on React 18
- import `isWeekend` and `isSameMonth` from the `date-fns` barrel, since v3 removed the submodules' default exports
