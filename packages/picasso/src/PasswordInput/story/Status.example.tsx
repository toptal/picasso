import React, { useState, ChangeEventHandler } from 'react'
import { PasswordInput, Container, Typography } from '@toptal/picasso'

const DefaultExample = () => {
  const [value, setValue] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <Typography as='p' variant='heading' size='small'>
        Type at least{' '}
        <Typography as='span' variant='body' weight='semibold'>
          3 characters
        </Typography>{' '}
        to see success state
      </Typography>
      <PasswordInput
        value={value}
        onChange={handleChange}
        status={value.length >= 3 ? 'success' : 'error'}
      />
    </Container>
  )
}

export default DefaultExample
