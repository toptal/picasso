---
'@toptal/picasso-forms': major
---

### Form

- upgrade to `final-form@^5.0.1`, `final-form-arrays@^4.0.1`, `react-final-form@^7.0.1`, `react-final-form-arrays@^5.0.0` and `react-final-form-listeners@^3.0.1`, the versions that support React 19. See the [React 19 migration guide](https://github.com/toptal/picasso/blob/master/docs/migration-to-react-19.md)
- **consumer action**: an app that depends on `react-final-form` directly moves to `^7`, with `final-form@^5`, in the same upgrade. Two copies make `useForm` and `useField` inside a Picasso `<Form>` throw `"... must be used inside of a <Form> component"`
- **consumer action (types)**: the `FormProps` type drops its `[otherProp: string]: any` index signature, so declare the extra props a wrapper reads. `FieldArrayProps` drops it too, so read extra props from the enclosing scope instead of passing them through `<FieldArray>`
- **consumer action (types)**: the `FormState` keys are optional in `FormRenderProps`, `FormSpy`, a `Form` function child, `form.getState()` and a `useFormState()` with a `subscription`. A `useFormState()` without one keeps the booleans and records non-optional; `active`, `error`, `submitError`, `submitErrors` and `initialValues` stay optional. `FullFormState` names that shape
- **consumer action (types)**: the `FieldArray` component and the `useFieldArray` hook take only the item type parameter, and `fields.update` is typed again. `FieldArrayMetaState` and `UseFieldArrayConfig` are exported
- **consumer action**: an array field subscribes to `length`, `value` and `error` by default. Pass `subscription` where a render prop reads another key, such as `touched` or `submitError`
- the `OnChange`, `OnFocus`, `OnBlur` and `ExternallyChanged` listeners ship real types instead of `any`, and their prop types are exported. `OnChange` takes the value type: `<OnChange<string> name='…'>`
- a function child of `Form` is called with the form's render props
- the Picasso fields, `FinalField`, `useField`, `FieldArray`, `useFieldArray` and the listeners keep version 6's remount behavior: a remounted field shows its stored value, and an array field its items, from the first render. The same APIs imported from the final-form packages directly show `initialValues` first ([react-final-form#1095](https://github.com/final-form/react-final-form/issues/1095)), as does a field whose `data`, `defaultValue` or `initialValue` changes identity while mounted
- a checkbox without its own `value` that has a custom `format` keeps version 6's `checked`: `Form.Checkbox`, `Form.ButtonCheckbox`, `Form.Switch` and checkboxes built on `FinalField` or `useField`. With `formatOnBlur`, the formatted value a blur stores now reads as it is, where version 6 formatted it again. Group checkboxes and radios follow upstream ([react-final-form#1074](https://github.com/final-form/react-final-form/pull/1074)), so re-check their `format`/`parse` pairs
- the `ExternallyChanged` listener keeps version 1's behavior and reports the first change after mount too
- a field without a `name` throws a descriptive `[picasso]` error in development; test fixtures that wrap a field must forward `name`
- tests: fields register in an effect and render twice on mount, hidden checkbox inputs render `value=""`, `FieldArray` mutators notify the form synchronously (call them outside render), and `FieldArray` or `OnChange` mocks need `as unknown as jest.Mock`
