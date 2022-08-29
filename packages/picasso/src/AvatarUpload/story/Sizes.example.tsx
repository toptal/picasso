import React from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const SmallSizeExample = () => <AvatarUpload size='small' />
const SmallSizeWithSrcExample = () => (
  <AvatarUpload
    size='small'
    alt='Jacqueline Roque. Pablo Picasso, 1954'
    src='./jacqueline-with-flowers-1954-square.jpg'
  />
)
const LargeSizeExample = () => <AvatarUpload size='large' />
const LargeSizeWithSrcExample = () => (
  <AvatarUpload
    size='large'
    alt='Jacqueline Roque. Pablo Picasso, 1954'
    src='./jacqueline-with-flowers-1954-square.jpg'
  />
)

const Example = () => {
  return (
    <Container flex gap='medium' padded='medium'>
      <SmallSizeExample />
      <SmallSizeWithSrcExample />
      <LargeSizeExample />
      <LargeSizeWithSrcExample />
    </Container>
  )
}

export default Example
