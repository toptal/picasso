import React, { forwardRef, HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIStepper from '@material-ui/core/Stepper'
import { BaseProps, TextLabelProps } from '@toptal/picasso-shared'

import Step from '../Step'
import StepLabel from '../StepLabel'
import '../StepIcon'
import StepConnector from '../StepConnector'
import styles from './styles'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
  /** The index of the active step */
  active?: number
  /** Hide labels of non active steps */
  hideLabels?: boolean
  /** Array of the step labels */
  steps: string[]
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoStepper' })

export const Stepper = forwardRef<HTMLDivElement, Props>(function Stepper (
  props,
  ref
) {
  const {
    active = 0,
    steps = [],
    hideLabels = false,
    className,
    style,
    titleCase,
    ...rest
  } = props
  const classes = useStyles()

  return (
    <MUIStepper
      {...rest}
      ref={ref}
      activeStep={active}
      connector={<StepConnector />}
      className={cx(classes.root, className)}
      style={style}
    >
      {steps.map((label, stepIndex) => (
        <Step key={label}>
          <StepLabel
            active={stepIndex === active}
            hideLabel={hideLabels}
            titleCase={titleCase}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </MUIStepper>
  )
})

Stepper.defaultProps = {
  active: 0,
  hideLabels: false,
  steps: []
}

Stepper.displayName = 'Stepper'

export default Stepper
