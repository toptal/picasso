import React from 'react'
import type { NumberInputProps } from '@toptal/picasso-number-input'
import { NumberInput as PicassoNumberInput } from '@toptal/picasso-number-input'
import type { FieldValidator } from 'final-form'

import { validators } from '../utils'
import type { FieldProps } from '../Field'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

export type Props = NumberInputProps &
  FieldProps<NumberInputProps['value']> &
  FieldLabelProps

const MIN = -2147483648
const MAX = 2147483647

const { composeValidators } = validators

export const NumberInput = (props: Props) => {
  const {
    min = MIN,
    max = MAX,
    validate,
    label,
    labelEndAdornment,
    titleCase,
    ...rest
  } = props

  const validateNumberLimits: FieldValidator<
    NumberInputProps['value']
  > = value => {
    if (Number(value) > max) {
      return `Must be less than or equal to ${max}.`
    }
    if (Number(value) < min) {
      return `Must be greater than or equal to ${min}.`
    }
  }

  return (
    <InputField<NumberInputProps>
      min={min}
      max={max}
      {...rest}
      validate={composeValidators([validateNumberLimits, validate])}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            labelEndAdornment={labelEndAdornment}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {(inputProps: NumberInputProps) => {
        return <PicassoNumberInput {...inputProps} />
      }}
    </InputField>
  )
}

NumberInput.defaultProps = {}

NumberInput.displayName = 'NumberInput'

export default NumberInput
