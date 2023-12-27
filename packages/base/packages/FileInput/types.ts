/* eslint-disable import/no-extraneous-dependencies */
export interface FileUpload {
  uploading?: boolean
  progress?: number
  error?: string
  file: File
}
