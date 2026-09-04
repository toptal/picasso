import React, { useEffect, useMemo } from 'react'
import type { InputProps } from '@toptal/picasso-input'
import { Input as PicassoInput } from '@toptal/picasso-input'
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

  // `name` is passed explicitly rather than left in `rest`: under
  // @types/react 19 `forwardRef` types `props` as `PropsWithoutRef<Props>`, and
  // react-final-form's `[otherProp: string]: any` index signature collapses
  // that `Omit` to a bare index signature, so the spread no longer proves the
  // required `name` to `InputField`. Types 17 and 18 hand `Props` through
  // untouched; the explicit prop satisfies all three.
  const { label, labelEndAdornment, titleCase, name, ...rest } = props
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
      name={name}
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

Input.displayName = 'Input'

export default Input
