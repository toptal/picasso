import React from 'react'
import { Container, Label, Settings16 } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const Example = () => (
  <Container flex>
    <Container right='small' top={0.5}>
      <Label icon={<Settings16 />} variant='grey'>
        Grey
      </Label>
    </Container>

    <Container
      padded={0.5}
      right='small'
      style={{ backgroundColor: palette.grey.dark }}
    >
      <Label icon={<Settings16 />} variant='white'>
        White
      </Label>
    </Container>

    <Container right='small' top={0.5}>
      <Label variant='green'>Green</Label>
    </Container>

    <Container right='small' top={0.5}>
      <Label variant='yellow'>Yellow</Label>
    </Container>

    <Container top={0.5}>
      <Label variant='red'>Red</Label>
    </Container>
  </Container>
)

export default Example
