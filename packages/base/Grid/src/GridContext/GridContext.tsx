import { createContext } from 'react'

// TODO: add index file
export interface GridContextProps {
  spacing?: number
}

export default createContext<GridContextProps>({})
