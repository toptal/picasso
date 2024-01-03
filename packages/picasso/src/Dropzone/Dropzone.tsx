import React, { forwardRef } from 'react'
import { useDropzone } from 'react-dropzone'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'

import { Upload24 } from '../Icon'
import FormHint from '../FormHint'
import FormError from '../FormError'
import Container from '../Container'
import FileList from '../FileList'
import Typography from '../Typography'
import type { FileUpload, DropzoneOptions } from './types'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import styles from './styles'

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
  /**
   * @deprecated [@@DROPZONE_ERROR_MESSAGE] Use value[n].error instead.
   * Provide reasons why files couldn't be dropped into dropzone
   */
  errorMessages?: string[]
  focused?: boolean
  hovered?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'Dropzone' })

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
    errorMessages = [],
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

  const classes = useStyles()

  // TODO: [@@DROPZONE_ERROR_MESSAGE]
  usePropDeprecationWarning({
    props,
    name: 'errorMessages',
    componentName: 'Dropzone',
    description:
      'Use the `value[n].error` prop instead. `errorMessages` is deprecated and will be removed in the next major release.',
  })

  return (
    <Container style={style} ref={ref} className={className}>
      <Container
        flex
        direction='column'
        alignItems='center'
        data-testid={dataTestId}
        {...getRootProps({
          className: cx(classes.root, {
            [classes.dragActive]: isDragActive,
            [classes.hovered]: hovered,
            [classes.disabled]: isDisabled,
            [classes.focused]: focused,
          }),
        })}
      >
        <input {...getInputProps({ className: classes.nativeInput })} />
        <Upload24 color='darkGrey' />
        {!hideContentText && (
          <Typography size='medium' color='black' weight='semibold'>
            Click or drag to upload
          </Typography>
        )}
        {hint && <FormHint className={cx(classes.hint)}>{hint}</FormHint>}
        {errorMessages.length > 0 &&
          errorMessages.map((error, index) => (
            <FormError
              className={classes.error}
              key={`${error}-${String(index)}`}
            >
              {error}
            </FormError>
          ))}
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
