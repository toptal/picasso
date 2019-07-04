import React, { ReactNode, FunctionComponent, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIGrid, {
  GridSpacing,
  GridItemsAlignment,
  GridDirection,
  GridJustification,
  GridWrap
} from '@material-ui/core/Grid'

import GridItem from '../GridItem'
import { StandardProps, PicassoComponent } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
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
  /** Defines the flex-wrap style property based on the direction */
  wrap?: GridWrap
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
  wrap,
  classes,
  className,
  style,
  ...rest
}) => (
  <MUIGrid
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    container
    spacing={spacing}
    direction={direction}
    alignItems={alignItems}
    justify={justify}
    wrap={wrap}
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
  spacing: 32,
  wrap: 'wrap'
}

Grid.Item = GridItem

export default withStyles(styles)(Grid) as PicassoComponent<Props, StaticProps>
