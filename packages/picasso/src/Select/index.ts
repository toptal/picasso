import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props as InternalSelectProps } from './Select'
export { default } from './Select'
export type SelectProps = OmitInternalProps<InternalSelectProps>
/** @deprecated Use SelectProps instead */
export type Props = SelectProps
