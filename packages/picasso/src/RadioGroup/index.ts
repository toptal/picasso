import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props as InternalRadioGroupProps } from './RadioGroup'
export { default } from './RadioGroup'
export type RadioGroupProps = OmitInternalProps<InternalRadioGroupProps>
/** @deprecated Use RadioGroupProps instead */
export type Props = RadioGroupProps
