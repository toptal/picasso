import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

const Example = () => (
  <Container top='small'>
    <Container inline>
      <Avatar size='xxsmall' name='William Wallace Wo Wade' />
    </Container>
    <Container inline left='small'>
      <Avatar size='xsmall' name='William Wallace Wo Wade' />
    </Container>
    <Container inline left='small'>
      <Avatar size='small' name='William Wallace Wo Wade' />
    </Container>
    <Container inline left='small'>
      <Avatar size='medium' name='William Wallace Wo Wade' />
    </Container>
    <Container inline left='small'>
      <Avatar size='large' name='William Wallace Wo Wade' />
    </Container>
  </Container>
)

export default Example
