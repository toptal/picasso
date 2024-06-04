import React, { useState } from 'react'
import { Container, Slider } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState<Value>(10)
  const handleChange = (_: React.ChangeEvent<{}>, val: Value) => {
    window.console.log('onChange: ', val)
    setValue(val)
  }

  return (
    <Container>
      <Slider
        value={value}
        step={10}
        marks
        min={10}
        max={110}
        onChange={handleChange}
      />
    </Container>
  )
}

export default Example
