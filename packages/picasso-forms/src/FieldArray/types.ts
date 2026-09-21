import type { ComponentType, ReactNode } from 'react'
import type { FieldState, FieldSubscription } from 'final-form'
import type { FieldArrayRenderProps as FinalFormFieldArrayRenderProps } from 'react-final-form-arrays'

/** Metadata of an array field as `react-final-form-arrays` renders it; every key is optional because final-form only fills the ones the field subscribes to */
export type FieldArrayMetaState = FinalFormFieldArrayRenderProps['meta']

export interface FieldArrayRenderProps<
  // `any` is the item type react-final-form-arrays@3 defaulted to; a stricter
  // default would break every un-annotated `fields.value[i].prop` written against it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
> {
  /** The array's items and the `final-form-arrays` mutators bound to its name */
  fields: {
    /** Calls `iterator` with each item's field name and index */
    forEach: (iterator: (name: string, index: number) => void) => void
    /** Inserts `value` at `index` */
    insert: (index: number, value: FieldValue) => void
    /** Number of items */
    length: number
    /** Maps each item's field name and index through `iterator` */
    map: <R>(iterator: (name: string, index: number) => R) => R[]
    /** Moves the item at `from` to `to` */
    move: (from: number, to: number) => void
    /** Name of the array in the form values */
    name: string
    /** Removes and returns the last item */
    pop: () => FieldValue
    /** Appends `value` */
    push: (value: FieldValue) => void
    /** Removes and returns the item at `index` */
    remove: (index: number) => FieldValue
    /** Removes and returns the first item */
    shift: () => FieldValue
    /** Swaps the items at `indexA` and `indexB` */
    swap: (indexA: number, indexB: number) => void
    /** Prepends `value` */
    unshift: (value: FieldValue) => void
    /** Replaces the item at `index` with `value` */
    update: (index: number, value: FieldValue) => void
    /** The current items */
    value: FieldValue[]
  }
  /** The array field's metadata, filled for the subscribed keys */
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
  /** Field-state keys to subscribe to; `length`, `value` and `error` by default, pass this to read other `meta` keys */
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
