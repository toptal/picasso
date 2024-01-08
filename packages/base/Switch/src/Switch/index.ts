import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalSwitchProps } from './Switch'
export { default as Switch } from './Switch'
export type SwitchProps = OmitInternalProps<InternalSwitchProps>
/** @deprecated Use SwitchProps instead */
export type Props = SwitchProps
