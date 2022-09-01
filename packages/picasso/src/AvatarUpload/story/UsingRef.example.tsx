import React, { useRef } from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const Example = () => {
  const avatarUploadRef = useRef<HTMLElement>(null)

  const handleEdit = () => {
    // as an example, we may want user to select a new image while editting
    avatarUploadRef.current?.click()
  }

  return (
    <Container padded='medium'>
      <AvatarUpload
        ref={avatarUploadRef}
        onEdit={handleEdit}
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>
  )
}

export default Example
