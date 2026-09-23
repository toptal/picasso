import type { ReactElement } from 'react'
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays'

import type { FieldArrayProps } from './types'

// Upstream 5 returns `ReactNode`, which `@types/react` 17 and 18 reject as a
// JSX element, and types the items as `any`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FieldArray = FinalFormFieldArray as <FieldValue = any>(
  props: FieldArrayProps<FieldValue>
) => ReactElement | null

export default FieldArray
