import React from 'react'
import { AvatarUpload, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container flex direction='column' alignItems='center'>
      <Typography variant='heading' size='small'>
        Focused
      </Typography>
      <Container padded='medium'>
        <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' focused />
      </Container>
    </Container>

    <Container flex direction='column' alignItems='center'>
      <Typography variant='heading' size='small'>
        Error
      </Typography>
      <Container padded='medium'>
        <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' error />
      </Container>
    </Container>

    <Container flex direction='column' alignItems='center'>
      <Typography variant='heading' size='small'>
        Focused & Error
      </Typography>
      <Container padded='medium'>
        <AvatarUpload
          alt='Jacqueline Roque. Pablo Picasso, 1954'
          error
          focused
        />
      </Container>
    </Container>
  </Container>
)

export default Example
