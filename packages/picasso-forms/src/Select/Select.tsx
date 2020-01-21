import React from 'react'
import { Select as PicassoSelect } from '@toptal/picasso'
import { Props as SelectProps } from '@toptal/picasso/Select'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = SelectProps & FieldProps<string>

export const Select = (props: Props) => (
  <FieldWrapper<string, SelectProps> {...props}>
    {(input: SelectProps) => <PicassoSelect {...input} />}
  </FieldWrapper>
)

Select.defaultProps = {}

Select.displayName = 'Select'

export default Select
