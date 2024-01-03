import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalSwitchProps } from './Switch'
export { default } from './Switch'
export type SwitchProps = OmitInternalProps<InternalSwitchProps>
/** @deprecated [@@BARE_PROPS_EXPORTS] Use SwitchProps instead */
export type Props = SwitchProps
