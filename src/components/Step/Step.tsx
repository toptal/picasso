import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStep, { StepProps } from '@material-ui/core/Step'

import styles from './styles'

export const Step: FunctionComponent<StepProps> = props => {
  const { active, children, completed, index } = props

  return (
    <MUIStep active={active} completed={completed} index={index}>
      {children}
    </MUIStep>
  )
}

Step.displayName = 'Step'

export default withStyles(styles)(Step)
