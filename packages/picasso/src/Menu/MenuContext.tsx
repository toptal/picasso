import { createContext } from 'react'

import { ModeType } from './Menu'

export interface MenuContextProps {
  mode?: ModeType
}

export default createContext<MenuContextProps>({})
