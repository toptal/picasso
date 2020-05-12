import React from 'react'
import { DatePicker as PicassoDatePicker } from '@toptal/picasso-lab'
import { Props as DatePickerProps } from '@toptal/picasso-lab/src/DatePicker/DatePicker'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = DatePickerProps & FieldProps<DatePickerProps['value']>

export const DatePicker = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<DatePickerProps> {...props}>
    {(inputProps: DatePickerProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoDatePicker {...inputProps} />
    }}
  </FieldWrapper>
)

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
