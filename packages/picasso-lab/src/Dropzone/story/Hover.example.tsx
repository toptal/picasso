import React, { useState } from 'react'
import { Dropzone } from '@toptal/picasso-lab'
import { FileUpload } from '@toptal/picasso-lab/Dropzone'
import { DropzoneOptions } from 'react-dropzone'

const useFiles = (initialFiles?: FileUpload[]) => {
  const [files, setFiles] = useState<FileUpload[]>(initialFiles ?? [])

  const addFiles: DropzoneOptions['onDrop'] = acceptedFiles => {
    setFiles([...files, ...Array.from(acceptedFiles).map(file => ({ file }))])
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
  const { files, addFiles, removeFile } = useFiles()

  return (
    <Dropzone
      value={files}
      onDrop={addFiles}
      onRemove={removeFile}
      hint='Max file size: 25MB'
      accept='image/*'
      className='__hover'
    />
  )
}

export default Example
