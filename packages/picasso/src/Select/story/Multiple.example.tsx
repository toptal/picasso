import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

const Example = () => {
  const [values, setValues] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
    setValues(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={values}
      placeholder='Choose an option...'
      width='auto'
      multiple
    />
  )
}

export default Example
