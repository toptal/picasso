import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalInputProps } from './Input'
export { default } from './Input'
export type InputProps = OmitInternalProps<InternalInputProps>
/** @deprecated [@@BARE_PROPS_EXPORTS] Use InputProps instead */
export type Props = InputProps
