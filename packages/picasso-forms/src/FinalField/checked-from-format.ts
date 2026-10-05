import type { FieldInputProps, UseFieldConfig } from 'react-final-form'

type CheckedConfig = Pick<
  UseFieldConfig,
  'type' | 'value' | 'format' | 'formatOnBlur' | 'allowNull'
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
 * except with `formatOnBlur` until the blur, and for an `allowNull` field
 * holding `null`
 */
export const withCheckedFromFormat = <Input extends FieldInputProps<unknown>>(
  input: Input,
  config?: CheckedConfig
): Input => {
  if (!derivesCheckedFromFormat(config)) {
    return input
  }

  const { format, formatOnBlur, allowNull } = config
  const getChecked = () => {
    const isFormatted = !formatOnBlur && !(allowNull && input.value === null)

    return Boolean(isFormatted ? input.value : format(input.value, input.name))
  }

  // Copied by descriptor: a spread would read react-final-form's lazy getters
  return Object.create(Object.getPrototypeOf(input), {
    ...Object.getOwnPropertyDescriptors(input),
    checked: { enumerable: true, get: getChecked },
  })
}
