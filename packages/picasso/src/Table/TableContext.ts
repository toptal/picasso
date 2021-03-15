import { createContext } from 'react'

interface TableConfig {
  compact?: boolean
  bordered?: boolean
  striped?: boolean
}

const TableContext = createContext<TableConfig>({})

export default TableContext
