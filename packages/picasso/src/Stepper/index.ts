import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Stepper'

export type { DirectionType } from './types'
export { StepperBaseProps } from './Stepper'
export { default } from './StepperCompound'
export type StepperProps = OmitInternalProps<Omit<Props, 'direction'>>
