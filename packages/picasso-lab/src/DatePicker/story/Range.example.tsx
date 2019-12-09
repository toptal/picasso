import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const RangeExample = () => {
  const [value, setValue] = useState<[Date, Date]>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        range
        value={value}
        onChange={dates => {
          const [start, end] = dates as [Date, Date]

          // eslint-disable-next-line no-console
          console.log('start date', start)
          // eslint-disable-next-line no-console
          console.log('end date', end)

          setValue([start, end])
        }}
      />
    </div>
  )
}

export default RangeExample
