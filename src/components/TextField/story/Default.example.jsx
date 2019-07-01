import React, { useState } from 'react'
import { TextField } from '@toptal/picasso'

const TextFieldDefaultExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <TextField
      value={value}
      placeholder='Placeholder'
      width='auto'
      onChange={handleChange}
    />
  )
}

export default TextFieldDefaultExample
