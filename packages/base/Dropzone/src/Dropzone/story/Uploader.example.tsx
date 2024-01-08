import React, { useEffect, useState } from 'react'
import type {
  DropzoneFileUpload,
  DropzoneFileError,
  DropzoneFileRejection,
} from '@toptal/picasso'
import { Dropzone, DropzoneErrorCode } from '@toptal/picasso'

const MAX_SIZE = 600 * 1000

const customSizeValidator = (file: File): DropzoneFileError[] | null => {
  if (file.size > MAX_SIZE) {
    return [
      {
        code: DropzoneErrorCode.FileTooLarge,
        message: `File size exceeds the ${MAX_SIZE / 1000 / 1000}MB.`,
      },
    ]
  }

  return null
}

const useFiles = ({ maxFiles }: { maxFiles: number }) => {
  const [files, setFiles] = useState<DropzoneFileUpload[]>([])
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (files.length >= maxFiles) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [maxFiles, files.length])

  const addFiles = (
    acceptedFiles: File[],
    rejectedFiles: DropzoneFileRejection[]
  ): void => {
    if (files.length + acceptedFiles.length + rejectedFiles.length > maxFiles) {
      return setFiles(prevFiles => [
        ...prevFiles,
        {
          error: 'Upload failed due to number of files',
          file: new File([], ''),
        },
      ])
    }

    if (acceptedFiles.length > 0) {
      const previousFiles = files
      const newFiles = acceptedFiles.map(file => ({
        file,
        uploading: true,
      }))

      setFiles([...previousFiles, ...newFiles])
      let progress = 0
      const interval = setInterval(() => {
        if (progress === 100) {
          setFiles([
            ...previousFiles,
            ...newFiles.map(file => ({ ...file, uploading: false })),
          ])
          clearInterval(interval)
        } else {
          setFiles([
            ...previousFiles,
            ...newFiles.map(file => ({ ...file, progress })),
          ])
          progress += 10
        }
      }, 250)
    }

    if (rejectedFiles.length) {
      setFiles((prevFiles: DropzoneFileUpload[]) => [
        ...prevFiles,
        ...rejectedFiles.map(({ errors, file }) => {
          const error = errors.map(error => error.message).join(', ')

          return { error, file }
        }),
      ])
    }
  }

  const removeFile = (_fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  return {
    files,
    addFiles,
    removeFile,
    disabled,
  }
}
const Example = () => {
  const { files, addFiles, removeFile, disabled } = useFiles({
    maxFiles: 2,
  })

  return (
    <Dropzone
      value={files}
      onDrop={addFiles}
      onRemove={removeFile}
      hint={`Files allowed 2. Max file size: ${MAX_SIZE / 1000}KB`}
      accept={{
        'image/*': [],
      }}
      validator={customSizeValidator}
      disabled={disabled}
    />
  )
}

export default Example
