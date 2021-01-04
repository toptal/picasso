import React, { useState } from 'react'
import { Input, Container, Typography } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Small
        </Typography>
        <Container top='small' bottom='small'>
          <Input
            size='small'
            value={value}
            placeholder='Small'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Medium (default)
        </Typography>
        <Container top='small' bottom='small'>
          <Input
            size='medium'
            value={value}
            placeholder='Medium (default)'
            onChange={handleChange}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
