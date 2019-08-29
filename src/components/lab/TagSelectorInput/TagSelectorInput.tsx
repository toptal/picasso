import React, { forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Props as InputProps } from '../../Input'
import InputAdornment from '../../InputAdornment'
import OutlinedInput from '../../OutlinedInput'
import styles from './styles'

export const TagSelectorInput = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      id,
      name,
      value,
      placeholder,
      error,
      disabled,
      autoFocus,
      autoComplete,
      icon,
      iconPosition,
      classes,
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
      ...rest
    },
    ref
  ) {
    const IconAdornment = icon && (
      <InputAdornment
        position={iconPosition!}
        disabled={disabled}
        className={classes.loaderAdornment}
      >
        {icon}
      </InputAdornment>
    )
    const usedStartAdornment =
      icon && iconPosition === 'start' ? IconAdornment : startAdornment
    const usedEndAdornment =
      icon && iconPosition === 'end' ? IconAdornment : endAdornment

    return (
      <OutlinedInput
        ref={ref}
        style={style}
        className={classes.inputBase}
        id={id}
        name={name}
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
        inputProps={rest}
        endAdornment={usedEndAdornment}
        startAdornment={usedStartAdornment}
        onChange={onChange}
      >
        {children}
      </OutlinedInput>
    )
  }
)

TagSelectorInput.defaultProps = {
  iconPosition: 'start',
  multiline: false,
  width: 'auto'
}

TagSelectorInput.displayName = 'TagSelectorInput'

export default withStyles(styles)(TagSelectorInput)
