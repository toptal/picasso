import type { ReactElement } from 'react'
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays'

import type { FieldArrayProps } from './types'

/**
 * `FieldArray` from `react-final-form-arrays`, behind Picasso's typed props:
 * upstream 5 declares the component as returning `ReactNode`, which
 * `@types/react` 17 and 18 reject as a JSX element type, and types the items as
 * `any`. The runtime is upstream's, including the `children` / `render` /
 * `component` dispatch. The default subscription is upstream's (`length`,
 * `value`, `error`); pass `subscription` to read other `meta` keys such as
 * `submitError` or `touched`. Needs the `final-form-arrays` mutators on the
 * `<Form>`.
 */
// `any` is the item type react-final-form-arrays@3 defaulted to; a stricter
// default would break every un-annotated `fields.value[i].prop`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FieldArray = FinalFormFieldArray as <FieldValue = any>(
  props: FieldArrayProps<FieldValue>
) => ReactElement | null

export default FieldArray
