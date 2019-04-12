import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStepIcon, { StepIconProps } from '@material-ui/core/StepIcon'

import styles from './styles'

export const StepIcon: FunctionComponent<StepIconProps> = props => {
  return <MUIStepIcon {...props} />
}

StepIcon.displayName = 'StepIcon'

export default withStyles(styles)(StepIcon)
