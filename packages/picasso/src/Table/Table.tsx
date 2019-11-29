import React, { forwardRef, ReactNode, TableHTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITable from '@material-ui/core/Table'
import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import TableCell from '../TableCell'
import TableBody from '../TableBody'
import TableRow from '../TableRow'
import TableHead from '../TableHead'
import TableFooter from '../TableFooter'
import TableExpandableRow from '../TableExpandableRow'
import styles from './styles'

export interface Props
  extends StandardProps,
    TableHTMLAttributes<HTMLTableElement> {
  /** Children components (`Table.Head`, `Table.Body`, `Table.Footer`) */
  children: ReactNode
}

interface StaticProps {
  Head: typeof TableHead
  Body: typeof TableBody
  Row: typeof TableRow
  Cell: typeof TableCell
  Footer: typeof TableFooter
  ExpandableRow: typeof TableExpandableRow
}

// eslint-disable-next-line react/display-name
export const Table = forwardRef<HTMLTableElement, Props>(function Table(
  { classes, className, style, children, ...rest },
  ref
) {
  return (
    <MUITable
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={classes}
      className={className}
      style={style}
    >
      {children}
    </MUITable>
  )
}) as CompoundedComponentWithRef<Props, HTMLTableElement, StaticProps>

Table.defaultProps = {}

Table.displayName = 'Table'

Table.Body = TableBody

Table.Cell = TableCell

Table.Body = TableBody

Table.Head = TableHead

Table.Row = TableRow

Table.ExpandableRow = TableExpandableRow

Table.Footer = TableFooter

export default withStyles(styles)(Table) as PicassoComponentWithRef<
  Props,
  HTMLTableElement,
  StaticProps
>
