import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Input
      width='full'
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
    />
  )
}

export default Example
