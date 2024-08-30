import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_4} flex gap={SPACING_4}>
    <Avatar size='xxsmall' showEmblem />
    <Avatar size='xsmall' showEmblem />
    <Avatar size='small' showEmblem />
    <Avatar size='medium' name='Jacqueline Roque' showEmblem />
    <Avatar
      size='large'
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      name='Jacqueline Roque'
      src='./jacqueline-with-flowers-1954-square.jpg'
      showEmblem
    />
  </Container>
)

export default Example
