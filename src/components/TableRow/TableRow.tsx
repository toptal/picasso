import React, { FunctionComponent, ReactNode, MouseEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableRow from '@material-ui/core/TableRow'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** If true, the table row will shade on hover */
  hover?: boolean
  /** If true, the table row will have the selected shading */
  selected?: boolean
  /** Callback invoked when user clicks on table row */
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void
}

export const TableRow: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children,
  hover,
  selected,
  onClick,
  elementSelector
}) => (
  <MUITableRow
    classes={classes}
    className={className}
    style={style}
    hover={hover}
    selected={selected}
    onClick={onClick}
    data-qa={elementSelector}
  >
    {children}
  </MUITableRow>
)

TableRow.defaultProps = {
  hover: false,
  selected: false
}

TableRow.displayName = 'TableRow'

export default withStyles(styles)(TableRow)
