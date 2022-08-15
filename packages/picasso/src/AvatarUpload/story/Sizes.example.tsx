import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const Example = () => (
  <Container flex gap='medium' padded='medium'>
    <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' />
    <AvatarUpload
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      src='./jacqueline-with-flowers-1954-square.jpg'
    />
    <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' size='large' />
    <AvatarUpload
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      size='large'
      src='./jacqueline-with-flowers-1954-square.jpg'
    />
  </Container>
)

export default Example
