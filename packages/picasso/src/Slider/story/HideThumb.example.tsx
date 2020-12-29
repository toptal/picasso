import React, { useState } from 'react'
import { Container, Slider } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState<Value>()
  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Slider
        value={value}
        step={10}
        min={0}
        max={100}
        onChange={handleChange}
        marks
        hideThumbOnEmpty
      />
    </Container>
  )
}

export default Example
