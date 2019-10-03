import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ThemeStyle as MUIVariant } from '@material-ui/core/styles/createTypography'
import { PropTypes } from '@material-ui/core'
import MUITypography from '@material-ui/core/Typography'
import cx from 'classnames'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, SizeType, ColorType } from '../Picasso'
import styles from './styles'

type VariantType = 'heading' | 'body'

type WeightType = 'thin' | 'light' | 'regular' | 'semibold'

type UnderlineType = 'solid' | 'dashed'

export interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Font variant for inner text */
  variant?: VariantType
  /** Text content */
  children?: ReactNode
  /** Controls whether the Typography is inline or not */
  inline?: boolean
  /** Text align of the inner text */
  align?: PropTypes.Alignment
  /** Size of the inner text */
  size?: SizeType<'small' | 'medium' | 'large' | 'xlarge'> | 'inherit'
  /** Font weight of the inner text */
  weight?: WeightType
  /** Invert color */
  invert?: boolean
  /** Text color */
  color?: ColorType
  /** Enable ellipsis for overflowing text */
  noWrap?: boolean
  /** Rendered HTML markup */
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>
  /** Controls when the Typography should have an underline */
  underline?: UnderlineType
}

type VariantsType = {
  [k in VariantType]: {
    [l in
      | SizeType<'small' | 'medium' | 'large' | 'xlarge'>
      | 'inherit']?: MUIVariant
  }
}
const VARIANTS: VariantsType = {
  heading: {
    small: 'h4',
    medium: 'h3',
    large: 'h2',
    xlarge: 'h1'
  },
  body: {
    small: 'body1',
    medium: 'body1',
    large: 'body1',
    inherit: 'body1'
  }
}

export const Typography = forwardRef<HTMLElement, Props>(function Typography(
  {
    variant,
    children,
    size,
    align,
    className,
    classes,
    style,
    inline,
    as,
    weight,
    color,
    invert,
    noWrap,
    underline,
    ...rest
  },
  ref
) {
  const resolvedVariant = VARIANTS[variant!][size!]
  const variantClassName = kebabToCamelCase(`${variant}-${size}`)
  const colorClassName = kebabToCamelCase(`${color}`)

  const rootClass = cx(
    {
      [classes.invert]: invert
    },
    classes[variantClassName],
    classes[weight!],
    classes[colorClassName],
    {
      [classes.underline]: underline
    },
    classes[underline!]
  )

  return (
    <MUITypography
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      align={align}
      className={className}
      classes={{
        root: rootClass
      }}
      style={style}
      variant={resolvedVariant}
      display={inline ? 'inline' : 'initial'}
      component={as!}
      noWrap={noWrap}
    >
      {children}
    </MUITypography>
  )
})

Typography.defaultProps = {
  inline: false,
  noWrap: false,
  size: 'inherit',
  variant: 'body'
}

Typography.displayName = 'Typography'

export default withStyles(styles)(Typography)
