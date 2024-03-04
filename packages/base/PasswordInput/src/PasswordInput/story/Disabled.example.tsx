import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { PasswordInput, Container } from '@toptal/picasso'

const DisabledExample = () => {
  const [value, setValue] = useState('asd')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <PasswordInput disabled value={value} onChange={handleChange} />
    </Container>
  )
}

export default DisabledExample
