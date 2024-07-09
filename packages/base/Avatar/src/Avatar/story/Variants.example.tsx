import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container inline>
      <Avatar
        size='medium'
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>
    <Container inline left={SPACING_4}>
      <Avatar size='medium' name='Jacqueline Roque' />
    </Container>
    <Container inline left={SPACING_4}>
      <Avatar size='medium' />
    </Container>
    <Container inline left={SPACING_4}>
      <Avatar
        size='medium'
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
        showEmblem
      />
    </Container>
  </div>
)

export default Example
