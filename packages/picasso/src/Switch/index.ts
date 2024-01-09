import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalSwitchProps } from './Switch'
export { default } from './Switch'
export type SwitchProps = OmitInternalProps<InternalSwitchProps>
/** @deprecated [FX-4714] Use SwitchProps instead */
export type Props = SwitchProps
