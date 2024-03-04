import React from 'react'
import type { TimePickerProps } from '@toptal/picasso'
import { TimePicker as PicassoTimePicker } from '@toptal/picasso'

import type { FieldProps } from '../Field'
import InputField from '../InputField'
import FieldLabel from '../FieldLabel'
import type { Props as FieldLabelProps } from '../FieldLabel'

export type FormTimePickerProps = Omit<TimePickerProps, 'onChange'> & {
  onChange?: TimePickerProps['onChange']
}
export type Props = FormTimePickerProps &
  FieldProps<TimePickerProps['value']> &
  FieldLabelProps

export const TimePicker = (props: Props) => {
  const { label, labelEndAdornment, titleCase, ...rest } = props

  return (
    <InputField<FormTimePickerProps>
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            labelEndAdornment={labelEndAdornment}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {(inputProps: TimePickerProps) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { enableReset, onResetClick, ...rest } = inputProps

        return <PicassoTimePicker {...rest} />
      }}
    </InputField>
  )
}

TimePicker.displayName = 'TimePicker'

export default TimePicker
