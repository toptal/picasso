import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const WithTooltipRangeRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  const tooltipIntervals = [
    {
      start: new Date('2022-06-26'),
      end: new Date('2022-06-30'),
      tooltip: '10 business days notice period',
    },
  ]

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        tooltipIntervals={tooltipIntervals}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithTooltipRangeRendering
