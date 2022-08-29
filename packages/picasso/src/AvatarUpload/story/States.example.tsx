import React from 'react'
import { AvatarUpload, Container, Typography } from '@toptal/picasso'

const FocusedExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Focused
    </Typography>
    <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' focused />
  </Container>
)

const ErrorExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Error
    </Typography>
    <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' status='error' />
  </Container>
)

const FocusedAndErrorExample = () => (
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
)

const LoadingExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Loading
    </Typography>
    <AvatarUpload alt='Jacqueline Roque. Pablo Picasso, 1954' uploading />
  </Container>
)

const Example = () => (
  <Container flex padded='medium' gap='medium'>
    <FocusedExample />
    <ErrorExample />
    <FocusedAndErrorExample />
    <LoadingExample />
  </Container>
)

export default Example
