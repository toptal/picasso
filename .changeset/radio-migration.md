---
'@toptal/picasso-radio': major
---

### Radio

- re-implement `Radio` and `Radio.Group` on a native `<input type="radio">` with Tailwind styling, removing the `@material-ui/core` dependency; behavior parity is preserved (controlled/uncontrolled, standalone and grouped usage, `onChange` signatures, external `<label htmlFor>` association)
- fix `Radio.Group`'s `spacing` prop, which was previously ignored: an operator-precedence bug forced any non-zero `spacing` to `16px`. The prop is now honored (e.g. `<Radio.Group horizontal spacing={8}>` renders an 8px gap instead of 16px). Valid values are the `Grid` spacing scale (`0 | 8 | 16 | 24 | 32 | 64 | 72 | 80`)
- breaking: `Radio`'s JSS `classes` prop (slots `root`, `disabled`, `withLabel`, `focused`, `uncheckedIcon`, `checkedIcon`) is removed — use `className` / `style` instead
- breaking: `RadioGroupProps` no longer extends `@material-ui/core`'s `RadioGroupProps` — the MUI-specific `classes` and `row` props are removed; `name`, `value`, `defaultValue` and `onChange(event, value)` are preserved
- widen the React peer dependency to `react: >=16.12.0` (React 19 cap lifted)
