import { useFieldArray as useFinalFormFieldArray } from 'react-final-form-arrays'

import type { FieldArrayRenderProps, UseFieldArrayConfig } from './types'

// Upstream 5 types the items as `any` and leaves out `fields.update`, which it
// binds at runtime
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFieldArray = useFinalFormFieldArray as <FieldValue = any>(
  name: string,
  config?: UseFieldArrayConfig<FieldValue>
) => FieldArrayRenderProps<FieldValue>
