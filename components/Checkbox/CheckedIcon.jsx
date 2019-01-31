import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import CheckSvg from '../Icons/Check'
import styles from './styles'

const CheckedIcon = ({ className, classes }) => (
  <div className={className}>
    <CheckSvg className={classes.icon} />
  </div>
)

CheckedIcon.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string
  })
}

CheckedIcon.defaultProps = {
  className: null,
  classes: null
}

export default withStyles(styles)(CheckedIcon)
