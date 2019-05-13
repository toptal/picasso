import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStep, { StepProps } from '@material-ui/core/Step'

import styles from './styles'

export const Step: FunctionComponent<StepProps> = props => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MUIStep {...props} />
}

Step.displayName = 'Step'

export default withStyles(styles)(Step)
