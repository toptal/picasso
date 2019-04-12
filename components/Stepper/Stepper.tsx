import React, { FunctionComponent, CSSProperties } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStepper from '@material-ui/core/Stepper'

import Step from '../Step'
import StepLabel from '../StepLabel'
import '../StepIcon'
import StepConnector from '../StepConnector'
import styles from './styles'

interface Props {
  /** The number of the active step */
  active?: number
  className?: string
  /** Array of the step labels */
  steps: string[]
  style?: CSSProperties
}

export const Stepper: FunctionComponent<Props> = props => {
  const { active, steps, className, style } = props

  return (
    <MUIStepper
      activeStep={active}
      connector={<StepConnector />}
      className={className}
      style={style}
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
