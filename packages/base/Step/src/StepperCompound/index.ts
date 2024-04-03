import { Stepper } from '../Stepper'
import { StepperVertical } from '../StepperVertical'

type StepperCompoundType = typeof Stepper & {
  Vertical: typeof StepperVertical
}

export const StepperCompound: StepperCompoundType = Object.assign(Stepper, {
  Vertical: StepperVertical,
})
