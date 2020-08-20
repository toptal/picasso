import React, { useState } from 'react'
import { Container, Slider } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState(null)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Slider
        value={value}
        step={10}
        min={10}
        max={110}
        onChange={handleChange}
        marks
        hideThumbOnEmpty
      />
    </Container>
  )
}

export default Example
