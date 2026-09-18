import type { FormState } from 'final-form'

/**
 * The default form values, spelled exactly as `react-final-form` spells it.
 * Not final-form's `AnyObject`, which is an interface with a string index
 * signature: `keyof` that is `string | number`, so `active` would widen to
 * `string | number | undefined` and stop matching the `FormState` and
 * `FormSpyRenderProps` this package also re-exports.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultFormValues = Record<string, any>

/**
 * The form-state keys final-form leaves `undefined` under the full
 * subscription, because `undefined` is the answer rather than a gap: no field
 * is focused, there is no form-level, submit or per-field submit error, and
 * the form was given no `initialValues`. `FormSpy` and `form.getState()`
 * report the same, so `initialValues` reads the same way through all three.
 */
type OptionalFormStateKey =
  | 'active'
  | 'error'
  | 'initialValues'
  | 'submitError'
  | 'submitErrors'

/**
 * `T` as a form subscribed to every key actually receives it. final-form types
 * each state key optional to model a narrow `subscription`, but the default
 * subscription fills all of them, so only the keys above stay optional here.
 */
type WithFullSubscription<T> = Required<Omit<T, OptionalFormStateKey>> &
  Pick<T, Extract<OptionalFormStateKey, keyof T>>

/** Form state as `useFormState` returns it without a `subscription` */
export type FullFormState<FormValues = DefaultFormValues> =
  WithFullSubscription<FormState<FormValues>>
