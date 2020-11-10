import React, { useCallback, useMemo, ReactNode, useRef } from 'react'
import {
  Form as FinalForm,
  FormProps as FinalFormProps
} from 'react-final-form'
import {
  FormApi,
  ValidationErrors,
  SubmissionErrors,
  getIn,
  setIn
} from 'final-form'
import { Form as PicassoForm, Container } from '@toptal/picasso'
import { Alert } from '@toptal/picasso-lab'
import { useNotifications } from '@toptal/picasso/utils'

import { FORM_ERROR } from '../index'
import Input from '../Input'
import Select from '../Select'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import Checkbox from '../Checkbox'
import CheckboxGroup from '../CheckboxGroup'
import NumberInput from '../NumberInput'
import FileInput from '../FileInput'
import DatePicker from '../DatePicker'
import TimePicker from '../TimePicker'
import TagSelector from '../TagSelector'
import SubmitButton from '../SubmitButton'
import { FormConfigContext } from '../FormConfig'
import { createScrollToErrorDecorator } from '../utils'
import {
  FormContext,
  Validators,
  FormContextProps,
  createFormContext
} from './FormContext'

type AnyObject = Record<string, any>

export type Props<T = AnyObject> = FinalFormProps<T> & {
  successSubmitMessage?: ReactNode
  failedSubmitMessage?: ReactNode
  scrollOffsetTop?: number
}

const getValidationErrorsOnSubmit = (
  validationObject: Validators,
  formValues: AnyObject,
  form: FormApi<AnyObject>
) =>
  Object.entries(validationObject).reduce<ValidationErrors | undefined>(
    (result, [key, validator]) => {
      const error: string = validator?.(
        getIn(formValues, key),
        formValues,
        form.getFieldState(key)
      )

      if (error) {
        return setIn(result || {}, key, error)
      }

      return result
    },
    undefined
  )

const getFormError = (errors: SubmissionErrors | void | undefined) => {
  if (!errors) {
    return undefined
  }

  return errors[FORM_ERROR]
}

export const Form = <T extends any = AnyObject>(props: Props<T>) => {
  const {
    children,
    onSubmit,
    successSubmitMessage,
    failedSubmitMessage,
    decorators = [],
    ...rest
  } = props
  const { showSuccess, showError } = useNotifications()
  const scrollToErrorDecorator = useMemo(
    () => createScrollToErrorDecorator(),
    []
  )

  const validationObject = useRef<FormContextProps>(createFormContext())

  const handleSubmit = useCallback(
    async (values, form, callback) => {
      const validationErrors = getValidationErrorsOnSubmit(
        validationObject.current.getValidators(),
        values,
        form
      )

      if (validationErrors) {
        return validationErrors
      }

      const errors = await onSubmit(values, form, callback)

      if (typeof errors === 'string') {
        showError(errors)

        return errors
      }

      const formError = getFormError(errors)
      const hasFormLevelError = Boolean(formError)

      if (!errors && successSubmitMessage) {
        showSuccess(successSubmitMessage)
      } else if (errors && !hasFormLevelError && failedSubmitMessage) {
        showError(failedSubmitMessage, undefined, { persist: true })
      }

      return errors
    },
    [
      failedSubmitMessage,
      onSubmit,
      showError,
      showSuccess,
      successSubmitMessage
    ]
  )

  return (
    <FormContext.Provider value={validationObject}>
      <FinalForm
        render={({ handleSubmit, form }) => {
          const formState = form.getState()
          const formError = getFormError(formState.submitErrors)

          const formErrorAlert = formError ? (
            <Container bottom='medium'>
              <Alert variant='red'>{formError}</Alert>
            </Container>
          ) : null

          return (
            <Container>
              {formErrorAlert}
              <PicassoForm onSubmit={handleSubmit}>{children}</PicassoForm>
            </Container>
          )
        }}
        onSubmit={handleSubmit}
        decorators={[...decorators, scrollToErrorDecorator]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </FormContext.Provider>
  )
}

Form.defaultProps = {}

Form.displayName = 'Form'

Form.Input = Input
Form.Select = Select
Form.Radio = Radio
Form.RadioGroup = RadioGroup
Form.Checkbox = Checkbox
Form.CheckboxGroup = CheckboxGroup
Form.NumberInput = NumberInput
Form.FileInput = FileInput
Form.DatePicker = DatePicker
Form.TimePicker = TimePicker
Form.TagSelector = TagSelector
Form.SubmitButton = SubmitButton
Form.ConfigProvider = FormConfigContext.Provider

export default Form
