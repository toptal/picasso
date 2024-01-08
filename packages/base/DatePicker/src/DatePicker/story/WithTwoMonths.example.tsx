import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const TwoMonthsExample = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        numberOfMonths={2}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default TwoMonthsExample
