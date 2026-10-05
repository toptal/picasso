import React, { useState } from 'react'
import { TimePicker } from '@toptal/picasso'

const MinuteStepExample = () => {
  const [timepickerValue, setTimepickerValue] = useState<string>('09:30')

  return (
    <TimePicker
      onChange={setTimepickerValue}
      value={timepickerValue}
      minuteStep={15}
    />
  )
}

export default MinuteStepExample
