import Table from '../Table'
import TableCell from '../TableCell'
import TableBody from '../TableBody'
import TableRow from '../TableRow'
import TableHead from '../TableHead'
import TableSectionHead from '../TableSectionHead'
import TableFooter from '../TableFooter'
import TableExpandableRow from '../TableExpandableRow'

export const TableCompound = Object.assign(Table, {
  Cell: TableCell,
  Body: TableBody,
  Head: TableHead,
  SectionHead: TableSectionHead,
  Row: TableRow,
  ExpandableRow: TableExpandableRow,
  Footer: TableFooter,
})
