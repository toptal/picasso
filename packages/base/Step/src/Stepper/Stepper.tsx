import type { HTMLAttributes, Key, ReactNode } from 'react'
import React, { forwardRef, Fragment } from 'react'
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'

import { Step } from '../Step'
import { StepConnector } from '../StepConnector'

export interface StepperBaseProps
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLDivElement> {
  /** The index of the active step */
  active?: number
  /** Array of the step labels */
  steps: string[] | { key: Key; content: ReactNode }[]
  /** Enable overflow ellipsis for labels (it will not work when custom block-level `steps.content` element is provided (for example, steps={[{ key: 'foo', content: <div>Longstring</div> }]}) */
  overflowEllipsis?: boolean
}

export interface Props extends StepperBaseProps {
  /** Hide labels of non active steps */
  hideLabels?: boolean
  direction?: 'vertical' | 'horizontal'
}

const Stepper = forwardRef<HTMLDivElement, Props>(
  (
    {
      active = 0,
      hideLabels = false,
      direction = 'horizontal',
      overflowEllipsis = false,
      steps = [],
      ...props
    },
    ref
  ) => {
    const { className, style, titleCase, ...rest } = props

    return (
      <div
        className={twMerge(
          'flex',
          cx({
            'flex-row items-center gap-1': direction === 'horizontal',
            'flex-col': direction === 'vertical',
          }),
          className
        )}
        style={style}
        ref={ref}
        {...rest}
      >
        {steps.map((step, stepIndex) => {
          const isStringStep = typeof step === 'string'

          return (
            <Fragment key={isStringStep ? step : step.key}>
              <Step
                active={stepIndex === active}
                completed={stepIndex < active}
                expand={!hideLabels || stepIndex === active}
                titleCase={titleCase}
                withOverflowEllipsis={overflowEllipsis}
              >
                {isStringStep ? step : step.content}
              </Step>
              {stepIndex < steps.length - 1 && (
                <StepConnector direction={direction} />
              )}
            </Fragment>
          )
        })}
      </div>
    )
  }
)

Stepper.displayName = 'Stepper'

export default Stepper
