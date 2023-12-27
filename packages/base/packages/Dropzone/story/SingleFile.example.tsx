import React, { useState } from 'react'
import { Dropzone } from '@toptal/picasso'

const value = [
  {
    uploading: false,
    progress: 0,
    file: new File(['resume.pdf'], 'resume.pdf'),
  },
]

const Example = () => {
  const [files, setFiles] = useState(value)

  const addFile = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      uploading: false,
      progress: 0,
    }))

    setFiles(newFiles)
  }

  const handleRemove = () => {
    setFiles([])
  }

  return (
    <Dropzone
      multiple={false}
      value={files}
      onDrop={addFile}
      onRemove={handleRemove}
      accept={{
        'image/*': [],
      }}
    />
  )
}

export default Example
