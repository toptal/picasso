import React from 'react'
import { Field } from 'react-final-form'
import { Input } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'

export type Props = InputProps & {
  /** name of input */
  name: string
}

export const FormInput = (props: Props) => {
  const { name, ...rest } = props

  return (
    <Field name={name}>
      {({ input }) => <Input name={name} {...rest} {...input} />}
    </Field>
  )
}

FormInput.defaultProps = {}

FormInput.displayName = 'FormInput'

export default FormInput
