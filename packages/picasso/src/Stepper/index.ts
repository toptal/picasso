import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Stepper'

export { default } from './Stepper'
export type { StepperBaseProps } from './Stepper'
export type StepperProps = OmitInternalProps<Omit<Props, 'direction'>>
