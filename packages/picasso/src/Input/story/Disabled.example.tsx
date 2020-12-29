import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right='small'>
        <Input disabled value={value} onChange={handleChange} />
      </Container>
      <Input disabled placeholder='Placeholder' />
    </Container>
  )
}

export default Example
