import React, {
  forwardRef,
  ReactNode,
  TableHTMLAttributes,
  useMemo
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITable from '@material-ui/core/Table'
import { BaseProps } from '@toptal/picasso-shared'

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

const useStyles = makeStyles<Theme>(styles, {
  name: 'Table'
})

// eslint-disable-next-line react/display-name
export const Table = forwardRef<HTMLTableElement, Props>(function Table(
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
})

Table.defaultProps = {
  spacing: 'regular',
  variant: 'bordered'
}

Table.displayName = 'Table'

export default Object.assign(Table, {
  Cell: TableCell,
  Body: TableBody,
  Head: TableHead,
  SectionHead: TableSectionHead,
  Row: TableRow,
  ExpandableRow: TableExpandableRow,
  Footer: TableFooter
})
