import React from 'react'
import {
  NumberInput as PicassoNumberInput,
  NumberInputProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = NumberInputProps & FieldProps<NumberInputProps['value']>

export const NumberInput = (props: Props) => (
  <FieldWrapper<NumberInputProps> {...props}>
    {(inputProps: NumberInputProps) => {
      return <PicassoNumberInput {...inputProps} />
    }}
  </FieldWrapper>
)

NumberInput.defaultProps = {}

NumberInput.displayName = 'NumberInput'

export default NumberInput
