import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

const AvatarVariantsExample = () => (
  <div>
    <Container inline>
      <Avatar
        size='medium'
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>
    <Container inline left='small'>
      <Avatar size='medium' name='Jacqueline Roque' />
    </Container>
    <Container inline left='small'>
      <Avatar
        variant='portrait'
        size='medium'
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>
    <Container inline left='small'>
      <Avatar
        variant='landscape'
        size='medium'
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>
  </div>
)

export default AvatarVariantsExample
