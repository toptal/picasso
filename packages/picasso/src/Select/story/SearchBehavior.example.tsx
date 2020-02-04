import React, { useState, ChangeEvent } from 'react'
import { Select, Button, Container } from '@toptal/picasso'

const SelectSearchBehaviourExample = () => {
  const [value, setValue] = useState()
  const [options, setOptions] = useState(OPTIONS_WHEN_SEARCH_DISABLED)

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined
      value: string | string[] | number
    }>
  ) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  const handleAddOptionsClick = () => {
    setValue(null)
    setOptions(OPTIONS_WHEN_SEARCH_ENABLED)
  }

  const handleRemoveOptionsClick = () => {
    setValue(null)
    setOptions(OPTIONS_WHEN_SEARCH_DISABLED)
  }

  return (
    <Container flex>
      <Select
        onChange={handleChange}
        options={options}
        value={value}
        placeholder='Choose an option...'
        width='auto'
        searchThreshold={4}
      />
      <Container left='small'>
        <Button onClick={handleAddOptionsClick}>Add options</Button>
      </Container>
      <Container left='small'>
        <Button onClick={handleRemoveOptionsClick}>Remove options</Button>
      </Container>
    </Container>
  )
}

const OPTIONS_WHEN_SEARCH_DISABLED = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' },
  { value: '4', text: 'Option 4' }
]

const OPTIONS_WHEN_SEARCH_ENABLED = [
  ...OPTIONS_WHEN_SEARCH_DISABLED,
  { value: '5', text: 'Option 5' }
]

export default SelectSearchBehaviourExample
