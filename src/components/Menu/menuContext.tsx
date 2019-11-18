import { ReactElement, createContext } from 'react'

export interface MenuContextProps {
  push?: (key: string, menu: ReactElement) => void
  pop?: () => void
  refresh?: (key: string, menu: ReactElement) => void
}

export default createContext<MenuContextProps>({})
