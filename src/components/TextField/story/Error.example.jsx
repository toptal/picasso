import React, { useState } from 'react'
import { TextField, Container } from '@toptal/picasso'

const TextFieldErrorExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <TextField error value={value} width='auto' onChange={handleChange} />
      </Container>
      <TextField error placeholder='Placeholder' width='auto' />
    </Container>
  )
}

export default TextFieldErrorExample
