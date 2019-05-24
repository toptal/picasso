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
        <TextField disabled value={value} onChange={handleChange} />
      </Container>
      <TextField disabled placeholder='Placeholder' />
    </Container>
  )
}

export default TextFieldDisabledExample
