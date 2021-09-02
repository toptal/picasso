import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props, PropsVertical, PropsHorizontal } from './Stepper'

export { default } from './Stepper'
export type StepperProps = OmitInternalProps<Props>
export type StepperPropsVertical = OmitInternalProps<PropsVertical>
export type StepperPropsHorizontal = OmitInternalProps<PropsHorizontal>
