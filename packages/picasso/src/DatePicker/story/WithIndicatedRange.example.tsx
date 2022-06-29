import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso'

const WithIndicatedRangeRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  const disabledIntervals = [
    { start: new Date('2022-07-01'), end: new Date('2022-07-04') },
  ]

  const indicatedIntervals = [
    { start: new Date('2022-07-11'), end: new Date('2022-07-16') },
    { start: new Date('2022-07-18'), end: new Date('2022-07-23') },
  ]

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        disabledIntervals={disabledIntervals}
        indicatedIntervals={indicatedIntervals}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
      />
    </div>
  )
}

export default WithIndicatedRangeRendering
