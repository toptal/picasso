import React, { useState } from 'react'
import { FileInput } from '@toptal/picasso'

import { FileUpload } from '../../FileInput/types'

const useFiles = (initialFiles?: FileUpload[]) => {
  const [files, setFiles] = useState<FileUpload[]>(initialFiles ?? [])

  const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }
    setFiles([
      ...files,
      ...Array.from(event.target.files).map(file => ({ file }))
    ])
  }

  const removeFile = (fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  return {
    files,
    addFiles,
    removeFile
  }
}

const Example = () => {
  const { files, addFiles, removeFile } = useFiles([
    { file: new File(['image.png'], 'image.png') }
  ])

  return (
    <FileInput
      value={files}
      onChange={addFiles}
      onRemove={removeFile}
      hint='Max file size: 25MB'
    />
  )
}

export default Example
