import { createContext } from 'react'

export interface MenuContextProps {
  drilldown?: boolean
}

export default createContext<MenuContextProps>({})
