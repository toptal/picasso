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
      renderOption={option => (
        <div>
          Custom <b>{option.text}</b>
        </div>
      )}
      value={value}
      placeholder='Choose an option...'
      width='auto'
    />
  )
}

const OPTIONS = [
  { value: 1, text: 'option 1' },
  {
    value: 2,
    text: 'option 2'
  }
]

export default SelectCustomOptionExample
