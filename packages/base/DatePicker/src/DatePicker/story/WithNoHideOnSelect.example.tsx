import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso'

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
