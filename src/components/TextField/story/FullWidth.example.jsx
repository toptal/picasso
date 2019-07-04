import React, { useState } from 'react'
import { TextField } from '@toptal/picasso'

const TextFieldFullWidthExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <TextField
      width='full'
      value={value}
      placeholder='Placeholder'
      onChange={handleChange}
    />
  )
}

export default TextFieldFullWidthExample
