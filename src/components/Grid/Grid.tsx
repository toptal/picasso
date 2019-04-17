import React, { ReactNode, FunctionComponent } from 'react'
import { Overwrite } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MUIGrid, {
  GridSpacing,
  GridItemsAlignment,
  GridDirection,
  GridJustification
} from '@material-ui/core/Grid'

import GridItem from '../GridItem'
import { StandardProps, JssProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Grid content containing Grid.Item */
  children?: ReactNode
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

export const Grid: FunctionComponent<Props> & StaticProps = ({
  children,
  spacing,
  direction,
  alignItems,
  justify,
  classes,
  className,
  style
}) => (
  <MUIGrid
    container
    spacing={spacing}
    direction={direction}
    alignItems={alignItems}
    justify={justify}
    classes={classes}
    className={className}
    style={style}
  >
    {children}
  </MUIGrid>
)

Grid.defaultProps = {
  alignItems: 'flex-start',
  direction: 'row',
  justify: 'flex-start',
  spacing: 32
}

Grid.Item = GridItem

export default withStyles(styles)(Grid) as FunctionComponent<
  Overwrite<Props, Partial<JssProps>>
> &
  StaticProps
