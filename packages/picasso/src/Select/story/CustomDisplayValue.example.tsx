import React, { useState } from 'react'
import { Select, SelectOption } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  const getDisplayValue = (option: SelectOption | null) => {
    if (!option) {
      return ''
    }

    const { text, value } = option

    return `You selected ${text} with value ${value}`
  }

  return (
    <Select
      onChange={handleChange}
      options={OPTIONS}
      value={value}
      getDisplayValue={getDisplayValue}
      placeholder='Choose an option...'
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

export default Example
