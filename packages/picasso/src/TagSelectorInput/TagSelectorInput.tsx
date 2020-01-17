import React, { forwardRef, ReactElement } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Props as InputProps } from '../Input/Input'
import OutlinedInput from '../OutlinedInput'
import styles from './styles'

export interface Props extends InputProps {
  /** Whether to render reset icon when there is a value in the input */
  allowReset?: boolean
  /** Callback invoked when reset button was clicked */
  onResetClick?: () => void
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTagSelectorInput'
})

export const TagSelectorInput = forwardRef<HTMLInputElement, Props>(
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
      allowReset,
      onResetClick,
      ...rest
    } = props

    const classes = useStyles(props)
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
        allowReset={allowReset}
        onResetClick={onResetClick}
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
