---
'@toptal/picasso-timepicker': minor
'@toptal/picasso': patch
---

### TimePicker

- render the native `<input type="time">` in Safari too. The masked text field it rendered there threw on React 19, because `react-input-mask` calls `ReactDOM.findDOMNode`. Safari has had a native time input since 14.1; 13 and 14.0 get a text field that accepts `HH:MM`. `react-input-mask` and `detect-browser` are no longer dependencies
- clear the shown time when the value is reset from outside to `''` or `undefined`, such as by a form reset. The input used to keep showing the old time while the form held no value
