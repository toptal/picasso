import React, { useState, ChangeEvent } from 'react'
import { Select, Form, Container, NumberInput } from '@toptal/picasso'

const SelectSearchBehaviourExample = () => {
  const [value, setValue] = useState<string>()
  const [treshold, setTreshold] = useState(4)

  const handleChange = (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  const handleTresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTreshold(parseInt(event.target.value, 10))
  }

  return (
    <Container flex>
      <Container right='small'>
        <Form.Field>
          <Form.Label>Search for an option</Form.Label>
          <Select
            onChange={handleChange}
            value={value}
            options={OPTIONS}
            placeholder='Choose an option...'
            width='auto'
            searchThreshold={treshold}
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Search treshold</Form.Label>
          <NumberInput value={treshold} onChange={handleTresholdChange} />
        </Form.Field>
      </Container>
    </Container>
  )
}

const OPTIONS = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' },
  { value: '5', text: 'Option 5' }
]

export default SelectSearchBehaviourExample
