import React, { useState } from 'react'
import { FileInput, Form } from '@toptal/picasso'

const useUploader = config => {
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(false)
  const [file, setFile] = useState(config.file)

  const upload = event => {
    setError(null)

    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }

    const newFile = event.target.files[0]

    if (config.maxSize && newFile.size > config.maxSize * 1024 * 1024) {
      return setError(`File size exceeds the ${config.maxSize}MB limit.`)
    }

    setProgress(true)

    setTimeout(() => {
      setProgress(false)

      if (Math.random() < 0.5) {
        return setError('Timout exceeded.')
      }

      setFile({
        name: newFile.name,
        location: `https://picsum.photos/${Math.round(Math.random() * 1000)}`
      })
    }, 2000)
  }

  return {
    error,
    progress,
    upload,
    file
  }
}

const FileInputUploaderExample = () => {
  const MAX_SIZE = 2

  const { error, progress, file, upload } = useUploader({
    file: { name: 'initial-file.png', location: 'https://picsum.photos/200' },
    maxSize: MAX_SIZE
  })

  return (
    <div>
      <Form.Field hint={`Max file size: ${MAX_SIZE}MB.`} error={error}>
        <FileInput
          file={file}
          accept='image/*'
          error={error}
          progress={progress}
          onChange={upload}
        />
      </Form.Field>
    </div>
  )
}

export default FileInputUploaderExample
