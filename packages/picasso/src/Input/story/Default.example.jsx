import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Input
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
      data-testId='input'
    />
  )
}

export default Example
