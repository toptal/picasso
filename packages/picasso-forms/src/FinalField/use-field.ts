import { useField as useFinalFormField } from 'react-final-form'

import { withCheckedFromFormat } from './checked-from-format'
import { useFirstRender, withFirstRender } from './first-render'
import { useKeptFieldState } from './keep-field-state'

/**
 * react-final-form's `useField`, keeping the field's value when it remounts,
 * and with version 6's `checked` for a checkbox that passes a custom `format`
 */
export const useField: typeof useFinalFormField = (name, config) => {
  const getFirstRender = useFirstRender(name, config)
  const field = useFinalFormField(name, config)

  useKeptFieldState(name, config)

  const firstRender = getFirstRender?.()
  const shown = firstRender
    ? withFirstRender(field, firstRender, config)
    : field

  return { ...shown, input: withCheckedFromFormat(shown.input, config) }
}
