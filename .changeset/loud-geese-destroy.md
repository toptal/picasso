---
'@toptal/picasso': major
---

### TimePicker

- change the signature of `onChange` handler to accept `string` instead of event object. In order to migrate, please replace usage of `event.target.value` with `value` in your `onChange` handler
- do not emit incorrect time values, e.g. `12:--` or `60:00`. When input has incorrect value, the `onChange` handler will be called with empty string value
