import React from 'react'
import { Container, Tag } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container right='small' top={0.5}>
      <Tag.Rectangular indicator='red'>Red</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular indicator='yellow'>Yellow</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular indicator='green'>Green</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular indicator='blue'>Blue</Tag.Rectangular>
    </Container>
  </Container>
)

export default Example
