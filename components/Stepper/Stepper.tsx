import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIStepper from '@material-ui/core/Stepper'

import Step from '../Step'
import StepLabel from '../StepLabel'
import '../StepIcon'
import StepConnector from '../StepConnector'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** The number of the active step */
  active?: number
  /** Hide labels of non active steps */
  hideLabels?: boolean
  /** Array of the step labels */
  steps: string[]
}

export const Stepper: FunctionComponent<Props> = props => {
  const { active, steps, hideLabels, className, style } = props

  return (
    <MUIStepper
      activeStep={active}
      connector={<StepConnector />}
      className={className}
      style={style}
    >
      {steps.map(label => (
        <Step key={label}>
          <StepLabel hideLabel={hideLabels!}>{label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  )
}

Stepper.defaultProps = {
  active: 0,
  hideLabels: false,
  steps: []
}

Stepper.displayName = 'Stepper'

export default withStyles(styles)(Stepper)
