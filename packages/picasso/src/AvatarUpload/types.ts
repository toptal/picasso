import { DropzoneRef } from 'react-dropzone'

export interface FileUpload {
  uploading?: boolean
  progress?: number
  error?: string
  file: File
}

export type AvatarUploadOptions = {
  accept?: string | string[]
  onDrop?: <T extends File>(
    acceptedFile: T | null,
    fileRejection: FileRejection | null,
    event: DropEvent
  ) => void
  onDropAccepted?: <T extends File>(files: T, event: DropEvent) => void
  onDropRejected?: (fileRejection: FileRejection, event: DropEvent) => void
  onEdit?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  validator?: <T extends File>(file: T) => FileError | null
}

export type DropEvent =
  | React.DragEvent<HTMLElement>
  | React.ChangeEvent<HTMLInputElement>
  | DragEvent
  | Event

export const ErrorCode = {
  FileInvalidType: 'file-invalid-type',
  FileTooLarge: 'file-too-large',
  FileTooSmall: 'file-too-small',
  TooManyFiles: 'too-many-files',
} as const

export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode]

export interface FileError {
  message: string
  code: ErrorCodeType | string
}

export interface FileRejection {
  file: File
  errors: FileError[]
}

export type AvatarUploadRef = DropzoneRef
