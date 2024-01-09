import React, { useRef, useState } from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  const [src, setSrc] = useState('./jacqueline-with-flowers-1954-square.jpg')
  const avatarUploadRef = useRef<HTMLElement>(null)

  const handleEdit = () => {
    // as an example, we may want user to select a new image while editting
    avatarUploadRef.current?.click()
  }

  const handleDropAccepted = (acceptedFile: File) => {
    const reader = new FileReader()

    reader.readAsDataURL(acceptedFile)

    reader.onload = () => {
      setSrc(reader.result as string)
    }

    reader.onerror = error => {
      console.log('Error: upload failed, ', error)
    }
  }

  return (
    <Container padded={SPACING_6}>
      <AvatarUpload
        ref={avatarUploadRef}
        onEdit={handleEdit}
        onDropAccepted={handleDropAccepted}
        alt='avatar'
        src={src}
      />
    </Container>
  )
}

export default Example
