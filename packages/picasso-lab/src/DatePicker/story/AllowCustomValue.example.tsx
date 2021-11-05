import {
  DatePicker,
  DatePickerValue,
  DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT,
  datePickerParseDateString
} from '@toptal/picasso-lab'
import React, { useState } from 'react'

const AllowCustomValue = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>(
    'some custom value'
  )

  const parseInputValue = (value: string) => {
    const result = datePickerParseDateString(value, {
      dateFormat: DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT
    })

    return result ?? value
  }

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        parseInputValue={parseInputValue}
        onChange={setDatepickerValue}
      />
    </div>
  )
}

export default AllowCustomValue
