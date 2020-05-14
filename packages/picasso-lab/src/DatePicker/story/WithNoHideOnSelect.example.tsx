import React, { useState } from 'react'
import { DatePicker, DateOrDateRangeType } from '@toptal/picasso-lab'

const WithNoHideOnSelect = () => {
  const [datepickerValue, setDatepickerValue] = useState<DateOrDateRangeType>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        hideOnSelect={false}
        onChange={(date: DateOrDateRangeType | null) => {
          /* eslint-disable-next-line no-console */
          console.log('selected date is: ', date)

          if (date === null) {
            setDatepickerValue(undefined)
            return
          }

          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithNoHideOnSelect
