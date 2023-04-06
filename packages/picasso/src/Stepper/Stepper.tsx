import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Stepper as MUIStepper } from '@material-ui/core'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'

import Step from '../Step'
import StepLabel from '../StepLabel'
import '../StepIcon'
import StepConnector from '../StepConnector'
import styles from './styles'

export interface StepperBaseProps
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
  /** The index of the active step */
  active?: number
  /** Array of the step labels */
  steps: string[]
  /** Enable overflow ellipsis for labels */
  overflowEllipsis?: boolean
}

export interface Props extends StepperBaseProps {
  /** Hide labels of non active steps */
  hideLabels?: boolean
  direction?: 'vertical' | 'horizontal'
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
    overflowEllipsis = false,
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
            overflowEllipsis={overflowEllipsis}
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
  overflowEllipsis: false,
  steps: [],
}

Stepper.displayName = 'Stepper'

export default Stepper
