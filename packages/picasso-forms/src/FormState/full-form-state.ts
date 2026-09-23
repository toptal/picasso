import type { FormState } from 'final-form'

// Not final-form's `AnyObject`: its `keyof` is `string | number`, which would
// widen `active`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultFormValues = Record<string, any>

// `undefined` even when subscribed: no focused field, no error, no initial
// values given
type OptionalFormStateKey =
  | 'active'
  | 'error'
  | 'initialValues'
  | 'submitError'
  | 'submitErrors'

type WithFullSubscription<T> = Required<Omit<T, OptionalFormStateKey>> &
  Pick<T, Extract<OptionalFormStateKey, keyof T>>

/** Form state as `useFormState` returns it without a `subscription` */
export type FullFormState<FormValues = DefaultFormValues> =
  WithFullSubscription<FormState<FormValues>>
