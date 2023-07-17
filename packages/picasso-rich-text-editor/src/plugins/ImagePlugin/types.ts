import type { FileUpload } from '@toptal/picasso/FileInput'

export type UploadedImage = FileUpload & {
  url?: string
}

export type OnUploadCallback = (image: UploadedImage) => Promise<UploadedImage>
