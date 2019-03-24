import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITable from '@material-ui/core/Table'
import { Omit } from '@material-ui/core'

import TableCell from '../TableCell'
import TableBody from '../TableBody'
import TableRow from '../TableRow'
import TableHead from '../TableHead'
import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
  /** Children components (`Table.Head`, `Table.Body`) */
  children: React.ReactNode
}

type TableComponentType<C> = FunctionComponent<C> & {
  Head: typeof TableHead
  Body: typeof TableBody
  Row: typeof TableRow
  Cell: typeof TableCell
}

export const Table: TableComponentType<Props> = props => {
  const { classes, children } = props

  return <MUITable classes={classes}>{children}</MUITable>
}

Table.defaultProps = {}

Table.displayName = 'Table'

Table.Body = TableBody

Table.Cell = TableCell

Table.Body = TableBody

Table.Head = TableHead

Table.Row = TableRow

export default withStyles(styles)(Table) as TableComponentType<
  Omit<Props, 'classes'>
>
