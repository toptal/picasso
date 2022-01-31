import React, { useState } from 'react'
import { DatePicker, DatePickerValue } from '@toptal/picasso'

const WithResetButton = () => {
  const [datepickerValue, setDatepickerValue] = useState<DatePickerValue>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        enableReset
        onResetClick={() => setDatepickerValue(null)}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithResetButton
