import React, { FunctionComponent, ReactNode } from 'react'
import { Overwrite } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MUITable from '@material-ui/core/Table'

import TableCell from '../TableCell'
import TableBody from '../TableBody'
import TableRow from '../TableRow'
import TableHead from '../TableHead'
import { StandardProps, JssProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Children components (`Table.Head`, `Table.Body`) */
  children: ReactNode
}

interface StaticProps {
  Head: typeof TableHead
  Body: typeof TableBody
  Row: typeof TableRow
  Cell: typeof TableCell
}

export const Table: FunctionComponent<Props> & StaticProps = ({
  classes,
  className,
  style,
  children
}) => (
  <MUITable classes={classes} className={className} style={style}>
    {children}
  </MUITable>
)

Table.defaultProps = {}

Table.displayName = 'Table'

Table.Body = TableBody

Table.Cell = TableCell

Table.Body = TableBody

Table.Head = TableHead

Table.Row = TableRow

export default withStyles(styles)(Table) as FunctionComponent<
  Overwrite<Props, Partial<JssProps>>
> &
  StaticProps
