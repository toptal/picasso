import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const Example = () => (
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
)

export default Example
