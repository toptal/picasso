import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container padded='medium'>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        warningMessage='This is a warning message'
      />
    </Container>
    <Container padded='medium'>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        size='large'
        warningMessage='This is a warning message'
      />
    </Container>
  </Container>
)

export default Example
