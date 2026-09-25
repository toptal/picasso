import { useField as useFinalFormField } from 'react-final-form'

import { keepFieldState } from './keep-field-state'

/** react-final-form's `useField`, keeping the field's value when it remounts */
export const useField = keepFieldState(useFinalFormField, 'useField')
