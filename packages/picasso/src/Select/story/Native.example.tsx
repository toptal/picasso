import React, { useState, ChangeEvent } from 'react'
import { Container, Form, Select } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  return (
    <Container flex>
      <Container right='small'>
        <Form.Label>Reset disabled</Form.Label>
        <Select
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
          native
        />
      </Container>
      <Container>
        <Form.Label>Reset enabled</Form.Label>
        <Select
          enableReset
          onChange={handleChange}
          options={OPTIONS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
          native
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
