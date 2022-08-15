import React, { forwardRef, useCallback } from 'react'
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

export interface Props extends BaseProps {
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
  /** Callback for when the drop event occurs */
  onDropAccepted?: AvatarUploadOptions['onDropAccepted']
  /** Callback for when the drop event occurs */
  onDropRejected?: AvatarUploadOptions['onDropRejected']
  /** Callback for when the drop event occurs */
  onDrop?: AvatarUploadOptions['onDrop']
  /** Custom validation function */
  validator?: AvatarUploadOptions['validator']
  /** Warning message to be used as a tooltip */
  warningMessage?: string
  /** Indicate whether input is in error state */
  error?: boolean
  /** Indicate whether the selected file is being uploaded */
  uploading?: boolean
  /** Indicate whether input is focused */
  focused?: boolean
  testIds?: {
    imageAvatar?: string
    warningIcon?: string
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
      error,
      size = 'small',
      uploading,
      src,
      alt,
      warningMessage,
      testIds,
      focused,

      // dropzoneOptions
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
          onDrop(acceptedFiles?.[0] ?? null, fileRejections?.[0] ?? null, event)
        }
      },
      [onDrop]
    )

    const handleDropAccepted = useCallback(
      (files: File[], event: DropEvent) => {
        if (onDropAccepted && files.length === 1) {
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

    const { getRootProps, isDragActive, getInputProps } = useDropzone({
      accept: 'image/*',
      minSize,
      maxSize,
      multiple: false,
      disabled,
      onDrop: handleDrop,
      onDropAccepted: handleDropAccepted,
      onDropRejected: handleDropRejected,
      validator,
    })

    const classes = useStyles(props)

    const icon = uploading ? (
      <Loader size={size} variant='inherit' data-testid={testIds?.loader} />
    ) : (
      <Upload24 />
    )

    const showImageAvatar = src && !isDragActive
    const uploadedImageAvatar = showImageAvatar && (
      <ImageAvatar
        className={classes.imageAvatar}
        size={size}
        src={src}
        alt={alt}
        data-testid={testIds?.imageAvatar}
      />
    )

    const warningTooltip = warningMessage && (
      <Tooltip content={warningMessage}>
        <div className={classes.warningIcon} data-testid={testIds?.warningIcon}>
          <ExclamationSolid16 />
        </div>
      </Tooltip>
    )

    return (
      <Container
        style={style}
        ref={ref}
        className={cx(classes.root, className)}
      >
        <AvatarWrapper variant='square' size={size}>
          <Container
            flex
            justifyContent='center'
            alignItems='center'
            {...getRootProps({
              className: cx(classes.dropzone, classes.size, classes.corner, {
                [classes.dragActive]: isDragActive,
                [classes.disabled]: disabled,
                [classes.error]: error,
                [classes.focused]: focused,
                [classes.reupload]: !!src,
              }),
            })}
          >
            <input {...getInputProps()} />
            {icon}
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
}

export default AvatarUpload
