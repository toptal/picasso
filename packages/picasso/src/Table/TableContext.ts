import { createContext } from 'react'

import { TableSpacing, TableVariant } from './Table'

export interface TableConfig {
  variant?: TableVariant
  spacing?: TableSpacing
}

const TableContext = createContext<TableConfig>({})

export default TableContext
