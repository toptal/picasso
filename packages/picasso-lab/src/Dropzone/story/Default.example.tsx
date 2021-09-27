import React, { useState } from 'react'
import { Dropzone, DropzoneProps } from '@toptal/picasso-lab'
import { FileUpload } from '@toptal/picasso-lab/Dropzone'

const MAX_SIZE = 600 * 1000
const customSizeValidator: DropzoneProps['validator'] = file => {
  if (file.size > MAX_SIZE) {
    return {
      code: 'size-too-large',
      message: `File size exceeds the ${MAX_SIZE / 1000 / 1000}MB.`
    }
  }

  return null
}

const useFiles = () => {
  const [files, setFiles] = useState<FileUpload[]>([])
  const [errorMessages, setError] = useState<string[]>([])

  const addFiles: DropzoneProps['onDrop'] = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      const previousFiles = files
      const newFiles = Array.from(acceptedFiles).map(file => ({
        file,
        uploading: true
      }))

      setFiles([...previousFiles, ...newFiles])
      let progress = 0
      const interval = setInterval(() => {
        if (progress === 100) {
          setFiles([
            ...previousFiles,
            ...newFiles.map(file => ({ ...file, uploading: false }))
          ])
          clearInterval(interval)
        } else {
          setFiles([
            ...previousFiles,
            ...newFiles.map(file => ({ ...file, progress }))
          ])
          progress += 10
        }
      }, 250)
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
  const { files, addFiles, removeFile, errorMessages } = useFiles()

  return (
    <Dropzone
      value={files}
      onDrop={addFiles}
      onRemove={removeFile}
      hint={`Files allowed: 2. Max file size: ${MAX_SIZE / 1000}KB`}
      accept='image/*'
      multiple={false}
      maxFiles={2}
      validator={customSizeValidator}
      errorMessages={errorMessages}
    />
  )
}

export default Example
