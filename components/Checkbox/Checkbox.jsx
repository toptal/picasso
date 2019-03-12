import React from 'react'
import PropTypes from 'prop-types'
import MUICheckbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import styles from './styles'

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
      icon={<div className={classes.uncheckedIcon} />}
      checkedIcon={<div className={classes.checkedIcon} />}
      indeterminateIcon={<div className={classes.indeterminateIcon} />}
      classes={rootClasses}
      disabled={disabled}
      id={id}
      indeterminate={indeterminate}
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

Checkbox.displayName = 'Checkbox'

export default withStyles(styles)(Checkbox)
