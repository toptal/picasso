import React, { forwardRef, ReactElement } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Props as InputProps } from '../../Input'
import OutlinedInput from '../../OutlinedInput'
import styles from './styles'

export const TagSelectorInput = forwardRef<HTMLInputElement, InputProps>(
  function TagSelectorInput(
    {
      id,
      name,
      defaultValue,
      value,
      placeholder,
      error,
      disabled,
      autoFocus,
      autoComplete,
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
    let usedEndAdornment = null

    if (endAdornment) {
      usedEndAdornment = React.cloneElement(endAdornment as ReactElement, {
        className: classes.loaderAdornment
      })
    }

    return (
      <OutlinedInput
        ref={ref}
        style={style}
        className={classes.inputBase}
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
        inputProps={rest}
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

export default withStyles(styles)(TagSelectorInput)
