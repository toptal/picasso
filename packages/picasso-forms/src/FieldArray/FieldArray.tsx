import type { ReactElement } from 'react'
import React from 'react'
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays'

import { useClaimedFieldState } from '../FinalField/use-claimed-field-state'
import type { FieldArrayProps } from './types'

// Upstream 5 returns `ReactNode`, which `@types/react` 17 and 18 reject as a
// JSX element, and types the items as `any`
const TypedFinalFormFieldArray = FinalFormFieldArray as <FieldValue>(
  props: FieldArrayProps<FieldValue>
) => ReactElement | null

/** react-final-form-arrays' `FieldArray`, keeping its items when it remounts */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FieldArray = <FieldValue = any,>(
  props: FieldArrayProps<FieldValue>
) => {
  useClaimedFieldState(props.name, {}, 'useFieldArray')

  return <TypedFinalFormFieldArray<FieldValue> {...props} />
}

FieldArray.displayName = 'FieldArray'

export default FieldArray
