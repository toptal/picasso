import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInputLabel from '@material-ui/core/InputLabel'

import styles from './styles'

const InputLabel = props => {
  return <MUIInputLabel {...props} />
}

export default withStyles(styles.InputLabel)(InputLabel)
