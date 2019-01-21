import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUICircularProgress from '@material-ui/core/CircularProgress'

import styles from './styles'

const CircularProgress = props => {
  return <MUICircularProgress {...props} />
}

export default withStyles(styles)(CircularProgress)
