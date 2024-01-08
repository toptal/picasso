import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Input
      value={value}
      type='email'
      name='email'
      autoComplete='email'
      placeholder='email'
      onChange={handleChange}
    />
  )
}

export default Example
