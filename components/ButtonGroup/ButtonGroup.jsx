import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const ButtonGroup = ({ children, classes }) => {
  return <div className={classes.root}>{children}</div>
}

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  classes: PropTypes.shape({
    root: PropTypes.string
  })
}

ButtonGroup.defaultProps = {
  children: [],
  classes: {}
}

export default withStyles(styles)(ButtonGroup)
