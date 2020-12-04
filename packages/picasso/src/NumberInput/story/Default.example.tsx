import React, { useState, ChangeEventHandler } from 'react'
import { NumberInput, Container } from '@toptal/picasso'

const DefaultExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        value={value}
        onChange={handleChange}
        step='1'
        max='100'
        min='-100'
      />
    </Container>
  )
}

export default DefaultExample
