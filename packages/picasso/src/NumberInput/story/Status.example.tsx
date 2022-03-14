import React, { useState, ChangeEventHandler } from 'react'
import { NumberInput, Container, Typography } from '@toptal/picasso'

const isDivisibleByFive = (value: string) => {
  return value && value !== '0' && Number(value) % 5 === 0
}

const Example = () => {
  const [value, setValue] = useState('1')

  const isValid = isDivisibleByFive(value)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <Typography as='p' variant='heading' size='small'>
        Type a number divisible by{' '}
        <Typography as='span' variant='body' weight='semibold'>
          5
        </Typography>{' '}
        to see success state
      </Typography>
      <NumberInput
        value={value}
        onChange={handleChange}
        step='1'
        max='100'
        min='-100'
        status={isValid ? 'success' : 'error'}
      />
    </Container>
  )
}

export default Example
