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
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<FormDatePickerProps> {...props}>
    {(inputProps: DatePickerProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoDatePicker {...inputProps} />
    }}
  </FieldWrapper>
)

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
