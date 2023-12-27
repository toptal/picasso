/* eslint-disable import/no-extraneous-dependencies */
import React, { forwardRef } from 'react'
import type { StepperBaseProps } from '@toptal/picasso-stepper'
import Stepper from '@toptal/picasso-stepper'

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
