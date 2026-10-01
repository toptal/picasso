import React, { useState } from 'react'
import { TimePicker } from '@toptal/picasso'

const ColumnLabelsExample = () => {
  const [timepickerValue, setTimepickerValue] = useState<string>('09:30')

  return (
    <TimePicker
      onChange={setTimepickerValue}
      value={timepickerValue}
      hourLabel='Std'
      minuteLabel='Min'
    />
  )
}

export default ColumnLabelsExample
