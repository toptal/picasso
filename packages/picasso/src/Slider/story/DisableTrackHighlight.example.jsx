import React from 'react'
import { Container, Slider } from '@toptal/picasso'

const Example = () => {
  return (
    <Container>
      <Slider
        defaultValue={8}
        step={10}
        min={10}
        max={110}
        marks
        disableTrackHighlight
      />
    </Container>
  )
}

export default Example
