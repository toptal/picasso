import React, { useState } from 'react'
import { Select, Form, Container } from '@toptal/picasso'

const SelectDefaultExample = () => {
  const [value, setValue] = useState()

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Form>
      <Container bottom='large'>
        <Form.Field>
          <Form.Label>Label:</Form.Label>

          <Select
            onChange={handleChange}
            options={OPTIONS}
            value={value}
            placeholder='Choose option...'
            width='shrink'
          />
        </Form.Field>
      </Container>

      <Container bottom='large'>
        <Form.Field>
          <Form.Label>Label:</Form.Label>

          <Select
            onChange={handleChange}
            options={OPTIONS}
            value={value}
            placeholder='Choose option...'
            width='auto'
          />
        </Form.Field>
      </Container>

      <Container bottom='large'>
        <Form.Field>
          <Form.Label>Label:</Form.Label>

          <Select
            onChange={handleChange}
            options={OPTIONS}
            value={value}
            placeholder='Choose option...'
            width='full'
          />
        </Form.Field>
      </Container>
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
