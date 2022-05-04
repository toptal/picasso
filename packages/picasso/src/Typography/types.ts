import React, { ReactNode, HTMLAttributes } from 'react'
import { PropTypes } from '@material-ui/core'
import {
  StandardProps,
  ColorType,
  TextLabelProps,
  SizeType
} from '@toptal/picasso-shared'

export interface Props
  extends StandardProps,
    TextLabelProps,
    HTMLAttributes<HTMLElement> {
  /** Font variant for inner text */
  variant?: 'heading' | 'body'
  /** Text content */
  children?: ReactNode
  /** Controls whether the Typography is inline or not */
  inline?: boolean
  /** Text align of the inner text */
  align?: PropTypes.Alignment
  /** Size of the inner text */
  size?:
    | SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
    | 'inherit'
  /** Font weight of the inner text */
  weight?: 'regular' | 'semibold' | 'inherit'
  /** Invert color */
  invert?: boolean
  /** Text color */
  color?: ColorType
  /** Enable ellipsis for overflowing text */
  noWrap?: boolean
  /** Rendered HTML markup */
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>
  /** Controls when the Typography should have an underline */
  underline?: 'solid' | 'dashed'
  /** Controls when the Typography should have line through */
  lineThrough?: boolean
}
