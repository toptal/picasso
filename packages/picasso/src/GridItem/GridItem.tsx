import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import MUIGrid, { GridSize } from '@mui/material/Grid'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Content of Grid.Item */
  children?: ReactNode
  /** Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority */
  small?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the medium breakpoint and wider screens */
  medium?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the large breakpoint and wider screens */
  large?: boolean | GridSize
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoGridItem'
})

export const GridItem = forwardRef<HTMLDivElement, Props>(function GridItem(
  props,
  ref
) {
  const { children, small, medium, large, className, style, ...rest } = props
  const classes = useStyles()

  return (
    <MUIGrid
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
