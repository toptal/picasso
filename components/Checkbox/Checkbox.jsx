import React from 'react'
import PropTypes from 'prop-types'
import MUICheckbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import Spacer from '../Spacer'
import CheckedIcon from './CheckedIcon'
import UncheckedIcon from './UncheckedIcon'
import IndeterminateIcon from './IndeterminateIcon'

const Checkbox = props => {
  const { label, id, classes, ...rest } = props

  const muiCheckbox = (
    <MUICheckbox
      checkedIcon={<CheckedIcon />}
      icon={<UncheckedIcon />}
      id={id}
      indeterminateIcon={<IndeterminateIcon />}
      {...rest}
    />
  )

  return label ? (
    <label className={classes.label} htmlFor={id}>
      {muiCheckbox}
      <Spacer left={0.5} top={0.15}>
        {label}
      </Spacer>
    </label>
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

Checkbox.defaultProps = {}

export default withStyles(styles)(Checkbox)
