import type { ComponentType, ReactElement, ReactNode } from 'react'
import React from 'react'
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays'

import type {
  FieldArrayRenderProps,
  UseFieldArrayConfig,
} from './use-field-array'
import { allFieldSubscription } from './use-field-array'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FieldArrayProps<FieldValue = any>
  extends UseFieldArrayConfig<FieldValue> {
  /** Name of the array in the form values */
  name: string
  /** Render function that receives the array `fields` (items and mutators) and `meta` */
  children?: (props: FieldArrayRenderProps<FieldValue>) => ReactNode
  /** Component rendered with the array `fields` and `meta` as props, instead of a render function */
  component?: ComponentType<FieldArrayRenderProps<FieldValue>>
  /** Render function, an alternative to a function child */
  render?: (props: FieldArrayRenderProps<FieldValue>) => ReactNode
}

// Upstream's component behind Picasso's typed props. `react-final-form-arrays@5`
// declares it as returning `ReactNode`, which `@types/react` 17 and 18 reject as
// a JSX element type, and types the items as `any`; the runtime, including the
// `children` / `render` / `component` dispatch, is upstream's.
const TypedFinalFormFieldArray = FinalFormFieldArray as <FieldValue>(
  props: FieldArrayProps<FieldValue>
) => ReactElement | null

/**
 * `FieldArray` from `react-final-form-arrays`, with the item type flowing into
 * the render props and the array field subscribed to every state key by
 * default, as `react-final-form-arrays@3` subscribed it; upstream 5 narrowed
 * the default to `length`, `value` and `error`. Pass `subscription` to narrow
 * it. Needs the `final-form-arrays` mutators on the `<Form>`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FieldArray = <FieldValue = any,>({
  subscription = allFieldSubscription,
  ...props
}: FieldArrayProps<FieldValue>) => (
  <TypedFinalFormFieldArray<FieldValue>
    subscription={subscription}
    {...props}
  />
)

FieldArray.displayName = 'FieldArray'

export default FieldArray
