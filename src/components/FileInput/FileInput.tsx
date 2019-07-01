import React, { FunctionComponent, createRef, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'

import { StandardProps } from '../Picasso'
import palette from '../Picasso/config/palette'
import FormControl from '../FormControl'
import OutlinedInput from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import Button from '../Button'
import Loader from '../Loader'
import Link from '../Link'
import Typography from '../Typography'
import { Check24, UploadDocument16 } from '../Icon'
import { isNumber, isBoolean } from '../utils'

import styles from './styles'

export interface FileDescription {
  name: string
  location: string
}

export interface Props extends StandardProps, InputBaseComponentProps {
  /** A string that defines the file types the file input should accept. */
  accept?: string
  /** Current progress of upload */
  progress?: number | boolean
  /** Status of file */
  status?: string
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Descriptor describing file name and file location*/
  value?: FileDescription
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
  }: Props) => {
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
  fullWidth,
  accept,
  progress,
  error,
  disabled,
  value,
  status,
  onChange
}) => {
  const nativeInput = createRef<HTMLInputElement>()

  const inProgress =
    (isNumber(progress) && progress! <= 100) ||
    (isBoolean(progress) && progress)

  const uploadButtonVariant = value || error ? 'secondary-blue' : 'primary-blue'
  const uploadButtonTitle =
    value || error ? 'Choose different file' : 'Choose File'

  const loaderValue = isNumber(progress) && progress

  const startAdornment = (
    <InputAdornment
      className={cx(classes.icon, classes.iconStart, {
        [classes.iconDisabled]: disabled
      })}
      position='start'
    >
      {value ? (
        <Check24 color={!disabled && palette.green.main} />
      ) : (
        <UploadDocument16 className={classes.upload} />
      )}
    </InputAdornment>
  )

  const endAdornment = (
    <InputAdornment
      className={cx(classes.icon, classes.iconEnd)}
      position='end'
    >
      {inProgress ? (
        <Loader
          className={classes.loader}
          size='small'
          value={loaderValue as number}
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
            [classes.inputStatus]: !value,
            [classes.inputStatusDisabled]: !value && disabled
          })
        }}
        type='file'
        // @ts-ignore
        inputComponent={FileInputContent}
        // @ts-ignore
        inputProps={{
          error,
          disabled,
          progress,
          value,
          onChange,
          accept,
          status
        }}
        inputRef={nativeInput}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
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
