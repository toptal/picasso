import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const SelectDisabledExample = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Select
      disabled
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='Choose option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default SelectDisabledExample
