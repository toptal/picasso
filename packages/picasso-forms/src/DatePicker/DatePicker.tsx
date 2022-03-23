import React from 'react'
import {
  DatePicker as PicassoDatePicker,
  DatePickerProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import InputFieldWrapper from '../InputFieldWrapper'

export type FormDatePickerProps = Omit<DatePickerProps, 'onChange'> & {
  onChange?: DatePickerProps['onChange']
}
export type Props = FormDatePickerProps & FieldProps<DatePickerProps['value']>

export const DatePicker = (props: Props) => (
  <InputFieldWrapper<FormDatePickerProps> {...props}>
    {(inputProps: DatePickerProps) => {
      return <PicassoDatePicker {...inputProps} />
    }}
  </InputFieldWrapper>
)

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
