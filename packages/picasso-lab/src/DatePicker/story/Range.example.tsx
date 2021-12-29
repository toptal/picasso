import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'

const RangeExample = () => {
  const [value, setValue] = useState<[Date, Date] | null>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        range
        value={value}
        onChange={dates => {
          setValue(dates as [Date, Date] | null)
        }}
      />
    </div>
  )
}

export default RangeExample
