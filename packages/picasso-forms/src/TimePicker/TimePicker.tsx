import React from 'react'
import {
  TimePicker as PicassoTimePicker,
  TimePickerProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormTimePickerProps = Omit<TimePickerProps, 'onChange'> & {
  onChange?: TimePickerProps['onChange']
}
export type Props = FormTimePickerProps & FieldProps<TimePickerProps['value']>

export const TimePicker = (props: Props) => (
  <FieldWrapper<FormTimePickerProps> {...props}>
    {(inputProps: TimePickerProps) => {
      return <PicassoTimePicker {...inputProps} />
    }}
  </FieldWrapper>
)

TimePicker.displayName = 'TimePicker'

export default TimePicker
