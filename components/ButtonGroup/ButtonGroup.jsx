import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import Button from '../Button'
import { withClasses } from '../styles'

export const ButtonGroup = props => {
  const { children, classes } = props

  return <div className={classes.root}>{children}</div>
}

ButtonGroup.propTypes = {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: PropTypes.node,
  classes: PropTypes.shape({
    root: PropTypes.string
  })
}

ButtonGroup.defaultProps = {
  children: null,
  classes: {}
}

export default withStyles(styles)(
  withClasses(classes => [[Button, classes.button]])(ButtonGroup)
)
