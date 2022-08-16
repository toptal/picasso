export interface FileUpload {
  uploading?: boolean
  progress?: number
  error?: string
  file: File
}

export type AvatarUploadOptions = {
  /**
   * Set accepted file types. See https://github.com/okonet/attr-accept for more information.
   */
  accept?: string | string[]
  /** Callback for when the drop event occurs */
  onDrop?: <T extends File>(
    acceptedFile: T,
    fileRejection: FileRejection,
    event: DropEvent
  ) => void
  /** Callback for when the drop event occurs */
  onDropAccepted?: <T extends File>(files: T, event: DropEvent) => void
  /** Callback for when the drop event occurs */
  onDropRejected?: (fileRejections: FileRejection, event: DropEvent) => void
  /** Custom validation function */
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

type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode]

export interface FileError {
  message: string
  code: ErrorCodeType | string
}

export interface FileRejection {
  file: File
  errors: FileError[]
}
