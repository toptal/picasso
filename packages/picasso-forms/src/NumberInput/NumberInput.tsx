import React from 'react'
import { NumberInput as PicassoNumberInput } from '@toptal/picasso'
import { Props as NumberInputProps } from '@toptal/picasso/NumberInput'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = NumberInputProps & FieldProps<NumberInputProps['value']>

export const NumberInput = (props: Props) => (
  <FieldWrapper<NumberInputProps> {...props}>
    {(inputProps: NumberInputProps) => <PicassoNumberInput {...inputProps} />}
  </FieldWrapper>
)

NumberInput.defaultProps = {}

NumberInput.displayName = 'NumberInput'

export default NumberInput
