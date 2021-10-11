import React from 'react'
import { Container, Tag } from '@toptal/picasso'

const Example = () => (
  <Container flex gap='1rem'>
    <Tag.Rectangular variant='red'>Red</Tag.Rectangular>
    <Tag.Rectangular variant='yellow'>Yellow</Tag.Rectangular>
    <Tag.Rectangular variant='green'>Green</Tag.Rectangular>
    <Tag.Rectangular variant='dark-grey'>Dark-grey</Tag.Rectangular>
    <Tag.Rectangular variant='light-grey'>Light-grey</Tag.Rectangular>
  </Container>
)

export default Example
