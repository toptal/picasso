import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIGrid, { GridSize } from '@material-ui/core/Grid'

import styles from './styles'

interface Props {
  /** Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority */
  small?: GridSize
  /** Defines the number of grids the component is going to use. It's applied for the medium breakpoint and wider screens */
  medium?: GridSize
  /** Defines the number of grids the component is going to use. It's applied for the large breakpoint and wider screens */
  large?: GridSize
}

export const GridItem: React.FunctionComponent<Props> = props => {
  const { small, medium, large, ...rest } = props

  return <MUIGrid item lg={large} md={medium} xs={small} {...rest} />
}

GridItem.defaultProps = {}

export default withStyles(styles)(GridItem)
