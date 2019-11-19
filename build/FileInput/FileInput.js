import React, { forwardRef, useRef, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import OutlinedInput from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import Button from '../Button'
import Loader from '../Loader'
import Link from '../Link'
import Typography from '../Typography'
import { Check16, UploadDocument16 } from '../Icon'
import { isNumber, isBoolean, useCombinedRefs } from '../utils'
import styles from './styles'
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
  }) => {
    const getFilename = () => {
      if (error || progress) {
        return status
      }
      if (value) {
        if (disabled) {
          return value.name
        }
        return React.createElement(Link, { href: value.location }, value.name)
      }
      return status
    }
    return React.createElement(
      Fragment,
      null,
      React.createElement(
        Typography,
        {
          className: cx(classes.inputValue, {
            [classes.inputValueDisabled]: disabled
          }),
          inline: true
        },
        getFilename()
      ),
      React.createElement('input', {
        type: 'file',
        className: classes.nativeInput,
        ref: inputRef,
        accept: accept,
        onChange: onChange
      })
    )
  }
)
export const FileInput = forwardRef(function FileInput(
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
  const inputRef = useCombinedRefs(ref, useRef(null))
  const inProgress =
    (isNumber(progress) && progress <= 100) || (isBoolean(progress) && progress)
  const uploadButtonVariant = value || error ? 'secondary-blue' : 'primary-blue'
  const uploadButtonTitle =
    value || error ? 'Choose different file' : 'Choose File'
  const loaderValue = isNumber(progress) && progress
  const startAdornment = React.createElement(
    InputAdornment,
    {
      className: classes.adornmentStart,
      disabled: disabled,
      position: 'start'
    },
    value
      ? React.createElement(Check16, { color: !disabled ? 'green' : undefined })
      : React.createElement(UploadDocument16, null)
  )
  const endAdornment = React.createElement(
    InputAdornment,
    { position: 'end' },
    inProgress
      ? React.createElement(Loader, {
          className: classes.loader,
          size: 'small',
          value: isNumber(progress) ? loaderValue : undefined
        })
      : React.createElement(
          Button,
          {
            className: classes.button,
            size: 'small',
            variant: uploadButtonVariant,
            disabled: disabled,
            onClick: () => inputRef.current && inputRef.current.click()
          },
          uploadButtonTitle
        )
  )
  return React.createElement(OutlinedInput, {
    ref: inputRef,
    className: className,
    style: style,
    classes: {
      root: classes.root,
      input: classes.input
    },
    error: error,
    disabled: disabled,
    width: width,
    type: 'file',
    inputComponent: FileInputContent,
    inputProps: {
      progress,
      error,
      disabled,
      value,
      onChange,
      accept,
      status
    },
    startAdornment: startAdornment,
    endAdornment: endAdornment
  })
})
FileInput.displayName = 'FileInput'
export default withStyles(styles)(FileInput)
//# sourceMappingURL=FileInput.js.map
