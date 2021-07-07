import React from 'react'
import {
  NumberInput as PicassoNumberInput,
  NumberInputProps
} from '@toptal/picasso'
import { FieldValidator } from 'final-form'

import { validators } from '../utils'
import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = NumberInputProps & FieldProps<NumberInputProps['value']>

const MIN = -2147483648
const MAX = 2147483647

const { composeValidators } = validators

export const NumberInput = (props: Props) => {
  const { min = MIN, max = MAX, validate } = props
  const validateNumberLimits: FieldValidator<NumberInputProps['value']> = value => {
    if (Number(value) > max) {
      return `Must be less than or equal to ${max}.`
    }
    if (Number(value) < min) {
      return `Must be greater than or equal to ${min}.`
    }
  }

  return (
    <FieldWrapper<NumberInputProps>
      {...props}
      validate={composeValidators([validateNumberLimits, validate])}
    >
      {(inputProps: NumberInputProps) => {
        return <PicassoNumberInput {...inputProps} />
      }}
    </FieldWrapper>
  )
}

NumberInput.defaultProps = {}

NumberInput.displayName = 'NumberInput'

export default NumberInput
