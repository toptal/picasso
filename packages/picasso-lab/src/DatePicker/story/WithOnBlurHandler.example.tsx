import React, { useState } from 'react'
import { DatePicker, DatePickerValue } from '@toptal/picasso-lab'

const WithOnBlurHandlerExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onBlur={() => {
          // handle on blur
        }}
        onChange={(date: DatePickerValue) => {
          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithOnBlurHandlerExample
