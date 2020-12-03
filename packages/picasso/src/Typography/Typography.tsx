import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Variant as MUIVariant } from '@material-ui/core/styles/createTypography'
import { PropTypes } from '@material-ui/core'
import MUITypography from '@material-ui/core/Typography'
import cx from 'classnames'
import {
  mergeClasses,
  StandardProps,
  SizeType,
  ColorType,
  TextLabelProps
} from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'

type VariantType = 'heading' | 'body'

type WeightType = 'thin' | 'light' | 'regular' | 'semibold'

type UnderlineType = 'solid' | 'dashed'

export interface Props
  extends StandardProps,
    TextLabelProps,
    HTMLAttributes<HTMLElement> {
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
  /** Controls when the Typography should have line through */
  lineThrough?: boolean
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

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTypography'
})

export const Typography = forwardRef<HTMLElement, Props>(function Typography(
  props,
  ref
) {
  const {
    variant,
    children,
    size,
    align,
    className,
    classes: externalClasses,
    style,
    inline,
    as,
    weight,
    color,
    invert,
    noWrap,
    underline,
    lineThrough,
    titleCase,
    ...rest
  } = props
  const classes = mergeClasses(useStyles(props), externalClasses)

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
      [classes.underline]: underline,
      [classes.lineThrough]: lineThrough
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
      {titleCase ? toTitleCase(children) : children}
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

export default Typography
