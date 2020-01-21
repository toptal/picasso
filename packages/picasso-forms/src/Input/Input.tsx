import React from 'react'
import { Input as PicassoInput } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = InputProps & FieldProps<string>

export const Input = (props: Props) => (
  <FieldWrapper<string, InputProps> {...props}>
    {input => <PicassoInput {...input} />}
  </FieldWrapper>
)

Input.defaultProps = {}

Input.displayName = 'Input'

export default Input
