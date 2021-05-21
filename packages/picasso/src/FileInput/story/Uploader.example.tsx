import React, { useEffect, useState } from 'react'
import { FileInput, Form } from '@toptal/picasso'

import { FileUpload } from '../../FileInput/types'

const useUploader = (config: { maxSize: number; files?: FileUpload[] }) => {
  let intervalID: number | null = null
  const [files, setFiles] = useState(config.files || [])
  const maxSize = config.maxSize ? config.maxSize * 1024 * 1024 : undefined

  useEffect(() => {
    return () => {
      if (intervalID !== null) {
        clearInterval(intervalID)
      }
    }
  }, [])

  const remove = (fileName: string, fileIndex: number) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(updatedFiles)
  }

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }

    const previousFiles = files
    const newFiles = Array.from(event.target.files).map(newFile => {
      const invalidFile = (maxSize && newFile.size > maxSize) || false

      return {
        file: newFile,
        uploading: !invalidFile,
        progress: !invalidFile ? 0 : undefined,
        error: invalidFile
          ? `File size exceeds the ${config.maxSize}MB limit.`
          : undefined
      }
    })

    // reset input
    event.target.value = ''

    setFiles([...previousFiles, ...newFiles])

    let progress = 0

    intervalID = window.setInterval(() => {
      progress += 10
      const uploadFinished = progress >= 100

      const updatedFiles = newFiles.map(file => {
        if (!file.uploading) {
          return file
        }

        return {
          ...file,
          uploading: !uploadFinished,
          progress,
          error:
            uploadFinished && Math.random() < 0.5 ? 'Server error.' : undefined
        }
      })

      setFiles([...previousFiles, ...updatedFiles])

      if (uploadFinished && intervalID !== null) {
        clearInterval(intervalID)
      }
    }, 200)
  }

  return {
    files,
    upload,
    remove
  }
}

const Example = () => {
  const MAX_SIZE = 2

  const { files, upload, remove } = useUploader({
    maxSize: MAX_SIZE
  })

  return (
    <Form.Field>
      <Form.Label>Profile picture</Form.Label>
      <FileInput
        value={files}
        accept='image/*'
        hint={`Accept all image files. Max file size: ${MAX_SIZE}MB.`}
        onChange={upload}
        onRemove={remove}
        maxFiles={null}
      />
    </Form.Field>
  )
}

export default Example
