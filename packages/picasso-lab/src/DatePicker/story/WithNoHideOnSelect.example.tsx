import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const WithNoHideOnSelect = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date | [Date, Date]>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        hideOnSelect={false}
        onChange={(date: Date | [Date, Date]) => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)

          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithNoHideOnSelect
