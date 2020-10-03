import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <Input
          error
          value={value}
          onChange={handleChange}
          data-testid='input'
        />
      </Container>
      <Input error placeholder='Placeholder' />
    </Container>
  )
}

export default Example
