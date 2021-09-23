import React, { useState, ChangeEvent } from 'react'
import { Select, Form, Container, NumberInput } from '@toptal/picasso'

const SelectSearchBehaviourExample = () => {
  const [value, setValue] = useState<string>('')
  const [multipleValues, setMultipleValues] = useState<string[]>([])
  const [limit, setLimit] = useState(50)

  const handlerForSelectChange = (setState: (state: string) => void) => (
    event: ChangeEvent<{
      name?: string
      value: string
    }>
  ) => {
    setState(event.target.value)
  }

  const handleMultipleChange = (setState: (state: string[]) => void) => (
    event: React.ChangeEvent<{ value: string[] }>
  ) => {
    setState(event.target.value)
  }

  const handlerForInputChange = (setState: (state: number) => void) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(parseInt(event.target.value, 10))
  }

  return (
    <Container flex>
      <Container right='small'>
        <Form.Field>
          <Form.Label>Flat options</Form.Label>
          <Select
            onChange={handlerForSelectChange(setValue)}
            value={value}
            options={LOTS_OF_OPTIONS}
            placeholder='Choose an option...'
            width='auto'
            limit={limit}
            data-testid='select'
          />
        </Form.Field>
      </Container>
      <Container right='small'>
        <Form.Field>
          <Form.Label>Grouped options</Form.Label>
          <Select
            onChange={handleMultipleChange(setMultipleValues)}
            options={LOTS_OF_OPTION_GROUPS}
            value={multipleValues}
            placeholder='Choose an options...'
            width='auto'
            limit={limit}
            multiple
          />
        </Form.Field>
      </Container>
      <Container>
        <Form.Field>
          <Form.Label>Limit</Form.Label>
          <NumberInput
            min={1}
            value={limit}
            onChange={handlerForInputChange(setLimit)}
            data-testid='input-threshold'
          />
        </Form.Field>
      </Container>
    </Container>
  )
}

const optionsGenerator = (start = 1) => (value: number, key: number) => ({
  value: `${key + start}`,
  text: `Option ${key + start}`
})

const LOTS_OF_OPTION_GROUPS = {
  'Group 1': Array.from({ length: 200 }, optionsGenerator()),
  'Group 2': Array.from({ length: 200 }, optionsGenerator(200)),
  'Group 3': Array.from({ length: 200 }, optionsGenerator(400)),
  'Group 4': Array.from({ length: 200 }, optionsGenerator(600))
}

const LOTS_OF_OPTIONS = Array.from({ length: 1000 }, optionsGenerator())

export default SelectSearchBehaviourExample
