import React from 'react'
import { AvatarUpload, Container, Typography } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const HoveredExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Hovered
    </Typography>
    <AvatarUpload alt='avatar-upload' autoHover />
  </Container>
)

const FocusedExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Focused
    </Typography>
    <AvatarUpload alt='avatar-upload' autoFocus />
  </Container>
)

const ErrorExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Error
    </Typography>
    <AvatarUpload alt='avatar-upload' status='error' />
  </Container>
)

const FocusedAndErrorExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Focused & Error
    </Typography>
    <AvatarUpload alt='avatar-upload' status='error' autoFocus />
  </Container>
)

const LoadingExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Loading
    </Typography>
    <AvatarUpload alt='avatar-upload' uploading />
  </Container>
)

const ActiveExample = () => (
  <Container flex direction='column' alignItems='center'>
    <Typography variant='heading' size='small'>
      Active
    </Typography>
    <AvatarUpload alt='avatar-upload' defaultActive />
  </Container>
)

const Example = () => (
  <Container flex padded={SPACING_6} gap={SPACING_6}>
    <HoveredExample />
    <FocusedExample />
    <ErrorExample />
    <FocusedAndErrorExample />
    <LoadingExample />
    <ActiveExample />
  </Container>
)

export default Example
