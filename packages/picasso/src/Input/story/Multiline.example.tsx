import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('Multiline text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <Input multiline rows={4} value={value} onChange={handleChange} />
      </Container>
      <Container right='small'>
        <Input multiline rows={4} placeholder='Placeholder' />
      </Container>
    </Container>
  )
}

export default Example
