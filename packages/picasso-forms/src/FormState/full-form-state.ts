import type { AnyObject, FormState } from 'final-form'
import type { FormRenderProps, FormSpyRenderProps } from 'react-final-form'

/**
 * The form-state keys final-form leaves `undefined` under the full
 * subscription, because `undefined` is the answer rather than a gap: no field
 * is focused, and there is no form-level, submit or per-field submit error.
 */
type OptionalFormStateKey = 'active' | 'error' | 'submitError' | 'submitErrors'

/**
 * `T` as a form subscribed to every key actually receives it. final-form types
 * each state key optional to model a narrow `subscription`, but the default
 * subscription fills all of them, so only the keys above stay optional here.
 */
type WithFullSubscription<T> = Required<Omit<T, OptionalFormStateKey>> &
  Pick<T, Extract<OptionalFormStateKey, keyof T>>

/** Form state as `useFormState` returns it without a `subscription` */
export type FullFormState<FormValues = AnyObject> = WithFullSubscription<
  FormState<FormValues>
>

/** Render props Picasso's `Form` passes to a function child without a `subscription` */
export type FullFormRenderProps<FormValues = AnyObject> = WithFullSubscription<
  FormRenderProps<FormValues>
>

/** Render props `FormSpy` passes to a function child without a `subscription` */
export type FullFormSpyRenderProps<FormValues = AnyObject> =
  WithFullSubscription<FormSpyRenderProps<FormValues>>

/**
 * One shared reference, so a form without `initialValues` does not hand every
 * render a new object and invalidate consumer memoization keyed on it.
 */
const EMPTY_INITIAL_VALUES = Object.freeze({})

/**
 * Fills `initialValues` — the one key of a fully subscribed form state that is
 * `undefined` for a reason consumers read as data ("the form was given none")
 * rather than as absence. Every other key final-form already fills; the type
 * says so, and this only has to make the value match.
 */
export function withFormStateDefaults<T extends AnyObject>(
  state: T
): WithFullSubscription<T>

// Loose implementation signature: the overload above states the contract, and
// no assertion can prove this narrowing to the compiler.
// eslint-disable-next-line func-style -- an overloaded function needs a declaration
export function withFormStateDefaults(state: AnyObject): AnyObject {
  if (state.initialValues !== undefined) {
    return state
  }

  // `react-final-form` exposes the state on its render props as
  // non-configurable getters that read the live form state, so the default is
  // applied by copying descriptors: a spread would snapshot every value and
  // drop the laziness upstream keeps deliberately, and defining `initialValues`
  // on top of a copied getter would throw.
  return Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(state),
      initialValues: { value: EMPTY_INITIAL_VALUES, enumerable: true },
    }
  )
}
