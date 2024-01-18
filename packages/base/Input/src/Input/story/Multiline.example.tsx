import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState('Multiline text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Input multiline rows={4} value={value} onChange={handleChange} />
      </Container>
      <Container right={SPACING_4}>
        <Input multiline rows={4} placeholder='Placeholder' />
      </Container>
    </Container>
  )
}

export default Example
