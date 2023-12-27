import React from 'react'
import { Container, Slider } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const handleChange = (_: React.ChangeEvent<{}>, value: Value) => {
    window.console.log('onChange: ', value)
  }

  return (
    <Container>
      <Slider onChange={handleChange} />
    </Container>
  )
}

export default Example
