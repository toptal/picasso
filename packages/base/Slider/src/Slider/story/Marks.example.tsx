import React, { useState } from 'react'
import { Container, Slider } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState<Value>(0)
  const handleChange = (_: React.ChangeEvent<{}>, val: Value) => {
    window.console.log('onChange: ', val)
    setValue(val)
  }

  return (
    <Container>
      <Slider value={value} step={10} marks max={110} onChange={handleChange} />
    </Container>
  )
}

export default Example
