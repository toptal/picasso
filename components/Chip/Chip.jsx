import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIChip from '@material-ui/core/Chip'

import styles from './styles'

const Chip = props => {
  return <MUIChip {...props} />
}

export default withStyles(styles)(Chip)
