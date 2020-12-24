import React, { useState } from 'react'
import { Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<number>()

  const handleChange = (event: React.ChangeEvent<{ value: number }>) => {
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

export default Example
