import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Select value:', event.target.value)
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
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
  { value: '5', text: 'Option 5' },
  { value: '6', text: 'Option 6' },
  { value: '7', text: 'Option 7' },
  { value: '8', text: 'Option 8' },
  { value: '9', text: 'Option 9' },
  { value: '10', text: 'Option 10' },
  { value: '11', text: 'Option 11' },
  { value: '12', text: 'Option 12' },
  { value: '13', text: 'Option 13' },
  { value: '14', text: 'Option 14' }
]

export default Example
