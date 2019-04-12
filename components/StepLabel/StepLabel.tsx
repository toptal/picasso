import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStepLabel, { StepLabelProps } from '@material-ui/core/StepLabel'

import styles from './styles'

export const StepLabel: FunctionComponent<StepLabelProps> = props => {
  return <MUIStepLabel {...props} />
}

StepLabel.displayName = 'StepLabel'

export default withStyles(styles)(StepLabel)
