import React, { forwardRef, useCallback, useState } from 'react'
import { capitalize, makeStyles, Theme } from '@material-ui/core'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import { useDropzone } from 'react-dropzone'
import cx from 'classnames'

import Avatar from '../Avatar'
import styles from './styles'
import { AvatarUploadOptions, DropEvent, FileRejection } from './types'
import DropzoneSvg from './DropzoneSvg/DropzoneSvg'
import Loader from '../Loader'
import { Upload24 } from '../Icon'
import { Status } from '../OutlinedInput'

export interface Props extends BaseProps {
  /**
   * Set accepted file types. See https://github.com/okonet/attr-accept for more information.
   */
  accept?: AvatarUploadOptions['accept']
  /** Alt text */
  alt?: string
  /** Image URL */
  src?: string
  /** Size of the avatar */
  size?: SizeType<'small' | 'large'>
  /** Enable/disable the dropzone */
  disabled?: boolean
  /** Maximum file size (in bytes) */
  maxSize?: number
  /** Minimum file size (in bytes) */
  minSize?: number
  /**
   * Callback for when there is already a source and user clicks on the avatar.
   */
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
  /** Indicate `AvatarUpload` is in `error` or `default` state */
  status?: Extract<Status, 'error' | 'default'>
  /** Indicate whether the selected file is being uploaded */
  uploading?: boolean
  /** Indicate whether component has focused state */
  focused?: boolean
  /** Indicate whether component has hovered state */
  hovered?: boolean
  testIds?: {
    avatar?: string
    dropzoneSvg?: string
    uploadIcon?: string
    loader?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAvatarUpload',
})

export const AvatarUpload = forwardRef<HTMLDivElement, Props>(
  function AvatarUpload(props, ref) {
    const {
      focused: initiallyFocused,
      hovered: initiallyHovered,
      uploading,
      size = 'small',
      onEdit,
      status,
      'data-testid': dataTestId,
      testIds,
      src,
      alt,

      // dropzoneOptions
      accept,
      minSize,
      maxSize,
      disabled,
      onDrop,
      onDropAccepted,
      onDropRejected,
      validator,
    } = props

    const [{ focused, hovered }, setVisualStates] = useState<{
      focused?: boolean
      hovered?: boolean
    }>({ focused: initiallyFocused, hovered: initiallyHovered })

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

    const handleEdit = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      // to avoid dropzone to be triggered
      event.stopPropagation()

      if (onEdit) {
        onEdit(event)
      }
    }

    const onFocus = () => {
      setVisualStates(oldState => ({ ...oldState, focused: true }))
    }

    const onBlur = () => {
      setVisualStates(oldState => ({ ...oldState, focused: false }))
    }

    const onMouseEnter = () => {
      setVisualStates(oldState => ({ ...oldState, hovered: true }))
    }

    const onMouseLeave = () => {
      setVisualStates(oldState => ({ ...oldState, hovered: false }))
    }

    const showLoader = Boolean(uploading)
    const showAvatar = !showLoader && Boolean(src)
    const showUploadIcon = !showAvatar && !showLoader
    const showEditIcon = Boolean(onEdit)

    // after showing avatar, only way to change the file selection is to use 'onEdit' by clicking
    const disableDropzoneClick = showAvatar && !showEditIcon

    const classes = useStyles()

    const loadingIcon = showLoader && (
      <Loader
        className={classes.icon}
        size='small'
        variant='inherit'
        data-testid={testIds?.loader}
      />
    )
    const uploadIcon = showUploadIcon && (
      <Upload24 className={classes.icon} data-testid={testIds?.uploadIcon} />
    )

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
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
      noDrag: showAvatar,
      noKeyboard: showAvatar,
    })

    return (
      <div
        {...getRootProps({
          ref,
          className: cx(classes.root, classes[`size${capitalize(size)}`], {
            [classes.error]: status === 'error',
          }),
          'data-testid': dataTestId,
        })}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <input {...getInputProps()} />

        {showAvatar ? (
          <Avatar
            size={size}
            onEdit={showEditIcon ? handleEdit : undefined}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            src={src!}
            alt={alt}
            data-testid={testIds?.avatar}
            variant='square'
          />
        ) : (
          <>
            <DropzoneSvg
              disabled={disabled}
              error={status === 'error'}
              size={size}
              focused={focused}
              hovered={hovered}
              isDragActive={isDragActive}
              data-testid={testIds?.dropzoneSvg}
            />
            {loadingIcon}
            {uploadIcon}
          </>
        )}
      </div>
    )
  }
)

AvatarUpload.displayName = 'AvatarUpload'

AvatarUpload.defaultProps = {
  size: 'small',
  disabled: false,
  maxSize: 104857600, // 100MB in bytes (100 * 1024 * 1024)
  minSize: 0,
  accept: 'image/*',
}

export default AvatarUpload
