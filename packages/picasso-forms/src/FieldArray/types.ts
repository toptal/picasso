import type { ComponentType, ReactNode } from 'react'
import type { FieldState, FieldSubscription } from 'final-form'
import type { FieldArrayRenderProps as FinalFormFieldArrayRenderProps } from 'react-final-form-arrays'

/** Array field metadata; only the subscribed keys are filled */
export type FieldArrayMetaState = FinalFormFieldArrayRenderProps['meta']

export interface FieldArrayRenderProps<
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
  /** Items to use when the form has no value for the array yet */
  defaultValue?: FieldValue[]
  /** Items the array starts from; also its pristine reference */
  initialValue?: FieldValue[]
  /** Compares two arrays to decide whether the field is dirty; `===` by default */
  isEqual?: (a: FieldValue[], b: FieldValue[]) => boolean
  /** Field-state keys to subscribe to; defaults to `length`, `value` and `error` */
  subscription?: FieldSubscription
  /** Array-level validation; return an error, an array of per-item errors, or nothing */
  validate?: (
    value: FieldValue[] | undefined,
    allValues: Record<string, unknown>,
    meta: FieldState | undefined
  ) => unknown
}

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
