/* eslint-disable import/no-extraneous-dependencies */
import Table from '@toptal/picasso-table'
import TableCell from '@toptal/picasso-table-cell'
import TableBody from '@toptal/picasso-table-body'
import TableRow from '@toptal/picasso-table-row'
import TableHead from '@toptal/picasso-table-head'
import TableSectionHead from '@toptal/picasso-table-section-head'
import TableFooter from '@toptal/picasso-table-footer'
import TableExpandableRow from '@toptal/picasso-table-expandable-row'

export const TableCompound = Object.assign(Table, {
  Cell: TableCell,
  Body: TableBody,
  Head: TableHead,
  SectionHead: TableSectionHead,
  Row: TableRow,
  ExpandableRow: TableExpandableRow,
  Footer: TableFooter,
})
