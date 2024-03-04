import React, { useState } from 'react'
import { TimePicker } from '@toptal/picasso'

const DefaultExample = () => {
  const [timepickerValue, setTimepickerValue] = useState<string>('18:00')

  return <TimePicker onChange={setTimepickerValue} value={timepickerValue} />
}

export default DefaultExample
