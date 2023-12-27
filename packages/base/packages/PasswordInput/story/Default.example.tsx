import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { PasswordInput, Container } from '@toptal/picasso'

const DefaultExample = () => {
  const [value, setValue] = useState('asd')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <PasswordInput value={value} onChange={handleChange} />
    </Container>
  )
}

export default DefaultExample
