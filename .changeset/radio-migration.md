---
'@toptal/picasso-radio': major
---

### Radio

- re-implement `Radio` and `Radio.Group` on a native `<input type="radio">` with Tailwind styling, removing the `@material-ui/core` dependency; behavior parity is preserved (controlled/uncontrolled, standalone and grouped usage, `onChange` signatures, external `<label htmlFor>` association)
- fix `Radio.Group`'s `spacing` prop, which was previously ignored: an operator-precedence bug forced any non-zero `spacing` to `16px`. The prop is now honored (e.g. `<Radio.Group horizontal spacing={8}>` renders an 8px gap instead of 16px). Valid values are the `Grid` spacing scale (`0 | 8 | 16 | 24 | 32 | 64 | 72 | 80`)
- retain but rework `Radio`'s `classes` prop: it now applies functionally (previously it was inherited from `StandardProps` but inert — nothing was styled by it) and is typed as `RadioClasses` (`{ root?, disabled?, input?, uncheckedIcon?, checkedIcon? }`, now exported), and marked `@deprecated` (transitional; removed in a later major). breaking: the open-ended JSS `classes` shape and the `focused` / `withLabel` slots are removed — use `className` / `style` or the retained slots instead
- breaking: `RadioGroupProps` no longer extends `@material-ui/core`'s `RadioGroupProps` — the MUI-specific `classes` and `row` props are removed; `name`, `value`, `defaultValue` and `onChange(event, value)` are preserved
- widen the React peer dependency to `react: >=16.12.0` (React 19 cap lifted)
