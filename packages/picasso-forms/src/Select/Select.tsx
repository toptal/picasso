import React from 'react'
import { Select as PicassoSelect, SelectProps } from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = SelectProps & FieldProps<SelectProps['value']>

export const Select = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<SelectProps> {...props}>
    {(selectProps: SelectProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoSelect {...selectProps} />
    }}
  </FieldWrapper>
)

Select.defaultProps = {}

Select.displayName = 'Select'

export default Select
