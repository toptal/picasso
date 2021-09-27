import React, { useState } from 'react'
import { Dropzone, DropzoneProps } from '@toptal/picasso-lab'
import { FileUpload } from '@toptal/picasso-lab/Dropzone'

const initErrors = ['resume.pdf: File is too large']

const useFiles = (initialFiles?: FileUpload[], initialErrors?: string[]) => {
  const [files, setFiles] = useState<FileUpload[]>(initialFiles ?? [])
  const [errorMessages, setError] = useState<string[]>(initialErrors ?? [])

  const addFiles: DropzoneProps['onDrop'] = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      setFiles([...files, ...Array.from(acceptedFiles).map(file => ({ file }))])
    }

    if (rejectedFiles.length) {
      setError(
        rejectedFiles.map(
          ({ errors, file }) =>
            `${file.name}: ${errors.map(error => error.message).join(', ')}`
        )
      )
    } else {
      setError([])
    }
  }

  const removeFile = (fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  return {
    files,
    addFiles,
    removeFile,
    errorMessages
  }
}

const Example = () => {
  const { files, addFiles, removeFile, errorMessages } = useFiles(
    [],
    initErrors
  )

  return (
    <Dropzone
      value={files}
      onDrop={addFiles}
      onRemove={removeFile}
      hint='Max file size: 25MB'
      accept='image/*'
      maxFiles={1}
      maxSize={1024}
      errorMessages={errorMessages}
    />
  )
}

export default Example
