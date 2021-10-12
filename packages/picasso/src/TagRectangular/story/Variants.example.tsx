import React from 'react'
import { Container, Tag } from '@toptal/picasso'

const Example = () => (
  <Container flex gap='1rem'>
    <Tag.Rectangular variant='negative'>Negative</Tag.Rectangular>
    <Tag.Rectangular variant='warning'>Warning</Tag.Rectangular>
    <Tag.Rectangular variant='positive'>Positive</Tag.Rectangular>
    <Tag.Rectangular variant='dark'>Dark</Tag.Rectangular>
    <Tag.Rectangular variant='light'>Light</Tag.Rectangular>
  </Container>
)

export default Example
