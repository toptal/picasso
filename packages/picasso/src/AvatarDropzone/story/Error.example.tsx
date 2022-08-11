import React from 'react'
import { AvatarDropzone, Container } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container padded='medium'>
      <AvatarDropzone alt='Jacqueline Roque. Pablo Picasso, 1954' error />
    </Container>
    <Container padded='medium'>
      <AvatarDropzone
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        size='large'
        error
      />
    </Container>
  </Container>
)

export default Example
