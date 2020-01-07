import React, { useState } from 'react'
import { NumberInput, Container } from '@toptal/picasso'
import { Props } from '@toptal/picasso/NumberInput'

const DefaultExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: Props['onChange'] = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <NumberInput
        value={value}
        onChange={handleChange}
        step='5'
        max='100'
        min='-100'
      />
    </Container>
  )
}

export default DefaultExample
