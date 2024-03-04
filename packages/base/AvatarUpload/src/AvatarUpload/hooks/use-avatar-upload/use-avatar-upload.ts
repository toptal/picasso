import { useCallback } from 'react'
import type { DropzoneRootProps } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'

import type { AvatarUploadOptions, DropEvent, FileRejection } from '../../types'

interface Props {
  /** Set accepted file types. See https://github.com/okonet/attr-accept for more information. */
  accept?: AvatarUploadOptions['accept']
  /** Image URL */
  src?: string
  /** Enable/disable the dropzone */
  disabled?: boolean
  /** Maximum file size (in bytes) */
  maxSize?: number
  /** Minimum file size (in bytes) */
  minSize?: number
  /** Indicate whether the selected file is being uploaded */
  uploading?: boolean
  /** Callback for when there is already a source and user clicks on the avatar. */
  onEdit?: AvatarUploadOptions['onEdit']
  /**
   * Callback for when the drop event occurs. Note that if file is not accepted, this callback is not invoked.,
   * @type <T extends File>(files: T, event: DropEvent) => void
   */
  onDropAccepted?: AvatarUploadOptions['onDropAccepted']
  /**
   * Callback for when the drop event occurs. Note that if file is not rejected, this callback is not invoked.
   * @type (fileRejection: FileRejection, event: DropEvent) => void
   */
  onDropRejected?: AvatarUploadOptions['onDropRejected']
  /**
   * Callback for when the drop event occurs. Note that the onDrop callback will always be invoked regardless if the dropped file was accepted or rejected.
   * @type <T extends File>(acceptedFile: T | null, fileRejection: FileRejection | null, event: DropEvent) => void
   */
  onDrop?: AvatarUploadOptions['onDrop']
  /**
   * Custom validation function
   * (file: File) => FileError | FileError[] | null
   */
  validator?: AvatarUploadOptions['validator']
}

interface ReturnValue {
  /** Ref to be attached to the root element */
  rootRef: React.RefObject<HTMLElement>
  /** Whether to show the upload icon */
  showUploadIcon: boolean
  /** Whether to show the avatar */
  showAvatar: boolean
  /** Whether the dropzone is currently being dragged over */
  isDropzoneDragActive: boolean
  /** Whether the dropzone is currently focused */
  isDropzoneFocused: boolean
  /** Props to be attached to the input element */
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>
  /** Props to be attached to the root element */
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  /** Callback for when the edit button is clicked */
  handleEdit: (event: React.MouseEvent) => void
}

const useAvatarUpload = (props: Props): ReturnValue => {
  const {
    accept,
    minSize,
    maxSize,
    disabled,
    uploading,
    src,
    validator,
    onDrop,
    onEdit,
    onDropAccepted,
    onDropRejected,
  } = props

  // callback overrides to return only one file to the parent component
  const handleDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      if (onDrop) {
        onDrop(acceptedFiles[0] ?? null, fileRejections[0] ?? null, event)
      }
    },
    [onDrop]
  )

  const handleDropAccepted = useCallback(
    (files: File[], event: DropEvent) => {
      if (onDropAccepted) {
        onDropAccepted(files[0], event)
      }
    },
    [onDropAccepted]
  )

  const handleDropRejected = useCallback(
    (fileRejections: FileRejection[], event: DropEvent) => {
      if (onDropRejected) {
        onDropRejected(fileRejections[0], event)
      }
    },
    [onDropRejected]
  )

  const handleEdit = (event: React.MouseEvent) => {
    // to avoid dropzone to be triggered
    event.stopPropagation()

    if (onEdit) {
      onEdit(event)
    }
  }

  const showAvatar = !uploading && Boolean(src)
  const showUploadIcon = !uploading && !src

  // after showing avatar, only way to change the file selection is to use 'onEdit' by clicking
  const disableDropzoneClick = (showAvatar && !onEdit) || uploading
  const disableKeyboardAndDragging = showAvatar || uploading

  const { getInputProps, getRootProps, isDragActive, isFocused, rootRef } =
    useDropzone({
      accept,
      minSize,
      maxSize,
      disabled,
      multiple: false,
      onDrop: handleDrop,
      onDropAccepted: handleDropAccepted,
      onDropRejected: handleDropRejected,
      validator,
      noClick: disableDropzoneClick,
      noDrag: disableKeyboardAndDragging,
      noKeyboard: disableKeyboardAndDragging,
    })

  return {
    rootRef,
    showUploadIcon,
    showAvatar,
    isDropzoneDragActive: isDragActive,
    isDropzoneFocused: isFocused,
    getInputProps,
    getRootProps,
    handleEdit,
  }
}

export default useAvatarUpload
