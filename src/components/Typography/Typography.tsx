import React, { FunctionComponent, ReactNode, ElementType } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ThemeStyle as MUIVariant } from '@material-ui/core/styles/createTypography'
import { PropTypes } from '@material-ui/core'
import MUITypography from '@material-ui/core/Typography'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

type VariantType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'large'
  | 'small'
  | 'caption'
  | 'body'

type WeightType = 'thin' | 'light' | 'regular' | 'semibold' | 'bold'
type ColorType = 'primary' | 'success' | 'error' | 'muted'
type VariantsType = { [key in VariantType]: MUIVariant }

export interface Props extends StandardProps {
  /** Font variant inner text */
  variant?: VariantType
  /** Text content */
  children?: ReactNode
  /** Controls whether the Typography is inline or not */
  inline?: boolean
  /** Text align of the inner text */
  align?: PropTypes.Alignment
  /** Font weight of the inner text */
  weight?: WeightType
  /** Invert color */
  invert?: boolean
  /** Text color */
  color?: ColorType
  /** Rendered HTML markup */
  as?: ElementType<React.HTMLAttributes<HTMLElement>>
}

const VARIANTS: VariantsType = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  caption: 'caption',
  large: 'body1',
  small: 'body1',
  body: 'body1'
}

const resolveRootClass = (props: Props) => {
  const { classes, weight, variant, invert, color } = props

  return cx(
    {
      [classes.large]: variant === 'large',
      [classes.small]: variant === 'small',
      [classes.body]: variant === 'body',
      [classes.invert]: invert
    },
    classes[weight!],
    classes[color!]
  )
}

export const Typography: FunctionComponent<Props> = props => {
  const { variant, children, align, className, style, inline, as } = props
  const resolvedVariant = VARIANTS[variant!]
  const rootClass = resolveRootClass(props)

  return (
    <MUITypography
      align={align}
      className={className}
      classes={{
        root: rootClass
      }}
      display={inline ? 'inline' : 'block'}
      style={style}
      variant={resolvedVariant}
      component={as}
    >
      {children}
    </MUITypography>
  )
}

Typography.defaultProps = {
  inline: false,
  variant: 'body',
  weight: 'regular'
}

Typography.displayName = 'Typography'

export default withStyles(styles)(Typography)
