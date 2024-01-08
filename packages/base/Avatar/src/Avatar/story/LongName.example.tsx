import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <Container top={SPACING_4}>
    <Container inline>
      <Avatar size='xxsmall' name='William Wallace Wo Wade' />
    </Container>
    <Container inline left={SPACING_4}>
      <Avatar size='xsmall' name='William Wallace Wo Wade' />
    </Container>
    <Container inline left={SPACING_4}>
      <Avatar size='small' name='William Wallace Wo Wade' />
    </Container>
    <Container inline left={SPACING_4}>
      <Avatar size='medium' name='William Wallace Wo Wade' />
    </Container>
    <Container inline left={SPACING_4}>
      <Avatar size='large' name='William Wallace Wo Wade' />
    </Container>
  </Container>
)

export default Example
