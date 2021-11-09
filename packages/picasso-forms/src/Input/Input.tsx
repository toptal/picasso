import React from 'react'
import { Input as PicassoInput, InputProps } from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormInputProps = Omit<InputProps, 'onResetClick'> & {
  /** Callback invoked when reset button was clicked */
  onResetClick?: (set: (value: string) => void) => void
}
export type Props = FormInputProps & FieldProps<InputProps['value']>

const warnAutocompleteDisabledInput = (name?: string) => {
  const autocompleteDisabled =
    name && /^(((field|input)(_|-)?\d+)|tan|otp|title|captcha)$/.test(name)

  if (autocompleteDisabled) {
    console.warn(`
In Chrome browser, autocomplete will be disabled for input[name="${name}"].
Known bug: https://bugs.chromium.org/p/chromium/issues/detail?id=1255609
    `)
  }
}

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <FieldWrapper<FormInputProps> {...props}>
    {(inputProps: InputProps) => {
      // TODO: remove this console.warn completely when Chrome fixes autocomplete issue
      // Regex is taken from https://source.chromium.org/chromium/chromium/src/+/main:components/autofill/core/browser/autocomplete_history_manager.cc;l=53;drc=1d2260f9ed19c755db1631b7fb9b1ba216b323dc
      // according to https://bugs.chromium.org/p/chromium/issues/detail?id=1255609
      warnAutocompleteDisabledInput(inputProps.name)

      return <PicassoInput {...inputProps} ref={ref} />
    }}
  </FieldWrapper>
))

Input.defaultProps = {}

Input.displayName = 'Input'

export default Input
