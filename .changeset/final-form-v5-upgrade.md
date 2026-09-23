---
'@toptal/picasso-forms': major
---

### Form

- upgrade to the final-form versions that support React 19: `final-form@^5.0.1`, `final-form-arrays@^4.0.1`, `react-final-form@^7.0.1`, `react-final-form-arrays@^5.0.0` and `react-final-form-listeners@^3.0.1`
- **consumer action**: an app that also depends on `react-final-form` directly must move to `^7`, with `final-form@^5`, in the same upgrade. Its React context is instance-bound, so two versions make `useForm` and `useField` inside a Picasso `<Form>` throw `"... must be used inside of a <Form> component"`
- **consumer action (types)**: `FormProps` no longer carries react-final-form 6's `[otherProp: string]: any`, so declare the extra props a wrapper accepts. `FormRenderProps['initialValues']` and the `FormState` and `FieldMetaState` booleans are optional; read them as `initialValues ?? {}` and `Boolean(meta.touched)`
- **consumer action (types)**: `FieldArrayProps` no longer carries react-final-form-arrays 3's `[otherProp: string]: any`, so extra props passed through `<FieldArray>` to its render component now error; read them from the enclosing scope instead, since they still reach the component at runtime. `FieldArray` and `useFieldArray` keep one item type parameter, the unused element parameter is gone, and `fields.update` is typed again
- **consumer action**: an array field subscribes to `length`, `value` and `error` by default, as in `react-final-form-arrays@5`. Pass `subscription` where a render prop reads another key, for example `subscription={{ value: true, error: true, submitError: true }}`
- a `Form.Checkbox`, `Form.ButtonCheckbox` and `Form.Switch` keep version 6's `checked` for a checkbox without its own `value` that passes a custom `format`. `react-final-form@7.0.1` derives it from `parse`, which renders a stored `'false'` as checked. Group checkboxes and radios follow upstream, so re-check a `format`/`parse` pair there
- a field without a `name` throws a descriptive `[picasso]` error in development instead of `"Cannot call setIn() with undefined key"`; test fixtures that wrap a field must forward `name`
- tests: fields register in an effect and render twice on mount, so render-count assertions shift. Hidden checkbox inputs render `value=""`, so `Form.Checkbox` snapshots need one update. `FieldArray` mutators notify the form synchronously, so call them from handlers or effects, not during render. `FieldArray as jest.Mock` needs `as unknown as jest.Mock`
- drop the `@types/react-final-form-listeners` dev dependency, since the package ships its own types
