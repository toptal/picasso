/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Stepper'

export { default } from './Stepper'
export type { StepperBaseProps } from './Stepper'
export type StepperProps = OmitInternalProps<Omit<Props, 'direction'>>
