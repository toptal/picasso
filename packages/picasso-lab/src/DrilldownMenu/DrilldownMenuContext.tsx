import { createContext } from 'react'

export interface DrilldownMenuContextProps {
  activeItemKey?: string
  onMouseEnter?: (itemKey: string) => void
  onClickAway?: (itemKey: string) => void
}

export default createContext<DrilldownMenuContextProps>({})
