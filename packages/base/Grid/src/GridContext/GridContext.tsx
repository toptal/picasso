import { createContext } from 'react'

import type { GridSpacing } from '../types'

// TODO: add index file
export interface GridContextProps {
  gridSpacing?: GridSpacing
}

export default createContext<GridContextProps>({})
