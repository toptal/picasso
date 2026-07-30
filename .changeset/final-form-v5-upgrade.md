---
'@toptal/picasso-forms': patch
---

### Form

- upgrade the final-form ecosystem to the versions that support React 19: `final-form@^5.0.1`, `final-form-arrays@^4.0.1`, `react-final-form@^7.0.1`, `react-final-form-arrays@^5.0.0` and `react-final-form-listeners@^3.0.1`. These majors are upstream's Flow-to-TypeScript rewrite and carry no intentional API changes; the re-exported `FieldArray`, `useFieldArray`, `OnChange`, `OnFocus`, `OnBlur` and `ExternallyChanged` surfaces are unchanged. `react-final-form-listeners@3.0.1` ships a broken `types` path, corrected by a pnpm patch
- drop the `@types/react-final-form-listeners` dev dependency — the package now ships its own types
