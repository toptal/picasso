import React from 'react'
import { Container, Slider } from '@toptal/picasso'

const Example = () => {
  return (
    <Container>
      <Slider
        defaultValue={20}
        step={10}
        min={0}
        max={100}
        marks
        disableTrackHighlight
      />
    </Container>
  )
}

export default Example
