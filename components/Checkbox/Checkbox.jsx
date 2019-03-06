import React from 'react'
import PropTypes from 'prop-types'
import MUICheckbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import styles from './styles'
import CheckedIcon from './CheckedIcon'
import UncheckedIcon from './UncheckedIcon'
import IndeterminateIcon from './IndeterminateIcon'

export const Checkbox = props => {
  const {
    label,
    id,
    classes,
    disabled,
    onChange,
    value,
    checked,
    indeterminate
  } = props
  const rootClasses = {
    root: classes.root,
    disabled: classes.disabled
  }

  const muiCheckbox = (
    <MUICheckbox
      checked={checked}
      checkedIcon={<CheckedIcon className={classes.checkedIcon} />}
      classes={rootClasses}
      disabled={disabled}
      icon={<UncheckedIcon className={classes.uncheckedIcon} />}
      id={id}
      indeterminate={indeterminate}
      indeterminateIcon={
        <IndeterminateIcon className={classes.indeterminateIcon} />
      }
      onChange={onChange}
      value={value}
    />
  )

  if (!label) {
    return muiCheckbox
  }

  return (
    <FormControlLabel
      classes={rootClasses}
      control={muiCheckbox}
      label={label}
    />
  )
}

Checkbox.propTypes = {
  /** Show checkbox initially as checked */
  checked: PropTypes.bool,
  /** Disable changing `Checkbox` state */
  disabled: PropTypes.bool,
  /** Checkbox can show indeterminate value instead of boolean */
  indeterminate: PropTypes.bool,
  /** Text label for the `Checkbox` */
  label: PropTypes.string,
  /** Callback invoked when `Checkbox` changed its value */
  onChange: PropTypes.func,
  /** Value of the `Checkbox` (applicable only for controlled component) */
  value: PropTypes.string
}

Checkbox.defaultProps = {
  checked: undefined,
  disabled: false,
  indeterminate: false,
  label: null,
  onChange: () => {},
  value: undefined
}

export default withStyles(styles)(Checkbox)
