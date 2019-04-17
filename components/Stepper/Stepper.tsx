import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIStepper from '@material-ui/core/Stepper'

import Step from '../Step'
import StepLabel from '../StepLabel'
import '../StepIcon'
import StepConnector from '../StepConnector'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** The index of the active step */
  active?: number
  /** The component will take up the full width of its container */
  fullWidth?: boolean
  /** Hide labels of non active steps */
  hideLabels?: boolean
  /** Array of the step labels */
  steps: string[]
}

export const Stepper: FunctionComponent<Props> = props => {
  const {
    active,
    steps,
    fullWidth,
    hideLabels,
    classes,
    className,
    style
  } = props

  return (
    <MUIStepper
      activeStep={active}
      connector={<StepConnector />}
      className={cx(
        {
          [classes.fullWidth]: fullWidth
        },
        className
      )}
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
  fullWidth: false,
  hideLabels: false,
  steps: []
}

Stepper.displayName = 'Stepper'

export default withStyles(styles)(Stepper)
