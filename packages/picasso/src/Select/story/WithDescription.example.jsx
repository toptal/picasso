import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='Choose an option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1', description: 'Description 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3', description: 'Description 3' },
  { value: '4', text: 'Option 4' }
]

export default Example
