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
 * Without a `subscription` every key is subscribed, so the booleans and records
 * are non-optional; `initialValues` stays optional, as in `FormSpy`
 */
export function useFormState<FormValues = DefaultFormValues>(
  params?: FullSubscriptionParams<FormValues>
): FullFormState<FormValues>

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
