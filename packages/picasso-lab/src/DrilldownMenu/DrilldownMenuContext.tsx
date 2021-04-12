import { createContext } from 'react'

export interface DrilldownMenuContextProps {
  menuKey?: string
  setMenuKey?: (key?: string) => void
}

export default createContext<DrilldownMenuContextProps>({})
