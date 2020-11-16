import MUISwitch from '@material-ui/core/Switch'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import FormControlLabel from '@toptal/picasso/FormControlLabel'

import styles from './styles'

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoSwitch' })

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
    ...rest
  } = props

  const classes = useStyles(props)

  const switchElement = (
    <MUISwitch
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      color='primary'
      ref={ref}
      checked={checked}
      className={cx(className, {
        [classes.disabled]: disabled
      })}
      style={style}
      disabled={disabled}
      id={id}
      onChange={onChange}
      value={value}
    />
  )

  if (!label) {
    return switchElement
  }

  return (
    <FormControlLabel
      classes={{
        label: classes.label
      }}
      control={switchElement}
      disabled={disabled}
      label={label}
      titleCase={titleCase}
    />
  )
})

Switch.defaultProps = {
  disabled: false,
  onChange: () => {}
}

Switch.displayName = 'Switch'

export default Switch
