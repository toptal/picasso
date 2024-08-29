import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Avatar
        size='xxsmall'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Avatar
        size='xsmall'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Avatar
        size='small'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Avatar
        size='medium'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Medium'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Avatar
        size='large'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Large'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>

    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Avatar size='xxsmall' name='Jacqueline Roque' />
      <Avatar size='xsmall' name='Jacqueline Roque' />
      <Avatar size='small' name='Jacqueline Roque' />
      <Avatar size='medium' name='Jacqueline Roque' />
      <Avatar size='large' name='Jacqueline Roque' />
    </Container>

    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Avatar size='xxsmall' />
      <Avatar size='xsmall' />
      <Avatar size='small' />
      <Avatar size='medium' />
      <Avatar size='large' />
    </Container>
  </div>
)

export default Example
