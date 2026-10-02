---
'@toptal/picasso-forms': major
---

### Form

- a `useFormState()` without a `subscription` types the state booleans and records (`submitting`, `dirty`, `touched`, …) as non-optional, since the default subscription fills them. `active`, `error`, `submitError`, `submitErrors` and `initialValues` stay optional, so keep `initialValues ?? {}`. With a `subscription`, and in `FormSpy`, a `Form` function child and `form.getState()`, keys keep final-form's optional types. `FullFormState` names the full shape
- a `OnChange`, `OnFocus`, `OnBlur` and `ExternallyChanged` ship real types instead of `any`, because `react-final-form-listeners@3.0.1` points `types` at a file it does not publish. `OnChange` takes the value type, as in `<OnChange<string> name='…'>`, and the four prop types are exported
