import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Stepper'

export { default, StepperBaseProps, DirectionType } from './Stepper'
export type StepperProps = OmitInternalProps<Omit<Props, 'direction'>>
