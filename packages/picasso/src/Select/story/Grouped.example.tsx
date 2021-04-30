import React, { useState } from 'react'
import { Container, Select, Typography } from '@toptal/picasso'

const OPTION_GROUPS = {
  'Group 1': [
    { value: '1', text: 'Option 1' },
    { value: '2', text: 'Option 2' }
  ],
  'Group 2': [
    { value: '3', text: 'Option 3' },
    { value: '4', text: 'Option 4' },
    { value: '5', text: 'Option 5' }
  ],
  'Group 3': [
    { value: '6', text: 'Option 6' },
    { value: '7', text: 'Option 7' }
  ],
  'Group 4': [
    { value: '8', text: 'Option 8' },
    { value: '9', text: 'Option 9' },
    { value: '10', text: 'Option 10' }
  ]
}

const Example = () => {
  const [value, setValue] = useState<string>()
  const [values, setValues] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }
  const handleMultipleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
    setValues(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <Typography variant='heading' size='small'>
          Native
        </Typography>
        <Select
          onChange={handleChange}
          options={OPTION_GROUPS}
          value={value}
          placeholder='Choose an option...'
          width='auto'
          native
        />
      </Container>
      <Container right='small'>
        <Typography variant='heading' size='small'>
          Non native
        </Typography>
        <Select
          onChange={handleMultipleChange}
          options={OPTION_GROUPS}
          value={values}
          placeholder='Choose an option...'
          width='auto'
          searchThreshold={2}
          multiple
        />
      </Container>
    </Container>
  )
}

export default Example
