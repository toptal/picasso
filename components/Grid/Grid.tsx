import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIGrid, {
  GridSpacing,
  GridItemsAlignment,
  GridDirection,
  GridJustification
} from '@material-ui/core/Grid'

import GridItem from '../GridItem'
import styles from './styles'

interface Props {
  /** Defines the space between the type item components */
  spacing?: GridSpacing
  /** Defines the orientation of the grid */
  direction?: GridDirection
  /** Defines the align-items style property based on the direction */
  alignItems?: GridItemsAlignment
  /** Defines the justify-content style property based on the direction */
  justify?: GridJustification
}

export const Grid: React.FunctionComponent<Props> = props => (
  <MUIGrid container {...props} />
)

Grid.defaultProps = {
  alignItems: 'flex-start',
  direction: 'row',
  justify: 'flex-start',
  spacing: 32
}

// @ts-ignore
Grid.Item = GridItem

export default withStyles(styles)(Grid)
