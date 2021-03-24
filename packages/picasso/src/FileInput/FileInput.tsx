import React, { forwardRef, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'
import { BaseProps } from '@toptal/picasso-shared'

import OutlinedInput from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import Button from '../Button'
import Loader from '../Loader'
import Typography from '../Typography'
import { Check16, UploadDocument16 } from '../Icon'
import { isNumber, isBoolean, useCombinedRefs } from '../utils'
import styles from './styles'

export interface Props extends BaseProps {
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
  /** Value uses the File interface */
  value?: File
  /** Callback invoked when `FileInput` changes its state by selecting new files. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useStyles = makeStyles<Theme>(styles, { name: 'FileInputContent' })

const FileInputContent = (props: Props & InputBaseComponentProps) => {
  const {
    accept,
    onChange,
    value,
    status,
    disabled,
    error,
    progress,
    inputRef
  } = props

  const classes = useStyles()

  const getFilename = () => {
    if (error || progress || !value) {
      return status
    }

    return value.name
  }

  return (
    <>
      <Typography
        inline
        color='black'
        className={cx(classes.inputValue, {
          [classes.inputValueDisabled]: disabled,
          [classes.inputValueSelected]: value
        })}
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
    </>
  )
}

export const FileInput = forwardRef<HTMLInputElement, Props>(
  function FileInput(props, ref) {
    const {
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
    } = props

    const classes = useStyles()

    // if `ref` is null then we need a ref to control the input
    // so we create another ref manually if needed and merge both of them
    const inputRef = useCombinedRefs<HTMLInputElement>(
      ref,
      useRef<HTMLInputElement>(null)
    )

    const inProgress =
      progress &&
      ((isNumber(progress) && progress <= 100) ||
        (isBoolean(progress) && progress))

    const uploadButtonTitle =
      value || error ? 'Choose different file' : 'Choose File'

    const loaderValue = isNumber(progress) && progress

    const startAdornment = (
      <InputAdornment
        className={classes.adornmentStart}
        disabled={disabled}
        position='start'
        disablePointerEvents
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
            variant='secondary'
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
        inputRef={inputRef}
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
  }
)

FileInput.displayName = 'FileInput'

export default FileInput
