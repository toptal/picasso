import { createContext } from 'react'

export interface DrilldownContextProps {
  focusedKey?: string
  setFocusedKey?: (key?: string) => void
}

export default createContext<DrilldownContextProps>({})
