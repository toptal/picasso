---
'@toptal/picasso-forms': major
---

### Form

- `useFormState` now types the form state the way a fully subscribed form actually has it: without a `subscription`, the state booleans and records (`submitting`, `dirty`, `dirtySinceLastSubmit`, `touched`, `dirtyFields`, …) are non-optional. final-form types every state key optional to model a narrow `subscription`, but the hook's default subscription is every key, so the optionality was wrong for the common case and each call site defaulted it by hand
- `active`, `error`, `submitError`, `submitErrors` and `initialValues` stay optional: `undefined` there means no focused field, no error and a form given no `initialValues`, which is an answer rather than a gap. It is also what a `FormSpy` child and `form.getState()` report, so `initialValues ?? {}` reads the same through all three; the hook's runtime is `react-final-form`'s, untouched
- passing a `subscription` keeps final-form's optional types, because an unsubscribed key being `undefined` is information worth keeping, and so does a params object whose `subscription` is only known at runtime, such as one a wrapper forwards
- the `FullFormState` type names that shape for annotations; it defaults its form values to `Record<string, any>`, as react-final-form does, so `active` is `string | undefined` and the type is assignable to final-form's `FormState`, which keeps meaning the optional shape
- unchanged, and still typed with final-form's optional shape: `FormSpy`, a `Form` function child and `form.getState()`. Keep `Boolean(submitting)` where a `<FormSpy>` child or a `getState()` call reads a state boolean
- the four form listeners `OnChange`, `OnFocus`, `OnBlur` and `ExternallyChanged` ship real types. `react-final-form-listeners@3.0.1` publishes its declarations at `dist/src/index.d.ts` while its `package.json` points `types` at `dist/index.d.ts`, so a consumer install resolved all four as `any`; they are now declared by this package, and `OnChange` takes the field's value type (`<OnChange<string> name='…'>`). `OnChangeProps`, `OnFocusProps`, `OnBlurProps` and `ExternallyChangedProps` are exported alongside
