import React from 'react'
import { Input as PicassoInput } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = InputProps & FieldProps<InputProps['value']>

export const Input = (props: Props) => (
  <FieldWrapper<InputProps['value'], InputProps> {...props}>
    {(input: InputProps) => <PicassoInput {...input} />}
  </FieldWrapper>
)

Input.defaultProps = {}

Input.displayName = 'Input'

export default Input
