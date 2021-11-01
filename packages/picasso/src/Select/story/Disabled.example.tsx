import React, { useState } from 'react'
import { Select, Container, Form } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex gap='small'>
      <Container>
        <Form.Field>
          <Form.Label>Select is disabled</Form.Label>
          <Select
            disabled
            onChange={handleChange}
            options={OPTIONS}
            value={value}
            placeholder='Choose an option...'
            width='auto'
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Options are disabled</Form.Label>
          <Select
            onChange={handleChange}
            options={OPTIONS.map((option, index) => ({
              ...option,
              disabled: index % 2 === 0
            }))}
            value={value}
            placeholder='Choose an option...'
            width='auto'
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Native options are disabled</Form.Label>
          <Select
            onChange={handleChange}
            options={OPTIONS.map((option, index) => ({
              ...option,
              disabled: index % 2 !== 0
            }))}
            value={value}
            placeholder='Choose an option...'
            width='auto'
            native
          />
        </Form.Field>
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
