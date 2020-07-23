import React from 'react'
import {
  TimePicker as PicassoTimePicker,
  TimePickerProps
} from '@toptal/picasso-lab'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormTimePickerProps = Omit<TimePickerProps, 'onChange'> & {
  onChange?: TimePickerProps['onChange']
}
export type Props = FormTimePickerProps & FieldProps<TimePickerProps['value']>

export const TimePicker = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<FormTimePickerProps> {...props}>
    {(inputProps: TimePickerProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoTimePicker {...inputProps} />
    }}
  </FieldWrapper>
)

TimePicker.displayName = 'TimePicker'

export default TimePicker
