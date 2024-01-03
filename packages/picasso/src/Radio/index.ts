import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalRadioProps } from './Radio'
export { default } from './Radio'
export type RadioProps = OmitInternalProps<InternalRadioProps>
/** @deprecated [@@BARE_PROPS_EXPORTS] Use RadioProps instead */
export type Props = RadioProps
