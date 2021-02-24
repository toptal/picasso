import React, { useState } from 'react'
import { DatePicker, DateOrDateRangeType } from '@toptal/picasso-lab'

const WithNoHideOnSelect = () => {
  const [
    datepickerValue,
    setDatepickerValue
  ] = useState<DateOrDateRangeType | null>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        hideOnSelect={false}
        onChange={(date: DateOrDateRangeType | null) => {
          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithNoHideOnSelect
