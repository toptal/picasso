import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Input
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
      data-testid='input'
    />
  )
}

export default Example
