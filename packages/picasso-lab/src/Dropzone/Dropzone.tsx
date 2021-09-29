import React, { forwardRef } from 'react'
import { useDropzone } from 'react-dropzone'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Upload24 } from '@toptal/picasso/Icon'
import {
  FormError,
  Container,
  FileList,
  Typography,
  FormHint
} from '@toptal/picasso'

import { FileUpload, DropzoneOptions } from './types'
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
  /** Reasons why files couldn't be droped into dropzone */
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
    validator
  } = props

  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    accept,
    minSize,
    maxSize,
    multiple,
    disabled,
    onDrop,
    onDropAccepted,
    onDropRejected,
    validator
  })

  const classes = useStyles()

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
            [classes.disabled]: disabled,
            [classes.focused]: focused
          })
        })}
      >
        <input {...getInputProps({ className: classes.nativeInput })} />
        <Upload24 color='darkGrey' />
        <Typography size='medium' color='black' weight='semibold'>
          Click or drag file to upload
        </Typography>
        {hint && errorMessages.length === 0 && (
          <FormHint className={cx(classes.hint)}>{hint}</FormHint>
        )}
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

Dropzone.displayName = 'PicassoDropzone'

Dropzone.defaultProps = {
  disabled: false,
  maxSize: Infinity,
  minSize: 0,
  multiple: true
}

export default Dropzone
