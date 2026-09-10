---
'@toptal/picasso-timepicker': minor
'@toptal/picasso': patch
---

### TimePicker

- render the native `<input type="time">` in Safari as well and drop the `react-input-mask` text field it rendered there. The masked field dates from Safari 13, which had no native time input; Safari has one since 14.1, and `react-input-mask@3.0.0-alpha.2` calls `ReactDOM.findDOMNode` in its input ref callback — removed in React 19 — so the Safari branch threw while mounting on React 19. Safari 13 and 14.0 fall back to a text field that accepts `HH:MM`. `react-input-mask` and `detect-browser` leave the package's dependencies, and `react-input-mask` and `@types/react-input-mask` leave `@toptal/picasso`
