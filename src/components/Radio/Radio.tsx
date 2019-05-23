import React, { FunctionComponent, ReactNode } from 'react'
import MUIRadio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** Text label for the `Radio` */
  label?: string
  /** Value of the `Radio` component used with conjuction of `Radio.Group` */
  value?: string | number | boolean
  /** Defines if `Radio` is disabled */
  disabled?: boolean
  /** Defines if `Radio` is checked by default */
  checked?: boolean
  /** Callback invoked when `Radio` changes its state */
  onChange?: (event: object, checked: boolean) => void
}

// should be moved to some global interfaces place
interface GroupFunctionalComponent<T> extends FunctionComponent<T> {
  Group: ReactNode
}

export const Radio: GroupFunctionalComponent<Props> = ({
  classes,
  className,
  style,
  label,
  checked,
  disabled,
  value,
  onChange
}) => {
  const muiRadio = (
    <MUIRadio
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      value={value}
      icon={<div className={classes.uncheckedIcon} />}
      checkedIcon={<div className={classes.checkedIcon} />}
      color='default'
      classes={{
        root: classes.root
      }}
      className={className}
      style={style}
    />
  )

  if (!label) {
    return muiRadio
  }

  return (
    <FormControlLabel
      control={muiRadio}
      classes={{
        root: classes.root
      }}
      className={className}
      style={style}
      label={label}
    />
  )
}

Radio.defaultProps = {
  checked: undefined,
  classes: {},
  disabled: false,
  label: undefined,
  value: undefined
}

Radio.displayName = 'Radio'

Radio.Group = RadioGroup

export default withStyles(styles)(Radio)
