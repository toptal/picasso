import React from 'react'
import {
  DatePicker as PicassoDatePicker,
  DatePickerProps
} from '@toptal/picasso-lab'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type FormDatePickerProps = Omit<DatePickerProps, 'onChange'> & {
  onChange?: DatePickerProps['onChange']
}
export type Props = FormDatePickerProps & FieldProps<DatePickerProps['value']>

export const DatePicker = (props: Props) => (
  <FieldWrapper<FormDatePickerProps> {...props}>
    {(inputProps: DatePickerProps) => {
      return <PicassoDatePicker {...inputProps} />
    }}
  </FieldWrapper>
)

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
