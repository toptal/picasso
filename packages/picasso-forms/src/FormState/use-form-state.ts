import type { FormState, FormSubscription } from 'final-form'
import type { UseFormStateParams } from 'react-final-form'
import { useFormState as useFinalFormState } from 'react-final-form'

import type { DefaultFormValues, FullFormState } from './full-form-state'

type FullSubscriptionParams<FormValues> = Omit<
  UseFormStateParams<FormValues>,
  'subscription'
> & { subscription?: undefined }

type NarrowSubscriptionParams<FormValues> = Omit<
  UseFormStateParams<FormValues>,
  'subscription'
> & { subscription: FormSubscription }

/**
 * `useFormState` from `react-final-form`, typed by what a fully subscribed
 * form actually has. Without a `subscription` the hook subscribes to every
 * key, so the state booleans and records are always there and are typed that
 * way; final-form types them optional to model the narrow subscription below,
 * which made every call site default them by hand. `initialValues` stays
 * optional: a form given none reports `undefined`, exactly as `FormSpy` and
 * `form.getState()` do. The runtime is upstream's, untouched.
 *
 * Overloads rather than one conditional type: they read at the call site, they
 * survive an explicit `useFormState<Values>()` type argument, and a
 * `subscription` whose presence is only known at runtime falls through to the
 * optional types.
 */
export function useFormState<FormValues = DefaultFormValues>(
  params?: FullSubscriptionParams<FormValues>
): FullFormState<FormValues>

/** With a `subscription`, the unsubscribed keys are genuinely `undefined` and keep the optional types */
export function useFormState<FormValues = DefaultFormValues>(
  params: NarrowSubscriptionParams<FormValues>
): FormState<FormValues>

export function useFormState<FormValues = DefaultFormValues>(
  params: UseFormStateParams<FormValues>
): FormState<FormValues>

// eslint-disable-next-line func-style -- an overloaded function needs a declaration
export function useFormState<FormValues = DefaultFormValues>(
  params?: UseFormStateParams<FormValues>
): FormState<FormValues> | FullFormState<FormValues> {
  return useFinalFormState<FormValues>(params)
}
