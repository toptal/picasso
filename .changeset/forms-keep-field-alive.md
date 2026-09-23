---
'@toptal/picasso-forms': patch
---

### Form

- a field that unmounts and remounts, or mounts over a value set with `form.change()`, keeps that value instead of the one `react-final-form@7.0.1` refills from `initialValues` ([react-final-form#1095](https://github.com/final-form/react-final-form/issues/1095)). This covers radio and checkbox groups, and registered fields, errors and submit behaviour are otherwise unchanged. Not covered: a react-final-form `Field` or `useField` rendered directly inside a Picasso `Form`, and a field whose `data`, `defaultValue` or `initialValue` prop changes identity while mounted. Forms with `destroyOnUnregister` behave as before
