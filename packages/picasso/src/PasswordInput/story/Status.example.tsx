import React, { ChangeEvent, useState } from 'react'
import { Container, PasswordInput } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <PasswordInput
          placeholder='default'
          value={value}
          onChange={handleChange}
          status='default'
        />
      </Container>
      <Container padded='small'>
        <PasswordInput
          placeholder='error'
          value={value}
          onChange={handleChange}
          status='error'
        />
      </Container>
      <Container padded='small'>
        <PasswordInput
          placeholder='success'
          value={value}
          onChange={handleChange}
          status='success'
        />
      </Container>
    </Container>
  )
}

export default Example
