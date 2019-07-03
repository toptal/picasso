import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIGrid, { GridSize } from '@material-ui/core/Grid'

import styles from './styles'
import { StandardProps } from '../Picasso'

interface Props extends StandardProps {
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
  elementSelector
}) => (
  <MUIGrid
    item
    lg={large}
    md={medium}
    xs={small}
    classes={classes}
    className={className}
    style={style}
    data-qa={elementSelector}
  >
    {children}
  </MUIGrid>
)

GridItem.defaultProps = {}

export default withStyles(styles)(GridItem)
