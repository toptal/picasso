import React, { FunctionComponent, CSSProperties } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStepper from '@material-ui/core/Stepper'

import Step from '../Step'
import StepLabel from '../StepLabel'
import '../StepIcon'
import StepConnector from '../StepConnector'
import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  /** The number of the active step */
  active?: number
  classes: Classes
  className?: string
  /** Array of the step labels */
  steps: string[]
  styles?: CSSProperties
}

export const Stepper: FunctionComponent<Props> = props => {
  const { active, steps } = props

  return (
    <MUIStepper activeStep={active} connector={<StepConnector />}>
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
