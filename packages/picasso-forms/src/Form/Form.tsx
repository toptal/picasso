import React from 'react'
import {
  Form as FinalForm,
  FormProps as FinalFormProps
} from 'react-final-form'
import { Form as PicassoForm } from '@toptal/picasso'

import Input from '../Input'
import Select from '../Select'

export type Props = Omit<FinalFormProps, 'validate'> & {}

export const Form = (props: Props) => {
  const { children, ...rest } = props

  return (
    <FinalForm
      render={({ handleSubmit }) => (
        <PicassoForm onSubmit={handleSubmit}>{children}</PicassoForm>
      )}
      {...rest}
    />
  )
}

Form.defaultProps = {}

Form.displayName = 'Form'

Form.Input = Input
Form.Select = Select

export default Form
