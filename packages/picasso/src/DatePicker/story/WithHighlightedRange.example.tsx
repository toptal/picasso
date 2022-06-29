import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const WithHighlightedRangeRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  const highlightedIntervals = [
    { start: new Date('2022-06-28'), end: new Date('2022-06-30') },
  ]
  const tooltipIntervals = [
    { start: new Date('2022-06-26'), end: new Date('2022-06-30'), tooltip: '10 business days notice period' },
  ]

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        highlightedIntervals={highlightedIntervals}
        tooltipIntervals={tooltipIntervals}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithHighlightedRangeRendering
