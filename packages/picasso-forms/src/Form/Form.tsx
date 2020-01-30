import React from 'react'
import {
  Form as FinalForm,
  FormProps as FinalFormProps
} from 'react-final-form'
// @ts-ignore
import createDecorator from 'final-form-focus'
import { Form as PicassoForm } from '@toptal/picasso'

import Input from '../Input'
import Select from '../Select'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import Checkbox from '../Checkbox'
import NumberInput from '../NumberInput'
import FileInput from '../FileInput'

export type Props = Omit<FinalFormProps, 'validate'> & {}

const focusOnErrors = createDecorator()

export const Form = (props: Props) => {
  const { children, validateOnBlur, ...rest } = props

  return (
    <FinalForm
      render={({ handleSubmit }) => (
        <PicassoForm onSubmit={handleSubmit}>{children}</PicassoForm>
      )}
      validateOnBlur={validateOnBlur}
      decorators={[focusOnErrors]}
      {...rest}
    />
  )
}

Form.defaultProps = {
  validateOnBlur: true
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
