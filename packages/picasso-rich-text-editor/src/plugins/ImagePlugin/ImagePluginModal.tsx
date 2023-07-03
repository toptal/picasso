import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, FileInput, Input } from '@toptal/picasso'
import type { FileUpload } from '@toptal/picasso/FileInput'

type Props = {
  onClose: () => void
  isOpen: boolean
}

const MAX_SIZE = 1

// this is just taken from the FileInput example to showcase the progress
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
  }, [intervalID])

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
          : undefined,
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
            uploadFinished && Math.random() < 0.5 ? 'Server error.' : undefined,
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
    remove,
  }
}

const ImagePluginModal = ({ isOpen, onClose }: Props) => {
  const { files, upload, remove } = useUploader({ maxSize: MAX_SIZE })
  const [alt, setAlt] = useState('')

  const handleConfirm = () => {
    console.log({ files, alt })
    onClose()
  }

  const disabled = !files.length || !alt

  return (
    <Modal onClose={onClose} open={isOpen} size='small'>
      <Modal.Title>Select file</Modal.Title>
      <Modal.Content>
        <Form.Field>
          <FileInput
            value={files}
            accept='image/png, image/jpeg'
            onChange={upload}
            onRemove={remove}
            maxFiles={null}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Alt text</Form.Label>
          <Input
            value={alt}
            onChange={event => setAlt(event.target.value)}
            type='text'
          />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button
          data-testid='cancel'
          variant='primary'
          disabled={disabled}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ImagePluginModal
