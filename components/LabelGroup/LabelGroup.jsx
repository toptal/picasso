import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const LabelGroup = ({ children, classes, ...rest }) => {
  return (
    <div className={classes.root} {...rest}>
      {children}
    </div>
  )
}

LabelGroup.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({
    root: PropTypes.string
  })
}

LabelGroup.defaultProps = {
  children: null,
  classes: null
}

export default withStyles(styles)(LabelGroup)
