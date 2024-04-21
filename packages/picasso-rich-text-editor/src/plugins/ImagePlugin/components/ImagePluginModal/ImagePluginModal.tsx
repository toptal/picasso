import React, { useState } from 'react'
import type { FileInputProps } from '@toptal/picasso-file-input'
import { Button } from '@toptal/picasso-button'
import { ModalCompound as Modal } from '@toptal/picasso-modal'
import { FormCompound as Form } from '@toptal/picasso-form'
import { Input } from '@toptal/picasso-input'
import { FileInput } from '@toptal/picasso-file-input'

import type { OnUploadCallback, UploadedImage } from '../../types'
import { useImageUploader } from '../../hooks'

export type Props = {
  isOpen: boolean
  accept?: FileInputProps['accept']
  maxSize?: number
  onClose: () => void
  onUpload: OnUploadCallback
  onSubmit: (image: UploadedImage, altText: string) => void
}

const MAX_NUMBER_OF_IMAGES = 1

const ImagePluginModal = ({
  accept = 'image/png, image/jpeg',
  maxSize = 2,
  isOpen,
  onClose,
  onUpload,
  onSubmit,
}: Props) => {
  const {
    image: uploadedImage,
    reset: resetUploader,
    upload,
    uploading,
  } = useImageUploader({ onUpload, maxSize })
  const [altText, setAltText] = useState('')

  const resetModal = () => {
    resetUploader()
    setAltText('')
    onClose()
  }

  const handleConfirm = () => {
    if (uploadedImage) {
      onSubmit(uploadedImage, altText)
      resetModal()
    }
  }

  const imageHasUrl = !!uploadedImage?.url

  return (
    <Modal onClose={resetModal} open={isOpen} size='small'>
      <Modal.Title>Select file</Modal.Title>
      <Modal.Content>
        <Form.Field>
          <FileInput
            value={uploadedImage ? [uploadedImage] : []}
            accept={accept || 'image/png, image/jpeg'}
            hint={
              uploading
                ? 'Uploading ' + uploadedImage?.file.name
                : 'No file chosen'
            }
            maxFiles={MAX_NUMBER_OF_IMAGES}
            onChange={upload}
            onRemove={resetUploader}
            disabled={uploading}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>Alt Text</Form.Label>
          <Input
            value={altText}
            placeholder='An Image Description'
            onChange={event => setAltText(event.target.value)}
            type='text'
          />
        </Form.Field>
      </Modal.Content>
      <Modal.Actions>
        <Button
          variant='primary'
          disabled={!imageHasUrl}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ImagePluginModal
