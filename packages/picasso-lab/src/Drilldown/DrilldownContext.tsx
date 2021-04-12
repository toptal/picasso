import { createContext } from 'react'

export interface DrilldownContextProps {
  selectedKey?: string
  setSelectedKey?: (key: string) => void
}

export default createContext<DrilldownContextProps>({})
