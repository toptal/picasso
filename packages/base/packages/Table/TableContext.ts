/* eslint-disable import/no-extraneous-dependencies */
import { createContext } from 'react'

export interface TableConfig {
  spacing: 'compact' | 'narrow' | 'regular'
  variant: 'clear' | 'bordered' | 'striped'
}

const TableContext = createContext<TableConfig>({
  spacing: 'regular',
  variant: 'bordered',
})

export default TableContext
