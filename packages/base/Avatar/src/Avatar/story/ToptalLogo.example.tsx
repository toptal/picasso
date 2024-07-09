import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container inline>
      <Avatar size='xxsmall' emblem />
    </Container>

    <Container inline left={SPACING_4}>
      <Avatar size='xsmall' emblem />
    </Container>

    <Container inline left={SPACING_4}>
      <Avatar size='small' emblem />
    </Container>

    <Container inline left={SPACING_4}>
      <Avatar size='medium' name='Jacqueline Roque' emblem />
    </Container>

    <Container inline left={SPACING_4}>
      <Avatar
        size='large'
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
        emblem
      />
    </Container>
  </div>
)

export default Example
