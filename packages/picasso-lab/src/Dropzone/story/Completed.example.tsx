import React, { useState } from 'react'
import { Dropzone, DropzoneProps } from '@toptal/picasso-lab'
import { FileUpload } from '@toptal/picasso-lab/Dropzone'

const initFiles = [
  {
    uploading: false,
    progress: 0,
    file: new File(['resume.pdf'], 'resume.pdf')
  }
]

const useFiles = (initialFiles?: FileUpload[]) => {
  const [files, setFiles] = useState<FileUpload[]>(initialFiles ?? [])

  const addFiles: DropzoneProps['onDrop'] = acceptedFiles => {
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
  const { files, addFiles, removeFile } = useFiles(initFiles)

  return (
    <Dropzone
      value={files}
      onDrop={addFiles}
      onRemove={removeFile}
      hint='Max file size: 25MB'
      accept='image/*'
    />
  )
}

export default Example
