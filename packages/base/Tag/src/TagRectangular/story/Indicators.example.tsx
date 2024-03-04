import React from 'react'
import { Container, Tag } from '@toptal/picasso'
import { SPACING_4, SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='red'>Red</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='yellow'>Yellow</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='green'>Green</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='blue'>Blue</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='light-blue'>Light blue</Tag.Rectangular>
    </Container>
  </Container>
)

export default Example
