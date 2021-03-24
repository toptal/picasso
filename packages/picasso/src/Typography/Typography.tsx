import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Variant as MUIVariant } from '@material-ui/core/styles/createTypography'
import { PropTypes } from '@material-ui/core'
import MUITypography from '@material-ui/core/Typography'
import cx from 'classnames'
import {
  StandardProps,
  SizeType,
  ColorType,
  TextLabelProps
} from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'

type VariantType = 'heading' | 'body'

type WeightType = 'thin' | 'light' | 'regular' | 'semibold' | 'inherit'

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

const getWeightClass = (
  classes: Record<string, string>,
  weight?: WeightType
) => {
  if (weight === 'inherit') {
    return classes.inheritWeight
  }

  return weight && classes[weight]
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoTypography'
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

  const resolvedVariant = VARIANTS[variant][size]
  const variantClassName = kebabToCamelCase(`${variant}-${size}`)
  const colorClassName = kebabToCamelCase(`${color}`)

  const rootClass = cx(
    {
      [classes.invert]: invert
    },
    classes[variantClassName],
    getWeightClass(classes, weight),
    classes[colorClassName],
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      [classes[underline!]]: underline,
      [classes.lineThrough]: lineThrough
    }
  )

  return (
    <MUITypography
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
  variant: 'body'
}

Typography.displayName = 'Typography'

export default Typography
