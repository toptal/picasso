import React, { FunctionComponent, ReactNode, TableHTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITable from '@material-ui/core/Table'

import TableCell from '../TableCell'
import TableBody from '../TableBody'
import TableRow from '../TableRow'
import TableHead from '../TableHead'
import TableFooter from '../TableFooter'
import { StandardProps, PicassoComponent } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, TableHTMLAttributes<HTMLTableElement> {
  /** Children components (`Table.Head`, `Table.Body`, `Table.Footer`) */
  children: ReactNode
}

interface StaticProps {
  Head: typeof TableHead
  Body: typeof TableBody
  Row: typeof TableRow
  Cell: typeof TableCell
  Footer: typeof TableFooter
}

export const Table: FunctionComponent<Props> & StaticProps = ({
  classes,
  className,
  style,
  children,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MUITable {...rest} classes={classes} className={className} style={style}>
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

Table.Footer = TableFooter

export default withStyles(styles)(Table) as PicassoComponent<Props, StaticProps>
