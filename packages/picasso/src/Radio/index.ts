/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalRadioProps } from './Radio'
export { default } from './Radio'
export type RadioProps = OmitInternalProps<InternalRadioProps>
/** @deprecated Use RadioProps instead */
export type Props = RadioProps
