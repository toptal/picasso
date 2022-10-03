import React from 'react'
import {
  Switch as PicassoSwitch,
  SwitchProps,
  Form as PicassoForm,
} from '@toptal/picasso'

import PicassoField, { FieldProps } from '../Field'

export type FormSwitchProps = Omit<SwitchProps, 'onChange'> & {
  onChange?: SwitchProps['onChange']
}
export type Props = FormSwitchProps & FieldProps<SwitchProps['value']>

export const Switch = (props: Props) => (
  <PicassoField<FormSwitchProps>
    {...props}
    type='checkbox'
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
  </PicassoField>
)

Switch.defaultProps = {}

Switch.displayName = 'Switch'

export default Switch
