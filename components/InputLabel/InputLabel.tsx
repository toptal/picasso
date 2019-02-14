import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInputLabel, { InputLabelProps } from '@material-ui/core/InputLabel'

import styles from './styles'

const InputLabel: React.FunctionComponent<InputLabelProps> = props => {
  return <MUIInputLabel {...props} />
}

export default withStyles(styles)(InputLabel)
