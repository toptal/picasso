import React from 'react'
import { AvatarUpload, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container flex padded='medium' gap='medium'>
    <Container flex direction='column' alignItems='center'>
      <Typography variant='heading' size='small'>
        Focused
      </Typography>
      <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' focused />
    </Container>

    <Container flex direction='column' alignItems='center'>
      <Typography variant='heading' size='small'>
        Error
      </Typography>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        status='error'
      />
    </Container>

    <Container flex direction='column' alignItems='center'>
      <Typography variant='heading' size='small'>
        Focused & Error
      </Typography>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        status='error'
        focused
      />
    </Container>

    <Container flex direction='column' alignItems='center'>
      <Typography variant='heading' size='small'>
        Loading
      </Typography>
      <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' uploading />
    </Container>
  </Container>
)

export default Example
