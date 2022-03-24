import React from 'react'
import {
  Switch as PicassoSwitch,
  SwitchProps,
  Form as PicassoForm
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormSwitchProps = Omit<SwitchProps, 'onChange'> & {
  onChange?: SwitchProps['onChange']
}
export type Props = FormSwitchProps & FieldProps<SwitchProps['value']>

export const Switch = (props: Props) => (
  <FieldWrapper<FormSwitchProps>
    {...props}
    label={
      props.label ? (
        <PicassoForm.Label htmlFor={props.id} titleCase={props.titleCase}>
          {props.label}
        </PicassoForm.Label>
      ) : null
    }
  >
    {(inputProps: SwitchProps) => {
      return <PicassoSwitch {...inputProps} />
    }}
  </FieldWrapper>
)

Switch.defaultProps = {}

Switch.displayName = 'Switch'

export default Switch
