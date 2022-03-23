import React from 'react'
import {
  TimePicker as PicassoTimePicker,
  TimePickerProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import InputFieldWrapper from '../InputFieldWrapper'

export type FormTimePickerProps = Omit<TimePickerProps, 'onChange'> & {
  onChange?: TimePickerProps['onChange']
}
export type Props = FormTimePickerProps & FieldProps<TimePickerProps['value']>

export const TimePicker = (props: Props) => (
  <InputFieldWrapper<FormTimePickerProps> {...props}>
    {(inputProps: TimePickerProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { enableReset, onResetClick, ...rest } = inputProps

      return <PicassoTimePicker {...rest} />
    }}
  </InputFieldWrapper>
)

TimePicker.displayName = 'TimePicker'

export default TimePicker
