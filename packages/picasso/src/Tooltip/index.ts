import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalTooltipProps } from './Tooltip'
export { default } from './Tooltip'
export type TooltipProps = OmitInternalProps<InternalTooltipProps>
/** @deprecated [FX-4714] Use TooltipProps instead */
export type Props = TooltipProps
