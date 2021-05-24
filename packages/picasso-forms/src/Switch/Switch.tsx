import React from 'react'
import { Switch as PicassoSwitch, SwitchProps } from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormSwitchProps = Omit<SwitchProps, 'onChange'> & {
  onChange?: SwitchProps['onChange']
}
export type Props = FormSwitchProps & FieldProps<SwitchProps['value']>

export const Switch = (props: Props) => (
  <FieldWrapper<FormSwitchProps> hideLabelRequiredDecoration {...props}>
    {(inputProps: SwitchProps) => {
      return <PicassoSwitch {...inputProps} />
    }}
  </FieldWrapper>
)

Switch.defaultProps = {}

Switch.displayName = 'Switch'

export default Switch
