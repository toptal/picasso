import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props as InternalInputProps } from './Input'
export { default } from './Input'
export type InputProps = OmitInternalProps<InternalInputProps>
/** @deprecated Use InputProps instead */
export type Props = InputProps
