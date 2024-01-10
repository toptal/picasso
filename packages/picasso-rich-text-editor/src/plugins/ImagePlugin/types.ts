import type { FileUpload } from '@toptal/picasso'

export type UploadedImage = FileUpload & {
  url?: string
}

export type OnUploadCallback = (image: UploadedImage) => Promise<UploadedImage>
