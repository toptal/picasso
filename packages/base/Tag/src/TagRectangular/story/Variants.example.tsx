import React from 'react'
import { Container, Tag } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex gap={SPACING_4}>
    <Tag.Rectangular variant='red'>Red</Tag.Rectangular>
    <Tag.Rectangular variant='yellow'>Yellow</Tag.Rectangular>
    <Tag.Rectangular variant='green'>Green</Tag.Rectangular>
    <Tag.Rectangular variant='dark-grey'>Dark grey</Tag.Rectangular>
    <Tag.Rectangular variant='light-grey'>Light grey</Tag.Rectangular>
    <Tag.Rectangular variant='blue-main'>Blue main</Tag.Rectangular>
    <Tag.Rectangular variant='blue-darker'>Blue darker</Tag.Rectangular>
    <Tag.Rectangular variant='light-blue'>Light blue</Tag.Rectangular>
  </Container>
)

export default Example
