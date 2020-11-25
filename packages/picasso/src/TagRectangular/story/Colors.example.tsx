import React from 'react'
import { Container, Tag } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container right='small' top={0.5}>
      <Tag.Rectangular color='red'>Red</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular color='yellow'>Yellow</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular color='dark-grey'>Dark-grey</Tag.Rectangular>
    </Container>
    <Container right='small' top={0.5}>
      <Tag.Rectangular color='light-grey'>Light-grey</Tag.Rectangular>
    </Container>
  </Container>
)

export default Example
