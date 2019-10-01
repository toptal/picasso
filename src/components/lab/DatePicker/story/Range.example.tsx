import React from 'react'
import { DatePicker } from '@toptal/picasso'

const RangeExample = () => {
  return (
    <div>
      <DatePicker
        range
        onSelect={(dates: any) => {
          const [start, end] = dates as [Date, Date]

          console.log('start date', start)
          console.log('end date', end)
        }}
      />
    </div>
  )
}

export default RangeExample
