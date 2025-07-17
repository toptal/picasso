import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import type { CSSProperties, FocusEvent } from 'react'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Avatar, AvatarDropzoneSvg } from '@toptal/picasso-avatar'
import { Upload16, Upload24 } from '@toptal/picasso-icons'
import { Loader } from '@toptal/picasso-loader'
import type { Status } from '@toptal/picasso-outlined-input'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { getIconClass, rootClassBySize } from './styles'
import type { AvatarUploadOptions, FileUpload } from './types'
import useAvatarUpload from './hooks/use-avatar-upload'
import useAvatarStates from './hooks/use-avatar-states'

export interface Props extends BaseProps {
  /** Set accepted file types. See https://github.com/okonet/attr-accept for more information. */
  accept?: AvatarUploadOptions['accept']
  /** Alt text */
  alt?: string
  /** Image URL */
  src?: string
  /** Size of the avatar */
  size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  /** Avatar style */
  avatarStyle?: CSSProperties
  /** Enable/disable the dropzone */
  disabled?: boolean
  /** Maximum file size (in bytes) */
  maxSize?: number
  /** Minimum file size (in bytes) */
  minSize?: number
  /** Callback for when there is already a source and user clicks on the avatar. */
  onEdit?: AvatarUploadOptions['onEdit']
  /** Callback for focusing */
  onFocus?: (event: FocusEvent<HTMLElement, Element>) => void
  /** Callback for losing focus */
  onBlur?: (event: FocusEvent<HTMLElement, Element>) => void
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
  /** Value to be used for forms */
  value?: FileUpload
  /** Indicate `AvatarUpload` is in `error` or `default` state */
  status?: Extract<Status, 'error' | 'default'>
  /** Indicate whether the selected file is being uploaded */
  uploading?: boolean
  /** Indicate whether component has focused state as default */
  autoFocus?: boolean
  autoHover?: boolean
  defaultActive?: boolean
  testIds?: {
    avatar?: string
    dropzoneSvg?: string
    uploadIcon?: string
    loader?: string
  }
}

export const AvatarUpload = forwardRef<HTMLElement, Props>(
  function AvatarUpload(
    {
      size = 'small',
      disabled = false,
      uploading = false,
      maxSize = 104857600, // 100MB in bytes (100 * 1024 * 1024)
      minSize = 0,
      accept = {
        'image/*': [],
      },
      ...props
    },
    ref
  ) {
    const {
      autoFocus,
      autoHover,
      defaultActive,
      onEdit,
      onFocus,
      onBlur,
      status,
      'data-testid': dataTestId,
      testIds,
      src,
      alt,
      style,
      avatarStyle,
      onDrop,
      onDropAccepted,
      onDropRejected,
      validator,
    } = props

    const {
      rootRef,
      showUploadIcon,
      showAvatar,
      isDropzoneDragActive,
      isDropzoneFocused,
      getInputProps,
      getRootProps,
      handleEdit,
    } = useAvatarUpload({
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
    })

    const { hovered, onMouseEnter, onMouseLeave, isDragActive, isFocused } =
      useAvatarStates({
        autoHover,
        autoFocus,
        defaultActive,
        isDropzoneFocused,
        isDropzoneDragActive,
      })

    const loadingIcon = uploading && (
      <Loader
        className={getIconClass(hovered, status)}
        size='small'
        variant='inherit'
        data-testid={testIds?.loader}
      />
    )

    const UploadIconComponent =
      size === 'xxsmall' || size === 'xsmall' ? Upload16 : Upload24
    const uploadIcon = showUploadIcon && (
      <UploadIconComponent
        className={getIconClass(hovered, status)}
        data-testid={testIds?.uploadIcon}
      />
    )

    // exposing the rootRef from react-dropzone to the parent component
    useImperativeHandle(ref, () => rootRef.current ?? ({} as HTMLElement), [
      rootRef,
    ])

    return (
      <div
        style={style}
        {...getRootProps({
          className: twJoin(
            'relative flex justify-center items-center text-blue-500 outline-none cursor-pointer',
            rootClassBySize[size],
            disabled && 'cursor-no-drop',
            showAvatar && 'cursor-default'
          ),
          'data-testid': dataTestId,
          onMouseEnter,
          onMouseLeave,
          onFocus,
          onBlur,
        })}
      >
        <input {...getInputProps()} />

        {showAvatar ? (
          <Avatar
            style={avatarStyle}
            size={size}
            onEdit={onEdit ? handleEdit : undefined}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            src={src!}
            alt={alt}
            data-testid={testIds?.avatar}
          />
        ) : (
          <>
            <AvatarDropzoneSvg
              disabled={disabled}
              error={status === 'error'}
              size={size}
              hovered={hovered}
              focused={isFocused}
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

export default AvatarUpload
