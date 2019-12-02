import React, { useState } from 'react'
import { Input } from '@toptal/picasso'

const InputDefaultExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Input
      value={value}
      size='small'
      placeholder='Placeholder'
      onChange={handleChange}
    />
  )
}

export default InputDefaultExample
