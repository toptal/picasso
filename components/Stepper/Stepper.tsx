import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStepper from '@material-ui/core/Stepper'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import Step from '../Step'
import StepLabel from '../StepLabel'
import '../StepIcon'
import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  /** The number of the active step */
  active?: number
  classes: Classes
  /** Array of the step labels */
  steps: string[]
}

export const Stepper: FunctionComponent<Props> = props => {
  const { active, steps, classes } = props

  return (
    <MUIStepper
      activeStep={active}
      connector={<ChevronRightIcon className={classes.connectorIcon} />}
    >
      {steps.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  )
}

Stepper.defaultProps = {
  active: 0,
  steps: []
}

Stepper.displayName = 'Stepper'

export default withStyles(styles)(Stepper)
