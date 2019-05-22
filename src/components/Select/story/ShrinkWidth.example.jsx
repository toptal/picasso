import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const SelectDefaultExample = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='ID'
      width='shrink'
    />
  )
}

const OPTIONS = [
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' }
]

export default SelectDefaultExample
