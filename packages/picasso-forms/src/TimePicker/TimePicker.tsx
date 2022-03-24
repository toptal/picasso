import React from 'react'
import {
  TimePicker as PicassoTimePicker,
  TimePickerProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import InputFieldWrapper from '../InputFieldWrapper'
import FieldLabel from '../FieldLabel'

export type FormTimePickerProps = Omit<TimePickerProps, 'onChange'> & {
  onChange?: TimePickerProps['onChange']
}
export type Props = FormTimePickerProps & FieldProps<TimePickerProps['value']>

export const TimePicker = (props: Props) => (
  <InputFieldWrapper<FormTimePickerProps>
    {...props}
    label={
      props.label ? (
        <FieldLabel
          id={props.id}
          required={props.required}
          label={props.label}
          titleCase={props.titleCase}
        />
      ) : null
    }
  >
    {(inputProps: TimePickerProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { enableReset, onResetClick, ...rest } = inputProps

      return <PicassoTimePicker {...rest} />
    }}
  </InputFieldWrapper>
)

TimePicker.displayName = 'TimePicker'

export default TimePicker
