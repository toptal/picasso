import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const UncheckedIcon = ({ classes }) => <div className={classes.uncheckedIcon} />

UncheckedIcon.propTypes = {
  classes: PropTypes.shape({
    uncheckedIcon: PropTypes.string
  })
}

export default withStyles(styles)(UncheckedIcon)
