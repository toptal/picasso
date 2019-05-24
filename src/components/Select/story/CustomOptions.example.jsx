import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const SelectCustomOptionExample = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      placeholder='Choose option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  { value: 1, text: 'Option 1' },
  {
    value: 2,
    text: (
      <div>
        Option <b>custom</b>
      </div>
    )
  }
]

export default SelectCustomOptionExample
