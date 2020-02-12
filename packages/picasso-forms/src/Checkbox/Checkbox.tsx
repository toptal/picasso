import React from 'react'
import { Checkbox as PicassoCheckbox } from '@toptal/picasso'
import { Props as CheckboxProps } from '@toptal/picasso/Checkbox'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = CheckboxProps & FieldProps<CheckboxProps['value']>

export const Checkbox = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper hideFieldLabel type='checkbox' {...props}>
    {(input: CheckboxProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoCheckbox {...input} />
    }}
  </FieldWrapper>
)

Checkbox.defaultProps = {}

Checkbox.displayName = 'Checkbox'

export default Checkbox
