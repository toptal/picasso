import React, { forwardRef } from 'react'

import type { StepperBaseProps } from '../Stepper'
import { Stepper } from '../Stepper'

export type Props = StepperBaseProps

export const StepperVertical = forwardRef(function StepperVertical(
  { active = 0, steps = [], ...rest }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Stepper
      ref={ref}
      active={active}
      steps={steps}
      {...rest}
      direction='vertical'
    />
  )
})

StepperVertical.displayName = 'StepperVertical'

export default StepperVertical
