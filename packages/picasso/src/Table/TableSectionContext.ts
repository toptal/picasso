import { createContext } from 'react'

export enum TableSection {
  HEAD,
  BODY,
  FOOTER
}

export const TableSectionContext = createContext<TableSection | undefined>(
  undefined
)
