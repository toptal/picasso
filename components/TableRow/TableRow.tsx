import React, { FunctionComponent, ReactNode, MouseEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableRow from '@material-ui/core/TableRow'

import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** If true, the table row will shade on hover */
  hover?: boolean
  /** If true, the table row will have the selected shading */
  selected?: boolean
  /** Callback invoked when user clicks on table row */
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void
}

export const TableRow: FunctionComponent<Props> = props => {
  const { classes, children, hover, selected, onClick } = props

  return (
    <MUITableRow
      classes={classes}
      hover={hover}
      selected={selected}
      onClick={onClick}
    >
      {children}
    </MUITableRow>
  )
}

TableRow.defaultProps = {
  hover: true,
  selected: false
}

TableRow.displayName = 'TableRow'

export default withStyles(styles)(TableRow)
