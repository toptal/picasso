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

export type OrientationType = 'vertical' | 'horizontal'

export interface Props<T extends OrientationType = 'horizontal'>
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
  /** The index of the active step */
  active?: number
  /** Array of the step labels */
  steps: string[]
  /** Hide labels of non active steps */
  hideLabels?: T extends 'horizontal' ? boolean : false
  /** Controls orientation of stepper */
  orientation?: T
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoStepper' })

export const Stepper = forwardRef(function Stepper<T extends OrientationType> (
  props: Props<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    active = 0,
    steps = [],
    hideLabels = false,
    className,
    style,
    titleCase,
    orientation = 'horizontal',
    ...rest
  } = props
  const classes = useStyles()

  return (
    <MUIStepper
      {...rest}
      ref={ref}
      activeStep={active}
      connector={<StepConnector orientation={orientation} />}
      className={cx(classes.root, className)}
      style={style}
      orientation={orientation}
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
  orientation: 'horizontal',
  steps: []
}

Stepper.displayName = 'Stepper'

export default Stepper
