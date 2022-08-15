import React, { useState } from 'react'
import { AvatarUpload, Container } from '@toptal/picasso'

const useFile = () => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [src, setSrc] = useState<string | undefined>()

  const addFile = (acceptedFile: File) => {
    const reader = new FileReader()

    reader.readAsDataURL(acceptedFile)

    // simulate upload
    reader.onload = () => {
      setUploading(true)

      setTimeout(() => {
        setUploading(false)
        setSrc(reader.result as string)
      }, 1000)
    }

    reader.onerror = error => {
      console.log('Error: ', error)
    }
  }

  return {
    addFile,
    src,
    uploading,
  }
}

const Example = () => {
  const { addFile, src, uploading } = useFile()

  return (
    <Container padded='medium'>
      <AvatarUpload
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        onDrop={addFile}
        src={src}
        uploading={uploading}
      />
    </Container>
  )
}

export default Example
