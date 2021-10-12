import React from 'react'
import { Container, Tag } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container right='small' top={0.5}>
      <Tag.Rectangular indicator='negative'>Negative</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular indicator='warning'>Warning</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular indicator='positive'>Positive</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular indicator='primary'>Primary</Tag.Rectangular>
    </Container>
  </Container>
)

export default Example
