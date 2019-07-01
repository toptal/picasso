import React, { useState } from 'react'
import { TextField, Container } from '@toptal/picasso'

const TextFieldMultilineExample = () => {
  const [value, setValue] = useState('Multiline text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <TextField
          multiline
          rows={4}
          value={value}
          width='auto'
          onChange={handleChange}
        />
      </Container>
      <Container right='small'>
        <TextField multiline rows={4} placeholder='Placeholder' width='auto' />
      </Container>
    </Container>
  )
}

export default TextFieldMultilineExample
