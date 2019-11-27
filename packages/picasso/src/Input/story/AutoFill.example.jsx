import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const AutoFillExample = () => {
  const [value, setValue] = useState('')

  const handleChange = event => {
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

export default AutoFillExample
