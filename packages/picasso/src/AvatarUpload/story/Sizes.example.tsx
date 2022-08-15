import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container padded='medium'>
      <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' />
    </Container>
    <Container padded='medium'>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>
    <Container padded='medium'>
      <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' size='large' />
    </Container>
    <Container padded='medium'>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        size='large'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>
  </Container>
)

export default Example
