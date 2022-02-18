import React from 'react'
import {
  PasswordInput as PicassoPasswordInput,
  PasswordInputProps
} from '@toptal/picasso'

import { validators } from '../utils'
import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = PasswordInputProps & FieldProps<PasswordInputProps['value']>

const { composeValidators } = validators

export const PasswordInput = (props: Props) => {
  const { validate } = props

  return (
    <FieldWrapper<PasswordInputProps>
      {...props}
      validate={composeValidators([validate])}
    >
      {(inputProps: PasswordInputProps) => {
        return <PicassoPasswordInput {...inputProps} />
      }}
    </FieldWrapper>
  )
}

PasswordInput.defaultProps = {}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
