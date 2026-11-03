---
'@toptal/picasso-forms': minor
---

### FinalField, useField, FieldArray, useFieldArray

- stop registering a field while it renders, which react-final-form 7 dropped on purpose. The first render of a Picasso field, `FinalField`, `useField`, `FieldArray` and `useFieldArray` reads what the field will hold once it registers, without writing to the form: its stored value after a remount, an array's items, and its own `initialValue` or `defaultValue` when the form stores nothing
- other readers in the same render now see react-final-form 7's first render of a field that hasn't registered yet, and its stored state from the next render: react-final-form's own `Field` and `useField`, including the radios and checkboxes inside `Form.RadioGroup` and `Form.CheckboxGroup`, and `form.getFieldState()` or `form.getRegisteredFields()` called while rendering
- render a field's own `initialValue` or `defaultValue` on its first render when another field with the same name holds nothing yet, for plain fields as well as arrays
- render an array's items on its first render in a form that sets `destroyOnUnregister`
