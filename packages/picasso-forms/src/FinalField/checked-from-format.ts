import type { FieldInputProps, UseFieldConfig } from 'react-final-form'

type CheckedConfig = Pick<
  UseFieldConfig,
  'type' | 'value' | 'format' | 'parse' | 'formatOnBlur' | 'allowNull'
>

/**
 * A checkbox without its own `value` that passes a custom `format`.
 * react-final-form 7.0.1 derives its `checked` from `parse(value)`, so a
 * string-boolean `format`/`parse` pair renders a stored `'false'` checked.
 * Group checkboxes and radios keep upstream's, which compares the stored value
 * with their own.
 * TODO: [PF-2522] drop when upstream derives it from `format` again
 */
export const derivesCheckedFromFormat = (
  config: CheckedConfig = {}
): config is CheckedConfig & Required<Pick<CheckedConfig, 'format'>> =>
  config.type === 'checkbox' &&
  config.value === undefined &&
  config.format !== undefined

/**
 * The input with version 6's `checked`, `format(value)`, for a checkbox that
 * `derivesCheckedFromFormat`. react-final-form formats the value for us,
 * except for an `allowNull` field holding `null`, and with `formatOnBlur`,
 * where the field holds what `parse` returned until a blur or a submit stores
 * what `format` returned. Version 6 formatted that again, so a blur unticked a
 * stored `'true'`
 */
export const withCheckedFromFormat = <Input extends FieldInputProps<unknown>>(
  input: Input,
  config?: CheckedConfig
): Input => {
  if (!derivesCheckedFromFormat(config)) {
    return input
  }

  const { format, parse, formatOnBlur, allowNull } = config
  // A value the checkbox's `onChange` stores. react-final-form's default
  // `parse` stores `checked` as it is
  const isParsed = (value: unknown) =>
    [true, false].some(
      checked => value === (parse ? parse(checked, input.name) : checked)
    )
  const needsFormat = (value: unknown) =>
    (allowNull && value === null) || (formatOnBlur && isParsed(value))
  const getChecked = () =>
    Boolean(
      needsFormat(input.value) ? format(input.value, input.name) : input.value
    )

  // Copied by descriptor: a spread would read react-final-form's lazy getters
  return Object.create(Object.getPrototypeOf(input), {
    ...Object.getOwnPropertyDescriptors(input),
    checked: { enumerable: true, get: getChecked },
  })
}
