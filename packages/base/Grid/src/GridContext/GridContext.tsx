import { createContext } from 'react'

import type { GridSpacing } from '../types'

export interface GridContextProps {
  gridSpacing?: GridSpacing
}

export default createContext<GridContextProps>({})
