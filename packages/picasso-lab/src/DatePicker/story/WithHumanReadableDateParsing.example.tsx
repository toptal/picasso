import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const WithHumanReadableDateParsing = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()
  const timezone = 'Asia/Tokyo'

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        timezone={timezone}
        minDate={new Date()}
        parseHumanReadableDates
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithHumanReadableDateParsing
