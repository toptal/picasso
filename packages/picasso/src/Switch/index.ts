import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props as InternalSwitchProps } from './Switch'
export { default } from './Switch'
export type SwitchProps = OmitInternalProps<InternalSwitchProps>
/** @deprecated Use SwitchProps instead */
export type Props = SwitchProps
