import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso'

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
