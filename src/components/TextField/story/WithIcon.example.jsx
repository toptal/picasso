import React, { useState } from 'react'
import { TextField, Container } from '@toptal/picasso'
import { Search16 } from '@toptal/picasso/Icon'

const TextFieldWithIconExample = () => {
  const [value, setValue] = useState('Text')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container bottom='small'>
        <TextField
          icon={<Search16 />}
          value={value}
          width='auto'
          onChange={handleChange}
        />
      </Container>
      <Container bottom='small'>
        <TextField
          disabled
          icon={<Search16 />}
          value={value}
          width='auto'
          onChange={handleChange}
        />
      </Container>
      <Container bottom='small'>
        <TextField
          iconPosition='end'
          icon={<Search16 />}
          value={value}
          width='auto'
          onChange={handleChange}
        />
      </Container>
      <Container bottom='small'>
        <TextField
          iconPosition='end'
          icon={<Search16 />}
          placeholder='Placeholder'
          width='auto'
          onChange={handleChange}
        />
      </Container>
    </Container>
  )
}

export default TextFieldWithIconExample
