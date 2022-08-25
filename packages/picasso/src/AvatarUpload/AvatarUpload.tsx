import React, { forwardRef, ReactNode, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'
import Dropzone from 'react-dropzone'

import Avatar from '../Avatar'
import styles from './styles'
import {
  AvatarUploadOptions,
  DropEvent,
  FileRejection,
  AvatarUploadRef,
} from './types'
import { Status } from '../OutlinedInput'
import DropzoneSvg from './DropzoneSvg/DropzoneSvg'
import Loader from '../Loader'
import { Upload24 } from '../Icon'
import useAvatarUpload from './use-avatar-upload/use-avatar-upload'
import Container from '../Container'

export interface Props extends BaseProps {
  /**
   * Header section of the component.
   */
  header?: ReactNode
  /**
   * File description section of the component.
   */
  description?: ReactNode
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

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoAvatarUpload',
})

export const AvatarUpload = forwardRef<AvatarUploadRef, Props>(
  function AvatarUpload(props, ref) {
    const {
      header,
      description,
      className,
      style,

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

    const {
      callbacks,
      hovered,
      focused,
      showAvatar,
      showLoader,
      showUploadIcon,
    } = useAvatarUpload({
      focused: initiallyFocused,
      hovered: initiallyHovered,
      uploading,
      src,
    })

    const classes = useStyles({ ...props, focused })
    const error = status === 'error'

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

    return (
      <Container flex direction='column' className={className} style={style}>
        {header}
        <Container flex direction='row'>
          <Dropzone
            ref={ref}
            accept={accept}
            minSize={minSize}
            maxSize={maxSize}
            multiple={false}
            disabled={disabled}
            onDrop={handleDrop}
            onDropAccepted={handleDropAccepted}
            onDropRejected={handleDropRejected}
            validator={validator}
            noClick={showAvatar}
            noDrag={showAvatar}
          >
            {({ getRootProps, isDragActive, getInputProps }) => (
              <div
                {...getRootProps({
                  className: cx(classes.root, classes.size, {
                    [classes.error]: error,
                  }),
                  ...callbacks,
                  'data-testid': dataTestId,
                })}
              >
                <input {...getInputProps()} />

                {showAvatar ? (
                  <Avatar
                    size={size}
                    onEdit={onEdit}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    src={src!}
                    alt={alt}
                    data-testid={testIds?.avatar}
                    variant='square'
                  />
                ) : (
                  <>
                    {loadingIcon}
                    {uploadIcon}
                    <DropzoneSvg
                      disabled={disabled}
                      error={error}
                      size={size}
                      focused={focused}
                      hovered={hovered}
                      isDragActive={isDragActive}
                      data-testid={testIds?.dropzoneSvg}
                    />
                  </>
                )}
              </div>
            )}
          </Dropzone>
          {description}
        </Container>
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
  header: null,
  description: null,
}

export default AvatarUpload
