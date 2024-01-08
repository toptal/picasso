import React, { useState } from 'react'
import { Input, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Small
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Input
            size='small'
            value={value}
            placeholder='Small'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Medium (default)
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Input
            size='medium'
            value={value}
            placeholder='Medium (default)'
            onChange={handleChange}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          Large
        </Typography>
        <Container top={SPACING_4} bottom={SPACING_4}>
          <Input
            size='large'
            value={value}
            placeholder='Large'
            onChange={handleChange}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
