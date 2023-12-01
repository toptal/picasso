/* eslint-disable import/no-extraneous-dependencies */
import Stepper from '@toptal/picasso-stepper'
import StepperVertical from '@toptal/picasso-stepper-vertical'

export const StepperCompound = Object.assign(Stepper, {
  Vertical: StepperVertical,
})
