import React, { ReactNode, FunctionComponent, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIGrid, { GridSize } from '@material-ui/core/Grid'

import styles from './styles'
import { StandardProps } from '../Picasso'

interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Content of Grid.Item */
  children?: ReactNode
  /** Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority */
  small?: GridSize
  /** Defines the number of grids the component is going to use. It's applied for the medium breakpoint and wider screens */
  medium?: GridSize
  /** Defines the number of grids the component is going to use. It's applied for the large breakpoint and wider screens */
  large?: GridSize
}

export const GridItem: FunctionComponent<Props> = ({
  children,
  small,
  medium,
  large,
  classes,
  className,
  style,
  ...rest
}) => (
  <MUIGrid
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
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

GridItem.defaultProps = {}

export default withStyles(styles)(GridItem)
