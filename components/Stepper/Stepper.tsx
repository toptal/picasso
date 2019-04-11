import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStepper from '@material-ui/core/Stepper'

import styles from './styles'

interface Props {}

export const Stepper: FunctionComponent<Props> = props => {
  return <MUIStepper {...props} />
}

Stepper.defaultProps = {}

Stepper.displayName = 'Stepper'

export default withStyles(styles)(Stepper)
