import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props, DirectionType } from './Stepper'

export { default } from './Stepper'
export type StepperBaseProps<T extends DirectionType> = Props<T>
export type StepperProps = OmitInternalProps<
  Omit<Props<'horizontal'>, 'direction'>
>
export type { DirectionType } from './Stepper'
