import React, { FunctionComponent, ReactNode, ReactType } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ThemeStyle as MUIVariant } from '@material-ui/core/styles/createTypography'
import { PropTypes } from '@material-ui/core'
import MUITypography, { TypographyProps } from '@material-ui/core/Typography'
import cx from 'classnames'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, SizeType } from '../Picasso'
import styles from './styles'

type VariantType = 'heading' | 'body'

type WeightType = 'thin' | 'light' | 'regular' | 'semibold'
type ColorType =
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'grey'
  | 'light-grey'
  | 'black'
  | 'inherit'

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
  size?: SizeType<'small' | 'medium' | 'large' | 'xlarge'> | 'inherit'
  /** Font weight of the inner text */
  weight?: WeightType
  /** Invert color */
  invert?: boolean
  /** Text color */
  color?: ColorType
  /** Rendered HTML markup */
  as?: ReactType<TypographyProps>
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

export const Typography: FunctionComponent<Props> = ({
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
  elementSelector
}) => {
  const resolvedVariant = VARIANTS[variant!][size!]
  const variantClassName = kebabToCamelCase(`${variant}-${size}`)
  const colorClassName = kebabToCamelCase(`${color}`)

  const rootClass = cx(
    {
      [classes.invert]: invert
    },
    classes[variantClassName],
    classes[weight!],
    classes[colorClassName]
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
      data-qa={elementSelector}
    >
      {children}
    </MUITypography>
  )
}

Typography.defaultProps = {
  inline: false,
  size: 'inherit',
  variant: 'body'
}

Typography.displayName = 'Typography'

export default withStyles(styles)(Typography)
