import React, { useState } from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'
import type { FileRejection } from '@toptal/picasso/AvatarUpload'

const Example = () => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [src, setSrc] = useState<string | undefined>()

  const handleDrop = (
    acceptedFile: File | null,
    fileRejection: FileRejection | null
  ) => {
    if (acceptedFile) {
      // simulate upload
      const reader = new FileReader()

      reader.readAsDataURL(acceptedFile)

      reader.onload = () => {
        setUploading(true)

        setTimeout(() => {
          setUploading(false)

          // simulate upload success
          setSrc(reader.result as string)
        }, 1000)
      }

      reader.onerror = error => {
        console.log('Error: upload failed, ', error)
      }
    } else if (fileRejection) {
      // file rejected
      console.log(fileRejection.errors.join(', '))
    }
  }

  return (
    <Container padded={SPACING_6}>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        onDrop={handleDrop}
        src={src}
        uploading={uploading}
      />
    </Container>
  )
}

export default Example
