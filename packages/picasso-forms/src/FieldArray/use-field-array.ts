import { useFieldArray as useFinalFormFieldArray } from 'react-final-form-arrays'

import { useClaimedFieldState } from '../FinalField/use-claimed-field-state'
import type { FieldArrayRenderProps, UseFieldArrayConfig } from './types'

/** react-final-form-arrays' `useFieldArray`, keeping the items when it remounts */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFieldArray = <FieldValue = any>(
  name: string,
  config?: UseFieldArrayConfig<FieldValue>
) => {
  // Upstream 5 types the items as `any` and leaves out `fields.update`, which
  // it binds at runtime
  const fieldArray = useFinalFormFieldArray(
    name,
    config
  ) as FieldArrayRenderProps<FieldValue>

  useClaimedFieldState(name, {}, 'useFieldArray')

  return fieldArray
}
