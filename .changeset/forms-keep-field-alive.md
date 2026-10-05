---
'@toptal/picasso-forms': patch
---

### Form

- a field that unmounts and remounts, or mounts over a value set with `form.change()`, keeps that value from its first render, where `react-final-form@7.0.1` first shows the one from `initialValues` and then refills it ([react-final-form#1095](https://github.com/final-form/react-final-form/issues/1095)). An array field also renders the items the form holds, and their pristine state, from its first render, where 7.0.1 shows none; one seeded only by its own `initialValue` or `defaultValue` still shows its items from the second render, as in 7.0.1. This covers the Picasso fields, radio and checkbox groups, the `FinalField`, `useField`, `FieldArray` and `useFieldArray` exports, and the `OnChange`, `OnBlur`, `OnFocus` and `ExternallyChanged` listeners, so a remount no longer fires `OnChange` again, also for a field whose initial value is `null`; registered fields, errors and submit behaviour are otherwise unchanged. Not covered: `Field` and `useField` imported from `react-final-form` itself, `FieldArray` and `useFieldArray` from `react-final-form-arrays`, the listeners from `react-final-form-listeners`, and a field whose `data`, `defaultValue` or `initialValue` prop changes identity while mounted. Forms with `destroyOnUnregister` behave as before
