import React, { useState } from 'react'
import { TimePicker } from '@toptal/picasso-lab'

const DefaultExample = () => {
  const [timepickerValue, setTimepickerValue] = useState<string>('18:00')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTimepickerValue(e.target.value)
  }

  return <TimePicker onChange={handleChange} value={timepickerValue} />
}

export default DefaultExample
