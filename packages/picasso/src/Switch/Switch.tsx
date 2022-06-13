import MUISwitch from '@material-ui/core/Switch'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import FormControlLabel from '../FormControlLabel'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoSwitch' })

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Show Switch initially as checked */
  checked?: boolean
  /** Disable changing `Switch` state */
  disabled?: boolean
  /** Text label for the `Switch` */
  label?: ReactNode
  /** Callback invoked when `Switch` changed its value */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  /** Value of the `Switch` (applicable only for controlled component) */
  value?: string
}

export const Switch = forwardRef<HTMLButtonElement, Props>(function Switch(
  props,
  ref
) {
  const {
    label,
    id,
    className,
    style,
    disabled,
    onChange,
    value,
    checked,
    titleCase,
    color, // eslint-disable-line
    'data-testid': dataTestId,
    ...rest
  } = props

  const classes = useStyles()

  const switchElement = (
    <MUISwitch
      {...rest}
      color='primary'
      ref={ref}
      checked={checked}
      className={className}
      style={style}
      disabled={disabled}
      id={id}
      onChange={onChange}
      value={value}
      data-testid={label ? undefined : dataTestId}
    />
  )

  if (!label) {
    return switchElement
  }

  return (
    <FormControlLabel
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      control={switchElement}
      disabled={disabled}
      label={label}
      titleCase={titleCase}
      data-testid={dataTestId}
    />
  )
})

Switch.defaultProps = {
  disabled: false,
  onChange: () => {},
}

Switch.displayName = 'Switch'

export default Switch
