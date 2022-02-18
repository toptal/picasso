import React, { useState, ChangeEventHandler } from 'react'
import { PasswordInput, Container } from '@toptal/picasso'

const ErroredExample = () => {
  const [value, setValue] = useState('asd')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <PasswordInput error value={value} onChange={handleChange} />
    </Container>
  )
}

export default ErroredExample
