import React, { useState } from 'react'
import { FileInput, Form } from '@toptal/picasso'

const useUploader = (config: { maxSize: number; file?: File }) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [progress, setProgress] = useState(false)
  const [file, setFile] = useState(config.file)
  const [status, setStatus] = useState('No file uploaded.')

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined)

    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }

    const newFile = event.target.files[0]

    // reset input
    event.target.value = ''

    if (config.maxSize && newFile.size > config.maxSize * 1024 * 1024) {
      setError(`File size exceeds the ${config.maxSize}MB limit.`)
      setStatus('Upload failed.')

      return
    }

    setProgress(true)
    setStatus('File uploading in progress...')

    setTimeout(() => {
      setProgress(false)

      if (Math.random() < 0.5) {
        setError('Timout exceeded.')
        setStatus('Upload failed.')

        return
      }

      setFile(newFile)
      setStatus('Success.')
    }, 2000)
  }

  return {
    error,
    progress,
    status,
    file,
    upload
  }
}

const Example = () => {
  const MAX_SIZE = 2

  const { error, progress, file, status, upload } = useUploader({
    maxSize: MAX_SIZE
  })

  return (
    <div>
      <Form.Field hint={`Max file size: ${MAX_SIZE}MB.`} error={error}>
        <Form.Label>Profile picture</Form.Label>
        <FileInput
          value={file}
          accept='image/*'
          error={Boolean(error)}
          progress={progress}
          status={status}
          onChange={upload}
        />
      </Form.Field>
    </div>
  )
}

export default Example
