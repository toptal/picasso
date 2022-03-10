import React, { useState } from 'react'
import { Container, Input, Typography } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <Typography as='p' variant='heading' size='small'>
        Type{' '}
        <Typography as='span' variant='body' weight='semibold'>
          "pass"
        </Typography>{' '}
        to see success state
      </Typography>
      <Input
        value={value}
        placeholder='Placeholder'
        onChange={handleChange}
        data-testid='input'
        validateStatus={
          value ? (value === 'pass' ? 'success' : 'error') : undefined
        }
      />
    </Container>
  )
}

export default Example
