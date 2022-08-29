import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const SmallSizeExample = () => <AvatarUpload size='small' />

const LargeSizeExample = () => <AvatarUpload size='large' />

const Example = () => {
  return (
    <Container flex gap='medium' padded='medium'>
      <SmallSizeExample />
      <LargeSizeExample />
    </Container>
  )
}

export default Example
