import React, { useCallback, ReactNode } from 'react'
import {
  Form as FinalForm,
  FormProps as FinalFormProps
} from 'react-final-form'
// @ts-ignore
import createDecorator from 'final-form-focus'
import { Form as PicassoForm } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-utils'

import Input from '../Input'
import Select from '../Select'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import Checkbox from '../Checkbox'
import NumberInput from '../NumberInput'
import FileInput from '../FileInput'

type AnyObject = Record<string, any>

export type Props<T = AnyObject> = Omit<FinalFormProps<T>, 'validate'> & {
  successSubmitMessage?: ReactNode
  failedSubmitMessage?: ReactNode
}

const focusOnErrors = createDecorator()

export function Form<T = AnyObject>(props: Props<T>) {
  const {
    children,
    onSubmit,
    successSubmitMessage,
    failedSubmitMessage,
    ...rest
  } = props
  const { showSuccess, showError } = useNotifications()

  const handleSubmit = useCallback(
    async (values, form, callback) => {
      const errors = await onSubmit(values, form, callback)

      if (!errors) {
        showSuccess(successSubmitMessage)
      } else {
        showError(failedSubmitMessage)
        return errors
      }
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
    <FinalForm
      render={({ handleSubmit }) => (
        <PicassoForm onSubmit={handleSubmit}>{children}</PicassoForm>
      )}
      onSubmit={handleSubmit}
      decorators={[focusOnErrors]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

Form.defaultProps = {
  successSubmitMessage: 'Success!',
  failedSubmitMessage: 'Submit failed!'
}

Form.displayName = 'Form'

Form.Input = Input
Form.Select = Select
Form.Radio = Radio
Form.RadioGroup = RadioGroup
Form.Checkbox = Checkbox
Form.NumberInput = NumberInput
Form.FileInput = FileInput

export default Form
