import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalTooltipProps } from './Tooltip'
export { default as Tooltip, DelayType } from './Tooltip'
export type TooltipProps = OmitInternalProps<InternalTooltipProps>
export type { DelayType, MaxWidthType, PlacementType } from './Tooltip'
/** @deprecated [FX-4714] Use TooltipProps instead */
export type Props = TooltipProps
