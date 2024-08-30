import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_4} flex gap={SPACING_4}>
    <Avatar
      size='medium'
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      name='Jacqueline Roque'
      src='./jacqueline-with-flowers-1954-square.jpg'
    />
    <Avatar size='medium' name='Jacqueline Roque' />
    <Avatar size='medium' />
    <Avatar
      size='medium'
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      name='Jacqueline Roque'
      src='./jacqueline-with-flowers-1954-square.jpg'
      showEmblem
    />
  </Container>
)

export default Example
