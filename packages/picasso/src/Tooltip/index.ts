import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props as InternalTooltipProps, PlacementType } from './Tooltip'
export { default } from './Tooltip'
export type TooltipProps = OmitInternalProps<InternalTooltipProps>
export type TooltipPlacementType = PlacementType
/** @deprecated Use TooltipProps instead */
export type Props = TooltipProps
