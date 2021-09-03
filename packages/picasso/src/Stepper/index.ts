import { OmitInternalProps } from '@toptal/picasso-shared'

import { DirectionType, Props } from './Stepper'

export { default } from './Stepper'
export type StepperProps<T extends DirectionType> = OmitInternalProps<Props<T>>
export type { DirectionType } from './Stepper'
