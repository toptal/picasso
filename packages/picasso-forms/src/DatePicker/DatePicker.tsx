import React from 'react'
import type { DatePickerProps } from '@toptal/picasso-date-picker'
import { DatePicker as PicassoDatePicker } from '@toptal/picasso-date-picker'

import type { FieldProps } from '../Field'
import InputField from '../InputField'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'

export type FormDatePickerProps = Omit<DatePickerProps, 'onChange'> & {
  onChange?: DatePickerProps['onChange']
}
export type Props = FormDatePickerProps &
  FieldProps<DatePickerProps['value']> &
  FieldLabelProps

export const DatePicker = (props: Props) => {
  const { label, labelEndAdornment, titleCase, ...rest } = props

  return (
    <InputField<FormDatePickerProps>
      {...rest}
      label={
        <FieldLabel
          name={props.name}
          required={props.required}
          label={label}
          labelEndAdornment={labelEndAdornment}
          titleCase={titleCase}
        />
      }
    >
      {(inputProps: DatePickerProps) => {
        return <PicassoDatePicker {...inputProps} />
      }}
    </InputField>
  )
}

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
