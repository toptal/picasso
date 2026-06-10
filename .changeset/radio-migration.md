---
'@toptal/picasso-radio': major
---

### Radio

- Re-implement `Radio` and `Radio.Group` on a native `<input type="radio">` with Tailwind styling, removing the `@material-ui/core` dependency; visual appearance and behavior parity is preserved (controlled/uncontrolled, standalone and grouped usage, `onChange` signatures, external `<label htmlFor>` association)
- BREAKING: `Radio`'s JSS `classes` prop (slots `root`, `disabled`, `withLabel`, `focused`, `uncheckedIcon`, `checkedIcon`) is removed — use `className` / `style` instead
- BREAKING: `RadioGroupProps` no longer extends `@material-ui/core`'s `RadioGroupProps` — the MUI-specific `classes` and `row` props are removed; `name`, `value`, `defaultValue` and `onChange(event, value)` are preserved
- Widen the React peer dependency to `react: >=16.12.0` (React 19 cap lifted)
