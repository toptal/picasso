import React, { FunctionComponent, ReactNode, createRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'

import { StandardProps } from '../Picasso'
import FormControl from '../FormControl'
import OutlinedInput from '../OutlinedInput'
import Container from '../Container'
import Button from '../Button'
import Loader from '../Loader'
import Link from '../Link'
import Typography from '../Typography'
import { isNumber, isString } from '../utils'

import styles from './styles'

interface File {
  name: string
  location: string
}

export interface Props extends StandardProps, InputBaseComponentProps {
  /** A string that defines the file types the file input should accept. */
  accept?: string
  /** Current progress of upload */
  progress?: number | boolean
  fullWidth?: boolean
  /** File descriptor */
  file?: File
}

const FileInputContent = withStyles(styles)(
  ({
    classes,
    className,
    accept,
    progress,
    error,
    onChange,
    file,
    disabled
  }: Props) => {
    const nativeInput = createRef<HTMLInputElement>()

    const calculateFilename = () => {
      if (error) {
        return 'Upload failed.'
      }

      if (inProgress) {
        return 'File uploading in progress...'
      }

      if (file) {
        return disabled ? (
          file.name
        ) : (
          <Link href={file.location}>{file.name}</Link>
        )
      }

      return 'No file uploaded.'
    }

    const isNumericalProgress = isNumber(progress)

    const inProgress =
      (isNumericalProgress && progress! <= 100) ||
      (typeof progress === 'boolean' && progress)

    const uploadButtonVariant =
      file || error ? 'secondary-blue' : 'primary-blue'
    const uploadButtonTitle =
      file || error ? 'Choose different file' : 'Choose File'

    const loaderValue = isNumericalProgress ? (progress as number) : undefined

    return (
      <Container
        className={className}
        flex
        inline
        justifyContent='space-between'
      >
        <Typography className={classes.inputValue} inline color='inherit'>
          {calculateFilename()}
        </Typography>
        {inProgress ? (
          <Loader size='small' value={loaderValue} />
        ) : (
          <Button
            className={classes.button}
            size='small'
            variant={uploadButtonVariant}
            disabled={disabled}
            onClick={() => nativeInput.current && nativeInput.current.click()}
          >
            {uploadButtonTitle}
          </Button>
        )}
        <input
          type='file'
          className={classes.nativeInput}
          ref={nativeInput}
          accept={accept}
          onChange={onChange}
        />
      </Container>
    )
  }
)

export const FileInput: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  fullWidth,
  accept,
  progress,
  onError,
  error,
  disabled,
  file,
  onChange
}) => {
  return (
    <FormControl
      error={error}
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
      style={style}
    >
      <OutlinedInput
        classes={{
          root: classes.root,
          input: cx(classes.input, {
            [classes.inputStatus]: !file,
            [classes.inputStatusDisabled]: !file && disabled
          })
        }}
        type='file'
        // @ts-ignore
        inputComponent={FileInputContent}
        // @ts-ignore
        inputProps={{
          progress,
          onError,
          error,
          disabled,
          file,
          onChange,
          accept
        }}
        labelWidth={0}
      />
    </FormControl>
  )
}

FileInput.defaultProps = {
  fullWidth: false
}

FileInput.displayName = 'FileInput'

export default withStyles(styles)(FileInput)
