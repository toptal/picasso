import React, { useState } from 'react'
import { Container, Form, Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  return (
    <Container flex>
      <Container right='small'>
        <Form.Label>Default</Form.Label>
        <Select
          loading
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
      <Container>
        <Form.Label>Native</Form.Label>
        <Select
          native
          loading
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
        />
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

export default Example
