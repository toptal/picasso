import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIFormControl, { FormControlProps } from '@material-ui/core/FormControl'

import styles from './styles'

const FormControl: React.FunctionComponent<FormControlProps> = props => {
  return <MUIFormControl {...props} />
}

export default withStyles(styles)(FormControl)
