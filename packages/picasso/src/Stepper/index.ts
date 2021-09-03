import { OmitInternalProps } from '@toptal/picasso-shared'

import { OrientationType, Props } from './Stepper'

export { default } from './Stepper'
export type StepperProps<T extends OrientationType> = OmitInternalProps<
  Props<T>
>
export type { OrientationType } from './Stepper'
