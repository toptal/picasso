/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalRadioGroupProps } from './RadioGroup'
export { default } from './RadioGroup'
export type RadioGroupProps = OmitInternalProps<InternalRadioGroupProps>
/** @deprecated Use RadioGroupProps instead */
export type Props = RadioGroupProps
