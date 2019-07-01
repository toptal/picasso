import React, { FunctionComponent, useRef, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'

import { StandardProps } from '../Picasso'
import palette from '../Picasso/config/palette'
import OutlinedInput from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import Button from '../Button'
import Loader from '../Loader'
import Link from '../Link'
import Typography from '../Typography'
import { Check16, UploadDocument16 } from '../Icon'
import { isNumber, isBoolean } from '../utils'
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
  /** Width of the component which will apply `min-width` to the `input` */
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
        <Typography className={classes.inputValue} inline color='inherit'>
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

export const FileInput: FunctionComponent<Props> = ({
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
}) => {
  const nativeInput = useRef<HTMLInputElement>()

  const inProgress =
    (isNumber(progress) && progress! <= 100) ||
    (isBoolean(progress) && progress)

  const uploadButtonVariant = value || error ? 'secondary-blue' : 'primary-blue'
  const uploadButtonTitle =
    value || error ? 'Choose different file' : 'Choose File'

  const loaderValue = isNumber(progress) && progress

  const startAdornment = (
    <InputAdornment
      className={cx(classes.adornmentStart, {
        [classes.adornmentDisabled]: disabled
      })}
      position='start'
    >
      {value ? (
        <Check16 color={!disabled ? palette.green.main : undefined} />
      ) : (
        <UploadDocument16 />
      )}
    </InputAdornment>
  )

  const endAdornment = (
    <InputAdornment className={classes.adornmentEnd} position='end'>
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
          onClick={() => nativeInput.current && nativeInput.current.click()}
        >
          {uploadButtonTitle}
        </Button>
      )}
    </InputAdornment>
  )

  return (
    <OutlinedInput
      className={className}
      style={style}
      classes={{
        root: classes.root,
        input: cx(classes.input, {
          [classes.inputStatus]: !value,
          [classes.inputStatusDisabled]: !value && disabled
        })
      }}
      error={error}
      disabled={disabled}
      width={width}
      type='file'
      // MUIv3 doesn't provide generic way to change type of component and props
      // that would be extensions of input component
      // https://github.com/mui-org/material-ui/blob/v3.x/packages/material-ui/src/InputBase/InputBase.d.ts#L18
      // @ts-ignore
      inputComponent={FileInputContent}
      // @ts-ignore
      inputProps={{
        progress,
        error,
        disabled,
        value,
        onChange,
        accept,
        status
      }}
      inputRef={nativeInput}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
    />
  )
}

FileInput.defaultProps = {
  width: 'auto'
}

FileInput.displayName = 'FileInput'

export default withStyles(styles)(FileInput)
