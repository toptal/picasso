import React from 'react'
import { Switch as PicassoSwitch, SwitchProps } from '@toptal/picasso'
import { ValidateStatus } from '@toptal/picasso-shared'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormSwitchProps = Omit<SwitchProps, 'onChange'> & {
  onChange?: SwitchProps['onChange']
  status?: ValidateStatus
}
export type Props = FormSwitchProps & FieldProps<SwitchProps['value']>

export const Switch = (props: Props) => (
  <FieldWrapper<FormSwitchProps> hideLabelRequiredDecoration {...props}>
    {(inputProps: FormSwitchProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { status, ...rest } = inputProps

      return <PicassoSwitch {...rest} />
    }}
  </FieldWrapper>
)

Switch.defaultProps = {}

Switch.displayName = 'Switch'

export default Switch
