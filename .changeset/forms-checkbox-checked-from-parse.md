---
'@toptal/picasso-forms': major
---

### Form.Checkbox, Form.ButtonCheckbox, Form.Switch, FinalField, useField

- **consumer action**: a checkbox without its own `value` derives `checked` from `parse(value)`, as react-final-form 7 does, where 102 kept version 6's `format(value)`. A `parse` that maps only the checkbox's `checked`, such as `checked => (checked ? 'true' : 'false')`, renders a stored `'false'` checked, and the user can't untick it. Give the checkbox a `parse` that maps the stored value too, such as `value => (typeof value === 'boolean' ? String(value) : value === 'true')`, or store booleans. To find the checkboxes that pass a custom `format`, run `git grep -l -E '(^|[^[:alnum:]_])format[=:]' -- '*.ts' '*.tsx' | xargs grep -l -E "Form\.(Checkbox|ButtonCheckbox|Switch)|Button\.Checkbox|type[=:] ?['\"]checkbox"` and check each hit by hand
