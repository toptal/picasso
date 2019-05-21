import React, { FunctionComponent, ReactNode, ReactType } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ThemeStyle as MUIVariant } from '@material-ui/core/styles/createTypography'
import { PropTypes } from '@material-ui/core'
import MUITypography, { TypographyProps } from '@material-ui/core/Typography'
import cx from 'classnames'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps } from '../Picasso'
import styles from './styles'

type VariantType = 'heading' | 'body'
type SizeType = 'small' | 'medium' | 'large' | 'inherit'

type WeightType = 'thin' | 'light' | 'regular' | 'semibold' | 'bold'
type ColorType = 'blue' | 'green' | 'red' | 'grey' | 'black'

export interface Props extends StandardProps {
  /** Font variant inner text */
  variant?: VariantType
  /** Text content */
  children?: ReactNode
  /** Controls whether the Typography is inline or not */
  inline?: boolean
  /** Text align of the inner text */
  align?: PropTypes.Alignment
  /** Size of the inner text */
  size?: SizeType
  /** Font weight of the inner text */
  weight?: WeightType
  /** Invert color */
  invert?: boolean
  /** Text color */
  color?: ColorType
  /** Rendered HTML markup */
  as?: ReactType<TypographyProps>
}

type VariantsType = { [k in VariantType]: { [l in SizeType]?: MUIVariant } }
const VARIANTS: VariantsType = {
  heading: {
    small: 'h3',
    medium: 'h2',
    large: 'h1'
  },
  body: {
    small: 'body1',
    medium: 'body1',
    large: 'body1',
    inherit: 'body1'
  }
}

export const Typography: FunctionComponent<Props> = props => {
  const {
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
    invert
  } = props
  const resolvedVariant = VARIANTS[variant!][size!]
  const variantClassName = kebabToCamelCase(`${variant}-${size}`)
  const rootClass = cx(
    {
      [classes.invert]: invert
    },
    classes[variantClassName],
    classes[weight!],
    classes[color!]
  )

  return (
    <MUITypography
      align={align}
      className={className}
      classes={{
        root: rootClass
      }}
      style={style}
      variant={resolvedVariant}
      inline={inline}
      component={as}
    >
      {children}
    </MUITypography>
  )
}

Typography.defaultProps = {
  color: 'grey',
  inline: false,
  size: 'inherit',
  variant: 'body',
  weight: 'regular'
}

Typography.displayName = 'Typography'

export default withStyles(styles)(Typography)
