import React from 'react'
import { Select as PicassoSelect } from '@toptal/picasso'
import { Props as SelectProps } from '@toptal/picasso/Select'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = SelectProps & FieldProps<SelectProps['value']>

export const Select = (props: Props) => (
  <FieldWrapper<SelectProps> {...props}>
    {(selectProps: SelectProps) => <PicassoSelect {...selectProps} />}
  </FieldWrapper>
)

Select.defaultProps = {}

Select.displayName = 'Select'

export default Select
