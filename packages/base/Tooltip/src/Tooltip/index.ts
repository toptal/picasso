import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props as InternalTooltipProps } from './Tooltip'
export { default as Tooltip } from './Tooltip'
export type TooltipProps = OmitInternalProps<InternalTooltipProps>
/** @deprecated Use TooltipProps instead */
export type Props = TooltipProps
