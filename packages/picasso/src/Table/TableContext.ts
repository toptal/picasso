import { createContext } from 'react'

import { TableSpacing, TableVariant } from './Table'

export interface TableConfig {
  spacing: TableSpacing
  variant: TableVariant
}

const TableContext = createContext<TableConfig>({
  spacing: 'regular',
  variant: 'bordered'
})

export default TableContext
