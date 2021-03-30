import { createContext } from 'react'

import { TableVariant } from './Table'

export interface TableConfig {
  variant?: TableVariant
  bordered?: boolean
  striped?: boolean
}

const TableContext = createContext<TableConfig>({})

export default TableContext
