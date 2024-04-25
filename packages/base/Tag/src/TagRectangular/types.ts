import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'

import type { IndicatorProps } from '../Indicator'

export type VariantType =
  | 'red'
  | 'yellow'
  | 'dark-grey'
  | 'light-grey'
  | 'green'
  | 'light-blue'
  | 'blue-main'
  | 'blue-darker'

export interface VariantOnlyProps extends BaseProps, TextLabelProps {
  /** Variant of the rectangular `Tag`, can not be used with the `indicator` property at the same time. */
  variant?: VariantType
  /** Indicator color, can not be used with the `variant` property at the same time. The Tag's `variant` property is automatically set to `light` when indicator color is set. */
  indicator?: never
}

export interface IndicatorOnlyProps extends BaseProps, TextLabelProps {
  variant?: never
  indicator: IndicatorProps['color']
}

export type Props =
  | React.PropsWithChildren<VariantOnlyProps>
  | React.PropsWithChildren<IndicatorOnlyProps>
