import React, { useRef, useState } from 'react'
import { AvatarUpload, AvatarUploadRef, Container } from '@toptal/picasso'
import { FileRejection } from '@toptal/picasso/AvatarUpload'

const Example = () => {
  const avatarUploadRef = useRef<AvatarUploadRef>(null)
  const { handleDrop, src, uploading } = useFile()

  const handleEdit = () => {
    // free to do whatever you want with editing event
    // e.g. open a modal to change zoom or selected area

    // you can trigger the AvatarUpload to open file selection dialog
    avatarUploadRef.current?.open()
  }

  return (
    <Container padded='medium'>
      <AvatarUpload
        ref={avatarUploadRef}
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        onDrop={handleDrop}
        onEdit={handleEdit}
        src={src}
        uploading={uploading}
      />
    </Container>
  )
}

export default Example

const useFile = () => {
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

  return {
    handleDrop,
    src,
    uploading,
  }
}
