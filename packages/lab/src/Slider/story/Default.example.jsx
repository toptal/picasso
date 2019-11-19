import React from 'react'
import { Container } from '@toptal/picasso'
import { Slider } from '@toptal/picasso-lab'

const SelectDefaultExample = () => {
  const handleChange = (event, value) => {
    window.console.log('onChange: ', value)
  }

  return (
    <Container>
      <Slider onChange={handleChange} />
    </Container>
  )
}

export default SelectDefaultExample
