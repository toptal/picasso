import { useField as useFinalFormField } from 'react-final-form'

import { useClaimedFieldState } from './use-claimed-field-state'

/** react-final-form's `useField`, keeping the field's value when it remounts */
export const useField: typeof useFinalFormField = (name, config = {}) => {
  const field = useFinalFormField(name, config)

  useClaimedFieldState(name, config)

  return field
}
