import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

const AvatarSizesExample = () => (
  <div>
    <Container>
      <Container inline>
        <Avatar
          alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
      <Container inline ml={1}>
        <Avatar
          size='small'
          alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
      <Container inline ml={1}>
        <Avatar
          size='medium'
          alt='Jacqueline Roque. Pablo Picasso, 1954. Medium'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
      <Container inline ml={1}>
        <Avatar
          size='large'
          alt='Jacqueline Roque. Pablo Picasso, 1954. Large'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
    </Container>

    <Container mt={1}>
      <Container inline>
        <Avatar name='Jacqueline Roque' />
      </Container>
      <Container inline ml={1}>
        <Avatar size='small' name='Jacqueline Roque' />
      </Container>
      <Container inline ml={1}>
        <Avatar size='medium' name='Jacqueline Roque' />
      </Container>
      <Container inline ml={1}>
        <Avatar size='large' name='Jacqueline Roque' />
      </Container>
    </Container>
  </div>
)

export default AvatarSizesExample
