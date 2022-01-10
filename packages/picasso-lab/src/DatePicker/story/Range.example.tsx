import React, { useState } from 'react'
import { DatePicker, DatePickerValue } from '@toptal/picasso-lab'

const RangeExample = () => {
  const [value, setValue] = useState<DatePickerValue>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        range
        value={value}
        onChange={dates => {
          setValue(dates)
        }}
      />
    </div>
  )
}

export default RangeExample
