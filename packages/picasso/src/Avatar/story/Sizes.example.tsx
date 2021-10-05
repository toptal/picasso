import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container>
      <Container inline>
        <Avatar
          size='xxsmall'
          alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
          name='Jacqueline Roque'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
      <Container inline left='small'>
        <Avatar
          size='xsmall'
          alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
          name='Jacqueline Roque'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
      <Container inline left='small'>
        <Avatar
          size='small'
          alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
          name='Jacqueline Roque'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
      <Container inline left='small'>
        <Avatar
          size='medium'
          alt='Jacqueline Roque. Pablo Picasso, 1954. Medium'
          name='Jacqueline Roque'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
      <Container inline left='small'>
        <Avatar
          size='large'
          alt='Jacqueline Roque. Pablo Picasso, 1954. Large'
          name='Jacqueline Roque'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      </Container>
    </Container>

    <Container top='small'>
      <Container inline>
        <Avatar size='xxsmall' name='Jacqueline Roque' />
      </Container>
      <Container inline left='small'>
        <Avatar size='xsmall' name='Jacqueline Roque' />
      </Container>
      <Container inline left='small'>
        <Avatar size='small' name='Jacqueline Roque' />
      </Container>
      <Container inline left='small'>
        <Avatar size='medium' name='Jacqueline Roque' />
      </Container>
      <Container inline left='small'>
        <Avatar size='large' name='Jacqueline Roque' />
      </Container>
    </Container>

    <Container top='small'>
      <Container inline>
        <Avatar size='xxsmall' />
      </Container>
      <Container inline left='small'>
        <Avatar size='xsmall' />
      </Container>
      <Container inline left='small'>
        <Avatar size='small' />
      </Container>
      <Container inline left='small'>
        <Avatar size='medium' />
      </Container>
      <Container inline left='small'>
        <Avatar size='large' />
      </Container>
    </Container>
  </div>
)

export default Example
