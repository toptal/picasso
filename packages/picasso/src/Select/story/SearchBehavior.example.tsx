import React, { useState, ChangeEvent } from 'react'
import { Select, Form, Container, NumberInput } from '@toptal/picasso'

const SelectSearchBehaviourExample = () => {
  const [value1, setValue1] = useState<string>('')
  const [value2, setValue2] = useState<string>('')
  const [threshold, setThreshold] = useState(4)
  const [maxSearchItems, setMaxSearchItems] = useState(50)

  const handlerForSelectChange = (setState: (state: string) => void) => (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    setState(event.target.value)
  }

  const handlerForInputChange = (setState: (state: number) => void) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(parseInt(event.target.value, 10))
  }

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Container flex>
          <Container right='small'>
            <Form.Field>
              <Form.Label>Search for an option</Form.Label>
              <Select
                onChange={handlerForSelectChange(setValue1)}
                value={value1}
                options={OPTIONS}
                placeholder='Choose an option...'
                width='auto'
                searchThreshold={threshold}
                maxSearchItems={5}
                data-testid='select'
              />
            </Form.Field>
          </Container>
          <Container>
            <Form.Field>
              <Form.Label>Search threshold</Form.Label>
              <NumberInput
                value={threshold}
                onChange={handlerForInputChange(setThreshold)}
                data-testid='input-threshold'
              />
            </Form.Field>
          </Container>
        </Container>
      </Container>
      <Container padded='small'>
        <Container flex>
          <Container right='small'>
            <Form.Field>
              <Form.Label>Search for an option</Form.Label>
              <Select
                onChange={handlerForSelectChange(setValue2)}
                value={value2}
                options={LOTS_OF_OPTIONS}
                placeholder='Choose an option...'
                width='auto'
                searchThreshold={threshold}
                maxSearchItems={maxSearchItems}
                data-testid='select'
              />
            </Form.Field>
          </Container>
          <Container>
            <Form.Field>
              <Form.Label>Max Search Items</Form.Label>
              <NumberInput
                value={maxSearchItems}
                onChange={handlerForInputChange(setMaxSearchItems)}
                data-testid='input-threshold'
              />
            </Form.Field>
          </Container>
        </Container>
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

const optionsGenerator = (value: number, key: number) => ({
  value: `${key + 1}`,
  text: `Option ${key + 1}`
})

const LOTS_OF_OPTIONS = Array.from({ length: 10000 }, optionsGenerator)

export default SelectSearchBehaviourExample
