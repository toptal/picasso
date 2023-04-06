import React, { forwardRef } from 'react'

import type { StepperBaseProps } from '../Stepper'
import Stepper from '../Stepper'

export type Props = StepperBaseProps

export const StepperVertical = forwardRef(function StepperVertical(
  props: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <Stepper ref={ref} {...props} direction='vertical' />
})

StepperVertical.defaultProps = {
  active: 0,
  steps: [],
}

StepperVertical.displayName = 'StepperVertical'

export default StepperVertical
