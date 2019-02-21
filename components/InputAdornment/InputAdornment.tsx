import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInputAdornment, {
  InputAdornmentProps
} from '@material-ui/core/InputAdornment'

import styles from './styles'

const InputAdornment: React.FunctionComponent<InputAdornmentProps> = props => {
  return <MUIInputAdornment {...props} />
}

export default withStyles(styles)(InputAdornment)
