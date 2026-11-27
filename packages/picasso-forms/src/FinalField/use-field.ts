import { useField as useFinalFormField } from 'react-final-form'

import { useFirstRender, withFirstRender } from './first-render'
import { useKeptFieldState } from './keep-field-state'

/**
 * react-final-form's `useField`, keeping the field's value when it remounts
 */
export const useField: typeof useFinalFormField = (name, config) => {
  const getFirstRender = useFirstRender(name, config)
  const field = useFinalFormField(name, config)

  useKeptFieldState(name, config)

  return getFirstRender
    ? withFirstRender(field, getFirstRender(), config)
    : field
}
