import React, { useState } from 'react'
import { Select, Form } from '@toptal/picasso'

const SelectDefaultExample = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Form>
      <Form.Field>
        <Form.Label htmlFor='select'>Label:</Form.Label>

        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose option...'
          width='full'
          htmlId='select'
        />
      </Form.Field>
    </Form>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default SelectDefaultExample
