import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { PropTypes } from '@material-ui/core'
import { Typography as MUITypography } from '@material-ui/core'
import type {
  StandardProps,
  ColorType,
  TextLabelProps,
  SizeType,
} from '@toptal/picasso-shared'
import { toTitleCase } from '@toptal/picasso-utils'

import styles from './styles'
import toMuiVariant from './utils/to-mui-variant'
import getTypographyClassName from './utils/get-typography-class-name'

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

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTypography',
})

export const Typography = forwardRef<HTMLElement, Props>(function Typography(
  props,
  ref
) {
  const {
    align,
    as,
    children,
    className,
    color,
    inline,
    invert,
    lineThrough,
    noWrap,
    size = 'inherit',
    style,
    titleCase,
    underline,
    variant = 'body',
    weight,
    ...rest
  } = props
  const classes = useStyles(props)

  return (
    <MUITypography
      {...rest}
      ref={ref}
      align={align}
      className={className}
      classes={{
        root: getTypographyClassName(classes, {
          variant,
          size,
          color,
          weight,
          underline,
          invert,
          lineThrough,
          as,
        }),
      }}
      style={style}
      variant={toMuiVariant(variant, size)}
      display={inline ? 'inline' : 'initial'}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      component={as!}
      noWrap={noWrap}
    >
      {titleCase ? toTitleCase(children) : children}
    </MUITypography>
  )
})

Typography.defaultProps = {
  inline: false,
  noWrap: false,
  size: 'inherit',
  variant: 'body',
}

Typography.displayName = 'Typography'

export default Typography
