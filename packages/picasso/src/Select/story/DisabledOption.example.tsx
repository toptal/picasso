import React, { useState } from 'react'
import { Container, Select, Typography } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>(OPTIONS[0].value)

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <Typography variant='heading' size='small'>
          Native
        </Typography>
        <Select
          onChange={handleChange}
          options={OPTIONS}
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
  { value: '1', text: 'Option 1', disabled: true },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3', disabled: true },
  { value: '4', text: 'Option 4' }
]

export default Example
