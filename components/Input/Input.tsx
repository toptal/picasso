import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInput, { InputProps } from '@material-ui/core/Input'

import styles from './styles'

const Input: React.FunctionComponent<InputProps> = props => {
  return <MUIInput {...props} />
}

export default withStyles(styles)(Input)
