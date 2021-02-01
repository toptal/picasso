import React, { useCallback, useMemo, ReactNode, useRef } from 'react'
import {
  Form as FinalForm,
  FormProps as FinalFormProps
} from 'react-final-form'
import { FormApi, SubmissionErrors, getIn, setIn } from 'final-form'
import { Form as PicassoForm, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

import Autocomplete from '../Autocomplete'
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
import Switch from '../Switch'
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
  autoComplete?: HTMLFormElement['autocomplete']
  successSubmitMessage?: ReactNode
  failedSubmitMessage?: ReactNode
  scrollOffsetTop?: number
}

const getValidationErrors = (
  validators: Validators,
  formValues: Record<string, any>,
  form: FormApi<Record<string, any>>
) => {
  let errors: Record<string, any> | undefined

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

export const Form = <T extends any = Record<string, any>>(props: Props<T>) => {
  const {
    children,
    autoComplete,
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

  const handleSubmit = useCallback(
    async (values, form, callback) => {
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
        render={({ handleSubmit }) => (
          <Container>
            <PicassoForm autoComplete={autoComplete} onSubmit={handleSubmit}>
              {children}
            </PicassoForm>
          </Container>
        )}
        onSubmit={handleSubmit}
        decorators={[...decorators, scrollToErrorDecorator]}
        {...rest}
      />
    </FormContext.Provider>
  )
}

Form.defaultProps = {}

Form.displayName = 'Form'

Form.Autocomplete = Autocomplete
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
Form.Switch = Switch

export default Form
