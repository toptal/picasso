import MUISwitch from '@material-ui/core/Switch'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  BaseProps,
  CompoundedComponentWithRef,
  TextLabelProps
} from '@toptal/picasso-shared'
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
  /** The id of the input element */
  id?: string
  /** Mark field as required */
  required?: boolean
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
    required,
    onChange,
    value,
    checked,
    titleCase,
    ...rest
  } = props

  const classes = useStyles(props)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...SwitchAttributes } = rest

  const muiSwitch = (
    <MUISwitch
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...SwitchAttributes}
      color='primary'
      ref={ref}
      required={required}
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
    return muiSwitch
  }

  return (
    <FormControlLabel
      classes={{
        label: classes.label
      }}
      control={muiSwitch}
      required={required}
      disabled={disabled}
      label={label}
      titleCase={titleCase}
      className='picasso-Switch'
    />
  )
}) as CompoundedComponentWithRef<Props, HTMLButtonElement>

Switch.defaultProps = {
  disabled: false,
  onChange: () => {}
}

Switch.displayName = 'Switch'

export default Switch
