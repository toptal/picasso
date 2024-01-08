import React, { useState } from 'react'
import type { DatePickerValue } from '@toptal/picasso'
import { DatePicker } from '@toptal/picasso'

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
