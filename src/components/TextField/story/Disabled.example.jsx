import React, { useState } from 'react'
import { TextField, Container } from '@toptal/picasso'

const TextFieldDisabledExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <TextField
          disabled
          value={value}
          width='auto'
          onChange={handleChange}
        />
      </Container>
      <TextField disabled placeholder='Placeholder' width='auto' />
    </Container>
  )
}

export default TextFieldDisabledExample
