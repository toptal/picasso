import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIOutlinedInput, {
  OutlinedInputProps
} from '@material-ui/core/OutlinedInput'

import styles from './styles'

const OutlinedInput: React.FunctionComponent<OutlinedInputProps> = props => {
  return <MUIOutlinedInput {...props} />
}

export default withStyles(styles)(OutlinedInput)
