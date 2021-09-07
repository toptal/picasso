import React, { forwardRef } from 'react'

import Stepper, { StepperBaseProps } from '../Stepper'

export type Props = Omit<
  StepperBaseProps<'vertical'>,
  'hideLabels' | 'direction'
>

export const StepperVertical = forwardRef(function StepperVertical (
  props: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <Stepper ref={ref} {...props} direction='vertical' />
})

StepperVertical.defaultProps = {
  active: 0,
  steps: []
}

StepperVertical.displayName = 'StepperVertical'

export default StepperVertical
