import React from 'react'
import {
  NumberInput as PicassoNumberInput,
  NumberInputProps
} from '@toptal/picasso'
import { FieldValidator } from 'final-form'

import { validators } from '../utils'
import { FieldProps } from '../FieldWrapper'
import FieldLabel from '../FieldLabel'
import InputFieldWrapper from '../InputFieldWrapper'

export type Props = NumberInputProps & FieldProps<NumberInputProps['value']>

const MIN = -2147483648
const MAX = 2147483647

const { composeValidators } = validators

export const NumberInput = (props: Props) => {
  const { min = MIN, max = MAX, validate, label, titleCase, ...rest } = props

  const validateNumberLimits: FieldValidator<NumberInputProps['value']> = value => {
    if (Number(value) > max) {
      return `Must be less than or equal to ${max}.`
    }
    if (Number(value) < min) {
      return `Must be greater than or equal to ${min}.`
    }
  }

  return (
    <InputFieldWrapper<NumberInputProps>
      {...rest}
      validate={composeValidators([validateNumberLimits, validate])}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {(inputProps: NumberInputProps) => {
        return <PicassoNumberInput {...inputProps} />
      }}
    </InputFieldWrapper>
  )
}

NumberInput.defaultProps = {}

NumberInput.displayName = 'NumberInput'

export default NumberInput
