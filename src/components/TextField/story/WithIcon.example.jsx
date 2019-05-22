import React, { useState } from 'react'
import { TextField, Container } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icon'

const TextFieldWithIconExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom='small'>
        <TextField icon={<Cog />} value={value} onChange={handleChange} />
      </Container>
      <Container bottom='small'>
        <TextField
          disabled
          icon={<Cog />}
          value={value}
          onChange={handleChange}
        />
      </Container>
      <Container bottom='small'>
        <TextField
          iconPosition='end'
          icon={<Cog />}
          value={value}
          onChange={handleChange}
        />
      </Container>
      <Container bottom='small'>
        <TextField
          iconPosition='end'
          icon={<Cog />}
          placeholder='Placeholder'
          onChange={handleChange}
        />
      </Container>
    </Container>
  )
}

export default TextFieldWithIconExample
