import React, { useState } from 'react'
import { DatePicker, DatePickerValue } from '@toptal/picasso-lab'

const WithNoHideOnSelect = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        hideOnSelect={false}
        onChange={(date: DatePickerValue) => {
          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithNoHideOnSelect
