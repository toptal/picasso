import React from 'react'
import { Switch as PicassoSwitch, SwitchProps } from '@toptal/picasso-lab'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormSwitchProps = Omit<SwitchProps, 'onChange'> & {
  onChange?: SwitchProps['onChange']
}
export type Props = FormSwitchProps & FieldProps<SwitchProps['value']>

export const Switch = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<FormSwitchProps> {...props}>
    {(inputProps: SwitchProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoSwitch {...inputProps} />
    }}
  </FieldWrapper>
)

Switch.defaultProps = {}

Switch.displayName = 'Switch'

export default Switch
