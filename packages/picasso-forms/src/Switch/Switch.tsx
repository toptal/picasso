import React from 'react'
import type { SwitchProps } from '@toptal/picasso-switch'
import { Switch as PicassoSwitch } from '@toptal/picasso-switch'
import { FormCompound as PicassoForm } from '@toptal/picasso-form'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
import type { Props as FieldLabelProps } from '../FieldLabel'

export type FormSwitchProps = Omit<SwitchProps, 'onChange'> & {
  onChange?: SwitchProps['onChange']
  value?: string
}

export type Props = FormSwitchProps &
  FieldProps<FormSwitchProps['value']> &
  Omit<FieldLabelProps, 'name' | 'required'>

export const Switch = (props: Props) => (
  <PicassoField<FormSwitchProps>
    {...props}
    type='checkbox'
    label={
      props.label ? (
        <PicassoForm.Label
          htmlFor={props.id}
          titleCase={props.titleCase}
          labelEndAdornment={props.labelEndAdornment}
        >
          {props.label}
        </PicassoForm.Label>
      ) : null
    }
  >
    {({
      // omitting highlight from inputProps
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      highlight,
      // value is not expected in PicassoSwitch
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value,
      ...inputProps
    }: SwitchProps & {
      highlight?: 'autofill'
      value: FormSwitchProps['value']
    }) => {
      return <PicassoSwitch {...inputProps} />
    }}
  </PicassoField>
)

Switch.defaultProps = {}

Switch.displayName = 'Switch'

export default Switch
