import type React from 'react'
import { useState } from 'react'

import type { OnUploadCallback, UploadedImage } from '../types'

type Props = {
  maxSize?: number
  onUpload: OnUploadCallback
}

export const useImageUploader = ({ onUpload, maxSize }: Props) => {
  const [image, setImage] = useState<UploadedImage>()
  const [uploading, setUploading] = useState(false)

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }

    const uploadedFile = event.target.files[0]
    const invalidFile =
      (maxSize && uploadedFile.size / 1024 / 1024 > maxSize) || false

    if (invalidFile) {
      setImage({
        file: uploadedFile,
        uploading: !invalidFile,
        progress: 0,
        error: invalidFile
          ? `File size exceeds the ${maxSize}MB limit.`
          : undefined,
        url: '',
      })

      return
    }

    const uploadedImage = {
      file: uploadedFile,
      uploading: false,
      progress: 100,
      error: undefined,
      url: '',
    }

    const promise = onUpload(uploadedImage)

    setImage(uploadedImage)
    setUploading(true)

    // eslint-disable-next-line promise/catch-or-return
    promise
      .then(image => {
        if (!image.url) {
          throw new Error('"url" has to be provided after upload')
        }

        setImage(image)

        return image
      })
      .catch((errorMessage: string) => {
        setImage({
          ...uploadedImage,
          error: errorMessage || 'Error uploading image',
        })
      })
      .finally(() => setUploading(false))
  }

  const reset = () => {
    setUploading(false)
    setImage(undefined)
  }

  return {
    image,
    upload,
    uploading,
    reset,
  }
}
