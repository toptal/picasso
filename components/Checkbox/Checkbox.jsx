import React from 'react'
import PropTypes from 'prop-types'
import MUICheckbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '../FormControlLabel'
import styles from './styles'
import CheckedIcon from './CheckedIcon'
import UncheckedIcon from './UncheckedIcon'
import IndeterminateIcon from './IndeterminateIcon'

const Checkbox = props => {
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
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
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
