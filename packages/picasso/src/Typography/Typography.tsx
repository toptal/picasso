import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITypography from '@material-ui/core/Typography'

import styles from './styles'
import toTitleCase from '../utils/to-title-case'
import toMuiVariant from './utils/to-mui-variant'
import getTypographyClassName from './utils/get-typography-class-name'
import { Props } from './types'

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
          lineThrough
        })
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
