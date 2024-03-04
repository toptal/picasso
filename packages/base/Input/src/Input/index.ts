import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalInputProps } from './Input'
export { default as Input } from './Input'
export type InputProps = OmitInternalProps<InternalInputProps>
/** @deprecated [FX-4714] Use InputProps instead */
export type Props = InputProps
