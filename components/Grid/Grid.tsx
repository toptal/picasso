import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIGrid, {
  GridSpacing,
  GridItemsAlignment,
  GridDirection,
  GridJustification,
  GridProps
} from '@material-ui/core/Grid'

import GridItem from '../GridItem'
import { Classes } from '../styles/types'
import styles from './styles'

interface StylesProps {
  classes: Classes
}

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

interface StaticProps {
  Item: typeof GridItem
}

export const Grid: FunctionComponent<Props & GridProps> &
  StaticProps = props => <MUIGrid container {...props} />

Grid.defaultProps = {
  alignItems: 'flex-start',
  direction: 'row',
  justify: 'flex-start',
  spacing: 32
}

Grid.Item = GridItem

export default withStyles(styles)(Grid)
