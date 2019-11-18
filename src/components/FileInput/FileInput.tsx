import React, { forwardRef, useRef, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'

import { StandardProps } from '../Picasso'
import OutlinedInput from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import Button from '../Button'
import Loader from '../Loader'
import Link from '../Link'
import Typography from '../Typography'
import { Check16, UploadDocument16 } from '../Icon'
import { isNumber, isBoolean, useCombinedRefs } from '../utils'
import styles from './styles'

export interface FileInfo {
  name: string
  location: string
}

export interface Props extends StandardProps {
  /** If true, the 'FileInput' will be disabled */
  disabled?: boolean
  /** Indicate whether `FileInput` is in error state */
  error?: boolean
  /** A string that defines the file types the file input should accept. */
  accept?: string
  /** Current progress of upload */
  progress?: number | boolean
  /** Status message indicating various states during upload or error */
  status?: string
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Descriptor containing file name and location */
  value?: FileInfo
  /** Callback invoked when `FileInput` changes its state by selecting new files. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInputContent = withStyles(styles)(
  ({
    classes,
    accept,
    onChange,
    value,
    status,
    disabled,
    error,
    progress,
    inputRef
  }: Props & InputBaseComponentProps) => {
    const getFilename = () => {
      if (error || progress) {
        return status
      }

      if (value) {
        if (disabled) {
          return value.name
        }

        return <Link href={value.location}>{value.name}</Link>
      }

      return status
    }

    return (
      <Fragment>
        <Typography
          className={cx(classes.inputValue, {
            [classes.inputValueDisabled]: disabled
          })}
          inline
        >
          {getFilename()}
        </Typography>

        <input
          type='file'
          className={classes.nativeInput}
          ref={inputRef}
          accept={accept}
          onChange={onChange}
        />
      </Fragment>
    )
  }
)

export const FileInput = forwardRef<HTMLInputElement, Props>(function FileInput(
  {
    classes,
    className,
    style,
    width,
    accept,
    progress,
    error,
    disabled,
    value,
    status,
    onChange
  },
  ref
) {
  // if `ref` is null then we need a ref to control the input
  // so we create another ref manually if needed and merge both of them
  const inputRef = useCombinedRefs<HTMLInputElement>(
    ref,
    useRef<HTMLInputElement>(null)
  )

  const inProgress =
    (isNumber(progress) && progress! <= 100) ||
    (isBoolean(progress) && progress)

  const uploadButtonVariant = value || error ? 'secondary-blue' : 'primary-blue'
  const uploadButtonTitle =
    value || error ? 'Choose different file' : 'Choose File'

  const loaderValue = isNumber(progress) && progress

  const startAdornment = (
    <InputAdornment
      className={classes.adornmentStart}
      disabled={disabled}
      position='start'
    >
      {value ? (
        <Check16 color={!disabled ? 'green' : undefined} />
      ) : (
        <UploadDocument16 />
      )}
    </InputAdornment>
  )

  const endAdornment = (
    <InputAdornment position='end'>
      {inProgress ? (
        <Loader
          className={classes.loader}
          size='small'
          value={isNumber(progress) ? (loaderValue as number) : undefined}
        />
      ) : (
        <Button
          className={classes.button}
          size='small'
          variant={uploadButtonVariant}
          disabled={disabled}
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          {uploadButtonTitle}
        </Button>
      )}
    </InputAdornment>
  )

  return (
    <OutlinedInput
      ref={inputRef}
      className={className}
      style={style}
      classes={{
        root: classes.root,
        input: classes.input
      }}
      error={error}
      disabled={disabled}
      width={width}
      type='file'
      inputComponent={FileInputContent}
      inputProps={{
        progress,
        error,
        disabled,
        value,
        onChange,
        accept,
        status
      }}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
    />
  )
})

FileInput.displayName = 'FileInput'

export default withStyles(styles)(FileInput)
