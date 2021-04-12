import { createContext } from 'react'

export interface DrilldownMenuContextProps {
  activeMenuKey?: string
  setActiveMenuKey?: (key?: string) => void
}

export default createContext<DrilldownMenuContextProps>({})
