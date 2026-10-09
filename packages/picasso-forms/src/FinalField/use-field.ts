import { useField as useFinalFormField } from 'react-final-form'

import { withCheckedFromFormat } from './checked-from-format'
import { keepFieldState } from './keep-field-state'

const useKeptField = keepFieldState(useFinalFormField, 'useField')

/**
 * react-final-form's `useField`, keeping the field's value when it remounts,
 * and with version 6's `checked` for a checkbox that passes a custom `format`
 */
export const useField: typeof useFinalFormField = (name, config) => {
  const field = useKeptField(name, config)

  return { ...field, input: withCheckedFromFormat(field.input, config) }
}
