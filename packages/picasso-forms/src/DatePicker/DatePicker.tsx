import React from 'react'
import {
  DatePicker as PicassoDatePicker,
  DatePickerProps
} from '@toptal/picasso'

import { FieldProps } from '../FieldWrapper'
import InputFieldWrapper from '../InputFieldWrapper'
import FieldLabel from '../FieldLabel'

export type FormDatePickerProps = Omit<DatePickerProps, 'onChange'> & {
  onChange?: DatePickerProps['onChange']
}
export type Props = FormDatePickerProps & FieldProps<DatePickerProps['value']>

export const DatePicker = (props: Props) => {
  const { label, titleCase, ...rest } = props

  return (
    <InputFieldWrapper<FormDatePickerProps>
      {...rest}
      label={
        <FieldLabel
          id={props.id}
          required={props.required}
          label={label}
          titleCase={titleCase}
        />
      }
    >
      {(inputProps: DatePickerProps) => {
        return <PicassoDatePicker {...inputProps} />
      }}
    </InputFieldWrapper>
  )
}

DatePicker.defaultProps = {}

DatePicker.displayName = 'DatePicker'

export default DatePicker
