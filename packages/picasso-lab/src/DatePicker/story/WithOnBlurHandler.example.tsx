import React, { useState } from 'react'
import { DatePicker, DateOrDateRangeType } from '@toptal/picasso-lab'

const WithOnBlurHandlerExample = () => {
  const [
    datepickerValue,
    setDatepickerValue
  ] = useState<DateOrDateRangeType | null>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onBlur={() => {
          // handle on blur
        }}
        onChange={(date: DateOrDateRangeType | null) => {
          setDatepickerValue(date)
        }}
      />
    </div>
  )
}

export default WithOnBlurHandlerExample
