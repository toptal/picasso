import { ReactElement, createContext } from 'react'

export interface StackMenuContextProps {
  push?: (key: string, menu: ReactElement) => void
  pop?: () => void
  refresh?: (key: string, menu: ReactElement) => void
}

export default createContext<StackMenuContextProps>({})
