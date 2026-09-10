import type { ComponentType, ReactElement, ReactNode } from 'react'
import React from 'react'
import type { AnyObject, FormState, FormSubscription } from 'final-form'
import type { FormSpyRenderProps } from 'react-final-form'
import { FormSpy as FinalFormSpy } from 'react-final-form'

import type { FullFormSpyRenderProps } from '../FormState'
import { withFormStateDefaults } from '../FormState'

interface FormSpyBaseProps<FormValues> {
  /** Called with the form state after every change the subscription covers; the spy renders nothing when it is given */
  onChange?: (state: FormState<FormValues>) => void
}

interface FormSpyRenderableProps<RenderProps> {
  /** Render function that receives the form state and the form API */
  children?: (props: RenderProps) => ReactNode
  /** Component rendered with the form state and the form API as props, instead of a render function */
  component?: ComponentType<RenderProps>
  /** Render function, an alternative to a function child */
  render?: (props: RenderProps) => ReactNode
}

type FullSubscriptionSpyProps<FormValues> = FormSpyBaseProps<FormValues> & {
  subscription?: undefined
} & FormSpyRenderableProps<FullFormSpyRenderProps<FormValues>>

type NarrowSubscriptionSpyProps<FormValues> = FormSpyBaseProps<FormValues> & {
  /** Form-state keys to subscribe to; every key is subscribed when omitted */
  subscription: FormSubscription
} & FormSpyRenderableProps<FormSpyRenderProps<FormValues>>

export type FormSpyProps<FormValues = AnyObject> =
  | FullSubscriptionSpyProps<FormValues>
  | NarrowSubscriptionSpyProps<FormValues>

/**
 * `FormSpy` from `react-final-form`, handing its render props the keys a fully
 * subscribed form actually has (see `useFormState`). Overloaded on
 * `subscription` for the same reason the hook is.
 */
export function FormSpy<FormValues = AnyObject>(
  props: FullSubscriptionSpyProps<FormValues>
): ReactElement | null

/** With a `subscription`, the unsubscribed keys are genuinely `undefined` and keep the optional types */
export function FormSpy<FormValues = AnyObject>(
  props: NarrowSubscriptionSpyProps<FormValues>
): ReactElement | null

// eslint-disable-next-line func-style -- an overloaded function needs a declaration
export function FormSpy<FormValues = AnyObject>({
  children,
  component: Component,
  render,
  subscription,
  ...rest
}: FormSpyProps<FormValues>) {
  return (
    <FinalFormSpy<FormValues> subscription={subscription} {...rest}>
      {renderProps => {
        // Only the full subscription is defaulted, matching the overloads
        // above; they already say which of the two shapes the callback
        // receives, and the cast lets the render path below be written once.
        const spyProps =
          subscription === undefined
            ? withFormStateDefaults(renderProps)
            : (renderProps as FullFormSpyRenderProps<FormValues>)

        if (Component) {
          return <Component {...spyProps} />
        }

        if (render) {
          return render(spyProps)
        }

        if (typeof children !== 'function') {
          throw new Error(
            'FormSpy needs a render function as children, a `render` prop or a `component` prop'
          )
        }

        return children(spyProps)
      }}
    </FinalFormSpy>
  )
}

FormSpy.displayName = 'FormSpy'

export default FormSpy
