import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props as InternalRadioProps } from './Radio'
export { default } from './Radio'
export type RadioProps = OmitInternalProps<InternalRadioProps>
/** @deprecated Use RadioProps instead */
export type Props = RadioProps
