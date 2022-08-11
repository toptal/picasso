import React, { forwardRef, ReactNode, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'
import { useDropzone } from 'react-dropzone'

import Container from '../Container'
import { ExclamationSolid16, Upload24 } from '../Icon'
import styles from './styles'
import { AvatarUploadOptions, DropEvent, FileRejection } from './types'
import Loader from '../Loader'
import AvatarWrapper from '../Avatar/AvatarWrapper/AvatarWrapper'
import ImageAvatar from '../Avatar/ImageAvatar/ImageAvatar'
import Tooltip from '../Tooltip'
import useAvatarUpload from './use-avatar-upload'
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
  /** Warning message to be used as a tooltip */
  warningMessage?: ReactNode
  /** Indicate `AvatarUpload` is in `error` or `default` state */
  status?: Extract<Status, 'error' | 'default'>
  /** Indicate whether the selected file is being uploaded */
  uploading?: boolean
  /** Indicate whether component has focused state */
  focused?: boolean
  /** Indicate whether component has hovered state */
  hovered?: boolean
  testIds?: {
    imageAvatar?: string
    warningIcon?: string
    uploadIcon?: string
    loader?: string
  }
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoAvatarUpload',
})

export const AvatarUpload = forwardRef<HTMLInputElement, Props>(
  function AvatarUpload(props, ref) {
    const {
      className,
      style,
      status,
      size = 'small',
      uploading,
      src,
      alt,
      warningMessage,
      testIds,
      focused: initiallyFocused,
      hovered: initiallyHovered,
      'data-testid': dataTestId,

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

    const error = status === 'error'
    const { getRootProps, isDragActive, getInputProps } = useDropzone({
      accept,
      minSize,
      maxSize,
      multiple: false,
      disabled,
      onDrop: handleDrop,
      onDropAccepted: handleDropAccepted,
      onDropRejected: handleDropRejected,
      validator,
    })

    const {
      callbacks,
      focused,
      hovered,
      showImageAvatar,
      showUploadIcon,
      showLoadingIcon,
      sourceFileExist,
    } = useAvatarUpload({
      focused: initiallyFocused,
      hovered: initiallyHovered,
      src,
      isDragActive,
      uploading,
    })

    const classes = useStyles({ ...props, focused })

    const uploadedImageAvatar = showImageAvatar && (
      <ImageAvatar
        className={classes.imageAvatar}
        size={size}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src={src!}
        alt={alt}
        data-testid={testIds?.imageAvatar}
      />
    )

    const loadingIcon = showLoadingIcon && (
      <Loader size='small' variant='inherit' data-testid={testIds?.loader} />
    )
    const uploadIcon = showUploadIcon && (
      <Upload24 data-testid={testIds?.uploadIcon} />
    )

    const warningTooltip = warningMessage && (
      <Tooltip content={warningMessage}>
        <div className={classes.warningIcon}>
          <ExclamationSolid16 data-testid={testIds?.warningIcon} />
        </div>
      </Tooltip>
    )

    return (
      <Container
        style={style}
        ref={ref}
        className={cx(classes.root, classes.size, className)}
      >
        <AvatarWrapper variant='square' size={size}>
          <Container
            {...getRootProps({
              className: cx(classes.dropzone, classes.size, classes.corner, {
                [classes.dragActive]: isDragActive,
                [classes.disabled]: disabled,
                [classes.error]: error,
                [classes.focused]: focused,
                [classes.reupload]: sourceFileExist,
                [classes.hovered]: hovered,
              }),
            })}
            {...callbacks}
            data-testid={dataTestId}
          >
            <input {...getInputProps()} />
            {loadingIcon}
            {uploadIcon}
          </Container>
          {uploadedImageAvatar}
          {!showImageAvatar && <div className={classes.leftBottomCorner} />}
        </AvatarWrapper>
        {warningTooltip}
      </Container>
    )
  }
)

AvatarUpload.displayName = 'AvatarUpload'

AvatarUpload.defaultProps = {
  size: 'small',
  disabled: false,
  maxSize: Infinity,
  minSize: 0,
  accept: 'image/*',
}

export default AvatarUpload
