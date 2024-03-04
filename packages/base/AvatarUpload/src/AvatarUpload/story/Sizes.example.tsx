import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Container flex gap={SPACING_6} padded={SPACING_6} alignItems='flex-end'>
      <AvatarUpload size='xxsmall' />
      <AvatarUpload size='xsmall' />
      <AvatarUpload size='small' />
      <AvatarUpload size='medium' />
      <AvatarUpload size='large' />
    </Container>
  )
}

export default Example
