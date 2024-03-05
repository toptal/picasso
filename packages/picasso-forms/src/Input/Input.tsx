import React, { useEffect, useMemo } from 'react'
import type { InputProps } from '@toptal/picasso'
import { Input as PicassoInput } from '@toptal/picasso'
import { useForm } from 'react-final-form'

import type { FieldProps } from '../Field'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

export type FormInputProps = Omit<InputProps, 'onResetClick'> & {
  /** Callback invoked when reset button was clicked */
  onResetClick?: (set: (value: string) => void) => void
}
export type Props = FormInputProps &
  FieldProps<InputProps['value']> &
  FieldLabelProps

const warnAutocompleteDisabledInput = (name?: string) => {
  const autocompleteDisabled =
    name && /^(((field|input)(_|-)?\d+)|tan|otp|title|captcha)$/.test(name)

  if (autocompleteDisabled) {
    console.warn(`
In Chromium-based browsers, autocomplete might be disabled for input[name="${name}"].
Known bug: https://bugs.chromium.org/p/chromium/issues/detail?id=1255609
    `)
  }
}

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  useEffect(() => {
    // TODO: remove this console.warn completely when Chrome fixes autocomplete issue
    // Regex is taken from https://source.chromium.org/chromium/chromium/src/+/main:components/autofill/core/browser/autocomplete_history_manager.cc;l=53;drc=1d2260f9ed19c755db1631b7fb9b1ba216b323dc
    // according to https://bugs.chromium.org/p/chromium/issues/detail?id=1255609
    warnAutocompleteDisabledInput(props.name)
  }, [props.name])

  const {
    mutators: { setHasMultilineCounter },
  } = useForm()

  const { label, labelEndAdornment, titleCase, ...rest } = props
  const { multiline, rows, rowsMax } = props

  const alignment = useMemo(() => {
    if (!multiline) {
      return 'middle'
    }

    if (Number(rows ?? 1) >= 2 || Number(rowsMax ?? 1) >= 2) {
      return 'top'
    }

    return 'middle'
  }, [multiline, rows, rowsMax])

  return (
    <InputField<FormInputProps>
      {...rest}
      setHasMultilineCounter={setHasMultilineCounter}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            labelEndAdornment={labelEndAdornment}
            titleCase={titleCase}
            alignment={alignment}
          />
        ) : null
      }
    >
      {(inputProps: InputProps) => <PicassoInput {...inputProps} ref={ref} />}
    </InputField>
  )
})

Input.defaultProps = {}

Input.displayName = 'Input'

export default Input
