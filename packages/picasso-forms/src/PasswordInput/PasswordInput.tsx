import React from 'react'
import {
  PasswordInput as PicassoPasswordInput,
  PasswordInputProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = PasswordInputProps & FieldProps<PasswordInputProps['value']>

export const PasswordInput = (props: Props) => {
  return (
    <FieldWrapper<PasswordInputProps> {...props}>
      {(inputProps: PasswordInputProps) => {
        return <PicassoPasswordInput {...inputProps} />
      }}
    </FieldWrapper>
  )
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
