import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const Example = () => (
  <Container flex padded='medium' gap='medium'>
    <AvatarUpload
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      warningMessage='This is a warning message'
    />
    <AvatarUpload
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      size='large'
      warningMessage='This is a warning message'
    />
  </Container>
)

export default Example
