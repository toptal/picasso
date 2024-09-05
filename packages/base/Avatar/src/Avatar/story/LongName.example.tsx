import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_4} flex gap={SPACING_4}>
    <Avatar size='xxsmall' name='William Wallace Wo Wade' />
    <Avatar size='xsmall' name='William Wallace Wo Wade' />
    <Avatar size='small' name='William Wallace Wo Wade' />
    <Avatar size='medium' name='William Wallace Wo Wade' />
    <Avatar size='large' name='William Wallace Wo Wade' />
  </Container>
)

export default Example
