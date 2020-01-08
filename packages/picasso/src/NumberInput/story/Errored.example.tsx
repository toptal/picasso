import React, { useState, ChangeEventHandler } from 'react'
import { NumberInput, Container } from '@toptal/picasso'

const ErroredExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        error
        value={value}
        onChange={handleChange}
        step='5'
        max='100'
        min='-100'
      />
    </Container>
  )
}

export default ErroredExample
