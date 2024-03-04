import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const ResetButtonExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValue(event.target.value)
  }

  const handleResetClick = () => {
    setValue('')
  }

  return (
    <Input
      enableReset
      onResetClick={handleResetClick}
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
    />
  )
}

export default ResetButtonExample
