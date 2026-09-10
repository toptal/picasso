import type { ReactElement, ReactNode } from 'react'
import React, { useMemo, useRef } from 'react'
import type {
  FormProps as FinalFormProps,
  FormRenderProps,
} from 'react-final-form'
import { Form as FinalForm } from 'react-final-form'
import type {
  FormApi,
  FormSubscription,
  SubmissionErrors,
  AnyObject,
} from 'final-form'
import { getIn, setIn } from 'final-form'
import { useNotifications } from '@toptal/picasso-notification'

import type { FullFormRenderProps } from '../FormState'
import { withFormStateDefaults } from '../FormState'
import { createScrollToErrorDecorator } from '../utils'
import type { Validators, FormContextProps } from './FormContext'
import { FormContext, createFormContext } from './FormContext'
import type { Props as FormProps } from './FormRenderer'
import FormRenderer from './FormRenderer'
import { setActiveFieldTouched, setHasMultilineCounter } from './mutators'

type PicassoFormProps = {
  disableScrollOnError?: boolean
  autoComplete?: HTMLFormElement['autocomplete']
  successSubmitMessage?: ReactNode
  failedSubmitMessage?: ReactNode
  scrollOffsetTop?: number
  layout?: 'horizontal' | 'vertical'
  labelWidth?: FormProps['labelWidth']
  className?: string
  'data-testid'?: string
}

type FormPropsBase<T> = Omit<FinalFormProps<T>, 'children' | 'subscription'> &
  PicassoFormProps

type FormChildren<RenderProps> = ((props: RenderProps) => ReactNode) | ReactNode

/**
 * Props of the default, fully subscribed form. A `subscription` narrows the
 * render props a function child receives, which the overloads below carry.
 */
export type Props<T = AnyObject> = FormPropsBase<T> & {
  /** Form-state keys to subscribe to; every key is subscribed when omitted */
  subscription?: FormSubscription
  children?: FormChildren<FullFormRenderProps<T>>
}

const getValidationErrors = (
  validators: Validators,
  formValues: any,
  form: FormApi<any>
): SubmissionErrors | void => {
  let errors: SubmissionErrors

  Object.entries(validators).forEach(([key, validator]) => {
    const fieldValue = getIn(formValues, key)
    const fieldMetaState = form.getFieldState(key)

    if (!validator) {
      return
    }

    const error = validator(fieldValue, formValues, fieldMetaState)

    if (error) {
      errors = setIn(errors || {}, key, error)
    }
  })

  return errors
}

/**
 * A function child receives the keys a fully subscribed form actually has (see
 * `useFormState`); `render` is not covered, because it replaces this
 * component's own rendering and reaches `react-final-form` untouched.
 */
export function Form<T extends AnyObject = AnyObject>(
  props: FormPropsBase<T> & {
    subscription?: undefined
    children?: FormChildren<FullFormRenderProps<T>>
  }
): ReactElement

/** With a `subscription`, the unsubscribed keys are genuinely `undefined` and keep the optional types */
export function Form<T extends AnyObject = AnyObject>(
  props: FormPropsBase<T> & {
    subscription: FormSubscription
    children?: FormChildren<FormRenderProps<T>>
  }
): ReactElement

// eslint-disable-next-line func-style -- an overloaded function needs a declaration
export function Form<T extends AnyObject = AnyObject>(props: Props<T>) {
  const {
    autoComplete,
    children,
    disableScrollOnError,
    onSubmit,
    successSubmitMessage,
    failedSubmitMessage,
    decorators = [],
    mutators = {},
    validateOnBlur,
    subscription,
    'data-testid': dataTestId,
    layout,
    labelWidth,
    className,
    ...rest
  } = props
  const { showSuccess, showError } = useNotifications()
  const scrollToErrorDecorator = useMemo(
    () =>
      createScrollToErrorDecorator({
        disableScrollOnError,
      }),
    [disableScrollOnError]
  )

  const validationObject = useRef<FormContextProps>(createFormContext())

  const showSuccessNotification = () => {
    if (!successSubmitMessage) {
      return
    }

    showSuccess(successSubmitMessage)
  }

  const showErrorNotification = (errors: SubmissionErrors) => {
    if (typeof errors === 'string') {
      showError(errors, undefined, { persist: true })

      return
    }

    if (!failedSubmitMessage) {
      return
    }

    showError(failedSubmitMessage, undefined, { persist: true })
  }

  const handleSubmit = async (
    values: T,
    form: FormApi<T>,
    callback?: (errors?: SubmissionErrors) => void
  ) => {
    const validationErrors = getValidationErrors(
      validationObject.current.getValidators(),
      values,
      form
    )

    if (validationErrors) {
      return validationErrors
    }

    const submissionErrors = await onSubmit(values, form, callback)

    if (!submissionErrors) {
      showSuccessNotification()
    } else {
      showErrorNotification(submissionErrors)
    }

    return submissionErrors
  }

  return (
    <FormContext.Provider value={validationObject}>
      <FinalForm
        render={renderProps => {
          const { form, handleSubmit: handleFormRendererSubmit } = renderProps

          return (
            <FormRenderer
              autoComplete={autoComplete}
              data-testid={dataTestId}
              onSubmit={handleFormRendererSubmit}
              validateOnBlur={validateOnBlur}
              setActiveFieldTouched={form.mutators.setActiveFieldTouched}
              labelWidth={labelWidth}
              layout={layout}
              className={className}
            >
              {typeof children === 'function'
                ? // Only the full subscription is defaulted, matching the
                  // overloads above
                  children(
                    subscription === undefined
                      ? withFormStateDefaults(renderProps)
                      : (renderProps as FullFormRenderProps<T>)
                  )
                : children}
            </FormRenderer>
          )
        }}
        onSubmit={handleSubmit}
        subscription={subscription}
        decorators={[...decorators, scrollToErrorDecorator]}
        mutators={{
          ...mutators,
          setActiveFieldTouched,
          setHasMultilineCounter,
        }}
        validateOnBlur={validateOnBlur}
        {...rest}
      />
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'

export default Form
