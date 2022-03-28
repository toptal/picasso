import React from 'react'
import {
  DatePicker as PicassoDatePicker,
  DatePickerProps
} from '@toptal/picasso'

import { FieldProps } from '../Field'
import InputField from '../InputField'
import FieldLabel from '../FieldLabel'

export type FormDatePickerProps = Omit<DatePickerProps, 'onChange'> & {
  onChange?: DatePickerProps['onChange']
}
export type Props = FormDatePickerProps & FieldProps<DatePickerProps['value']>

export const DatePicker = (props: Props) => {
  const { label, titleCase, ...rest } = props

  return (
    <InputField<FormDatePickerProps>
      {...rest}
      label={
        <FieldLabel
          name={props.name}
          required={props.required}
          label={label}
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
