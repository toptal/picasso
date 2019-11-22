import React from 'react'
import { DatePicker } from '@toptal/picasso/lab'

const RangeExample = () => {
  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        range
        onChange={(dates: Date | [Date, Date]) => {
          const [start, end] = dates as [Date, Date]

          // eslint-disable-next-line no-console
          console.log('start date', start)
          // eslint-disable-next-line no-console
          console.log('end date', end)
        }}
      />
    </div>
  )
}

export default RangeExample
