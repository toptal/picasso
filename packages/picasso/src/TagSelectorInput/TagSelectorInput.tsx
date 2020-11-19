import React, { forwardRef, ReactElement } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Props as InputProps } from '../Input/Input'
import OutlinedInput from '../OutlinedInput'
import styles from './styles'

const useStyles = makeStyles<Theme, InputProps>(styles, {
  name: 'PicassoTagSelectorInput'
})

export const TagSelectorInput = forwardRef<HTMLInputElement, InputProps>(
  function TagSelectorInput(props, ref) {
    const {
      id,
      name,
      defaultValue,
      value,
      placeholder,
      error,
      disabled,
      autoFocus,
      autoComplete,
      children,
      multiline,
      width,
      style,
      rows,
      rowsMax,
      type,
      onChange,
      startAdornment,
      endAdornment,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onResetClick,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      enableReset,
      inputProps,
      ...rest
    } = props

    const classes = useStyles(props)
    let usedEndAdornment = null

    if (endAdornment) {
      usedEndAdornment = React.cloneElement(endAdornment as ReactElement, {
        className: classes.endAdornment
      })
    }

    return (
      <OutlinedInput
        inputRef={ref}
        style={style}
        className={cx(classes.inputBase, {
          [classes.withEndAdornment]: Boolean(endAdornment)
        })}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        multiline={multiline}
        rows={rows}
        rowsMax={rowsMax}
        type={type}
        width={width}
        // html attributes
        inputProps={{
          ...rest,
          ...inputProps
        }}
        endAdornment={usedEndAdornment}
        startAdornment={startAdornment}
        onChange={onChange}
      >
        {children}
      </OutlinedInput>
    )
  }
)

TagSelectorInput.defaultProps = {
  multiline: false,
  width: 'auto'
}

TagSelectorInput.displayName = 'TagSelectorInput'

export default TagSelectorInput
