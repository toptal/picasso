import React, {
  FunctionComponent,
  ReactNode,
  MouseEvent,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableRow from '@material-ui/core/TableRow'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLTableRowElement> {
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
  ...rest
}) => (
  <MUITableRow
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    classes={classes}
    className={className}
    style={style}
    hover={hover}
    selected={selected}
    onClick={onClick}
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
