import type { FieldState, FieldSubscription } from 'final-form'
import { fieldSubscriptionItems } from 'final-form'
import type { FieldArrayRenderProps as FinalFormFieldArrayRenderProps } from 'react-final-form-arrays'
import { useFieldArray as useFinalFormFieldArray } from 'react-final-form-arrays'

/** Metadata of an array field as `react-final-form-arrays` renders it; every key is optional because final-form only fills the ones the field subscribes to */
export type FieldArrayMetaState = FinalFormFieldArrayRenderProps['meta']

export interface FieldArrayRenderProps<
  // `any` is the item type react-final-form-arrays@3 defaulted to; a stricter
  // default would break every un-annotated `fields.value[i].prop` written against it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
> {
  fields: {
    forEach: (iterator: (name: string, index: number) => void) => void
    insert: (index: number, value: FieldValue) => void
    length: number
    map: <R>(iterator: (name: string, index: number) => R) => R[]
    move: (from: number, to: number) => void
    name: string
    pop: () => FieldValue
    push: (value: FieldValue) => void
    remove: (index: number) => FieldValue
    shift: () => FieldValue
    swap: (indexA: number, indexB: number) => void
    unshift: (value: FieldValue) => void
    update: (index: number, value: FieldValue) => void
    value: FieldValue[]
  }
  meta: FieldArrayMetaState
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseFieldArrayConfig<FieldValue = any> {
  defaultValue?: FieldValue[]
  initialValue?: FieldValue[]
  isEqual?: (a: FieldValue[], b: FieldValue[]) => boolean
  subscription?: FieldSubscription
  validate?: (
    value: FieldValue[] | undefined,
    allValues: Record<string, unknown>,
    meta: FieldState | undefined
  ) => unknown
}

// react-final-form-arrays@5 subscribes an array field to `length`, `value` and
// `error` only, where 3 subscribed to every key, so `meta.dirty`,
// `meta.touched`, … would read `undefined` after mount. The wrapper keeps the
// full subscription consumers relied on; pass `subscription` to narrow it.
const allFieldSubscription = fieldSubscriptionItems.reduce<FieldSubscription>(
  (subscription, key) => ({ ...subscription, [key]: true }),
  {}
)

/**
 * `useFieldArray` from `react-final-form-arrays`, typed by the array's item
 * type the way `react-final-form-arrays@3` typed it. Upstream 5 declares the
 * items as `any` and leaves `fields.update` out, although the hook binds every
 * `final-form-arrays` mutator (`update` included) to the field name at runtime.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFieldArray = <FieldValue = any>(
  name: string,
  {
    subscription = allFieldSubscription,
    ...config
  }: UseFieldArrayConfig<FieldValue> = {}
): FieldArrayRenderProps<FieldValue> =>
  useFinalFormFieldArray(name, {
    ...config,
    subscription,
  }) as FieldArrayRenderProps<FieldValue>
