import React, { useState } from 'react'
import { Select, Container, Typography } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Select value:', event.target.value)
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Small
        </Typography>
        <Container top='small' bottom='small'>
          <Select
            size='small'
            options={OPTIONS}
            value={value}
            placeholder='Choose an option...'
            width='auto'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Medium (default)
        </Typography>
        <Container top='small' bottom='small'>
          <Select
            options={OPTIONS}
            value={value}
            placeholder='Choose an option...'
            width='auto'
            onChange={handleChange}
          />
        </Container>
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
