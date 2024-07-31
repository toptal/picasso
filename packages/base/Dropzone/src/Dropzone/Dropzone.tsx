import React, { forwardRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { twJoin } from '@toptal/picasso-tailwind-merge'
import type { BaseProps } from '@toptal/picasso-shared'
import { Upload24 } from '@toptal/picasso-icons'
import { FormHint } from '@toptal/picasso-form'
import { Container } from '@toptal/picasso-container'
import { FileList } from '@toptal/picasso-file-input'
import { Typography } from '@toptal/picasso-typography'
import { SPACING_6 } from '@toptal/picasso-utils'

import type { FileUpload, DropzoneOptions } from './types'

export interface Props extends BaseProps {
  /**
   * Set accepted file types. See https://github.com/okonet/attr-accept for more information.
   */
  accept?: DropzoneOptions['accept']
  /** Enable/disable the dropzone */
  disabled?: boolean
  /** Maximum file size (in bytes) */
  maxSize?: number
  /** Minimum file size (in bytes) */
  minSize?: number
  /** Allow drag 'n' drop (or selection from the file dialog) of multiple files */
  multiple?: boolean
  /** The text of the hint */
  hint?: string
  /** Hide/Show the content text */
  hideContentText?: boolean
  /** Callback invoked when a file item is removed */
  onRemove?: (fileName: string, index: number) => void
  /** Callback for when the drop event occurs */
  onDropAccepted?: DropzoneOptions['onDropAccepted']
  /** callback for when the drop event occurs */
  onDropRejected?: DropzoneOptions['onDropRejected']
  /** callback for when the drop event occurs */
  onDrop?: DropzoneOptions['onDrop']
  /** Custom validation function */
  validator?: DropzoneOptions['validator']
  /** Value uses the File interface. */
  value?: FileUpload[]
  focused?: boolean
  hovered?: boolean
}

export const Dropzone = forwardRef<HTMLInputElement, Props>(function Dropzone(
  props,
  ref
) {
  const {
    hint,
    hideContentText,
    onRemove,
    value,
    className,
    style,
    'data-testid': dataTestId,
    focused,
    hovered,

    // dropzoneOptions
    accept,
    minSize,
    maxSize,
    multiple,
    disabled,
    onDrop,
    onDropAccepted,
    onDropRejected,
    validator,
  } = props

  const isDisabled = Boolean(
    disabled || (!multiple && value && value.length > 0)
  )

  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    accept,
    minSize,
    maxSize,
    multiple,
    disabled: isDisabled,
    onDrop,
    onDropAccepted,
    onDropRejected,
    validator,
  })

  return (
    <Container style={style} ref={ref} className={className}>
      <Container
        flex
        direction='column'
        alignItems='center'
        rounded
        padded={SPACING_6}
        data-testid={dataTestId}
        {...getRootProps({})}
        className={twJoin(
          'border border-dashed',
          'box-border',
          'text-graphite-700',
          'gap-2',
          'transition-all ease-out duration-350',
          hovered || focused || isDragActive
            ? 'border-blue-500 cursor-pointer'
            : 'border-gray-400',
          isDisabled
            ? 'bg-gray-100 hover:no-drop hover:border-gray-400 cursor-not-allowed'
            : 'bg-white hover:border-blue-500 focus:border-blue-500 hover:cursor-pointer focus:cursor-pointer'
        )}
      >
        <input {...getInputProps()} />
        <Upload24 color='darkGrey' />
        {!hideContentText && (
          <Typography size='medium' color='black' weight='semibold'>
            Click or drag to upload
          </Typography>
        )}
        {hint && (
          <FormHint className={twJoin('m-0', '[&>*]:leading-4')}>
            {hint}
          </FormHint>
        )}
      </Container>
      {value && value.length > 0 && (
        <Container top='xsmall'>
          <FileList files={value} onItemRemove={onRemove} />
        </Container>
      )}
    </Container>
  )
})

Dropzone.displayName = 'Dropzone'

Dropzone.defaultProps = {
  disabled: false,
  maxSize: Infinity,
  minSize: 0,
  multiple: true,
}

export default Dropzone
