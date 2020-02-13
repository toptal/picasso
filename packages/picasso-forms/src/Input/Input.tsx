import React from 'react'
import { Input as PicassoInput } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = InputProps & FieldProps<InputProps['value']>

export const Input = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<InputProps> {...props}>
    {(inputProps: InputProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoInput {...inputProps} />
    }}
  </FieldWrapper>
)

Input.defaultProps = {}

Input.displayName = 'Input'

export default Input
