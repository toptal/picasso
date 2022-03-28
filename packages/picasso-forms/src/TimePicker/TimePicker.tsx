import React from 'react'
import {
  TimePicker as PicassoTimePicker,
  TimePickerProps
} from '@toptal/picasso'

import { FieldProps } from '../Field'
import InputField from '../InputField'
import FieldLabel from '../FieldLabel'

export type FormTimePickerProps = Omit<TimePickerProps, 'onChange'> & {
  onChange?: TimePickerProps['onChange']
}
export type Props = FormTimePickerProps & FieldProps<TimePickerProps['value']>

export const TimePicker = (props: Props) => {
  const { label, titleCase, ...rest } = props

  return (
    <InputField<FormTimePickerProps>
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
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
