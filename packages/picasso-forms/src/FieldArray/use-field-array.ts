import { useFieldArray as useFinalFormFieldArray } from 'react-final-form-arrays'

import {
  useFirstRender,
  withFirstRenderItems,
} from '../FinalField/first-render'
import { useKeptFieldState } from '../FinalField/keep-field-state'
import { defaultIsEqual } from './default-is-equal'
import type { FieldArrayRenderProps, UseFieldArrayConfig } from './types'

// Upstream 5 types the items as `any` and leaves out `fields.update`, which it
// binds at runtime
const useTypedFieldArray = useFinalFormFieldArray as <FieldValue>(
  name: string,
  config?: UseFieldArrayConfig<FieldValue>
) => FieldArrayRenderProps<FieldValue>

/** react-final-form-arrays' `useFieldArray`, keeping the items when it remounts */
export const useFieldArray = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
>(
  name: string,
  config?: UseFieldArrayConfig<FieldValue>
): FieldArrayRenderProps<FieldValue> => {
  const getFirstRender = useFirstRender(name, config, 'useFieldArray')
  const fieldArray = useTypedFieldArray<FieldValue>(name, config)

  useKeptFieldState(name, {}, 'useFieldArray')

  return getFirstRender
    ? withFirstRenderItems(
        fieldArray,
        getFirstRender(),
        config?.isEqual ?? defaultIsEqual
      )
    : fieldArray
}
