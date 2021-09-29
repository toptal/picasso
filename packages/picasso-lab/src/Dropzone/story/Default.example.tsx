import React, { useEffect, useState } from 'react'
import {
  Dropzone,
  DropzoneErrorCode,
  DropzoneFileUpload,
  DropzoneFileError,
  DropzoneFileRejection,
  DropzoneDropEvent
} from '@toptal/picasso-lab'

type ValidatorType = (
  file: File
) => DropzoneFileError | DropzoneFileError[] | null
type OnDropType = (
  acceptedFiles: File[],
  fileRejections: DropzoneFileRejection[],
  event: DropzoneDropEvent
) => void

const MAX_SIZE = 600 * 1000

const customSizeValidator: ValidatorType = file => {
  if (file.size > MAX_SIZE) {
    return {
      code: DropzoneErrorCode.FileTooLarge,
      message: `File size exceeds the ${MAX_SIZE / 1000 / 1000}MB.`
    }
  }

  return null
}

const useFiles = ({ maxFiles }: { maxFiles: number }) => {
  const [files, setFiles] = useState<DropzoneFileUpload[]>([])
  const [errorMessages, setError] = useState<string[]>([])
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (files.length >= maxFiles) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [maxFiles, files.length])

  const addFiles: OnDropType = (acceptedFiles, rejectedFiles) => {
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
