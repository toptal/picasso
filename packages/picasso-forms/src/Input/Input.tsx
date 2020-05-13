import React from 'react'
import { Input as PicassoInput } from '@toptal/picasso'
import { Props as InputProps } from '@toptal/picasso/Input'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormInputProps = Omit<InputProps, 'onResetClick'> & {
  /** Callback invoked when reset button was clicked */
  onResetClick?: (set: (value: string) => void) => void
}
export type Props = FormInputProps & FieldProps<InputProps['value']>

export const Input = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<FormInputProps> {...props}>
    {(inputProps: InputProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoInput {...inputProps} />
    }}
  </FieldWrapper>
)

Input.defaultProps = {}

Input.displayName = 'Input'

export default Input
