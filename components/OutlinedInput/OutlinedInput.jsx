import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIOutlinedInput from '@material-ui/core/OutlinedInput'

import styles from './styles'

const OutlinedInput = props => {
  return <MUIOutlinedInput {...props} />
}

export default withStyles(styles.OutlinedInput)(OutlinedInput)
