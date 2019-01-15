import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInputBase from '@material-ui/core/InputBase'

import styles from './styles'

const InputBase = props => {
  return <MUIInputBase {...props} />
}

export default withStyles(styles.InputBase)(InputBase)
