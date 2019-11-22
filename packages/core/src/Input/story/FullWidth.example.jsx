import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const InputFullWidthExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
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

export default InputFullWidthExample
