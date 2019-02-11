import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import Button from '../Button'
import { withClasses } from '../styles'

const ButtonGroup = (props) => {
  const { children, classes } = props

  return <div className={classes.root}>{children}</div>
}

ButtonGroup.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.shape({
    root: PropTypes.string
  })
}

ButtonGroup.defaultProps = {
  children: [],
  classes: {}
}

export default withStyles(styles)(withClasses((classes) => ([
  [Button, classes.button]
]))(ButtonGroup))
