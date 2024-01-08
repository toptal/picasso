import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Select, Form, Container, NumberInput } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const SelectSearchBehaviourExample = () => {
  const [value, setValue] = useState<string>('')
  const [threshold, setThreshold] = useState(4)

  const handleChange = (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    setValue(event.target.value)
  }

  const handleThresholdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setThreshold(parseInt(event.target.value, 10))
  }

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Form.Field>
          <Form.Label>Search for an option</Form.Label>
          <Select
            onChange={handleChange}
            value={value}
            options={OPTIONS}
            placeholder='Choose an option...'
            width='auto'
            searchThreshold={threshold}
            data-testid='select'
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Search threshold</Form.Label>
          <NumberInput
            value={threshold}
            onChange={handleThresholdChange}
            data-testid='input-threshold'
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
  { value: '4', text: 'Option 4' },
  { value: '5', text: 'Option 5' },
]

export default SelectSearchBehaviourExample
