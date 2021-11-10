import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Stepper'

export type { DirectionType } from './Stepper'
export { default, StepperBaseProps } from './Stepper'
export type StepperProps = OmitInternalProps<Omit<Props, 'direction'>>
