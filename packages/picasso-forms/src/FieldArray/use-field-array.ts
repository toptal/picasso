import { useFieldArray as useFinalFormFieldArray } from 'react-final-form-arrays'

import { keepFieldState } from '../FinalField/keep-field-state'
import type { FieldArrayRenderProps, UseFieldArrayConfig } from './types'

/** react-final-form-arrays' `useFieldArray`, keeping the items when it remounts */
export const useFieldArray = keepFieldState(
  // Upstream 5 types the items as `any` and leaves out `fields.update`, which
  // it binds at runtime
  useFinalFormFieldArray as <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FieldValue = any
  >(
    name: string,
    config?: UseFieldArrayConfig<FieldValue>
  ) => FieldArrayRenderProps<FieldValue>,
  'useFieldArray'
)
