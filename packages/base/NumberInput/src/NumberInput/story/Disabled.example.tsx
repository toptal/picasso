import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { NumberInput, Container } from '@toptal/picasso'

const DisabledExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        disabled
        value={value}
        onChange={handleChange}
        step='5'
        max='100'
        min='-100'
      />
    </Container>
  )
}

export default DisabledExample
