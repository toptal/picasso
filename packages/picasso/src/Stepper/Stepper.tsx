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
import StepperVertical from '../StepperVertical'

export type DirectionType = 'vertical' | 'horizontal'

export interface StepperBaseProps
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
  /** The index of the active step */
  active?: number
  /** Array of the step labels */
  steps: string[]
}

export interface Props extends StepperBaseProps {
  /** Hide labels of non active steps */
  hideLabels?: boolean
  direction?: DirectionType
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoStepper' })

const Stepper = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    active = 0,
    steps = [],
    hideLabels = false,
    className,
    style,
    titleCase,
    direction = 'horizontal',
    ...rest
  } = props
  const classes = useStyles()

  return (
    <MUIStepper
      {...rest}
      ref={ref}
      activeStep={active}
      connector={<StepConnector direction={direction} />}
      className={cx(classes.root, className)}
      style={style}
      orientation={direction}
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
  direction: 'horizontal',
  steps: []
}

Stepper.displayName = 'Stepper'

export default Object.assign(Stepper, { Vertical: StepperVertical })
