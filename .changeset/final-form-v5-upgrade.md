---
'@toptal/picasso-forms': major
---

### Form

- upgrade the final-form ecosystem to the versions that support React 19: `final-form@^5.0.1`, `final-form-arrays@^4.0.1`, `react-final-form@^7.0.1`, `react-final-form-arrays@^5.0.0` and `react-final-form-listeners@^3.0.1`. The majors are upstream's Flow-to-TypeScript rewrite; the re-exported `FieldArray`, `useFieldArray`, `OnChange`, `OnFocus`, `OnBlur` and `ExternallyChanged` surfaces are unchanged
- **consumer action**: `react-final-form` is a regular dependency of this package and its React context is instance-bound, so apps that also depend on `react-final-form` directly must move to `react-final-form@^7` / `final-form@^5` in the same upgrade. Staying on `^6` yields two library instances, and `useForm`/`useField` used inside a Picasso `<Form>` then throws `"... must be used inside of a <Form> component"`
- `react-final-form@7` derives checkbox/radio `checked` from `parse` instead of `format` — consumers passing `format`/`parse` to `Form.Checkbox` or `Form.Radio` should re-verify checked-state behavior. Hidden checkbox inputs now render `value=""`, so consumer snapshots covering `Form.Checkbox` need a one-time regeneration
- fields register in an effect under `react-final-form@7` and render twice on mount (previously once) — visually inert, but render-count assertions in consumer tests will shift
- `react-final-form-listeners@3.0.1` ships a broken `types` path, corrected by a pnpm patch
- drop the `@types/react-final-form-listeners` dev dependency — the package now ships its own types
