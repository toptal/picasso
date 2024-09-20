import React, { useState } from 'react'
import { Container, Slider } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState<Value>(0)

  const handleChange = (_: Event, newValue: Value) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Slider value={value} onChange={handleChange} />
    </Container>
  )
}

export default Example
