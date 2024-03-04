import React, { useState } from 'react'
import { Input, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [value, setValue] = useState('Text')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value)
  }

  return (
    <Container flex inline>
      <Container right={SPACING_4}>
        <Input disabled value={value} onChange={handleChange} />
      </Container>
      <Input disabled placeholder='Placeholder' />
    </Container>
  )
}

export default Example
