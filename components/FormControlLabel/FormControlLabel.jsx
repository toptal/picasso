import React from 'react'
import MUIFormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const FormControlLabel = props => {
  return <MUIFormControlLabel {...props} />
}

export default withStyles(styles.FormControlLabel)(FormControlLabel)
