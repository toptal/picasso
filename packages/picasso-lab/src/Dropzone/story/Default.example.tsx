import React, { useEffect, useState } from 'react'
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

const useFiles = ({ maxFiles }: { maxFiles: number }) => {
  const [files, setFiles] = useState<FileUpload[]>([])
  const [errorMessages, setError] = useState<string[]>([])
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (files.length >= maxFiles) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [maxFiles, files.length])

  const addFiles: DropzoneProps['onDrop'] = (acceptedFiles, rejectedFiles) => {
    if (files.length + acceptedFiles.length + rejectedFiles.length > maxFiles) {
      return setError(['Too many files'])
    }
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
    errorMessages,
    disabled
  }
}
const Example = () => {
  const { files, addFiles, removeFile, errorMessages, disabled } = useFiles({
    maxFiles: 2
  })

  return (
    <Dropzone
      value={files}
      onDrop={addFiles}
      onRemove={removeFile}
      hint={`Files allowed 2. Max file size: ${MAX_SIZE / 1000}KB`}
      accept='image/*'
      validator={customSizeValidator}
      errorMessages={errorMessages}
      disabled={disabled}
    />
  )
}

export default Example
