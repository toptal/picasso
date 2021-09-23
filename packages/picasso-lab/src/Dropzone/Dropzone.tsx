import React, { forwardRef } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import { Upload24 } from '@toptal/picasso/Icon'
import { FormError, Container, FileList, Typography } from '@toptal/picasso'
import FormHint from '@toptal/picasso/FormHint'

import { FileUpload } from './types'
import styles from './styles'

export interface Props extends BaseProps, Omit<DropzoneOptions, 'children'> {
  /** The text of the hint */
  hint?: string
  /** Callback invoked when a file item is removed */
  onRemove?: (fileName: string, index: number) => void
  /** Value uses the File interface. */
  value?: FileUpload[]
  /** Reasons why files couldn't be droped into dropzone */
  errorMessages?: string[]
}

const useStyles = makeStyles<Theme>(styles, { name: 'FileInputContent' })

const filterByUploading = (file: FileUpload): boolean => Boolean(file.uploading)

export const Dropzone = forwardRef<HTMLInputElement, Props>(function Dropzone (
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
    ...dropzoneOptions
  } = props

  const { getRootProps, isDragActive, getInputProps } = useDropzone(
    dropzoneOptions
  )

  const isCompleted =
    Array.isArray(value) &&
    value.length &&
    value.filter(filterByUploading).length === 0

  const classes = useStyles()

  return (
    <Container style={style}>
      <Container
        flex
        direction='column'
        alignItems='center'
        data-testid={dataTestId}
        {...getRootProps({
          className: cx(classes.root, className, {
            [classes.dragActive]: isDragActive,
            [classes.completed]: isCompleted
          })
        })}
      >
        <input {...getInputProps({ className: classes.nativeInput, ref })} />
        <Upload24 color='darkGrey' />
        <Typography
          className={classes.text}
          size='medium'
          color='black'
          weight='semibold'
        >
          Click or drag file to upload
        </Typography>
        {hint && errorMessages.length === 0 && (
          <FormHint className={cx(classes.hint)}>{hint}</FormHint>
        )}
        {errorMessages.length > 0 &&
          errorMessages.map((error, index) => (
            <FormError key={`${error}-${String(index)}`}>{error}</FormError>
          ))}
      </Container>
      {value && value.length > 0 && (
        <Container top='xsmall'>
          <FileList
            files={value}
            disabled={dropzoneOptions.disabled}
            onItemRemove={onRemove}
          />
        </Container>
      )}
    </Container>
  )
})

Dropzone.displayName = 'PicassoDropzone'

Dropzone.defaultProps = {
  maxSize: Infinity,
  minSize: 0,
  multiple: true
}

export default Dropzone
