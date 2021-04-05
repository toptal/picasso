import React, {
  forwardRef,
  ReactNode,
  TableHTMLAttributes,
  useMemo
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITable from '@material-ui/core/Table'
import {
  BaseProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import TableCell from '../TableCell'
import TableBody from '../TableBody'
import TableRow from '../TableRow'
import TableHead from '../TableHead'
import TableSectionHead from '../TableSectionHead'
import TableFooter from '../TableFooter'
import TableExpandableRow from '../TableExpandableRow'
import TableContext from './TableContext'
import styles from './styles'

export type TableSpacing = 'compact' | 'narrow' | 'regular'
export type TableVariant = 'clear' | 'bordered' | 'striped'

export interface Props
  extends BaseProps,
    TableHTMLAttributes<HTMLTableElement> {
  /** Children components (`Table.Head`, `Table.Body`, `Table.Footer`) */
  children: ReactNode
  /** Inner spacing */
  spacing?: TableSpacing
  /** Appearance variant */
  variant?: TableVariant
}

export interface StaticProps {
  Head: typeof TableHead
  SectionHead: typeof TableSectionHead
  Body: typeof TableBody
  Row: typeof TableRow
  Cell: typeof TableCell
  Footer: typeof TableFooter
  ExpandableRow: typeof TableExpandableRow
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'Table'
})

// eslint-disable-next-line react/display-name
export const Table = forwardRef<HTMLTableElement, Props>(function Table (
  props,
  ref
) {
  const {
    className,
    style,
    children,
    spacing = 'regular',
    variant = 'bordered',
    ...rest
  } = props
  const classes = useStyles()

  const tableConfig = useMemo(() => ({ spacing, variant }), [spacing, variant])

  return (
    <TableContext.Provider value={tableConfig}>
      <MUITable
        {...rest}
        ref={ref}
        classes={classes}
        className={className}
        style={style}
      >
        {children}
      </MUITable>
    </TableContext.Provider>
  )
}) as CompoundedComponentWithRef<Props, HTMLTableElement, StaticProps>

Table.defaultProps = {
  spacing: 'regular',
  variant: 'bordered'
}

Table.displayName = 'Table'

Table.Body = TableBody

Table.Cell = TableCell

Table.Body = TableBody

Table.Head = TableHead

Table.SectionHead = TableSectionHead

Table.Row = TableRow

Table.ExpandableRow = TableExpandableRow

Table.Footer = TableFooter

export default Table as PicassoComponentWithRef<
  Props,
  HTMLTableElement,
  StaticProps
>
