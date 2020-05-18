import React, { useCallback, useMemo, ReactNode } from 'react'
import {
  Form as FinalForm,
  FormProps as FinalFormProps
} from 'react-final-form'
import { Form as PicassoForm } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

import Input from '../Input'
import Select from '../Select'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import Checkbox from '../Checkbox'
import NumberInput from '../NumberInput'
import FileInput from '../FileInput'
import DatePicker from '../DatePicker'
import TagSelector from '../TagSelector'
import SubmitButton from '../SubmitButton'
import { createScrollToErrorDecorator } from '../utils'

type AnyObject = Record<string, any>

export type Props<T = AnyObject> = FinalFormProps<T> & {
  successSubmitMessage?: ReactNode
  failedSubmitMessage?: ReactNode
  scrollOffsetTop?: number
}

export function Form<T = AnyObject>(props: Props<T>) {
  const {
    children,
    onSubmit,
    successSubmitMessage,
    failedSubmitMessage,
    scrollOffsetTop,
    decorators = [],
    ...rest
  } = props
  const { showSuccess, showError } = useNotifications()
  const scrollToErrorDecorator = useMemo(
    () => createScrollToErrorDecorator({ scrollOffsetTop }),
    [scrollOffsetTop]
  )

  const handleSubmit = useCallback(
    async (values, form, callback) => {
      const errors = await onSubmit(values, form, callback)

      if (!errors && successSubmitMessage) {
        showSuccess(successSubmitMessage)
      } else if (errors && failedSubmitMessage) {
        showError(failedSubmitMessage)
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
    <FinalForm
      render={({ handleSubmit }) => (
        <PicassoForm onSubmit={handleSubmit}>{children}</PicassoForm>
      )}
      onSubmit={handleSubmit}
      decorators={[...decorators, scrollToErrorDecorator]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

Form.defaultProps = {}

Form.displayName = 'Form'

Form.Input = Input
Form.Select = Select
Form.Radio = Radio
Form.RadioGroup = RadioGroup
Form.Checkbox = Checkbox
Form.NumberInput = NumberInput
Form.FileInput = FileInput
Form.DatePicker = DatePicker
Form.TagSelector = TagSelector
Form.SubmitButton = SubmitButton

export default Form
