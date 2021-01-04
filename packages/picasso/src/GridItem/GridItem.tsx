import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIGrid, { GridSize } from '@material-ui/core/Grid'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Content of Grid.Item */
  children?: ReactNode
  /** Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority */
  small?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the medium breakpoint and wider screens */
  medium?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the large breakpoint and wider screens */
  large?: boolean | GridSize
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoGridItem'
})

export const GridItem = forwardRef<HTMLDivElement, Props>(function GridItem(
  props,
  ref
) {
  const {
    children,
    small,
    medium,
    large,
    className,
    style,
    classes: externalClasses,
    ...rest
  } = props
  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    <MUIGrid
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      item
      lg={large}
      md={medium}
      xs={small}
      classes={classes}
      className={className}
      style={style}
    >
      {children}
    </MUIGrid>
  )
})

GridItem.defaultProps = {}

GridItem.displayName = 'GridItem'

export default GridItem
