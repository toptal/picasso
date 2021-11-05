import React from 'react'
import { Input as PicassoInput, InputProps } from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import getInputName from './utils/get-input-name'

export type FormInputProps = Omit<InputProps, 'onResetClick'> & {
  /** Callback invoked when reset button was clicked */
  onResetClick?: (set: (value: string) => void) => void
}
export type Props = FormInputProps & FieldProps<InputProps['value']>

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <FieldWrapper<FormInputProps> {...props}>
    {({ name, ...inputProps }: InputProps) => (
      // TODO: remove getInputName completely when Chrome fixes autocomplete issue
      // Link to the issue: https://bugs.chromium.org/p/chromium/issues/detail?id=1255609
      <PicassoInput name={getInputName(name)} {...inputProps} ref={ref} />
    )}
  </FieldWrapper>
))

Input.defaultProps = {}

Input.displayName = 'Input'

export default Input
