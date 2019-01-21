import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import styles from './styles'
import Chip from '../Chip'
import LabelGroup from '../LabelGroup'

const Label = props => {
  const { classes, variant, ...rest } = props

  let rootClass = {
    flat: classes.flat,
    success: classes.success,
    error: classes.error
  }[variant]

  return (
    <Chip
      classes={{ root: rootClass }}
      deleteIcon={
        <CloseIcon className={classes.deleteIcon} data-testid='icon-delete' />
      }
      {...rest}
    />
  )
}

Label.propTypes = {
  label: PropTypes.string,
  onDelete: PropTypes.func,
  variant: PropTypes.oneOf(['flat', 'success', 'error'])
}

Label.defaultProps = {
  label: null,
  onDelete: undefined,
  variant: null
}

Label.Group = LabelGroup

export default withStyles(styles)(Label)
