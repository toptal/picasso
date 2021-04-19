import { ReactElement, createContext } from 'react'

export interface FlatMenuContextProps {
  push?: (key: string, menu: ReactElement) => void
  pop?: () => void
  refresh?: (key: string, menu: ReactElement) => void
}

export default createContext<FlatMenuContextProps>({})
