import React from 'react'
import { AvatarUpload, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='column'>
    <Typography variant='heading' size='small'>
      Focused
    </Typography>
    <Container flex>
      <Container padded='medium'>
        <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' focused />
      </Container>
      <Container padded='medium'>
        <AvatarUpload
          alt='Jacqueline Roque. Pablo Picasso, 1954'
          size='large'
          focused
        />
      </Container>
    </Container>

    <Typography variant='heading' size='small'>
      Error
    </Typography>
    <Container flex>
      <Container padded='medium'>
        <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' error />
      </Container>
      <Container padded='medium'>
        <AvatarUpload
          alt='Jacqueline Roque. Pablo Picasso, 1954'
          size='large'
          error
        />
      </Container>
    </Container>
  </Container>
)

export default Example
