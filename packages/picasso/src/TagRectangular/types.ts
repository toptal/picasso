import { HTMLAttributes, AnchorHTMLAttributes } from 'react'
import { BaseProps, TextLabelProps } from '@toptal/picasso-shared'

import { IndicatorProps } from '../Indicator'

export type DivOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>

export type VariantType =
  | 'red'
  | 'yellow'
  | 'dark-grey'
  | 'light-grey'
  | 'green'

export interface VariantOnlyProps
  extends BaseProps,
    TextLabelProps,
    DivOrAnchorProps {
  /** Variant of the rectangular `Tag`, can not be used with the `indicator` property at the same time. */
  variant?: VariantType
  /** Indicator color, can not be used with the `variant` property at the same time. The Tag's `variant` property is automatically set to `light` when indicator color is set. */
  indicator?: never
}

export interface IndicatorOnlyProps
  extends BaseProps,
    TextLabelProps,
    DivOrAnchorProps {
  variant?: never
  indicator: IndicatorProps['color']
}

export type Props = VariantOnlyProps | IndicatorOnlyProps
