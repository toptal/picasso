import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import MinusSvg from '../Icons/Minus'
import styles from './styles'

const IndeterminateIcon = ({ className, classes }) => (
  <div className={className}>
    <MinusSvg className={classes.icon} />
  </div>
)

IndeterminateIcon.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string
  })
}

IndeterminateIcon.defaultProps = {
  className: null,
  classes: null
}

export default withStyles(styles)(IndeterminateIcon)
