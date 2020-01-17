import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const ResetButtonExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleResetClick = () => {
    setValue('')
  }

  return (
    <Input
      allowReset
      onResetClick={handleResetClick}
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
    />
  )
}

export default ResetButtonExample
