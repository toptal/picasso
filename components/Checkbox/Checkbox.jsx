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
  const { label, id, classes, ...rest } = props
  const rootClasses = {
    root: classes.root,
    disabled: classes.disabled
  }

  const muiCheckbox = (
    <MUICheckbox
      checkedIcon={<CheckedIcon className={classes.checkedIcon} />}
      classes={rootClasses}
      icon={<UncheckedIcon className={classes.uncheckedIcon} />}
      id={id}
      indeterminateIcon={
        <IndeterminateIcon className={classes.indeterminateIcon} />
      }
      {...rest}
    />
  )

  return label ? (
    <FormControlLabel
      classes={rootClasses}
      control={muiCheckbox}
      label={label}
    />
  ) : (
    muiCheckbox
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
}

Checkbox.defaultProps = {
  checked: undefined,
  disabled: false,
  indeterminate: false,
  label: null,
  onChange: () => {}
}

export default withStyles(styles)(Checkbox)
