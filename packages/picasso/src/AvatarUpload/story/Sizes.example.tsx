import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const Example = () => {
  return (
    <Container flex gap='medium' padded='medium' alignItems='flex-end'>
      <AvatarUpload size='xxsmall' />
      <AvatarUpload size='xsmall' />
      <AvatarUpload size='small' />
      <AvatarUpload size='medium' />
      <AvatarUpload size='large' />
    </Container>
  )
}

export default Example
