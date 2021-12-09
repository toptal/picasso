import React, { forwardRef, ReactNode, HTMLAttributes, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { PropTypes } from '@material-ui/core'
import MUITypography from '@material-ui/core/Typography'
import cx from 'classnames'
import {
  StandardProps,
  ColorType,
  TextLabelProps,
  SizeType
} from '@toptal/picasso-shared'

import { TableSection, TableSectionContext } from '../Table'
import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
import toTitleCase from '../utils/to-title-case'
import { toMuiVariant } from './utils'

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
    size: propSize = 'inherit',
    style,
    titleCase,
    underline,
    variant = 'body',
    weight,
    ...rest
  } = props
  const classes = useStyles(props)

  // FIXME: once we deal with size='inherit' problem, we can remove these two lines
  // https://toptal-core.atlassian.net/browse/FX-2350
  const tableSection = useContext(TableSectionContext)
  const size =
    tableSection === TableSection.BODY && propSize === 'inherit'
      ? 'small'
      : propSize

  const variantClassName = kebabToCamelCase(`${variant}-${size}`)
  const colorClassName = kebabToCamelCase(`${color}`)

  const weightVariantClass = weight ? classes[weight] : undefined
  const weightClass =
    weight === 'inherit' ? classes.inheritWeight : weightVariantClass

  const underlineClass = underline ? classes[underline] : undefined

  const rootClass = cx(
    classes[variantClassName],
    classes[colorClassName],
    weightClass,
    underlineClass,
    {
      [classes.invert]: invert,
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
  variant: 'body'
}

Typography.displayName = 'Typography'

export default Typography
